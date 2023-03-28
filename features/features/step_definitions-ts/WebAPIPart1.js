"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const APIUtils_1 = require("../../utils/APIUtils");
const test_1 = require("@playwright/test");
(0, cucumber_1.Given)('I am logged in as {string} with password {string}', async function (email, password) {
    const loginPayload = { userEmail: email, userPassword: password };
    const apiContext = await test_1.request.newContext();
    const apiUtils = new APIUtils_1.APIUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder({ orders: [] });
    this.token = response.token;
});
(0, cucumber_1.When)('Setting token credentials', async function () {
    this.page = await this.poManager.getPage();
    this.page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
    }, this.token);
    await this.page.goto("https://rahulshettyacademy.com/client");
});
(0, cucumber_1.Then)('I should see {string} on the dashboard page', async function (expectedText) {
    await (0, test_1.expect)(this.page.locator("div[class='left mt-1'] h3")).toHaveText(expectedText);
});
