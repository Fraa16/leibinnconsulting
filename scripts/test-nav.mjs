/**
 * End-to-end checks for the landing page: every CTA, navigation across
 * routes, the calculator, the FAQ, the booking card, layout and a11y basics.
 *
 *   npm run build && npm run preview      (in another terminal)
 *   node scripts/test-nav.mjs [baseUrl]
 */
import { chromium } from 'playwright';
import { launchOptions } from './chrome.mjs';

const BASE = process.argv[2] || 'http://localhost:4173';
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch(launchOptions());
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });

const goHome = async () => {
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(400);
};

/** Distance of a section's top from where an anchor should land it. */
const offset = (id) =>
  page.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  }, id);
const landed = (top) => top !== null && top >= 0 && top <= 140;

console.log('\n1. Every booking CTA lands on #termin');
for (const [name, scope] of [
  ['Erstgespräch buchen', 'header'],
  ['Kostenloses Erstgespräch buchen', '#top'],
  ['Termin wählen →', '#top'],
  ['Ergebnis prüfen lassen →', '#rechner'],
  ['Frage im Gespräch klären →', '#faq'],
  ['Erstgespräch buchen', 'footer'],
]) {
  await goHome();
  const el = page.locator(scope).getByRole('link', { name, exact: true }).first();
  await el.scrollIntoViewIfNeeded();
  await el.click();
  await page.waitForTimeout(500);
  const top = await offset('termin');
  check(`${scope} "${name}"`, landed(top), `#termin at ${top}px`);
}

console.log('\n2. Header nav scrolls to each section');
for (const [label, id] of [
  ['Leistungen', 'leistungen'],
  ['Rechner', 'rechner'],
  ['Ablauf', 'prozess'],
  ['Über uns', 'vertrauen'],
  ['FAQ', 'faq'],
]) {
  await goHome();
  await page.locator('header').getByRole('link', { name: label, exact: true }).first().click();
  await page.waitForTimeout(500);
  const top = await offset(id);
  check(`nav "${label}" → #${id}`, landed(top), `${top}px`);
}

console.log('\n3. Legal pages and cross-route navigation');
for (const [label, path] of [
  ['Impressum', '/impressum'],
  ['Datenschutz', '/datenschutz'],
]) {
  await goHome();
  const el = page.locator('footer').getByRole('link', { name: label, exact: true });
  await el.scrollIntoViewIfNeeded();
  await el.click();
  await page.waitForTimeout(600);
  check(`footer "${label}" reaches ${path}`, new URL(page.url()).pathname === path, page.url());
  check(`${path} starts at the top`, await page.evaluate(() => window.scrollY < 40));
}
await page.locator('header').getByRole('link', { name: 'FAQ', exact: true }).first().click();
await page.waitForTimeout(1000);
check('nav "FAQ" from /datenschutz returns home', new URL(page.url()).pathname === '/');
check('…and lands on #faq', landed(await offset('faq')), `${await offset('faq')}px`);

console.log('\n4. Calculator');
await goHome();
const result = page.locator('#rechner output');
const tab = (name) => page.locator('#rechner').getByRole('button', { name, exact: true });
check('default case 02 shows ≈ 9.060 €', (await result.innerText()).includes('9.060'), await result.innerText());
check('hero card shows the same figure', (await page.locator('#top').innerText()).includes('≈ 9.060 €'));
await tab('Unternehmer').click();
check('"Unternehmer" → ≈ 13.090 €', (await result.innerText()).includes('13.090'), await result.innerText());
await tab('Normalverdiener').click();
check('"Normalverdiener" → ≈ 4.740 €', (await result.innerText()).includes('4.740'), await result.innerText());
await page.locator('#calc-price').fill('500000');
check('moving a slider selects "Ihre Werte"', (await tab('Ihre Werte').getAttribute('aria-pressed')) === 'true');
await tab('Leitende Angestellte').click();
await tab('Bestand').click();
check('Bestand on a case selects "Ihre Werte"', (await tab('Ihre Werte').getAttribute('aria-pressed')) === 'true');
check('disclaimer is shown next to the result', (await page.locator('#rechner').innerText()).includes('Keine Steuerberatung.'));

console.log('\n5. FAQ: one open at a time, first open by default');
const qs = page.locator('#faq button[aria-expanded]');
check('first answer open on load', (await qs.nth(0).getAttribute('aria-expanded')) === 'true');
await qs.nth(2).click();
await page.waitForTimeout(500);
const states = await qs.evaluateAll((els) => els.map((e) => e.getAttribute('aria-expanded')));
check('opening the third closes the first', states.filter((s) => s === 'true').length === 1 && states[2] === 'true', states.join(','));
const leaking = await page.locator('#faq .acc-panel[data-open="false"]').evaluateAll((els) =>
  els.filter((el) => getComputedStyle(el).visibility === 'visible' || el.getBoundingClientRect().height > 1).length,
);
check('closed answers are hidden and zero-height', leaking === 0, `${leaking} showing`);

console.log('\n6. Booking card');
const card = page.locator('#termin');
const usesCalendly = (await card.getByRole('button', { name: 'Kalender laden' }).count()) > 0;
if (usesCalendly) {
  check('Calendly is not loaded before consent', (await card.locator('iframe').count()) === 0);
  await card.getByRole('button', { name: 'Kalender laden' }).click();
  const src = (await card.locator('iframe').getAttribute('src')) ?? '';
  check('"Kalender laden" inserts the styled Calendly iframe', src.includes('primary_color=b8875a'), src);
} else {
  check('weekends and past days are not selectable', (await card.locator('button[disabled]').count()) >= 8);
  const day = card.locator('button[aria-pressed]:not([disabled])').first();
  await day.scrollIntoViewIfNeeded();
  await day.click();
  await card.getByRole('button', { name: '10:30', exact: true }).click();
  await card.getByPlaceholder('Vorname').fill('Anna');
  await card.getByPlaceholder('E-Mail').fill('anna@example.com');
  await card.getByRole('button', { name: /Termin bestätigen/ }).click();
  check('mock booking reaches its confirmation', (await card.innerText()).includes('Danke Anna'));
}

console.log('\n7. Layout: no horizontal overflow');
for (const width of [375, 390, 768, 1000, 1280, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await goHome();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
  });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(`${width}px: no horizontal scroll`, overflow <= 1, `${overflow}px overflow`);
}

console.log('\n8. Accessibility basics');
await page.setViewportSize({ width: 1440, height: 900 });
await goHome();
check('html lang is de', (await page.evaluate(() => document.documentElement.lang)) === 'de');
check('exactly one h1', (await page.locator('h1').count()) === 1, String(await page.locator('h1').count()));
const noAlt = await page.evaluate(() => [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length);
check('every img has an alt attribute', noAlt === 0, `${noAlt} missing`);
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim());
check('first tab stop is the skip link', firstFocus === 'Zum Inhalt springen', firstFocus ?? '');

console.log('\n9. Mobile menu');
await page.setViewportSize({ width: 390, height: 844 });
await goHome();
const toggle = page.locator('button[aria-controls="mobile-menu"]');
const panel = page.locator('#mobile-menu');
check('toggle reads "Menü" and starts collapsed', (await toggle.innerText()) === 'Menü' && (await toggle.getAttribute('aria-expanded')) === 'false');
check('panel starts hidden', !(await panel.isVisible()));
await toggle.click();
check('toggle expands and reads "Schließen"', (await toggle.getAttribute('aria-expanded')) === 'true' && (await toggle.innerText()) === 'Schließen');
check('panel becomes visible', await panel.isVisible());
await page.keyboard.press('Escape');
check('Escape closes it', !(await panel.isVisible()));
await toggle.click();
await panel.getByRole('link', { name: 'Rechner', exact: true }).click();
await page.waitForTimeout(500);
check('a menu link closes the panel', !(await panel.isVisible()));
check('…and lands on #rechner', landed(await offset('rechner')), `${await offset('rechner')}px`);

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
