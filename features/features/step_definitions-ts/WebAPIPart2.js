"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
let webContext;
(0, cucumber_1.Given)('I am on the login page', async function () {
    this.browser = await test_1.chromium.launch();
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    await this.page.goto('https://rahulshettyacademy.com/client');
});
(0, cucumber_1.When)('I fill in my email and password', async function () {
    await this.page.locator('#userEmail').fill('anshika@gmail.com');
    await this.page.locator('#userPassword').type('Iamking@000');
    await this.page.locator("[value='Login']").click();
    await this.page.waitForLoadState('networkidle');
    await this.page.context().storageState({ path: 'state.json' });
    webContext = await this.browser.newContext({ storageState: 'state.json' });
});
(0, cucumber_1.Then)('I should be logged in successfully', async function () {
    const isLoggedIn = await this.page.url().includes('dashboard');
    await (0, test_1.expect)(isLoggedIn).toBeTruthy();
});
(0, cucumber_1.When)('I fill in {string} and {string}', async function (email, password) {
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#userPassword').type(password);
    await this.page.locator("[value='Login']").click();
    await this.page.waitForLoadState('networkidle');
});
(0, cucumber_1.Then)('I should see an error message', async function () {
    const isLoggedIn = await this.page.url().includes('dashboard');
    await (0, test_1.expect)(isLoggedIn).toBeFalsy();
});
