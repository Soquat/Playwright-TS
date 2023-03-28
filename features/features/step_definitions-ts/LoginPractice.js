"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.Given)('a login to practice site', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});
(0, cucumber_1.When)('I enter username with {string} and {string}', async function (userName, password) {
    const username = this.page.locator('#username');
    const pw = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");
    await username.type(userName);
    await pw.type(password);
    await signIn.click();
});
(0, cucumber_1.Then)('I should see error message {string}', async function (invalidMessage) {
    const errorMessage = await this.page.locator("[style*='block']").textContent();
    await (0, test_1.expect)(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
