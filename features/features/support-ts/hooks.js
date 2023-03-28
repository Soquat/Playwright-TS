"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POManager_1 = require("../../pageObjects/POManager");
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
(0, cucumber_1.Before)(async function () {
    const browser = await test_1.chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager_1.POManager(this.page);
});
(0, cucumber_1.After)({ tags: "@Regression" }, function () {
    console.log("I am last to execute");
});
(0, cucumber_1.BeforeStep)(function () {
    console.log("Next step");
});
(0, cucumber_1.AfterStep)(async function ({ result }) {
    console.log(result);
});
