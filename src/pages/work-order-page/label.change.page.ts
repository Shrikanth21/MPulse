import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { homePageActions } from "../actions/home.page.action/home.page.actions";
import { commonPageActions } from "../actions/common.page.actions";
import { CommonPageLocators } from "../locators/common.page.locator";

class LabelChangePage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        recordAreaDropdown: { selector: "//div[@id='rightBlock']//input[@class='dx-texteditor-input']", name: "Record Area Dropdown" },
        editLanguageButton: { selector: "//li[@ng-click='editLanguage()']", name: "Edit Language Button" },
        labelInput: { selector: "//input[@ng-model='item.langData.Label']", name: "Label Input" },
        saveButton: { selector: "//a[@title='Save']", name: "Save Button" },
    };

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

    public async clickOnCustomizationMenuItem(customizationMenuItem: string): Promise<void> {
        const customizationButton = this.actions.getLocator(CommonPageLocators.getLinkByTitle(customizationMenuItem)).nth(0);
        await this.actions.waitForElementToBeVisible(customizationButton, `Customization Menu Item: ${customizationMenuItem} is visible`);
        await this.actions.click(customizationButton, `Customization Menu Item: ${customizationMenuItem}`);
    }

    public async clickOnSpanByText(spanTitle: string): Promise<void> {
        const spanLocator = this.actions.getLocator(CommonPageLocators.getSpanByTitle(spanTitle));
        await this.actions.click(spanLocator, `Span with text: ${spanTitle}`);
    }

    public async selectRecordAreaDropdown(text: string): Promise<void> {
        const recordAreaDropdown = this.actions.getLocator(this.elements.recordAreaDropdown.selector).nth(0);
        await this.actions.click(recordAreaDropdown, this.elements.recordAreaDropdown.name);
        await this.actions.typeText(recordAreaDropdown, text, this.elements.recordAreaDropdown.name);
        const recordAreaValue = this.actions.getLocator(CommonPageLocators.getDivByTitle(text));
        await this.actions.waitForElementToBeVisible(recordAreaValue, `Record Area Dropdown value ${text} is visible`);
        await this.actions.click(recordAreaValue, `Record Area Dropdown value ${text} is clickable`);
    }

    public async selectLabelChangeDropdown(text: string): Promise<void> {
        const recordAreaDropdown = this.actions.getLocator(this.elements.recordAreaDropdown.selector).nth(1);
        await this.actions.click(recordAreaDropdown, this.elements.recordAreaDropdown.name);
        await this.actions.typeText(recordAreaDropdown, text, this.elements.recordAreaDropdown.name);
        const recordAreaValue = this.actions.getLocator(CommonPageLocators.getDivByTitle(text));
        await this.actions.waitForElementToBeVisible(recordAreaValue, `Label Change Dropdown value ${text} is visible`);
        await this.actions.click(recordAreaValue, `Label Change Dropdown value ${text} is clickable`);
    }

    public async selectDropdownValue(text: string, labelText: string): Promise<void> {
        await this.selectRecordAreaDropdown(text);
        await this.selectLabelChangeDropdown(labelText);
    }

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

    public async changeLabel(labelText: string): Promise<void> {
        const editLanguageButton = this.actions.getLocator(this.elements.editLanguageButton.selector).nth(0);
        await this.actions.waitForElementToBeVisible(editLanguageButton, `Edit Language Button is visible`);
        await this.actions.click(this.actions.getLocator(this.elements.editLanguageButton.selector), this.elements.editLanguageButton.name);
        const labelInput = this.actions.getLocator(this.elements.labelInput.selector).nth(0);
        await this.actions.typeText(labelInput, labelText, this.elements.labelInput.name);
        await this.actions.click(this.actions.getLocator(this.elements.saveButton.selector), this.elements.saveButton.name);
        await this.actions.waitForElementToBeVisible(labelInput, `Label input with text ${labelText} is visible`);
    }

    public async validateLabelChange(labelText: string): Promise<void> {
        const labelLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(labelText));
        await this.actions.waitForElementToBeVisible(labelLocator, `Label with text ${labelText} is visible`);
        const labelTextContent = await labelLocator.textContent();
        if (labelTextContent !== labelText) {
            throw new Error(`Label text does not match. Expected: ${labelText}, Found: ${labelTextContent}`);
        }
    }
}

export const labelChangePage = new LabelChangePage();
