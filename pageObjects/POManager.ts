import { Page } from "@playwright/test";
import { DashBoardPage } from "./DashBoardPage";
import { LoginPage } from "./LoginPage";

export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
    }


    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getDashboarPage(): DashBoardPage {
        return this.dashboardPage;
    }
}
