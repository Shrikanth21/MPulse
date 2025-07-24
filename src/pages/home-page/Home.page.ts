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
  private getCustomizationMenuByTitle = (title: string): string => `//div[contains(@class,'siteMainNavSubLists')]//a[@title='${title}']`;

  /**
   * Validates the current URL against the expected URL.
   * @param expectedUrl The expected URL to compare against.
   */

  /**
   * Clicks a button by its text.
   * @param buttonText The text of the button to click.
   */
  public async clickButtonByText(buttonText: string): Promise<void> {
    const buttonLocator = this.actions.getLocator(this.getElementByText(buttonText));
    if(await buttonLocator.isVisible()){
    await this.actions.click(buttonLocator, `Button: ${buttonText}`);
    }
  }

  /**
   * Clicks a customization menu by its title.
   * @param title The title of the customization menu to click.
   */
  public async clickCustomizationMenuByTitle(title: string): Promise<void> {
    const customizationMenuLocator = this.actions.getLocator(this.getCustomizationMenuByTitle(title));
    await this.actions.waitForElementToBeVisible(customizationMenuLocator, `Customization Menu: ${title}`);
    await this.actions.click(customizationMenuLocator, `Customization Menu: ${title}`);
  }

  /**
   * Clicks the side menu icon to open the side menu.
   */
  public async clickSideMenuIcon(): Promise<void> {
    const sideMenuIconLocator = this.actions.getLocator(this.elements.sideMenuIcon.selector);
    await this.actions.click(sideMenuIconLocator, this.elements.sideMenuIcon.name);
  }

  /**
   * Clicks a link by its title.
   * @param title The title of the link to click.
   */
  public async clickLinkByTitle(title: string): Promise<void> {
    const linkLocator = this.actions.getLocator(this.getLinkByTitle(title)).nth(0);
    await this.actions.click(linkLocator, title);
  }

  /**
   * navigates to the Capital Assets Records page.
   * @param expectedText The expected text to validate against.
   */
  public async navigateToCapitalAssetsRecordsPage(
    homePageUrl: string,
    gotItButtonText: string,
    menuItemTitle: string,
    subMenuItemTitle: string,
    expectedUrl: string
  ): Promise<void> {
    await this.actions.validateCurrentUrl(homePageUrl);
    await this.clickButtonByText(gotItButtonText);
    await this.clickSideMenuIcon();
    await this.clickLinkByTitle(menuItemTitle);
    await this.clickLinkByTitle(subMenuItemTitle);
    await this.actions.validateCurrentUrl(expectedUrl);
  }
}

export const homePage = new HomePage();
