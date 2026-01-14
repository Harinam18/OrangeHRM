import { test, expect } from '../../fixtures/hooks-fixture';
import loginModuleData from '../../data/ui-data/login-module-data.json';

test.use({ storageState: { cookies: [], origins: [] } }); 

test('[Login] Verify that the user cannot log in with an invalid password.',{
  tag:['@UI','@UAT']
}, async ({ gotoUrl, loginPage, commonUtils }) => {
        await test.step('Login with Valid username and Invalid password',async()=>{
            const username = commonUtils.decryptData(process.env.USER_NAME!);
            await loginPage.loginOrangeHrm(username, loginModuleData.wrong_password);           
        });
        await test.step('Validating an error msg displayed',async()=>{
            await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
            await expect(loginPage.userNameInput).toBeVisible();          
        });
  
})


test.describe('Invalid login test',{
  tag:'@InvalidLogin'
},()=>{
    test('[Login] Verify that the user cannot log in with an invalid username.',{
      tag:['@UI','@UAT']
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
            await test.step('Login with Inalid username and Valid password',async()=>{
                const password = commonUtils.decryptData(process.env.PASSWORD!);
                await loginPage.loginOrangeHrm(loginModuleData.wrong_username, password);          
              });
            await test.step('Validating an error msg displayed',async()=>{
                await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
                await expect(loginPage.userNameInput).toBeVisible();          
              });
      
    })

test('[Login] Verify that the user cannot log in with both an invalid username and password.',{
      tag:['@UI','@UAT','@DEV']
    }, async ({ gotoUrl, loginPage }) => {
            await test.step('Login with Inalid username and password',async()=>{
                await loginPage.loginOrangeHrm(loginModuleData.wrong_username, loginModuleData.wrong_password);
              
              });
            await test.step('Validating an error msg displayed',async()=>{
                await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
                await expect(loginPage.userNameInput).toBeVisible();          
              });
      
    })

})


test('[Login] Verify that the user can log in with valid username and password.', {
      tag: ['@VISUAL', '@UAT'],
    }, async({gotoUrl, loginPage,leftNavigationPage, commonUtils})=>{
        const username = commonUtils.decryptData(process.env.USER_NAME!);
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.loginOrangeHrm(username, password);
        // await expect(leftNavigationPage.orangeHrmLogo).toHaveScreenshot('OrangeHrmBrandLogo.png');
        // await expect(leftNavigationPage.leftNavigationPanel).toHaveScreenshot('LeftNavPanel.png')
         
    })
