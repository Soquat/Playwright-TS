import { test, expect, request, APIRequestContext } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { IOrderResponse } from "../utils/interfaces/IOrderResponse";
import { ILoginPayload } from "../utils/interfaces/ILoginPayload";
import { IOrderPayload } from "../utils/interfaces/IOrderPayload";

const orderPayload: IOrderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload: ILoginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const fakePayLoadOrders: Object = { data: [], message: "No Orders" };
let response: IOrderResponse;

test.beforeAll(async () => {
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('Login test', async ({ page }): Promise<void> => {
    await page.addInitScript((token: string) => {
        localStorage.setItem('token', token);
    }, response.token as string);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async (route, request) => {
            const response = await route.request().response();

            let body: string = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body,
            });
        }
    );

    await page.locator('button[routerlink*="myorders"]').click();
    expect(await page.locator('.mt-4').textContent()).toContain("Loading...");
});
