import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// this will retain context / storage state for our logged in user
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on', // 'on-first-retry','on-all-retries','off','on','retain-on-failure'
    video: 'on' // 'on-first-retry','off','on','retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /_setup\.ts/,
      teardown: 'teardown',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    {
      name: 'teardown',
      testMatch: /_teardown\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
        viewport: {
          width: 1920,
          height: 1080
        }
      },
      dependencies: ['setup']
    }
  ]
});
