import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { homePageActions } from "../../home-page-action/home.page.actions";
import { commonPageActions } from "../../common.page.actions";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { WkoLabelChangePageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.label.change.page.locator";

class WkoLabelChangePageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Navigates to the Management Tool Customization page.
     * @remarks This method performs a series of actions to navigate to the Management Tool Customization page.
     * @param gotItButtonText The text of the "Got It" button.
     * @param menuItemTitle The title of the menu item to click.
     * @param subMenuItemTitle The title of the sub-menu item to click.
     * @param customizationMenuItem The title of the customization menu item to click.
     * @param expectedUrl The expected URL of the page after navigation.
     */
    public async navigateToManagementToolCustomizationPage(
        gotItButtonText: string,
        menuItemTitle: string,
        subMenuItemTitle: string,
        customizationMenuItem: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickButtonByText(gotItButtonText);
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickLinkByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.clickOnCustomizationMenuItem(customizationMenuItem);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     *  Clicks on a customization menu item by its title.
     * @param customizationMenuItem The title of the customization menu item to click.
     */
    public async clickOnCustomizationMenuItem(customizationMenuItem: string): Promise<void> {
        const customizationButton = this.actions.getLocator(CommonPageLocators.getLinkByTitle(customizationMenuItem)).nth(0);
        await this.actions.waitForElementToBeVisible(customizationButton, `Customization Menu Item: ${customizationMenuItem} is visible`);
        await this.actions.click(customizationButton, `Customization Menu Item: ${customizationMenuItem}`);
    }

    /**
     * Clicks on a span element by its title.
     * @param spanTitle The title of the span to click.
     */
    public async clickOnSpanByText(spanTitle: string): Promise<void> {
        const spanLocator = this.actions.getLocator(CommonPageLocators.getSpanByTitle(spanTitle));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span with text: ${spanTitle} is visible`);
        await this.actions.click(spanLocator, `Span with text: ${spanTitle}`);
    }

    /**
     * Selects a value from the Record Area dropdown.
     * @param text The text of the value to select from the dropdown.
     */
    public async selectRecordAreaDropdown(text: string): Promise<void> {
        const recordAreaDropdown = this.actions.getLocator(WkoLabelChangePageLocators.recordAreaDropdown.selector).nth(0);
        await this.actions.click(recordAreaDropdown, WkoLabelChangePageLocators.recordAreaDropdown.name);
        await this.actions.typeText(recordAreaDropdown, text, WkoLabelChangePageLocators.recordAreaDropdown.name);
        const recordAreaValue = this.actions.getLocator(CommonPageLocators.getDivByTitle(text));
        await this.actions.waitForElementToBeVisible(recordAreaValue, `Record Area Dropdown value ${text} is visible`);
        await this.actions.click(recordAreaValue, `Record Area Dropdown value ${text} is clickable`);
    }

    /**
     * Selects a value from the Label Change dropdown.
     * @param text The text of the value to select from the Label Change dropdown.
     */
    public async selectLabelChangeDropdown(text: string): Promise<void> {
        const recordAreaDropdown = this.actions.getLocator(WkoLabelChangePageLocators.recordAreaDropdown.selector).nth(1);
        await this.actions.click(recordAreaDropdown, WkoLabelChangePageLocators.recordAreaDropdown.name);
        await this.actions.typeText(recordAreaDropdown, text, WkoLabelChangePageLocators.recordAreaDropdown.name);
        const recordAreaValue = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(text));
        await this.actions.waitForElementToBeVisible(recordAreaValue, `Label Change Dropdown value ${text} is visible`);
        await this.actions.click(recordAreaValue, `Label Change Dropdown value ${text} is clickable`);
    }

    /**
     * Selects values from both the Record Area and Label Change dropdowns.
     * @param text The text of the value to select from the Record Area dropdown.
     * @param labelText The text of the value to select from the Label Change dropdown.
     */
    public async selectDropdownValue(text: string, labelText: string): Promise<void> {
        await this.selectRecordAreaDropdown(text);
        await this.selectLabelChangeDropdown(labelText);
    }

    /**
     * Navigates to the Work Order Records page from another menu.
     * @param menuItemTitle The title of the main menu item.
     * @param sideMenuIcon The title of the side menu icon to click.
     * @param subMenuItemTitle  The title of the sub-menu item.
     * @param expectedUrl 
     */
    public async navigateToWorkOrderRecordsPageFromOtherMenu(
        menuItemTitle: string,
        sideMenuIcon: string,
        subMenuItemTitle: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        this.clickOnSpanByText(sideMenuIcon);
        await commonPageActions.clickLinkByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Navigates to the Customization page from another menu.
     * @param menuItemTitle The title of the main menu item.
     * @param sideMenuIcon  The title of the side menu icon to click.
     * @param subMenuItemTitle  The title of the sub-menu item.
     * @param customizationMenuItem The title of the customization menu item to click.
     * @param expectedUrl   The expected URL of the page after navigation.
     */
    public async navigateToCustomizationPageFromOtherMenu(
        menuItemTitle: string,
        sideMenuIcon: string,
        subMenuItemTitle: string,
        customizationMenuItem: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        this.clickOnSpanByText(sideMenuIcon);
        await commonPageActions.clickLinkByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.clickOnCustomizationMenuItem(customizationMenuItem);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Changes the label text on the Work Order Records page.
     * @param labelText The new label text to be set.
     */
    public async changeLabel(labelText: string): Promise<void> {
        const editLanguageButton = this.actions.getLocator(WkoLabelChangePageLocators.editLanguageButton.selector).nth(0);
        await this.actions.waitForElementToBeVisible(editLanguageButton, `Edit Language Button is visible`);
        await this.actions.click(this.actions.getLocator(WkoLabelChangePageLocators.editLanguageButton.selector), WkoLabelChangePageLocators.editLanguageButton.name);
        const labelInput = this.actions.getLocator(WkoLabelChangePageLocators.labelInput.selector).nth(0);
        await this.actions.typeText(labelInput, labelText, WkoLabelChangePageLocators.labelInput.name);
        await this.actions.click(this.actions.getLocator(WkoLabelChangePageLocators.saveButton.selector), WkoLabelChangePageLocators.saveButton.name);
        await this.actions.waitForElementToBeVisible(labelInput, `Label input with text ${labelText} is visible`);
    }

    /**
     * Validates the label change on the Work Order Records page.
     * @param labelText The label text to validate.
     */
    public async validateLabelChange(labelText: string): Promise<void> {
        const labelLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(labelText));
        await this.actions.waitForElementToBeVisible(labelLocator, `Label with text ${labelText} is visible`);
        const labelTextContent = await labelLocator.textContent();
        if (labelTextContent !== labelText) {
            throw new Error(`Label text does not match. Expected: ${labelText}, Found: ${labelTextContent}`);
        }
    }
}

export const wkoLabelChangePageActions = new WkoLabelChangePageActions();
