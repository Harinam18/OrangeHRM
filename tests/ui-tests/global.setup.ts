import { test } from '../../fixtures/common-fixture';
import {expect} from '@playwright/test'

/**
 * Setup project:
 * - Validate env vars
 * - Perform login
 * - Save storage state
 */
test('Global Setup for Auto Login', async ({
  page,
  loginPage,
  dashboardPage,
  commonUtils,
}) => {

  //ENV VALIDATION 
  const requiredEnvVars = [
    'SECRET_KEY',
    'BASE_URL',
    'USER_NAME',
    'PASSWORD',
  ];

  for (const key of requiredEnvVars) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  console.log('All required environment variables are present.');

  //DECRYPT CREDENTIALS
  const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

  //LOGIN FLOW
  await test.step('Launching OrangeHRM website', async () => {
    await loginPage.gotoOrangeHrm();
  });

  await test.step('Logging into OrangeHRM', async () => {
    await loginPage.loginOrangeHrm(decryptedUserName, decryptedPassword);
  });

  await test.step('Verify successful login', async () => {
    await page.waitForURL(
      process.env.BASE_URL + '/web/index.php/dashboard/index'
    );
    await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');
  });

  //SAVE AUTH STATE
  await page.context().storageState({
    path: './playwright/.auth/auth.json',
  });
});
