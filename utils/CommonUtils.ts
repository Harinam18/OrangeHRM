import cryptoJs from 'crypto-js';
import fs from 'fs';
import path from 'path';
import { TestInfo } from '@playwright/test';

export default class CommonUtils {

    private secretKey: string;

    /**
     * Initilizing secretKey
     */
    constructor() {
        //this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";

        if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY;
        } else {
            throw new Error("Please provide Secret Key while starting execution.")
        }
    }

    /**
     * Provide Encrypted Data from String
     * @param data 
     * @returns encryptedData
     */
    public encryptData(data: string) {
        const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        console.log(encryptedData);
        return encryptedData;
    }

    /**
     * Provide Decrypted data in string format
     * @param encData 
     * @returns decryptedData
     */
    public decryptData(encData : string){
        const decryptedData = cryptoJs.AES.decrypt(encData, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptedData;
    }


          /**
   * Add Allure metadata dynamically for a test
   * @param testInfo Playwright TestInfo object
   * @param featureName Feature name (module)
   * @param storyName Story name (sub-module or scenario)
   */
//   addAllureMetadata(testInfo: TestInfo, featureName: string, storyName: string) {
//     testInfo.annotations.push({ type: 'feature', description: featureName });
//     testInfo.annotations.push({ type: 'story', description: storyName });
//     testInfo.annotations.push({ type: 'owner', description: process.env.USER || process.env.USERNAME || 'Unknown' });
//     testInfo.annotations.push({ type: 'environment', description: process.env.ENV_NAME || 'QA' });
//     testInfo.annotations.push({ type: 'browser', description: testInfo.project.name });
//     testInfo.annotations.push({ type: 'os', description: process.platform });
//   }

 /**
     * Generate allure environment.properties globally
     * Call this once at the start of your test run (e.g., in globalSetup or beforeAll)
     */
    generateAllureEnvironment(testInfo: TestInfo) {
    const resultsPath = path.resolve('allure-results');

    if (!fs.existsSync(resultsPath)) {
        fs.mkdirSync(resultsPath, { recursive: true });
    }

    const envProps = [
        `Environment=${process.env.ENV_NAME || 'QA'}`,
        `User=${process.env.USER || 'Admin'}`,
        `OS=${process.platform}`,
    ].join('\n');

    const filePath = path.join(resultsPath, 'environment.properties');

    fs.writeFileSync(filePath, envProps, { encoding: 'utf-8' });

    console.log('Allure environment.properties generated');
}

}




