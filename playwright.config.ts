import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// dotenv.config({
//     path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : `./env-files/.env.demo`
// })


/**
 * Modified by Harinam for CI/CD:
 * This logic first checks if we are in CI. If NOT in CI, it loads local files.
 * If in CI, it relies on the environment variables already injected by GitHub.
 */
if (!process.env.CI) {
  dotenv.config({
    path: process.env.ENV_NAME 
      ? path.resolve(__dirname, 'env-files', `.env.${process.env.ENV_NAME}`) 
      : path.resolve(__dirname, 'env-files', '.env.demo')
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/ui-tests',
  // exclude api-tests ONLY when running in CI               
   testIgnore: process.env.CI ? '**/api-tests/**' : undefined,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html',{open:'always'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout:90000,                          // test and expect timeout added by harinam
  expect: {
    timeout:30000,
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

  // baseURL:process.env.API_BASE_URL ,   // used for api testing - harinam
  //   extraHTTPHeaders:{
  //           Accept: 'application/json',
  //           'Content-Type':'application/json',
  //          // Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
  //   },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //headless: true,
    trace: 'on-first-retry',
    video:'off',
    screenshot:'off'
  },

  /* Configure projects for major browsers */
  projects: [
   {
    name: 'Setup',
    testMatch: 'global.setup.ts'
   },
   {
    name: 'chromium',
    dependencies:['Setup'],
    use: { ...devices['Desktop Chrome'],
     storageState:'./playwright/.auth/auth.json'
       },
   },

   {
    name: 'firefox',
    dependencies:['Setup'],
    use: { ...devices['Desktop Firefox'],
     storageState:'./playwright/.auth/auth.json'
        },
   },

   {
    name: 'webkit',
    dependencies:['Setup'],
    use: { ...devices['Desktop Safari'],
     storageState:'./playwright/.auth/auth.json'
        },
   },
   {
    name: 'apiTest',
    testDir: './tests/api-tests',
    use: {
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM="
             },
          }
   }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
