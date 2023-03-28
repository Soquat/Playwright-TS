import { Given, When, Then } from '@cucumber/cucumber';
import { expect, chromium, BrowserContext } from '@playwright/test';

let webContext: BrowserContext;

Given('I am on the login page', async function (): Promise<void> {
    this.browser = await chromium.launch();
    const context: BrowserContext = await this.browser.newContext();
    this.page = await context.newPage();
    await this.page.goto('https://rahulshettyacademy.com/client');
});

When('I fill in my email and password', async function (): Promise<void> {
    await this.page.locator('#userEmail').fill('anshika@gmail.com');
    await this.page.locator('#userPassword').type('Iamking@000');
    await this.page.locator("[value='Login']").click();
    await this.page.waitForLoadState('networkidle');
    await this.page.context().storageState({ path: 'state.json' });
    webContext = await this.browser.newContext({ storageState: 'state.json' });
});


Then('I should be logged in successfully', async function (): Promise<void> {
    const isLoggedIn: boolean = await this.page.url().includes('dashboard');
    await expect(isLoggedIn).toBeTruthy();
});

When('I fill in {string} and {string}', async function (email: string, password: string): Promise<void> {
    await this.page.locator('#userEmail').fill(email);
    await this.page.locator('#userPassword').type(password);
    await this.page.locator("[value='Login']").click();
    await this.page.waitForLoadState('networkidle');
});

Then('I should see an error message', async function (): Promise<void> {
    const isLoggedIn: boolean = await this.page.url().includes('dashboard');
    await expect(isLoggedIn).toBeFalsy();
});


