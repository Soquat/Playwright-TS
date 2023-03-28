import { Given, When, Then } from '@cucumber/cucumber';
import { APIUtils } from '../../utils/APIUtils';
import { ILoginPayload } from '../../utils/interfaces/ILoginPayload';
import { IOrderPayload } from '../../utils/interfaces/IOrderPayload';
import { IOrderResponse } from '../../utils/interfaces/IOrderResponse';
import { expect, request } from '@playwright/test';



Given('I am logged in as {string} with password {string}', async function (email, password) {
    const loginPayload: ILoginPayload = { userEmail: email, userPassword: password };
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const response: IOrderResponse = await apiUtils.createOrder({ orders: [] });
    this.token = response.token;
});

When('Setting token credentials', async function () {
    this.page = await this.poManager.getPage();
    this.page.addInitScript((value: string) => {
        window.localStorage.setItem("token", value);
    }, this.token);
    await this.page.goto("https://rahulshettyacademy.com/client");

});

Then('I should see {string} on the dashboard page', async function (expectedText) {
    await expect(this.page.locator("div[class='left mt-1'] h3")).toHaveText(expectedText);
});



