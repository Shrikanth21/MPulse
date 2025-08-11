import { expect, Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { readExcelFile } from '../../helper/files/read.excel.file';
import logger from '../../helper/logger';
import { timeouts } from '../../helper/timeouts-config';


class LoginPage {

  private get currentPage(): Page {
    return getPage();
  }

  private get actions(): WebActions {
    return new WebActions(this.currentPage);
  }

  private Elements = {
    usernameInput: { selector: '#userName', name: 'Username Input' },
    loginButton: { selector: '#loginFormSubmit', name: 'Login Button' },
    mpulseLogo: { selector: "//div[@class='loginLogo']", name: 'MPulse Logo' },
    selectDatabaseHeader: { selector: "//h4[text()='Select Database']", name: 'Select Database Header' },
    continueButton: { selector: "//button[@value='Submit']", name: 'Continue Button' }
  };

  private getDatabaseRowSelector = (dbName: string): string => `//tr[contains(@ng-click, 'dbSelectionChange') and .//td[contains(., '${dbName}')]]`;

  /**
   * Fills the username input field.
   * @param username The username to enter.
   */
  public async fillUsername(username: string): Promise<void> {
    const usernameInputLocator = this.actions.getLocator(this.Elements.usernameInput.selector);
    await this.actions.typeText(usernameInputLocator, username, this.Elements.usernameInput.name);
  }

  /**
   * Clicks the login button.
   */
  public async clickLoginButton(): Promise<void> {
    const loginButtonLocator = this.actions.getLocator(this.Elements.loginButton.selector);
    await this.actions.waitForElementToBeVisible(loginButtonLocator, this.Elements.loginButton.name);
    await this.actions.click(loginButtonLocator, this.Elements.loginButton.name);
  }

  /**
   * Verifies that the MPulse logo is visible on the login page.
   * @returns A boolean indicating whether the MPulse logo is visible.
   */
  public async verifyLoginLogoVisible(): Promise<boolean> {
    logger.info(`Checking ${this.Elements.mpulseLogo.name} visibility`);
    const logo = this.actions.getLocator(this.Elements.mpulseLogo.selector);
    const isVisible = await logo.isVisible();
    logger.info(`${this.Elements.mpulseLogo.name} is visible: ${isVisible}`);
    await expect(logo).toBeVisible();
    return isVisible;
  }

  /**
   * Logs in to the application using the provided username.
   * @param username The username to log in with.
   */
  public async login(username: string): Promise<void> {
    logger.info('Starting login process');
    await this.fillUsername(username);
    await this.clickLoginButton();
    const isLogoVisible = await this.verifyLoginLogoVisible();
    if (!isLogoVisible) {
      throw new Error('Login failed: MPulse Logo is not visible');
    }
    logger.info('Login process completed successfully');
    await this.actions.waitForCustomDelay(timeouts.large);
  }
  public async loadExcelCredentials(): Promise<{ username: string; }> {
    const rowInput = await readExcelFile('src/data/testData/MPulse.xlsx', 'Login_Page');
    return {
      username: rowInput[0].USERNAME,
    };
  }

  /**
   * Selects a database from the login page.
   * @param selectedDb The name of the database to select.
   */
  public async selectDatabase(selectedDb: string): Promise<void> {
    const headerLocator = this.actions.getLocator(this.Elements.selectDatabaseHeader.selector);
    if (await headerLocator.isVisible()) {
      const dbRowLocator = this.actions.getLocator(this.getDatabaseRowSelector(selectedDb));
      await this.actions.click(dbRowLocator, selectedDb);
      const continueButtonLocator = this.actions.getLocator(this.Elements.continueButton.selector);
      await this.actions.click(continueButtonLocator, this.Elements.continueButton.name);
    }
  }
}

export const loginPage = new LoginPage();
