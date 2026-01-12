// import { test as baseTest } from './pom-fixture'
// import CommonUtils from '../utils/CommonUtils'


// type CommonFixtureType = {
//     commonUtils: CommonUtils
// }

// export const test = baseTest.extend<CommonFixtureType>({
//     commonUtils: async ({ }, use) => {
//         await use(new CommonUtils())
//     }
// })


import { test as baseTest } from './pom-fixture'
import CommonUtils from '../utils/CommonUtils'
import CommonApiUtils from '../utils/CommonApiUtils'

type CommonFixtureType = {
    commonUtils: CommonUtils,
    commonApiUtils: CommonApiUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils: async ({ }, use) => {
        await use(new CommonUtils())
    },
    commonApiUtils: async ({ request }, use) => {
        await use(new CommonApiUtils(request))
    }
})