import { APIRequestContext } from "@playwright/test";
import { ILoginPayload } from "./interfaces/ILoginPayload";
import { IOrderPayload } from "./interfaces/IOrderPayload";
import { IOrderResponse } from "./interfaces/IOrderResponse";

export class APIUtils {

    apiContext: APIRequestContext;
    loginPayload: ILoginPayload;

    constructor(apiContext: APIRequestContext, loginPayload: ILoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayload: IOrderPayload) {
        let response: IOrderResponse = {
            token: "",
            orderId: ""
        };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': "application/json"
            }
        });
        console.log(orderResponse);
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}
