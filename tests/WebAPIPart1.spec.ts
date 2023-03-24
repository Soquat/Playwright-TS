import { test, expect, request, APIRequestContext, Locator } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { ILoginPayload } from "../utils/interfaces/ILoginPayload";
import { IOrderPayload } from "../utils/interfaces/IOrderPayload";
import { IOrderResponse } from "../utils/interfaces/IOrderResponse";

const orderPayload: IOrderPayload = {
    orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }]
};
const loginPayload: ILoginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
let response: IOrderResponse;

test.beforeAll(async () => {
    const apiContext: APIRequestContext = await request.newContext();
    const apiUtils: APIUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});


test('Login test', async ({ page }): Promise<void> => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.locator("div[class='left mt-1'] h3")).toHaveText("Automation");
});