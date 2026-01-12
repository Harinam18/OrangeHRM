import { Locator, Page } from "@playwright/test";

export class DashboardPage{

    readonly page: Page;
    readonly dashboardTitleText: Locator;

    readonly quickLaunchItems: Locator;
    readonly quickLaunchLinks: Locator;

    constructor(page: Page){
        this.page = page;
        this.dashboardTitleText = page.getByRole('heading', { name: 'Dashboard' });

        this.quickLaunchItems = page.locator('.orangehrm-quick-launch-heading');
        this.quickLaunchLinks = page.locator('.oxd-grid-item');
    }


/**
 * Gets the list of all Quick Launch item names (e.g., "Assign Leave", "Timesheets")
 */
async getQuickLaunchItemNames(): Promise<string[]> {
    // Wait for the widgets to load first so we don't get an empty list
    await this.quickLaunchItems.first().waitFor();
    return await this.quickLaunchItems.allInnerTexts();
}

/**
 * Clicks a specific Quick Launch item by its name
 */
// async clickQuickLaunchItem(name: string) {
//     // Clicks the specific card/link containing the text
//     await this.page.getByRole('button', { name: name, exact: true }).click();
// }
// async clickQuickLaunchItem(name: string) {
//   const item = this.quickLaunchItems.filter({ hasText: name }).first();
//   //await expect(item).toBeVisible();
//   await item.click(); 
// }
// async clickQuickLaunchItem(name: string) {
//   // Finds a button with the specific accessible name (provided by the title attribute)
//   const item = this.quickLaunchItems.getByRole('button', { name: name }).first();
//   await item.click();
// }
// async clickQuickLaunchItem(name: string) {
//   // Uses a CSS attribute selector to find the button by its title attribute
//   const item = this.quickLaunchItems.locator(`button[title="${name}"]`).first();
  
//   // await expect(item).toBeVisible();
//   await item.click();
// }
// async clickQuickLaunchItem(itemName: string) {
//         // 1. Find the card that contains the specific text (e.g. "Assign Leave")
//         const item = this.quickLaunchItems.filter({ hasText: itemName });

//         // 2. Inside that card, find the Icon (svg) and click it
//         // We assume the icon is an SVG or has the class .oxd-icon
//         await item.locator('svg').first().click();
//     }
/**
     * Click item by name using Strict Filtering
     */
    // async clickQuickLaunchItem(itemName: string) {
    //     // 1. Find the card by filtering for the EXACT text. 
    //     // 'exact: true' prevents "Leave" from matching "Assign Leave" loosely.
    //     const card = this.quickLaunchLinks.filter({
    //         has: this.page.getByText(itemName, { exact: true }) 
    //     });

    //     // 2. Click the icon inside that specific card
    //     await card.locator('svg').first().click();
    // }
//     async clickQuickLaunchItem(itemName: string) {
//     // REQUIRED: Use strict mode (exact: true) so "Leave List" doesn't match "Assign Leave"
//     const card = this.quickLaunchLinks.filter({
//         has: this.page.getByText(itemName, { exact: true }) 
//     });

//     await card.locator('svg').first().click();
// }

async clickQuickLaunchItemByIndex(index: number) {
        // This is 100% precise. If index is 1, it clicks the second box.
        // It completely ignores the text, so no "Assign Leave" confusion.
        // await this.quickLaunchLinks.nth(index).locator('svg').click();
        //await this.quickLaunchLinks.locator("//*[name()='svg' and @class='oxd-icon']").nth(index).click();
        await this.quickLaunchLinks.locator('svg').nth(index).click();
    }

async clickQuickLaunchItem(itemName: string) {
        
        // Step 1: Find the specific Card that contains the EXACT text name
        // We use 'exact: true' so "Leave" doesn't match "Assign Leave"
        const specificCard = this.quickLaunchLinks.filter({ 
            has: this.page.getByText(itemName, { exact: true }) 
        });

        // Step 2: Inside that card, find the Icon (SVG) and click IT.
        // This ensures we do NOT click the text.
        await specificCard.locator('svg').first().click();
    }


/**
 * EXTRACTS the 'href' (URL) from each Quick Launch button   // API Check for link
 */
    async getQuickLaunchHrefs(): Promise<string[]> {
        // Wait for items to be visible
        await this.quickLaunchLinks.first().waitFor();
        
        // Extract hrefs
        const urls = await this.quickLaunchLinks.evaluateAll(links => 
            links.map(link => (link as HTMLAnchorElement).href)
        );

        // Filter out any 'null', 'undefined', or empty strings
        // This ensures we only send valid, real links to the test and throw away any "empty" buttons.
        return urls.filter(url => url && url.trim().length > 0);
    }

}