"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
class BasePage {
    constructor(page) {
        this.page = page;
    }
    async getTextContent(locator) {
        return await locator.textContent();
    }
}
exports.BasePage = BasePage;
