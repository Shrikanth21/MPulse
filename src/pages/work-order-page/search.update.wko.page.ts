import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { CommonPageLocators } from "../locators/common.page.locator";

class SearchUpdateWorkOrderPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        workOrderIdLabel: { selector: "//span[@id='ID']", name: 'work order ID' },
        searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
        getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
        getClickonTask: { selector: "//div[@class='dx-scrollable-content']/descendant::a[contains(text(),'WKO')]", name: 'select task', },
        descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
        getSaveButton: { selector: "//li[@id='save-work-order']", name: 'save button' },
        getDescriptionText: { selector: "//div[@class='itemDetailInfo']/descendant::span[@id='Description']", name: 'description text' },
    };

    /**
     * Gets the work order ID from the UI.
     * @returns The work order ID as a string.
     */
    public async getWorkOrderId(): Promise<string> {
        const workOrderIdLocator = this.actions.getLocator(this.elements.workOrderIdLabel.selector);
        return await this.actions.getText(workOrderIdLocator, this.elements.workOrderIdLabel.name);
    }

    /**
     * Gets the description text from the work order page.
     * @returns The description text as a string.
     */
    public async getDescription(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const descriptionLocator = this.actions.getLocator(this.elements.getDescriptionText.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, this.elements.getDescriptionText.name);
        return await this.actions.getText(descriptionLocator, this.elements.getDescriptionText.name);
    }

    /**
     * Searches for a work order by its ID.
     * @param workOrderId The ID of the work order to search for.
     */
    public async searchWorkOrder(workOrderId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(this.elements.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, workOrderId, this.elements.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(this.elements.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, this.elements.getEnterSearchBar.name);
    }

    /**
     * Verifies that the search result matches the expected work order ID.
     * @param beforeSearchResultText The expected work order ID before the search.
     */
    public async verifySearchResult(beforeSearchResultText: string): Promise<void> {
        const afterSearchResultTextEl = this.actions.getLocator(this.elements.getClickonTask.selector);
        await this.actions.waitForElementToBeVisible(afterSearchResultTextEl, this.elements.getClickonTask.name);
        const afterSearchResultText = await this.actions.getText(afterSearchResultTextEl, this.elements.getClickonTask.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.assertEqual(afterSearchResultText, beforeSearchResultText);
    }

    /**
     * Clicks on the search result to open the work order details.
     */
    public async clickOnSearchResult(): Promise<void> {
        const searchResultLocator = this.actions.getLocator(this.elements.getClickonTask.selector);
        await this.actions.waitForElementToBeVisible(searchResultLocator, this.elements.getClickonTask.name);
        await this.actions.click(searchResultLocator, this.elements.getClickonTask.name);
    }

    /**
     * Clicks on the edit icon to edit the work order.
     */
    public async clickOnEditIcon(): Promise<void> {
        const editIconLocator = this.actions.getLocator(CommonPageLocators.editButton.selector);
        await this.actions.waitForElementToBeVisible(editIconLocator, CommonPageLocators.editButton.name);
        await this.actions.click(editIconLocator, CommonPageLocators.editButton.name);
    }

    /**
     * Enters a new description for the work order.
     * @param newDescription The new description to enter.
     */
    public async enterNewDescription(newDescription: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.descriptionInput.selector);
        await this.actions.typeText(descriptionLocator, newDescription, this.elements.descriptionInput.name);
    }

    /**
     * Clicks on the save button to save the changes made to the work order.
     */
    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(this.elements.getSaveButton.selector);
        await this.actions.click(saveButtonLocator, this.elements.getSaveButton.name);
    }

    /**
     * Verifies that the updated description is not equal to the previous description.
     * @param expectedDescription The expected description to verify against.
     */
    public async verifyUpdatedDescription(expectedDescription: string): Promise<void> {
        const descriptionTextLocator = this.actions.getLocator(this.elements.getDescriptionText.selector);
        const actualDescription = await this.actions.getText(descriptionTextLocator, this.elements.getDescriptionText.name);
        await this.actions.assertNotEqual(
            actualDescription,
            expectedDescription,
            `Description "${actualDescription}" should not be equal to expected description "${expectedDescription}"`
        );
    }
}

export const searchUpdateWorkOrderPage = new SearchUpdateWorkOrderPage();
