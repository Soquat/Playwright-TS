import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashBoardPage extends BasePage {
    products: Locator;
    productsText: Locator;
    cart: Locator;
    private readonly headerTextLocator: Locator = this.page.locator("div[class='left mt-1'] h3");

    constructor(page: Page) {
        super(page);
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

    async getHeaderText(): Promise<string | null> {
        return await this.getTextContent(this.headerTextLocator);
    }
}