"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Displayed text visible', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeVisible();
});
(0, test_1.test)("Displayed text invisable", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeVisible();
    let textbox = await page.locator("#hide-textbox");
    await textbox.click();
    await textbox.screenshot({ path: "screenshot.png" });
    await (0, test_1.expect)(page.locator("#displayed-text")).toBeHidden();
});
