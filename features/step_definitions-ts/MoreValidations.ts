import { expect, Locator } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";



When('goto automation practice site', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");

});

Then('Displayed text should be visible', async function () {
    await expect(this.page.locator("#displayed-text")).toBeVisible();
});

When('goto automation practice site and click textbox', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(this.page.locator("#displayed-text")).toBeVisible();
    let textbox: Locator = await this.page.locator("#hide-textbox");
    await textbox.click();
    //await textbox.screenshot({ path: "screenshot.png" });

});

Then('Displayed text should be invisible', async function () {
    await expect(this.page.locator("#displayed-text")).toBeHidden();
});
