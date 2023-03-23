import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import customtest from '../utils/test-base';
import dataImport from '../utils/placeorderTestData.json';
import { LoginPage } from '../pageObjects/LoginPage';
import { DashBoardPage } from '../pageObjects/DashBoardPage';



const dataSet = JSON.parse(JSON.stringify(dataImport));

for (const data of dataSet) {
    test(`@Web Login test with ${data.productName}`, async ({ page }) => {

        const poManager: POManager = new POManager(page);
        const loginPage: LoginPage = poManager.getLoginPage();
        const products = page.locator(".card-body");
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        const dashBoardPage: DashBoardPage = poManager.getDashboarPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();


    });
}

customtest(` Client App login`, async ({ page, testDataForOrder }) => {

    const poManager: POManager = new POManager(page);
    const loginPage: LoginPage = poManager.getLoginPage();
    const products = page.locator(".card-body");
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);

    const dashBoardPage: DashBoardPage = poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
    await dashBoardPage.navigateToCart();

});
