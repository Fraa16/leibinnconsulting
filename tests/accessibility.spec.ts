import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  { name: 'Startseite', path: '/' },
  { name: 'Impressum', path: '/impressum' },
  { name: 'Datenschutz', path: '/datenschutz' },
  { name: '404', path: '/diese-seite-gibt-es-nicht' },
];

/**
 * Scrolls the whole page so every IntersectionObserver reveal has fired.
 *
 * Elements start at `opacity: 0`, and axe skips what it considers hidden — so
 * without this the audit would only ever see the first viewport. Smooth scrolling
 * has to be disabled first, or the programmatic jumps animate and never arrive.
 */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 300));

    document.documentElement.style.scrollBehavior = previous;
  });
}

for (const route of ROUTES) {
  test(`${route.name} has no axe violations`, async ({ page }) => {
    await page.goto(route.path);
    await revealAll(page);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    // Print the detail on failure rather than just a count.
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target.join(' ')),
      })),
    ).toEqual([]);
  });
}

test('every reveal becomes visible when scrolled past', async ({ page }) => {
  await page.goto('/');
  await revealAll(page);

  const stuck = await page.evaluate(() =>
    [...document.querySelectorAll('.reveal')]
      .filter((element) => !element.classList.contains('is-visible'))
      .map((element) => (element.textContent ?? '').trim().slice(0, 60)),
  );

  expect(stuck).toEqual([]);
});

test('page has no horizontal overflow on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/');
  await revealAll(page);

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test('reduced motion renders content without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  // With reduced motion the Reveal primitive renders plain elements — nothing
  // should be left in the pre-animation hidden state.
  await expect(page.locator('.reveal')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
