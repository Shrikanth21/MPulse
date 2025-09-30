import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { WkoSearchUpdatePageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.search.update.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";
import { CommonPageLocators } from "../../../locators/common.page.locator";

class WkoSearchUpdatePageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the work order ID from the UI.
     * @returns The work order ID as a string.
     */
    public async getWorkOrderId(): Promise<string> {
        const workOrderIdLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.workOrderIdLabel.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, WkoSearchUpdatePageLocators.workOrderIdLabel.name);
        return await this.actions.getText(workOrderIdLocator, WkoSearchUpdatePageLocators.workOrderIdLabel.name);
    }

    /**
     * Gets the description text from the work order page.
     * @returns The description text as a string.
     */
    public async getDescription(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const descriptionLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.getDescriptionText.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, WkoSearchUpdatePageLocators.getDescriptionText.name);
        return await this.actions.getText(descriptionLocator, WkoSearchUpdatePageLocators.getDescriptionText.name);
    }

    /**
     * Searches for a work order by its ID.
     * @param workOrderId The ID of the work order to search for.
     */
    public async searchWorkOrder(workOrderId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, workOrderId, WkoSearchUpdatePageLocators.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, WkoSearchUpdatePageLocators.getEnterSearchBar.name);
    }

    /**
     * Verifies that the search result matches the expected work order ID.
     * @param beforeSearchResultText The expected work order ID before the search.
     */
    public async verifySearchResult(beforeSearchResultText: string): Promise<void> {
        const afterSearchResultTextEl = this.actions.getLocator(WkoSearchUpdatePageLocators.getClickonTask.selector);
        await this.actions.waitForElementToBeVisible(afterSearchResultTextEl, WkoSearchUpdatePageLocators.getClickonTask.name);
        const afterSearchResultText = await this.actions.getText(afterSearchResultTextEl, WkoSearchUpdatePageLocators.getClickonTask.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.assertEqual(afterSearchResultText, beforeSearchResultText);
    }

    /**
     * Clicks on the search result to open the work order details.
     */
    public async clickOnSearchResult(): Promise<void> {
        const searchResultLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.getClickonTask.selector);
        await this.actions.waitForElementToBeVisible(searchResultLocator, WkoSearchUpdatePageLocators.getClickonTask.name);
        await this.actions.click(searchResultLocator, WkoSearchUpdatePageLocators.getClickonTask.name);
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
        const descriptionLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.descriptionInput.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, WkoSearchUpdatePageLocators.descriptionInput.name);
        await this.actions.typeText(descriptionLocator, newDescription, WkoSearchUpdatePageLocators.descriptionInput.name);
    }

    /**
     * Clicks on the save button to save the changes made to the work order.
     */
    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.getSaveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, WkoSearchUpdatePageLocators.getSaveButton.name);
        await this.actions.click(saveButtonLocator, WkoSearchUpdatePageLocators.getSaveButton.name);
    }

    /**
     * Verifies that the updated description is not equal to the previous description.
     * @param expectedDescription The expected description to verify against.
     */
    public async verifyUpdatedDescription(expectedDescription: string): Promise<void> {
        const descriptionTextLocator = this.actions.getLocator(WkoSearchUpdatePageLocators.getDescriptionText.selector);
        await this.actions.waitForElementToBeVisible(descriptionTextLocator, WkoSearchUpdatePageLocators.getDescriptionText.name);
        const actualDescription = await this.actions.getText(descriptionTextLocator, WkoSearchUpdatePageLocators.getDescriptionText.name);
        await this.actions.assertNotEqual(
            actualDescription,
            expectedDescription,
            `Description "${actualDescription}" should not be equal to expected description "${expectedDescription}"`
        );
    }
}

export const wkoSearchUpdatePageActions = new WkoSearchUpdatePageActions();
