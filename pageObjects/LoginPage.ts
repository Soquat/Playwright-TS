import { Page, Locator } from "@playwright/test";

export class LoginPage {
    page: Page;
    signInButton: Locator;
    userNameInput: Locator;
    passwordInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userNameInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");

    }

    async goTo(): Promise<void> {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userName: string, password: string): Promise<void> {
        await this.userNameInput.fill(userName);
        await this.passwordInput.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
