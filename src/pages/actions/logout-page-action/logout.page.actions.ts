import { Page } from '@playwright/test';
import * as fs from 'fs';
import { resolve } from 'path';
import { getPage } from '../../../base/base';
import { WebActions } from '../../../base/web.action.util';
import { LogoutPageLocators } from '../../locators/logout-page-locator/logout.page.locators';
import { LoginPageLocators } from '../../locators/login-page-locator/login.page.locators';


class LogoutPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Logs out the user and saves the build link to a file.
     */
    public async performLogout(): Promise<void> {
        await this.saveBuildLinkToFile();
        const toggleUserDetailsLocator = this.actions.getLocator(LogoutPageLocators.toggleUserDetails.selector);
        await this.actions.click(toggleUserDetailsLocator, LogoutPageLocators.toggleUserDetails.name);
        const logoutButtonLocator = this.actions.getLocator(LogoutPageLocators.logoutButton.selector);
        await this.actions.click(logoutButtonLocator, LogoutPageLocators.logoutButton.name);
        const loginButtonLocator = this.actions.getLocator(LoginPageLocators.loginButton.selector);
        await this.actions.waitForElementToBeVisible(loginButtonLocator, LoginPageLocators.loginButton.name);
    }

    /**
     * Fetches the text of the build link.
     * @returns The text of the build link.
     */
    public async fetchBuildLinkText(): Promise<string> {
        const buildLinkLocator = this.actions.getLocator(LogoutPageLocators.buildLink.selector);
        const text = await buildLinkLocator.textContent();
        return text?.trim() ?? '';
    }

    /**
     * Saves the build link text to a JSON file.
     */
    public async saveBuildLinkToFile(): Promise<void> {
        const filePath = resolve('src/data/build-link.json');
        const buildLinkText = await this.fetchBuildLinkText();
        fs.writeFileSync(filePath, JSON.stringify({ buildLinkText }, null, 2));
    }
}

export const logoutPageActions = new LogoutPageActions();
