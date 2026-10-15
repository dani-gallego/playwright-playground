import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'Steps/*.ts',
});

export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'Reports/playwright-report', open: 'on-failure' }],
    ['allure-playwright', { resultsDir: 'Reports/allure-results' }],
  ],

  use: {
    browserName: 'chromium',
    headless: !!process.env.CI,
  },

  projects: [
    { name: 'bdd', testDir: bddTestDir },
    { name: 'e2e', testDir: './tests/' },
  ],
});