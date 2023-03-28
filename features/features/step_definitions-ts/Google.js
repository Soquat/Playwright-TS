"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const cucumber_1 = require("@cucumber/cucumber");
(0, cucumber_1.When)('Goto google.com', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://www.google.com/");
});
(0, cucumber_1.Then)('Title is {string}', async function (title) {
    await (0, test_1.expect)(this.page).toHaveTitle(title);
});
