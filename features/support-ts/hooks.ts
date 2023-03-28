
import { POManager } from "../../pageObjects/POManager";
import { Before, After, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";


Before(async function () {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After({ tags: "@Regression" }, function () {
    console.log("I am last to execute");
});

BeforeStep(function () {
    console.log("Next step");
});

AfterStep(async function ({ result }) {
    console.log(result);
});