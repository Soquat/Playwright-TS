import { expect, Locator } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../../pageObjects/LoginPage";
import { DashBoardPage } from "../../pageObjects/DashBoardPage";

Given('a login to Ecommerce app with {string} and {string}', { timeout: 100 * 1000 }, async function
    (username: string, password: string): Promise<void> {

    const loginPage: LoginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName: string): Promise<void> {
    const dashBoardPage: DashBoardPage = this.poManager.getDashboarPage();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName: string): Promise<void> {
    await this.page.locator("div li").first().waitFor();
    const bool: boolean = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();
});



Given('a login to Ecommerce2 app with {string} and {string}', async function (userName: string, password: string): Promise<void> {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameField: Locator = this.page.locator('#username');
    const pw: Locator = this.page.locator("[type='password']");
    const signIn: Locator = this.page.locator("#signInBtn");
    await usernameField.type(userName);
    await pw.type(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function (): Promise<void> {
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});