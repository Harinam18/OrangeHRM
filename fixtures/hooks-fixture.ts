import { test as baseTest } from './common-fixture';

type HooksFixtureType = {
    gotoUrl: void;
    logout: void;
}

export const test = baseTest.extend<HooksFixtureType>({
    gotoUrl: async ({ loginPage }, use) => {
        await loginPage.gotoOrangeHrm();
        await use();
    },
    logout: async ({ userPage }, use) => {
        await use();
        await userPage.logout();
    }
})

export {expect} from '@playwright/test'      // timestamp: 04:06:00