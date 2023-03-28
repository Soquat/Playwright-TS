"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.When)('goto automation practice site', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
});
(0, cucumber_1.Then)('Displayed text should be visible', async function () {
    await (0, test_1.expect)(this.page.locator("#displayed-text")).toBeVisible();
});
(0, cucumber_1.When)('goto automation practice site and click textbox', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await (0, test_1.expect)(this.page.locator("#displayed-text")).toBeVisible();
    let textbox = await this.page.locator("#hide-textbox");
    await textbox.click();
});
(0, cucumber_1.Then)('Displayed text should be invisible', async function () {
    await (0, test_1.expect)(this.page.locator("#displayed-text")).toBeHidden();
});
