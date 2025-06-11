import { expect, Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import logger from '../../helper/loggs/logger';
import { readExcelFile } from '../../helper/files/read.excel.file';


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
    mpulseLogo: { selector: "//div[@class='loginLogo']", name: 'MPulse Logo' }
  };

  public async fillUsername(username: string): Promise<void> {
    const usernameInputLocator = this.actions.getLocator(this.Elements.usernameInput.selector);
    await this.actions.typeText(usernameInputLocator, username, this.Elements.usernameInput.name);
  }

  public async clickLoginButton(): Promise<void> {
    const loginButtonLocator = this.actions.getLocator(this.Elements.loginButton.selector);
    await this.actions.click(loginButtonLocator, this.Elements.loginButton.name);
  }

  public async verifyLoginLogoVisible(): Promise<boolean> {
    logger.info(`Checking ${this.Elements.mpulseLogo.name} visibility`);
    const logo = this.actions.getLocator(this.Elements.mpulseLogo.selector);
    const isVisible = await logo.isVisible();
    logger.info(`${this.Elements.mpulseLogo.name} is visible: ${isVisible}`);
    await expect(logo).toBeVisible();
    return isVisible;
  }

  public async login(username: string): Promise<void> {
    logger.info('Starting login process');
    await this.fillUsername(username);
    await this.clickLoginButton();
    const isLogoVisible = await this.verifyLoginLogoVisible();
    if (!isLogoVisible) {
      throw new Error('Login failed: MPulse Logo is not visible');
    }
    logger.info('Login process completed successfully');
    await this.currentPage.waitForTimeout(10000);
  }
  public async loadExcelCredentials(): Promise<{ username: string; }> {
    const rowInput = await readExcelFile('src/data/testData/MPulse.xlsx', 'Login_Page');
    return {
      username: rowInput[0].USERNAME,
    };
  }
}

export const loginPage = new LoginPage();
