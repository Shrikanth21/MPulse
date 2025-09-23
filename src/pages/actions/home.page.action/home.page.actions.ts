import { Page } from '@playwright/test';
import { getPage } from '../../../base/base';
import { WebActions } from '../../../base/web.action.util';
import { HomePageLocators } from '../../locators/home.page.locator/home.page.locators';
import { CommonPageLocators } from '../../locators/common.page.locator';
import { commonPageActions } from '../common.page.actions';

class HomePageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks a button by its text.
     * @param text The text of the button to click.
     */
    public async clickButtonByText(text: string): Promise<void> {
        const locator = this.actions.getLocator(CommonPageLocators.getLinkByText(text));
        if (await locator.isVisible()) {
            await this.actions.waitForClickable(locator, `Button: ${text}`);
            await this.actions.click(locator, `Button: ${text}`);
        }
    }

    /**
     * Clicks a customization menu by its title.
     * @param title The title of the customization menu to click.
     */
    public async clickCustomizationMenuByTitle(title: string): Promise<void> {
        const locator = this.actions.getLocator(HomePageLocators.getCustomizationMenuByTitle(title));
        await this.actions.waitForElementToBeVisible(locator, `Customization Menu: ${title}`);
        await this.actions.click(locator, `Customization Menu: ${title}`);
    }

    /**
     * Clicks the side menu icon to open the side menu.
     */
    public async clickSideMenuIcon(): Promise<void> {
        const locator = this.actions.getLocator(HomePageLocators.sideMenuIcon.selector);
        await this.actions.click(locator, HomePageLocators.sideMenuIcon.name);
    }

    /**
     * Clicks a button by its text.
     * @param homePageUrl The URL of the home page.
     * @param gotItButtonText The text of the "Got It" button.
     * @param menuItemTitle The title of the menu item to click.
     * @param subMenuItemTitle The title of the sub-menu item to click.
     * @param expectedUrl The expected URL after navigation.
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
        await commonPageActions.clickLinkByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }
}

export const homePageActions = new HomePageActions();
