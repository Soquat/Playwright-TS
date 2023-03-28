import { expect } from "@playwright/test";
import { When, Then } from "@cucumber/cucumber";


When('Goto google.com {string}', async function (googleURL: string): Promise<void> {
    this.page = await this.poManager.getPage();
    await this.page.goto(googleURL);
});

Then('Title is {string}', async function (title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
});