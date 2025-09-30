import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { wkoDeletePageAction } from "../workorder.page.action/work-order-records-page-action/wko.delete.page.action";
import { cycDeleteRecordPageActions } from "../Inventory.pages.action/cycle-count-records-pages-action/cyc.delete.record.page.action";
import { smrDeleteRecordLocators } from "../../locators/scheduled-maintenance-page-locator/smr.delete.page.locator";

class SMRDeletePageAction {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the text of the current SMR ID.
     * @returns The text of the SMR ID.
     */
    public async getCurrentSmrIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedSmrID = this.actions.getLocator(smrDeleteRecordLocators.smrId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedSmrID, smrDeleteRecordLocators.smrId.name);
        return await this.actions.getText(beforeSortedSmrID, smrDeleteRecordLocators.smrId.name);
    }

    /**
     * Clicks on the delete button for the current SMR Record.
     */
    public async clickOnDeleteCurrentRecordButton(linkedText: string): Promise<void> {
        await wkoDeletePageAction.deleteCurrentWO();
        const modalTitle = await this.actions.getLocator(smrDeleteRecordLocators.modalTitle.selector);
        await this.actions.waitForElementToBeVisible(modalTitle, smrDeleteRecordLocators.modalTitle.name);
        if (await this.actions.isVisible(modalTitle, smrDeleteRecordLocators.modalTitle.name)) {
            await cycDeleteRecordPageActions.deleteLinkedWorkOrder(linkedText);
        }
    }

    /**
     * Verifies that the specified SMR Record has been deleted.
     * @param beforeDeleteSMRId The ID of the SMR Record before deletion.
     */
    public async verifySMRecordDeleted(beforeDeleteSMRId: string): Promise<void> {
        const smrRecordId = this.actions.getLocator(smrDeleteRecordLocators.smrId.selector);
        await this.actions.waitForElementToBeVisible(smrRecordId, smrDeleteRecordLocators.smrId.name);
        const smrRecordIdText = await this.actions.getText(smrRecordId, smrDeleteRecordLocators.smrId.name);
        await this.actions.assertNotEqual(
            smrRecordIdText,
            beforeDeleteSMRId,
            `SMR ID "${smrRecordIdText}" should not be equal to the deleted SMR ID "${beforeDeleteSMRId}"`
        );
    }

    /**
     * Searches for a deleted SMR by its ID.
     * @param smrId The ID of the SMR to search for.
     */
    public async searchDeletedSmr(smrId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(smrDeleteRecordLocators.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, smrId, smrDeleteRecordLocators.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(smrDeleteRecordLocators.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, smrDeleteRecordLocators.getEnterSearchBar.name);
    }
}

export const smrDeletePageAction = new SMRDeletePageAction();
