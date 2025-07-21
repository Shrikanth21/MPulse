import { expect, Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { readExcelFile } from '../../helper/files/read.excel.file';
import logger from '../../helper/loggs/logger';


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
    firstTableCell: { selector: "//td[@class='ng-binding sorting_1']", name: 'First Table Cell' },
    continueButton: { selector: "//button[@value='Submit']", name: 'Continue Button' }
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

  public async selectDatabase(selectedDb: string): Promise<void> {
    const headerLocator = this.actions.getLocator(this.Elements.selectDatabaseHeader.selector);
    if (await headerLocator.isVisible()) {
      switch (selectedDb) {
        case 'ANCHORGLASS_INAPPTEST':
          {
            const firstCellLocator = this.actions.getLocator(this.Elements.firstTableCell.selector).nth(0);
            await this.actions.click(firstCellLocator, this.Elements.firstTableCell.name);
          }
          break;
        case 'AutomationFreshDB':
          {
            const secondCellLocator = this.actions.getLocator(this.Elements.firstTableCell.selector).nth(1);
            await this.actions.click(secondCellLocator, this.Elements.firstTableCell.name + ' (AutomationFreshDB)');
          }
          break;
        case 'FRESHDB959_INAPPDEV':
          {
            const firstCellLocator = this.actions.getLocator(this.Elements.firstTableCell.selector).nth(2);
            await this.actions.click(firstCellLocator, this.Elements.firstTableCell.name + ' (FRESHDB959_INAPPDEV)');
          }
          break;
        case 'FreshDBSep':
          {
            const secondCellLocator = this.actions.getLocator(this.Elements.firstTableCell.selector).nth(3);
            await this.actions.click(secondCellLocator, this.Elements.firstTableCell.name + ' (FreshDBSep)');
          }
          break;
        case 'INAPP_PNS':
          {
            const thirdCellLocator = this.actions.getLocator(this.Elements.firstTableCell.selector).nth(4);
            await this.actions.click(thirdCellLocator, this.Elements.firstTableCell.name + ' (INAPP_PNS)');
          }
          break;
        default:
          throw new Error(`Unknown database selection: ${selectedDb}`);
      }
      const continueButtonLocator = this.actions.getLocator(this.Elements.continueButton.selector);
      await this.actions.click(continueButtonLocator, this.Elements.continueButton.name);
    }
  }
}

export const loginPage = new LoginPage();
