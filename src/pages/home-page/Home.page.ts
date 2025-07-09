import { Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';

class HomePage {
  private get currentPage(): Page {
    return getPage();
  }

  private get actions(): WebActions {
    return new WebActions(this.currentPage);
  }

  private elements = {
    sideMenuIcon: { selector: "[ui-view='sideMenu']", name: "Side Menu Icon" },
  };

  private getLinkByTitle = (title: string) => `//a[@title='${title}']`;
  private getElementByText = (text: string): string => `//a[text()='${text}']`;


  public async validateCurrentUrl(expectedUrl: string): Promise<void> {
    await this.actions.validateCurrentUrl(expectedUrl);
  }

  public async clickButtonByText(buttonText: string): Promise<void> {
    const buttonLocator = this.actions.getLocator(this.getElementByText(buttonText));
    if(await buttonLocator.isVisible()){
    await this.actions.click(buttonLocator, `Button: ${buttonText}`);
    }
  }

  public async clickSideMenuIcon(): Promise<void> {
    const sideMenuIconLocator = this.actions.getLocator(this.elements.sideMenuIcon.selector);
    await this.actions.click(sideMenuIconLocator, this.elements.sideMenuIcon.name);
  }

  public async clickLinkByTitle(title: string): Promise<void> {
    const linkLocator = this.actions.getLocator(this.getLinkByTitle(title));
    await this.actions.click(linkLocator, title);
  }

  public async navigateToCapitalAssetsRecordsPage(
    homePageUrl: string,
    gotItButtonText: string,
    menuItemTitle: string,
    subMenuItemTitle: string,
    expectedUrl: string
  ): Promise<void> {
    await this.validateCurrentUrl(homePageUrl);
    await this.clickButtonByText(gotItButtonText);
    await this.clickSideMenuIcon();
    await this.clickLinkByTitle(menuItemTitle);
    await this.clickLinkByTitle(subMenuItemTitle);
    await this.validateCurrentUrl(expectedUrl);
  }
}

export const homePage = new HomePage();
