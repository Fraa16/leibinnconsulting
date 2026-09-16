import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end and accessibility tests.
 *
 * Runs against the production build via `vite preview`, not the dev server, so
 * what is tested is what ships.
 */

/*
 * Some environments provide a pre-installed Chromium whose build number differs
 * from the one this Playwright version downloads. Setting PLAYWRIGHT_CHROMIUM_PATH
 * points the runner at it; CI leaves it unset and uses `npx playwright install`.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    launchOptions: { executablePath },
  },

  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath } } },
    { name: 'mobile', use: { ...devices['Pixel 5'], launchOptions: { executablePath } } },
  ],

  webServer: {
    command: 'npm run build && npx vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
