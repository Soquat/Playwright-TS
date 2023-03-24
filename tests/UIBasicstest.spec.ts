import { test, expect, BrowserContext, Page, Locator } from '@playwright/test';

test('Page Playwright test', async ({ page }): Promise<void> => {
    await page.goto("https://google.com");
    const title: string = await page.title();
    await expect(page).toHaveTitle("Google");

});

test('Browser Content Playwright test', async ({ browser }): Promise<void> => {
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const title: string = await page.title();
    const cardTitles: Locator = await page.locator(".card-body a");
    console.log(title);
    //selectors
    const username: Locator = page.locator('#username');
    const pw: Locator = page.locator("[type='password']");
    const signIn: Locator = page.locator("#signInBtn");
    await username.type("Michael");
    await pw.type("test");
    await signIn.click();
    const errorMessage: string | null = await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});



test('UI Controls', async ({ page }): Promise<void> => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username: Locator = page.locator('#username');
    const pw: Locator = page.locator("[type='password']");
    await username.fill("rahulshettyacademy");
    await pw.fill("learning");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(page.locator("[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");
});

test('Child windows', async ({ browser }): Promise<void> => {

    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");

    //destructering important here because newPage is of type Page, void! The click function returns a void which is useless!
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const text: string | null = await newPage.locator(".red").textContent();
    if (text !== null) {
        const array: Array<string> = text.split("@");
        const domain: string = array[1].split(" ")[0];
        console.log(domain);
        const username: Locator = page.locator('#username');

        await username.type(domain);
        expect(await username.inputValue()).toBe(domain);
    }
});
