import { test, expect } from '../../fixtures/hooks-fixture';
import pimData from '../../data/ui-data/pim-module-data.json';

test('[PIM] Verify pagination navigation.', async ({gotoUrl, leftNavigationPage, pimPage }) => {
        await test.step('Open PIM Module',async()=>{
           await leftNavigationPage.openPimModule();
        });
         
        const firstPageEmployee = await pimPage.employeeListRows.first().innerText();

        await test.step('Navigating to next page',async()=>{
            console.log(firstPageEmployee);
            await pimPage.navigateToNextPage();           
        });

        await test.step('Verify change in employee list',async()=>{
           const secondPageEmployee = await pimPage.employeeListRows.first().innerText();
           expect(firstPageEmployee).not.toEqual(secondPageEmployee);
        });
       
    });


test('Verify all Left Navigation links are working', async ({gotoUrl, leftNavigationPage, page }) => {

    const menuList = await leftNavigationPage.getMenuNames();    

    await test.step('Get the list of menu names',async()=>{      
           console.log('Menus to check:', menuList);
        });

    await test.step('Loop through each menu item',async()=>{

        for (const menuName of menuList) {
        
            if (menuName === 'Maintenance') continue;
            console.log(`Checking link: ${menuName}`);
            await leftNavigationPage.clickMenuByName(menuName);
            await page.waitForLoadState('domcontentloaded');
            let expectedUrlPart = menuName.toLowerCase().replace(/\s+/g, '');
            if (menuName === 'My Info') {
                expectedUrlPart = 'viewpersonaldetails';
            }

            expect.soft(page.url().toLowerCase(), `Checking URL for ${menuName}`).toContain(expectedUrlPart);
             
        }
    });
    

});



