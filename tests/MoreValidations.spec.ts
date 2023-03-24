import { test, expect, Locator } from '@playwright/test';

test('Popup validations', async ({ page }): Promise<void> => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    await page.frameLocator("#courses-iframe");
});

test("screenshot and visuel comparision", async ({ page }): Promise<void> => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    let textbox: Locator = await page.locator("#hide-textbox");
    await textbox.click();
    await textbox.screenshot({ path: "screenshot.png" });
    await expect(page.locator("#displayed-text")).toBeHidden();
});

