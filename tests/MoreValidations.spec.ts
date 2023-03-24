import { test, expect, Locator } from '@playwright/test';

test('Displayed text visible', async ({ page }): Promise<void> => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
});

test("Displayed text invisable", async ({ page }): Promise<void> => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    let textbox: Locator = await page.locator("#hide-textbox");
    await textbox.click();
    await textbox.screenshot({ path: "screenshot.png" });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

