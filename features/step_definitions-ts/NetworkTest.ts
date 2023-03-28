import { Given, When, Then } from '@cucumber/cucumber';
import { test, expect, request, APIRequestContext } from "@playwright/test";
import { APIUtils } from "../../utils/APIUtils";
import { IOrderResponse } from "../../utils/interfaces/IOrderResponse";
import { ILoginPayload } from "../../utils/interfaces/ILoginPayload";
import { IOrderPayload } from "../../utils/interfaces/IOrderPayload";

const orderPayload: IOrderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload: ILoginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders: Object = { data: [], message: "No Orders" };
let response: IOrderResponse;

Given('I am logged in and go to orders page with fake response', async function (): Promise<void> {
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    this.page = await this.poManager.getPage();
    await this.page.addInitScript((token: string) => {
        localStorage.setItem('token', token);
    }, response.token as string);

    await this.page.goto('https://rahulshettyacademy.com/client');

    await this.page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async (route: any, request: Request) => {
            const response = await route.request().response();

            let body: string = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body,
            });
        }
    );


});

When('I view my orders', async function (): Promise<void> {
    await this.page.locator('button[routerlink*="myorders"]').click();
});

Then('I should see loading message', async function (): Promise<void> {
    expect(await this.page.locator('.mt-4').textContent()).toContain("Loading...");
});