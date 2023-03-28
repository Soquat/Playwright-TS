"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.Given)('a login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});
(0, cucumber_1.When)('Add {string} to cart', async function (productName) {
    const dashBoardPage = this.poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
});
(0, cucumber_1.Then)('Verify {string} is displayed in the cart', async function (productName) {
    await this.page.locator("div li").first().waitFor();
    const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    (0, test_1.expect)(bool).toBeTruthy();
});
(0, cucumber_1.Given)('a login to Ecommerce2 app with {string} and {string}', async function (userName, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameField = this.page.locator('#username');
    const pw = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
    await usernameField.type(userName);
    await pw.type(password);
    await signIn.click();
});
(0, cucumber_1.Then)('Verify Error message is displayed', async function () {
    await (0, test_1.expect)(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
