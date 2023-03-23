import { Page } from "@playwright/test";

export class DashBoardPage {
    page;
    products;
    productsText;
    cart;
    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string) {
        const titles = this.productsText.allTextContents();
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
}
