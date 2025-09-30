import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import { commonPageActions } from "../../common.page.actions";
import { wkoDeletePageAction } from "../../workorder.page.action/work-order-records-page-action/wko.delete.page.action";
import { wkoSearchUpdatePageActions } from "../../workorder.page.action/work-order-records-page-action/wko.search.update.page.action";
import { CycDeleteRecordPageLocators } from "../../../locators/Inventory.pages.locator/cycle.count-records-page-locator/cyc.delete.record.page.locator";

class CycDeleteRecordPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the text of the current Cycle Count ID.
     * @returns The text of the Cycle Count ID.
     */
    public async getCurrentCycleCountIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedCycID = this.actions.getLocator(CycDeleteRecordPageLocators.cycId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedCycID, CycDeleteRecordPageLocators.cycId.name);
        return await this.actions.getText(beforeSortedCycID, CycDeleteRecordPageLocators.cycId.name);
    }

    /**
     * Clicks on the delete button for the current Cycle Count Record.
     */
    public async clickOnDeleteCurrentRecordButton(linkedText: string): Promise<void> {
        await wkoDeletePageAction.deleteCurrentWO();
        const modalTitle = await this.actions.getLocator(CycDeleteRecordPageLocators.modalTitle.selector);
        await this.actions.waitForElementToBeVisible(modalTitle, CycDeleteRecordPageLocators.modalTitle.name);
        if (await this.actions.isVisible(modalTitle, CycDeleteRecordPageLocators.modalTitle.name)) {
            await this.deleteLinkedWorkOrder(linkedText);
        }
    }

    /**
     * Verifies that the specified Cycle Count Record has been deleted.
     * @param recordId The ID of the Cycle Count Record to verify.
     */
    public async verifyCycleCountRecordDeleted(beforeDeleteCYCId: string): Promise<void> {
        const cycRecordId = this.actions.getLocator(CycDeleteRecordPageLocators.cycId.selector);
        await this.actions.waitForElementToBeVisible(cycRecordId, CycDeleteRecordPageLocators.cycId.name);
        const cycRecordIdText = await this.actions.getText(cycRecordId, CycDeleteRecordPageLocators.cycId.name);
        await this.actions.assertNotEqual(
            cycRecordIdText,
            beforeDeleteCYCId,
            `Cycle Count ID "${cycRecordIdText}" should not be equal to the deleted Cycle Count ID "${beforeDeleteCYCId}"`
        );
    }

    /**
     * Searches for a work order by its ID.
     * @param workOrderId The ID of the work order to search for.
     */
    public async searchDeletedCyc(cycId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(CycDeleteRecordPageLocators.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, cycId, CycDeleteRecordPageLocators.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(CycDeleteRecordPageLocators.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, CycDeleteRecordPageLocators.getEnterSearchBar.name);
    }

    /**
     * Gets the text of the linked Work Order.
     * @returns The text of the linked Work Order.
     */
    public async getLinkedWorkOrderText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const linkedWOLocator = this.actions.getLocator(CycDeleteRecordPageLocators.getLinkedWKO.selector);
        await this.actions.waitForElementToBeVisible(linkedWOLocator, CycDeleteRecordPageLocators.getLinkedWKO.name);
        return await this.actions.getText(linkedWOLocator, CycDeleteRecordPageLocators.getLinkedWKO.name);
    }

    /**
     * Deletes the linked Work Order.
     */
    public async deleteLinkedWorkOrder(linkedText: string): Promise<void> {
        const linkedWorkOrder = await this.getLinkedWorkOrderText();
        const closeModalButton = this.actions.getLocator(CycDeleteRecordPageLocators.closeModalButton.selector);
        await this.actions.waitForElementToBeVisible(closeModalButton, CycDeleteRecordPageLocators.closeModalButton.name);
        await this.actions.click(closeModalButton, CycDeleteRecordPageLocators.closeModalButton.name);
        await wkoSearchUpdatePageActions.searchWorkOrder(linkedWorkOrder);
        await wkoSearchUpdatePageActions.clickOnSearchResult();
        await wkoDeletePageAction.deleteCurrentWO();
        await commonPageActions.clickLinkByText(linkedText);
        await wkoDeletePageAction.deleteCurrentWO();
    }
}

export const cycDeleteRecordPageActions = new CycDeleteRecordPageActions();
