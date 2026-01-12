import { Locator, Page } from "@playwright/test";

export class LeftNavigationPage{
    readonly page:Page;
    readonly pimLink : Locator;
    readonly orangeHrmLogo : Locator;
    readonly leftNavigationPanel : Locator;

    readonly menuItems: Locator;

    constructor(page : Page){
        this.page = page;
        this.pimLink = page.getByRole('link', { name: 'PIM' });
        this.orangeHrmLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftNavigationPanel = page.locator('div.oxd-sidepanel-body');

        this.menuItems = page.locator('.oxd-main-menu-item');
    }

/**
 *  To open PIM module
 */    
    async openPimModule(){
        await this.pimLink.click();
    }


/**
 * Returns an array of menu names (e.g. ['Admin', 'PIM', 'Leave'])
 */
async getMenuNames(): Promise<string[]> {

    // Wait for the first menu item to be visible before grabbing the list
        await this.menuItems.first().waitFor();
        
    // waits for the list to be attached before grabbing text
    return await this.menuItems.allInnerTexts();
}

/**
 * Clicks a specific menu by its text name
 */
async clickMenuByName(menuName: string) {
    // exact: true ensures we don't accidentally click partial matches
    await this.page.getByRole('link', { name: menuName, exact: true }).click();
}



}