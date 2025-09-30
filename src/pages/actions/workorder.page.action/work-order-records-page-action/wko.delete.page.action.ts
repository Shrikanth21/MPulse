import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import { WkoDeletePageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.delete.page.locator";

class WkoDeletePageAction {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the text of the current Work Order ID.
     * @returns The text of the Work Order ID.
     */
    public async getCurrentWorkOrderIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.large);
        const beforeSortedWoID = this.actions.getLocator(WkoDeletePageLocators.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedWoID, WkoDeletePageLocators.getWorkOrderId.name);
        return await this.actions.getText(beforeSortedWoID, WkoDeletePageLocators.getWorkOrderId.name);
    }

    /**
     * Deletes the current Work Order.
     */
    public async deleteCurrentWO(): Promise<void> {
        const deleteWoLocator = this.actions.getLocator(WkoDeletePageLocators.deleteWOPage.selector);
        await this.actions.waitForElementToBeVisible(deleteWoLocator, WkoDeletePageLocators.deleteWOPage.name);
        await this.actions.click(deleteWoLocator, WkoDeletePageLocators.deleteWOPage.name);
        const continueButtonEL = this.actions.getLocator(WkoDeletePageLocators.continueButton.selector);
        await this.actions.click(continueButtonEL, WkoDeletePageLocators.continueButton.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    /**
     * Verifies that the Work Order ID is no longer present after deletion.
     * @param beforeDeleteWorkOrderId The Work Order ID before deletion.
     */
    public async verifyDeletedWOId(beforeDeleteWorkOrderId: string): Promise<void> {
        const workOrderIdLocator = this.actions.getLocator(WkoDeletePageLocators.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, WkoDeletePageLocators.getWorkOrderId.name);
        const workOrderIdText = await this.actions.getText(workOrderIdLocator, WkoDeletePageLocators.getWorkOrderId.name);
        await this.actions.assertNotEqual(
            workOrderIdText,
            beforeDeleteWorkOrderId,
            `Work Order ID "${workOrderIdText}" should not be equal to the deleted Work Order ID "${beforeDeleteWorkOrderId}"`
        );
    }

    /**
     * Verifies that the Work Order ID is not present in the search results after deletion.
     * @param beforeDeleteWorkOrderId The Work Order ID before deletion.
     */
    public async verifyDeletedWOIdInSearchResults(beforeDeleteWorkOrderId: string): Promise<void> {
        const workOrderIdLocator = this.actions.getLocator(WkoDeletePageLocators.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, WkoDeletePageLocators.getWorkOrderId.name);
        const workOrderIdText = await this.actions.getText(workOrderIdLocator, WkoDeletePageLocators.getWorkOrderId.name);
        await this.actions.assertNotEqual(
            workOrderIdText,
            beforeDeleteWorkOrderId,
            `Work Order ID "${workOrderIdText}" should not be equal to the deleted Work Order ID "${beforeDeleteWorkOrderId}"`
        );
    }

    /**
     * Verifies that the "No matches found" message is displayed.
     */
    public async verifyNoMatchesFoundMessage(): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const noMatchesFoundLocator = this.actions.getLocator(WkoDeletePageLocators.noMatchesFound.selector);
        await this.actions.waitForElementToBeVisible(noMatchesFoundLocator, WkoDeletePageLocators.noMatchesFound.name);
        const noMatchesFoundText = await this.actions.getText(noMatchesFoundLocator, WkoDeletePageLocators.noMatchesFound.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.assertEqual(
            noMatchesFoundText.trim(),
            "No matches found.",
            `Expected "No matches found." but got "${noMatchesFoundText}"`
        );
    }
}

export const wkoDeletePageAction = new WkoDeletePageAction();
