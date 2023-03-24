import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { ILoginPayload } from "../utils/interfaces/ILoginPayload";
import { IOrderPayload } from "../utils/interfaces/IOrderPayload";
import { IFakePayloadOrders } from "../utils/interfaces/IFakePayloadOrders";
import { ITokenResponse } from "../utils/interfaces/ITokenResponse";

const orderPayload: IOrderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload: ILoginPayload = { userEmail: "rahulshetty@gmail.com", userPassword: "Iamking@00" };
const fakePayLoadOrders: IFakePayloadOrders = { data: [], message: "No Orders" };
let response: ITokenResponse;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('Login test', async ({ page }): Promise<void> => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");


    await page.locator("button[routerlink*='myorders']").click();


    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64184458568c3e9fb13763fa", async (route) => {
        await route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64185b19568c3e9fb13782be"
        });
    });
    await page.locator("button:has-text('View')").first().click();
});