import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import customtest from '../utils/test-base';
import dataImport from '../utils/placeorderTestData.json';
import { LoginPage } from '../pageObjects/LoginPage';
import { DashBoardPage } from '../pageObjects/DashBoardPage';
import { ITestDataSet } from '../utils/interfaces/ITestDataSet';

const dataSet: ITestDataSet[] = JSON.parse(JSON.stringify(dataImport));

for (const data of dataSet) {
    test(`@Web Login test with ${data.productName}`, async ({ page }): Promise<void> => {

        const poManager: POManager = new POManager(page);
        const loginPage: LoginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        const dashBoardPage: DashBoardPage = poManager.getDashboarPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        expect(await page.locator("div[class='left mt-1'] h3")).toHaveText("Automation");
    });
}

customtest(` Check H3 equals Automation`, async ({ page, testDataForOrder }): Promise<void> => {
    const poManager: POManager = new POManager(page);
    const loginPage: LoginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);
    const dashboardPage: DashBoardPage = poManager.getDashboarPage();
    await expect(await dashboardPage.getHeaderText()).toEqual("Automation");
});
