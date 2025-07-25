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
    }
    getElementByText = (text: string): string => `//span[text()='${text}']`;
    getTabByText = (text: string): string => `//span[@class='dFlex']//span[text()='${text}']`;
    getElementByTitle = (title: string): string => `//a[@title='${title}']`;
    getTitleBySpan = (title: string): string => `//span[@title='${title}']`;
    getSpanByTitle = (title: string): string => `//span[@title='${title}']`;
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
        await this.actions.waitForElementToBeVisible(elementLocator, title);
        await this.actions.click(elementLocator, title);
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

}

export const commonActionPage = new CommonActionPage();