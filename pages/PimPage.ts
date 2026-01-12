 import { Locator, Page, expect } from "@playwright/test";

export class PimPage{
    readonly page: Page;
    readonly addPimButton: Locator;
    readonly firstNameTextBox: Locator;
    readonly middleNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly employeeIdTextBox: Locator;
    readonly saveButton: Locator;
    readonly newEmployeeNameHeading : Locator;
    
    // pagination locators
    readonly employeeListRows: Locator;
    readonly paginationNextButton: Locator;

    // delete
    readonly deleteSelectedButton: Locator;
    readonly confirmDeleteButton: Locator; // Pop-up locator

    // cancel
    readonly cancelButton: Locator; // Pop-up "No, Cancel" button


    constructor(page: Page){
        this.page = page;
        this.addPimButton = page.getByRole('button', { name: '  Add ' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.newEmployeeNameHeading = page.locator('.orangehrm-edit-employee-name');

        // pagination
        this.paginationNextButton = page.locator('.oxd-pagination-page-item--page').last();
        this.employeeListRows = page.locator('.oxd-table-card');

        // delete
        this.deleteSelectedButton = page.getByRole('button', { name: ' Delete Selected ' });
        this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete ' });

        // cancel
        this.cancelButton = page.getByRole('button', { name: ' No, Cancel ' });

        //------------------------------------------------
        this.addPimButton =  page.getByRole('link', { name: 'Add Employee' });
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First Name' });
        this.middleNameTextBox = page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last Name' });

        // Target the Employee Id field specifically
        this.employeeIdTextBox = page.locator('div').filter({ hasText: /^Employee Id$/ }).locator('input'); 
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }
    
    /**
     * To add a new employee in PIM module
     * @param firstName 
     * @param middleName 
     * @param lastName 
     */
    async addEmployee(firstName: string, middleName:string, lastName:string, empId: string){
        await this.addPimButton.waitFor({ state: 'visible' });
        await this.addPimButton.click();
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);

        // Clear default ID and fill custom ID
        await this.employeeIdTextBox.fill(''); 
        await this.employeeIdTextBox.fill(empId);
        await this.saveButton.click();
    }

    async navigateToNextPage() {
        if (await this.paginationNextButton.isVisible()) {
            await this.paginationNextButton.click();
            await this.page.waitForLoadState('networkidle');
        }
    }
 


    async deleteEmployeesByIds(ids: string | string[]) {
       const idArray = Array.isArray(ids) ? ids : [ids];

       for (const id of idArray) {
        // Locate the row specifically containing the ID
        const row = this.employeeListRows.filter({ hasText: new RegExp(id, 'i')});
        const rowDeleteIcon = row.locator('.oxd-icon').last();
        await rowDeleteIcon.click();
        await this.confirmDeleteButton.waitFor({ state: 'visible' });
        await this.confirmDeleteButton.click();
       }
    }


    /**
     * Verifies that a specific ID does not exist in any row of the current table
     * @param id The Employee ID to check
     */
    async verifyIdNotPresent(id: string) {
        await this.page.waitForLoadState('networkidle');
        const rows = await this.employeeListRows.all();
        for (const row of rows) {
            await expect(row).not.toContainText(id);
        }
    }



    /**
     * Negative Scenario: Selects an employee, clicks delete, but then cancels the action.
     * @param id The Employee ID to target
     */
    async cancelDeletionById(id: string) {
        const row = this.employeeListRows.filter({ hasText: new RegExp(id, 'i') });
        const rowDeleteIcon = row.locator('.oxd-table-cell-actions .oxd-icon').last();
        await rowDeleteIcon.click();
        await this.cancelButton.waitFor({ state: 'visible' });
        await this.cancelButton.click();    
    }






























    
//---------------------------------------------


//     async deleteEmployeesByIds(ids: string | string[]) {
//     const idArray = Array.isArray(ids) ? ids : [ids];

//     for (const id of idArray) {
//         // 1. Search for the specific ID to handle pagination
//         await this.page.locator('form').getByRole('textbox').last().fill(id); 
//         await this.page.getByRole('button', { name: 'Search' }).click();
//         await this.page.waitForLoadState('networkidle');

//         // 2. Locate the row (now it will be on page 1 if it exists)
//         const row = this.employeeListRows.filter({ hasText: new RegExp(id, 'i') });
        
//         if (await row.count() > 0) {
//             const rowDeleteIcon = row.locator('.oxd-icon').last();
//             await rowDeleteIcon.click();
//             await this.confirmDeleteButton.waitFor({ state: 'visible' });
//             await this.confirmDeleteButton.click();
            
//             // 3. Clear the search to reset the list for the next ID
//             await this.page.getByRole('button', { name: 'Reset' }).click();
//         }
//     }
// }



// async deleteEmployeesByIds(ids: string | string[]) {
//     const idArray = Array.isArray(ids) ? ids : [ids];

//     for (const id of idArray) {
//         // 1. Search for the specific ID so it appears on the current page
//         // Note: Update the placeholder or label to match OrangeHRM's actual 'Employee Id' field
//         await this.page.getByRole('textbox').nth(2).fill(id); 
//         await this.page.getByRole('button', { name: 'Search' }).click();
//         await this.page.waitForLoadState('networkidle');

//         // 2. Locate the row
//         const row = this.employeeListRows.filter({ hasText: new RegExp(id, 'i') });
        
//         // 3. Delete only if it exists
//         if (await row.count() > 0) {
//             const rowDeleteIcon = row.locator('.oxd-icon').last();
//             await rowDeleteIcon.click();
//             await this.confirmDeleteButton.click();
            
//             // Wait for the success message to disappear before next search
//             await this.page.getByText('Successfully Deleted').waitFor({ state: 'hidden' });
//         }

//         // 4. Reset the search to clear the text box for the next loop
//         await this.page.getByRole('button', { name: 'Reset' }).click();
//         await this.page.waitForLoadState('networkidle');
//     }
// }




}









