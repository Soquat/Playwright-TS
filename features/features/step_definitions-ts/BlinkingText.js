"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.Given)('a login to practice site with {string} and {string}', async function (userName, password) {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = this.page.locator('#username');
    const pw = this.page.locator("[type='password']");
    await username.fill(userName);
    await pw.fill(password);
    await this.page.locator(".radiotextsty").last().click();
    await this.page.locator("#okayBtn").click();
});
(0, cucumber_1.When)('uncheck terms', async function () {
    await this.page.locator("#terms").uncheck();
});
(0, cucumber_1.Then)('check blinking of the text', async function () {
    await (0, test_1.expect)(this.page.locator("[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");
});
