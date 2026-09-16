import { test, expect, type Page } from '@playwright/test';

/**
 * The lead forms are the site's entire commercial purpose, and in the delivered
 * build they did nothing at all. These cover the paths that matter: validation,
 * the mandatory DSGVO consent, the success state, and failure handling.
 */

/** Stub /api/lead so the tests never depend on mail credentials. */
async function stubLeadApi(page: Page, response: { status: number; body: unknown }) {
  await page.route('**/api/lead', async (route) => {
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body),
    });
  });
}

test.describe('Erstgespräch form', () => {
  test('blocks submission and reports empty required fields', async ({ page }) => {
    await page.goto('/#kontakt');

    let requests = 0;
    await page.route('**/api/lead', async (route) => {
      requests += 1;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.getByRole('button', { name: 'Unverbindliches Erstgespräch anfragen' }).click();

    await expect(page.getByText('Bitte füllen Sie dieses Feld aus.').first()).toBeVisible();
    expect(requests).toBe(0);
  });

  test('rejects a malformed email address', async ({ page }) => {
    await page.goto('/#kontakt');

    await page.locator('#erstgespraech-email').fill('keine-email');
    await page.locator('#erstgespraech-name').click();

    await expect(page.getByText('Bitte geben Sie eine gültige E-Mail-Adresse ein.')).toBeVisible();
  });

  test('requires the DSGVO consent checkbox', async ({ page }) => {
    await page.goto('/#kontakt');

    let requests = 0;
    await page.route('**/api/lead', async (route) => {
      requests += 1;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.locator('#erstgespraech-name').fill('Max Mustermann');
    await page.locator('#erstgespraech-email').fill('max@beispiel.de');
    await page.getByRole('button', { name: 'Unverbindliches Erstgespräch anfragen' }).click();

    await expect(page.getByText('Bitte stimmen Sie der Datenschutzerklärung zu.')).toBeVisible();
    expect(requests).toBe(0);
  });

  test('submits a valid enquiry and shows the success state', async ({ page }) => {
    await stubLeadApi(page, { status: 200, body: { ok: true } });
    await page.goto('/#kontakt');

    await page.locator('#erstgespraech-name').fill('Max Mustermann');
    await page.locator('#erstgespraech-email').fill('max@beispiel.de');
    await page.locator('#erstgespraech-message').fill('Ich interessiere mich für eine Beratung.');
    await page.locator('#erstgespraech-consent').check();

    await page.getByRole('button', { name: 'Unverbindliches Erstgespräch anfragen' }).click();

    await expect(page.getByText('Vielen Dank für Ihre Anfrage.')).toBeVisible();
  });

  test('surfaces a server failure instead of failing silently', async ({ page }) => {
    await stubLeadApi(page, {
      status: 502,
      body: { ok: false, error: 'E-Mail konnte nicht zugestellt werden.' },
    });
    await page.goto('/#kontakt');

    await page.locator('#erstgespraech-name').fill('Max Mustermann');
    await page.locator('#erstgespraech-email').fill('max@beispiel.de');
    await page.locator('#erstgespraech-consent').check();

    await page.getByRole('button', { name: 'Unverbindliches Erstgespräch anfragen' }).click();

    await expect(page.getByText('Das hat leider nicht geklappt.')).toBeVisible();
  });

  test('sends the consent flag and the form source', async ({ page }) => {
    let payload: Record<string, unknown> = {};
    await page.route('**/api/lead', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });

    await page.goto('/#kontakt');
    await page.locator('#erstgespraech-name').fill('Max Mustermann');
    await page.locator('#erstgespraech-email').fill('max@beispiel.de');
    await page.locator('#erstgespraech-consent').check();
    await page.getByRole('button', { name: 'Unverbindliches Erstgespräch anfragen' }).click();

    await expect(page.getByText('Vielen Dank für Ihre Anfrage.')).toBeVisible();
    expect(payload.consent).toBe(true);
    expect(payload.source).toBe('erstgespraech');
    expect(payload.company).toBe(''); // honeypot stays empty for a real visitor
  });
});

test.describe('Kurzkontakt form', () => {
  test('submits and shows the success state', async ({ page }) => {
    await stubLeadApi(page, { status: 200, body: { ok: true } });
    await page.goto('/');

    await page.locator('#kurzkontakt-firstname').scrollIntoViewIfNeeded();
    await page.locator('#kurzkontakt-firstname').fill('Max');
    await page.locator('#kurzkontakt-lastname').fill('Mustermann');
    await page.locator('#kurzkontakt-email').fill('max@beispiel.de');
    await page.locator('#kurzkontakt-consent').check();

    await page.getByRole('button', { name: 'Jetzt unverbindliche Beratung anfordern' }).click();

    await expect(page.getByText('Vielen Dank für Ihre Anfrage.')).toBeVisible();
  });

  test('consent links to the privacy notice', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('label[for="kurzkontakt-consent"]').getByRole('link');
    await expect(link).toHaveAttribute('href', '/datenschutz');
  });
});
