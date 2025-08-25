import { Page } from "@playwright/test";
import { getPage } from "../base/base";
import { WebActions } from "../base/web.action.util";
import { timeouts } from "../helper/timeouts-config";

class CommonActionPage {

    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    public elements = {
        sideBarExpander: { selector: "[class='sideBarExpander']", name: "Sidebar Expander" },
        editButton: { selector: "//a[@title='Edit']//i[@class='fa fa-pencil-alt']", name: "Edit Button" },
        saveButton: { selector: '#save-work-order', name: "Save Button" },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
        addNewRecordButton: { selector: "//div[@class='action-menu-items']/descendant::a[@title='Add new record']", name: "Add New Record Button" },
        closeButton: { selector: "//button[@title='Click here to close']", name: "Close Button" },
    }
    getElementByText = (text: string): string => `//span[text()='${text}']`;
    getTabByText = (text: string): string => `//span[@class='dFlex']//span[text()='${text}']`;
    getElementByTitle = (title: string): string => `//a[@title='${title}']`;
    getTitleBySpan = (title: string): string => `//span[@title='${title}']`;
    getSpanByTitle = (title: string): string => `//span[@title='${title}']`;
    getDivByTitle = (title: string): string => `//div[contains(@title,'${title}')]`;;
    getCustomDivByTitle = (title: string): string => `//div[@title='${title}']`;
    getColumnCellByTitle = (title: string): string => `//div[text()='${title}']`;
    getTabByTitle = (tabTeading: string): string => `//li[@title='${tabTeading}']`;
    getValueDivByTitle = (title: string): string => `//div[@title='${title}' and contains(@class, 'dx-item-content')]`;
    getColumnHeaderLocator = (columnName: string): string => `//div[@role='presentation' and normalize-space()='${columnName}']`;
    getGroupedHeaderLocator = (columnName: string): string => `//div[contains(@class,'dx-group-panel-item') and normalize-space()='${columnName}']`;
    getRowCellSelector = (index: number): string => `//td[contains(@aria-describedby,'dx-col') and @aria-colindex='${index}']`;
    getLabelByTitle = (layoutName: string): string => `//label[@title='${layoutName}']`;
    getButtonByText = (btnText: string): string => `//button[normalize-space()='${btnText}']`;
    getElementByDivId = (divId: string): string => `//div[@id='${divId}']`;
    getElementByButtonTitle = (buttonTitle: string): string => `//button[@title='${buttonTitle}']`;
    getElementByLabelText = (labelText: string): string => `//label[normalize-space()='${labelText}']`;
    getElementByLinkText = (text: string): string => `//a[normalize-space()='${text}']`;


    /**
     * Clicks on an element by its text.
     * @param text The text of the element to click.
     */
    public async clickElementByText(text: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(this.getElementByText(text));
        await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${text}`);
        await this.actions.click(fieldLocator, `Field: ${text}`);
    }

    /**
     * Clicks on a tab element by its text.
     * @param text The text of the tab to click on.
     */
    public async clickTabByText(text: string): Promise<void> {
        const tabLocator = this.actions.getLocator(this.getTabByText(text));
        await this.actions.waitForElementToBeVisible(tabLocator, `Tab: ${text}`);
        await this.actions.click(tabLocator, `Tab: ${text}`);
    }

    /**
     * Clicks on a span element by its title.
     * @param title The title of the span to click on.
     */
    public async clickOnSpanByTitle(title: string): Promise<void> {
        const spanLocator = this.actions.getLocator(this.getTitleBySpan(title));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${title}`);
        await this.actions.click(spanLocator, `Span: ${title}`);
    }

    /**
     * Clicks a link by its title.
     * @param title The title of the link to click.
     */
    public async clickLinkByTitle(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByTitle(title)).nth(0);
        await this.actions.waitForElementToBeVisible(elementLocator, `Link: ${title}`);
        await this.actions.click(elementLocator, `Link: ${title}`);
    }

    /**
     * Clicks on the "Save" button to save the work order.
     */
    public async clickSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(this.elements.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, this.elements.saveButton.name);
        await this.actions.click(saveButtonLocator, this.elements.saveButton.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
    }

    /**
     * Click on edit button
     */
    public async clickEditButton(): Promise<void> {
        const editButtonLocator = this.actions.getLocator(this.elements.editButton.selector);
        await this.actions.waitForElementToBeVisible(editButtonLocator, this.elements.editButton.name);
        await this.actions.click(editButtonLocator, this.elements.editButton.name);
    }

    /**
     * Clicks on a div element by its ID.
     * @param divId The ID of the div to click.
     */
    public async clickByDivId(divId: string): Promise<void> {
        const divLocator = this.actions.getLocator(this.getElementByDivId(divId));
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${divId}`);
        await this.actions.click(divLocator, `Div: ${divId}`);
    }

    /**
     * Clicks on a button by its title.
     * @param buttonTitle The title of the button to click.
     */
    public async clickButtonByTitle(buttonTitle: string): Promise<void> {
        const buttonLocator = this.actions.getLocator(this.getElementByButtonTitle(buttonTitle));
        await this.actions.waitForElementToBeVisible(buttonLocator, `Button: ${buttonTitle}`);
        await this.actions.click(buttonLocator, `Button: ${buttonTitle}`);
    }

    /**
     * Enters a description in the description input field.
     * @param description The description text to enter.
     */
    public async enterDescription(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.descriptionInput.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, this.elements.descriptionInput.name);
        await this.actions.typeText(descriptionLocator, description, this.elements.descriptionInput.name);
    }

    /**
     * Clicks on a div element by its title.
     * @param title The title of the div to click on.
     */
    public async clickByDivTitle(title: string): Promise<void> {
        const divLocator = this.actions.getLocator(this.getDivByTitle(title)).nth(0);
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${title}`);
        await this.actions.click(divLocator, `Div: ${title}`);
    }

    /**
     * Clicks on the "Add New Record" button to create a new record.
     */
    public async clickAddNewRecordButton(): Promise<void> {
        const addNewRecordButtonLocator = this.actions.getLocator(this.elements.addNewRecordButton.selector);
        await this.actions.waitForElementToBeVisible(addNewRecordButtonLocator, this.elements.addNewRecordButton.name);
        await this.actions.click(addNewRecordButtonLocator, this.elements.addNewRecordButton.name);
    }

    /**
     * Clicks on a span element by its title.
     * @param title The title of the span to click on.
     */
    public async clickBySpanTitle(title: string): Promise<void> {
        const spanLocator = this.actions.getLocator(this.getSpanByTitle(title));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${title}`);
        await this.actions.click(spanLocator, `Span: ${title}`);
    }

    /**
     * Clicks on a span element by its text content.
     * @param text The text content of the span to click on.
     */
    public async clickBySpanText(text: string): Promise<void> {
        const spanLocator = this.actions.getLocator(this.getElementByText(text));
        await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${text}`);
        await this.actions.click(spanLocator, `Span: ${text}`);
    }

    /**
     * Clicks on a link element by its text content.
     * @param text The text content of the link to click on.
     */
    public async clickByLinkText(text: string): Promise<void> {
        const linkLocator = this.actions.getLocator(this.getElementByLinkText(text));
        await this.actions.waitForElementToBeVisible(linkLocator, `Link: ${text}`);
        await this.actions.click(linkLocator, `Link: ${text}`);
    }

    /**
     * Clicks on a div element by its text content.
     * @param text The text content of the div to click on.
     */
    public async clickByDivText(text: string): Promise<void> {
        const divLocator = this.actions.getLocator(this.getColumnCellByTitle(text));
        await this.actions.waitForElementToBeVisible(divLocator, `Div: ${text}`);
        await this.actions.click(divLocator, `Div: ${text}`);
    }

    /**
     * Clicks on the close button.
     */
    public async clickCloseButton(): Promise<void> {
        const closeButtonLocator = this.actions.getLocator(this.elements.closeButton.selector);
        await this.actions.waitForElementToBeVisible(closeButtonLocator, this.elements.closeButton.name);
        await this.actions.click(closeButtonLocator, this.elements.closeButton.name);
    }
}

export const commonActionPage = new CommonActionPage();