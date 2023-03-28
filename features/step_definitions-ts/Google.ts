import { POManager } from "../../pageObjects/POManager";
import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";


When('Goto google.com', async function () {
    this.page = await this.poManager.getPage();
    await this.page.goto("https://www.google.com/");
});

Then('Title is {string}', async function (title) {
    await expect(this.page).toHaveTitle(title);
});