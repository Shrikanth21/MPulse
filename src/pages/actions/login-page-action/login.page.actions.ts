import { expect, Page } from '@playwright/test';
import { getPage } from '../../../base/base';
import { WebActions } from '../../../base/web.action.util';
import { LoginPageLocators } from '../../locators/login-page-locator/login.page.locators';
import logger from '../../../helper/logger';
import { timeouts } from '../../../helper/timeouts-config';
import { readExcelFile } from '../../../helper/files/read.excel.file';


class LoginPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Fills in the username input field.
     * @param username The username to enter.
     */
    public async fillUsername(username: string): Promise<void> {
        const locator = this.actions.getLocator(LoginPageLocators.usernameInput.selector);
        await this.actions.typeText(locator, username, LoginPageLocators.usernameInput.name);
    }

    /**
     * Fills in the password input field.
     * @param password The password to enter.
     */
    public async fillPassword(password: string): Promise<void> {
        const locator = this.actions.getLocator(LoginPageLocators.passwordInput.selector);
        await this.actions.typeText(locator, password, LoginPageLocators.passwordInput.name);
    }

    /**
     * Clicks the login button.
     */
    public async clickLoginButton(): Promise<void> {
        const locator = this.actions.getLocator(LoginPageLocators.loginButton.selector);
        await this.actions.waitForElementToBeVisible(locator, LoginPageLocators.loginButton.name);
        await this.actions.click(locator, LoginPageLocators.loginButton.name);
    }

    /**
     * Verifies if the MPulse logo is visible after login.
     * @returns True if the MPulse logo is visible after login, otherwise false.
     */
    public async verifyLoginLogoVisible(): Promise<boolean> {
        logger.info(`Checking ${LoginPageLocators.mpulseLogo.name} visibility`);
        const logo = this.actions.getLocator(LoginPageLocators.mpulseLogo.selector);
        const isVisible = await logo.isVisible();
        logger.info(`${LoginPageLocators.mpulseLogo.name} is visible: ${isVisible}`);
        await expect(logo).toBeVisible();
        return isVisible;
    }

    /**
     * Logs in to the application.
     * @param username The username to log in with.
     */
    public async login(username: string, password: any): Promise<void> {
        logger.info('Starting login process');
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        const isLogoVisible = await this.verifyLoginLogoVisible();
        if (!isLogoVisible) {
            throw new Error('Login failed: MPulse Logo is not visible');
        }
        logger.info('Login process completed successfully');
        await this.actions.waitForCustomDelay(timeouts.large);
    }

    /**
     * Loads user credentials from an Excel file.
     * @returns An object containing the username from the Excel file.
     */
    public async loadExcelCredentials(): Promise<{ username: string; password: string }> {
        const rowInput = await readExcelFile('src/data/testData/MPulse.xlsx', 'Login_Page');
        return { username: rowInput[0].USERNAME, password: rowInput[0].PASSWORD };
    }

    /**
     * Selects a specific database from the login page.
     * @param selectedDb The name of the database to select.
     */
    public async selectDatabase(selectedDb: string): Promise<void> {
        const headerLocator = this.actions.getLocator(LoginPageLocators.selectDatabaseHeader.selector);
        if (await headerLocator.isVisible()) {
            const dbRowLocator = this.actions.getLocator(LoginPageLocators.getDatabaseRowSelector(selectedDb));
            await this.actions.click(dbRowLocator, selectedDb);
            const continueButtonLocator = this.actions.getLocator(LoginPageLocators.continueButton.selector);
            await this.actions.click(continueButtonLocator, LoginPageLocators.continueButton.name);
        }
    }
}

export const loginPageActions = new LoginPageActions();
