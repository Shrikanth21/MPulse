import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { CommonPageLocators } from "../locators/common.page.locator";
import { timeouts } from "../../helper/timeouts-config";
import { HomePageLocators } from "../locators/home.page.locator/home.page.locators";


class CommonPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
         * Clicks on an element by its text.
         * @param text The text of the element to click.
         */
    public async clickSpanByText(text: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(text));
        await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${text}`);
        await this.actions.click(fieldLocator, `Field: ${text}`);
    }

    /**
     * Clicks on a tab element by its text.
     * @param text The text of the tab to click on.
     */
    public async clickTabByText(text: string): Promise<void> {
        const tabLocator = this.actions.getLocator(CommonPageLocators.getTabByText(text));
        await this.actions.waitForElementToBeVisible(tabLocator, `Tab: ${text}`);
        await this.actions.click(tabLocator, `Tab: ${text}`);
    }

    /**
     * Clicks on a span element by its title.
     * @param title The title of the span to click on.
     */
    public async clickSpanByTitle(title: string): Promise<void> {
        const spanLocator = this.actions.getLocator(CommonPageLocators.getSpanByTitle(title));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${title}`);
        await this.actions.click(spanLocator, `Span: ${title}`);
    }

    /**
     * Clicks a link by its title.
     * @param title The title of the link to click.
     */
    public async clickLinkByTitle(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(CommonPageLocators.getLinkByTitle(title)).nth(0);
        await this.actions.waitForElementToBeVisible(elementLocator, `Link: ${title}`);
        await this.actions.click(elementLocator, `Link: ${title}`);
    }

    /**
     * Clicks on the "Save" button to save the work order.
     */
    public async clickSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(CommonPageLocators.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, CommonPageLocators.saveButton.name);
        await this.actions.click(saveButtonLocator, CommonPageLocators.saveButton.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
    }

    /**
     * Clicks the edit button to enable editing mode.
     */
    public async clickEditButton(): Promise<void> {
        const editButtonLocator = this.actions.getLocator(CommonPageLocators.editButton.selector);
        await this.actions.waitForElementToBeVisible(editButtonLocator, CommonPageLocators.editButton.name);
        await this.actions.click(editButtonLocator, CommonPageLocators.editButton.name);
    }

    /**
     * Clicks on a div element by its ID.
     * @param divId The ID of the div to click.
     */
    public async clickDivById(divId: string): Promise<void> {
        const divLocator = this.actions.getLocator(CommonPageLocators.getDivById(divId));
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${divId}`);
        await this.actions.click(divLocator, `Div: ${divId}`);
    }

    /**
     * Clicks on a button by its title.
     * @param buttonTitle The title of the button to click.
     */
    public async clickButtonByTitle(buttonTitle: string): Promise<void> {
        const buttonLocator = this.actions.getLocator(CommonPageLocators.getButtonByTitle(buttonTitle));
        await this.actions.waitForElementToBeVisible(buttonLocator, `Button: ${buttonTitle}`);
        await this.actions.click(buttonLocator, `Button: ${buttonTitle}`);
    }

    /**
     * Enters a description in the description input field.
     * @param description The description text to enter.
     */
    public async enterDescription(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(CommonPageLocators.descriptionInput.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, CommonPageLocators.descriptionInput.name);
        await this.actions.typeText(descriptionLocator, description, CommonPageLocators.descriptionInput.name);
    }

    /**
     * Clicks on a div element by its title.
     * @param title The title of the div to click on.
     */
    public async clickDivByTitle(title: string): Promise<void> {
        const divLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(title)).nth(0);
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${title}`);
        await this.actions.click(divLocator, `Div: ${title}`);
    }

    /**
     * Clicks on the "Add New Record" button to create a new record.
     */
    public async clickAddNewRecordButton(): Promise<void> {
        const addNewRecordButtonLocator = this.actions.getLocator(CommonPageLocators.addNewRecordButton.selector);
        await this.actions.waitForElementToBeVisible(addNewRecordButtonLocator, CommonPageLocators.addNewRecordButton.name);
        await this.actions.click(addNewRecordButtonLocator, CommonPageLocators.addNewRecordButton.name);
    }

    /**
     * Clicks on a span element by its text content.
     * @param text The text content of the span to click on.
     */
    public async clickSpanByTextContent(text: string): Promise<void> {
        const spanLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(text));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${text}`);
        await this.actions.click(spanLocator, `Span: ${text}`);
    }

    /**
     * Clicks on a link element by its text content.
     * @param text The text content of the link to click on.
     */
    public async clickLinkByText(text: string): Promise<void> {
        const linkLocator = this.actions.getLocator(CommonPageLocators.getLinkByText(text));
        await this.actions.waitForElementToBeVisible(linkLocator, `Link: ${text}`);
        await this.actions.click(linkLocator, `Link: ${text}`);
    }

    /**
     * Clicks on a div element by its text content.
     * @param text The text content of the div to click on.
     */
    public async clickByDivText(text: string): Promise<void> {
        const divLocator = this.actions.getLocator(CommonPageLocators.getDivByText(text));
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${text}`);
        await this.actions.click(divLocator, `Div: ${text}`);
    }

    /**
     * Clicks on the close button.
     */
    public async clickCloseButton(): Promise<void> {
        const closeButtonLocator = this.actions.getLocator(CommonPageLocators.closeButton.selector);
        await this.actions.waitForElementToBeVisible(closeButtonLocator, CommonPageLocators.closeButton.name);
        await this.actions.click(closeButtonLocator, CommonPageLocators.closeButton.name);
    }

    /**
         * Clicks the side menu icon to open the side menu.
         */
    public async clickSideMenuIcon(): Promise<void> {
        const locator = this.actions.getLocator(HomePageLocators.sideMenuIcon.selector);
        await this.actions.click(locator, HomePageLocators.sideMenuIcon.name);
    }
}

export const commonPageActions = new CommonPageActions();
