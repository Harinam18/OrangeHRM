import {test} from '../../fixtures/common-fixture'
import {expect} from '@playwright/test'

test('Global Setup for Auto Login', async({page, loginPage, dashboardPage, commonUtils})=>{
    const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!)
    
    await test.step('Launching OrangHRM website',async()=>{
          await loginPage.gotoOrangeHrm();          
    });
    await test.step('Logging to OrangHRM',async()=>{
          await loginPage.loginOrangeHrm(decryptedUserName,decryptedPassword );          
    });
    await test.step('Verify successful login',async()=>{
          await page.waitForURL(process.env.BASE_URL + '/web/index.php/dashboard/index');
          await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');         
    });

    await page.context().storageState({
                path: './playwright/.auth/auth.json'
    })

});