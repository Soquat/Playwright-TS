
import { test, expect, request, BrowserContext, Page, Locator } from "@playwright/test";
let webContext: BrowserContext;


test.beforeAll(async ({ browser }): Promise<void> => {
    const email: string = "anshika@gmail.com";
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});


test('Login test', async (): Promise<void> => {
    const productName: string = "zara coat 3";
    const email: string = "anshika@gmail.com";


    const page: Page = await webContext.newPage();
    const products: Locator = page.locator(".card-body");


    await page.goto("https://rahulshettyacademy.com/client");

    const titles: string[] = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count: number = await products.count();

    for (let i = 0; i < count; i++) {
        let text: string | null = await products.nth(i).locator("b").textContent();
        if (text === productName) {
            await products.nth(i).locator("text=Add To Cart").click();
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool: boolean = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder='Select Country']").type("ind", { delay: 100 });
    const dropdown: Locator = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount: number = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
        let text: string | null = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name .input[type='text']")).toHaveValue(email);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId: string | null = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

});