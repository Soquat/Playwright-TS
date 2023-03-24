import { Locator, Page } from "@playwright/test";

export class DashBoardPage {
    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;


    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName: string): Promise<void> {
        const titles: string[] = await this.productsText.allTextContents();
        console.log(titles);
        const count: number = await this.products.count();

        for (let i: number = 0; i < count; i++) {
            let text: string | null = await this.products.nth(i).locator("b").textContent();
            if (text === productName) {
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(): Promise<void> {
        await this.cart.click();
    }
}