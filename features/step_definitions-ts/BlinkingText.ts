import { expect, Locator } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";

Given('a login to practice site with {string} and {string}', async function (userName: string, password: string): Promise<void> {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username: Locator = this.page.locator('#username');
    const pw: Locator = this.page.locator("[type='password']");
    await username.fill(userName);
    await pw.fill(password);

    await this.page.locator(".radiotextsty").last().click();
    await this.page.locator("#okayBtn").click();
});

When('uncheck terms', async function (): Promise<void> {
    await this.page.locator("#terms").uncheck();
});

Then('check blinking of the text', async function (): Promise<void> {
    await expect(this.page.locator("[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");
});