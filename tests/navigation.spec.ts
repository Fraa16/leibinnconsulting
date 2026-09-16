import { test, expect } from '@playwright/test';

test.describe('header', () => {
  test('skip link moves focus to the main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skip = page.getByRole('link', { name: 'Zum Inhalt springen' });
    await expect(skip).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#hauptinhalt$/);
  });

  test('scroll spy marks the section being read', async ({ page }, testInfo) => {
    // The inline section links only exist from the md breakpoint up; below that
    // the same links live in the mobile sheet.
    test.skip(testInfo.project.name === 'mobile', 'Desktop navigation is hidden on phones');

    await page.goto('/');

    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.getElementById('prozess')?.scrollIntoView();
    });
    await page.waitForTimeout(500);

    await expect(
      page
        .getByRole('navigation', { name: 'Hauptnavigation' })
        .getByRole('link', { name: 'Prozess' }),
    ).toHaveAttribute('aria-current', 'true');
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, traps focus, closes on Escape and restores focus', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Menü öffnen' });
    await toggle.click();

    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await expect(page.getByRole('button', { name: 'Menü schließen' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    // Focus should have moved inside the menu.
    await expect(menu.getByRole('link').first()).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    // ...and come back to the control that opened it.
    await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused();
  });

  test('background does not scroll while the menu is open', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menü öffnen' }).click();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
  });
});

test.describe('FAQ accordion', () => {
  test('follows the ARIA disclosure pattern', async ({ page }) => {
    await page.goto('/');

    const first = page.getByRole('button', { name: 'Wie läuft das Erstgespräch ab?' });
    await first.scrollIntoViewIfNeeded();

    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'true');

    const panelId = await first.getAttribute('aria-controls');
    await expect(page.locator(`#${panelId}`)).toContainText('Im Erstgespräch klären wir');

    await first.click();
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  test('arrow keys move between questions', async ({ page }) => {
    await page.goto('/');

    const first = page.getByRole('button', { name: 'Wie läuft das Erstgespräch ab?' });
    await first.scrollIntoViewIfNeeded();
    await first.focus();

    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('button', { name: 'Wie viel Kapital benötige ich für den Einstieg?' }),
    ).toBeFocused();

    await page.keyboard.press('End');
    await expect(
      page.getByRole('button', { name: 'Kann ich auch als Normalverdiener investieren?' }),
    ).toBeFocused();
  });
});

test.describe('routing', () => {
  test('legal pages resolve and are noindex', async ({ page }) => {
    for (const path of ['/impressum', '/datenschutz']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, follow',
      );
    }
  });

  test('unknown paths render the 404 page', async ({ page }) => {
    await page.goto('/gibt-es-nicht');
    await expect(page.getByRole('heading', { name: 'Diese Seite gibt es nicht.' })).toBeVisible();
  });

  test('landing page exposes FAQPage structured data', async ({ page }) => {
    await page.goto('/');
    const jsonLd = await page.locator('script#structured-data').textContent();
    const graph = JSON.parse(jsonLd ?? '{}');

    const faq = graph['@graph'].find((node: { '@type': string }) => node['@type'] === 'FAQPage');
    expect(faq.mainEntity).toHaveLength(8);
    expect(faq.mainEntity[0].name).toBe('Wie läuft das Erstgespräch ab?');
  });
});
