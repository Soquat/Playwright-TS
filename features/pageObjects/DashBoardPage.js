"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardPage = void 0;
const BasePage_1 = require("./BasePage");
class DashBoardPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
        this.headerTextLocator = this.page.locator("div[class='left mt-1'] h3");
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }
    async searchProductAddCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            let text = await this.products.nth(i).locator("b").textContent();
            if (text === productName) {
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }
    async navigateToCart() {
        await this.cart.click();
    }
    async getHeaderText() {
        return await this.getTextContent(this.headerTextLocator);
    }
}
exports.DashBoardPage = DashBoardPage;
