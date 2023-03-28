"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const APIUtils_1 = require("../../utils/APIUtils");
const orderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;
(0, cucumber_1.Given)('I am logged in and go to orders page with fake response', async function () {
    const apiContext = await test_1.request.newContext();
    const apiUtils = new APIUtils_1.APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    this.page = await this.poManager.getPage();
    await this.page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, response.token);
    await this.page.goto('https://rahulshettyacademy.com/client');
    await this.page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca', async (route, request) => {
        const response = await route.request().response();
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body,
        });
    });
});
(0, cucumber_1.When)('I view my orders', async function () {
    await this.page.locator('button[routerlink*="myorders"]').click();
});
(0, cucumber_1.Then)('I should see loading message', async function () {
    (0, test_1.expect)(await this.page.locator('.mt-4').textContent()).toContain("Loading...");
});
