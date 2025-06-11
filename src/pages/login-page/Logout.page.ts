import { Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";

class LogoutPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private Elements = {
        toggleUser: { selector: '//div[@ng-click="toggleUserDetails()"]', name: 'toggle User Details' },
        logoutButton: { selector: '//li[text()="Logout"]', name: 'Logout Button' },
        loginButton: { selector: '#loginFormSubmit', name: 'Login Button' }
    };

    public async logout(): Promise<void> {
        const toggleUserBtn = this.actions.getLocator(this.Elements.toggleUser.selector);
        await this.actions.click(toggleUserBtn, this.Elements.toggleUser.name);
        const logoutBtn = this.actions.getLocator(this.Elements.logoutButton.selector);
        await this.actions.click(logoutBtn, this.Elements.logoutButton.name);
        await this.actions.waitForElementToBeVisible(this.actions.getLocator(this.Elements.loginButton.selector), this.Elements.loginButton.name);
    }
}

export const logoutPage = new LogoutPage();
