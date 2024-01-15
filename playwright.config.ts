import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'

// Add environment variables from file
// See https://github.com/motdotla/dotenv
process.env.ENV = process.env.ENV ? process.env.ENV : 'default' // Which .env file to read
dotenv.config({ path: `config/${process.env.ENV}.env` }) // Read .env
export const BASE_URL = process.env.BASE_URL
export const seconds = 1000
export const percent = 0.01

// Configuration for entire Playwright project
// See https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: './tests', // Directory where Playwright looks for tests
  snapshotPathTemplate: 'data/{testFileName}/{arg}{ext}', // Where to generate / look for snapshots
  fullyParallel: true, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code
  retries: !!process.env.CI ? 1 : 0, // Retry on CI only
  workers: !!process.env.CI ? 4 : 8, // Opt out of parallel tests on CI
  outputDir: 'output/', // Folder for test artifacts such as screenshots, videos, traces, etc
  reporter: !!process.env.CI // Reporter to use. See https://playwright.dev/docs/test-reporters
    ? /* Local */ [['list'], ['blob']]
    : /*  CI   */ [['list'], ['html', { open: 'on-failure' }]],

  // Shared settings for all the projects below
  // See https://playwright.dev/docs/api/class-testoptions
  use: {
    viewport: { width: 1920, height: 1080 },
    baseURL: `${BASE_URL}`, // Base URL to use in actions like `await page.goto('/')`
    headless: true, // Run tests in headless mode
    actionTimeout: 5 * seconds, // No action can take longer than 8 seconds
    trace: 'on-first-retry', // Collect trace when retrying the failed test
    video: 'on-first-retry', // Collect video when retrying the failed test
  },

  // Default config for assertions
  // See https://playwright.dev/docs/test-configuration#expect-options
  expect: {
    timeout: 5 * seconds, // Maximum time expect() should wait for the condition to be met
    toHaveScreenshot: {
      maxDiffPixelRatio: 1 * percent,
    },
  },

  // Configure projects for major browsers
  // See https://playwright.dev/docs/api/class-testproject
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
