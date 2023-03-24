import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getTextContent(locator: Locator): Promise<string | null> {
        return await locator.textContent();
    }
}