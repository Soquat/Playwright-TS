import { expect, Locator } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";

Given('a login to practice site', async function (): Promise<void> {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

When('I enter username with {string} and {string}', async function (userName: string, password: string): Promise<void> {
    const username: Locator = this.page.locator('#username');
    const pw: Locator = this.page.locator("[type='password']");
    const signIn: Locator = this.page.locator("#signInBtn");
    await username.type(userName);
    await pw.type(password);
    await signIn.click();
});

Then('I should see error message {string}', async function (invalidMessage: string): Promise<void> {
    await expect(this.page.locator("[style*='block']")).toContainText(invalidMessage);
});