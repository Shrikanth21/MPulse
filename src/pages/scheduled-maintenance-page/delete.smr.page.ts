import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { deleteWOPage } from "../work-order-page/delete.wko.page";
import { deleteCycleCountRecordPage } from "../Inventory-pages/cycle-count-records-pages/delete.cyc.record.page";

class DeleteSMRPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
        smrId: { selector: "//div[contains(@class,'textTruncate')]//span[@id='Code']", name: "SMR ID" },
        modalTitle: { selector: "//h4[@class='modal-title left']", name: "Modal Title" },
        closeModalButton: { selector: "//button[@ng-click='closeModal()']", name: "Close Modal Button" },
        searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
        getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
    };

    /**
     * Gets the text of the current SMR ID.
     * @returns The text of the SMR ID.
     */
    public async getCurrentSmrIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedSmrID = this.actions.getLocator(this.elementSelectors.smrId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedSmrID, this.elementSelectors.smrId.name);
        return await this.actions.getText(beforeSortedSmrID, this.elementSelectors.smrId.name);
    }

    /**
     * Clicks on the delete button for the current SMR Record.
     */
    public async clickOnDeleteCurrentRecordButton(linkedText: string): Promise<void> {
        await deleteWOPage.deleteCurrentWO();
        const modalTitle = await this.actions.getLocator(this.elementSelectors.modalTitle.selector);
        await this.actions.waitForElementToBeVisible(modalTitle, this.elementSelectors.modalTitle.name);
        if (await this.actions.isVisible(modalTitle, this.elementSelectors.modalTitle.name)) {
            await deleteCycleCountRecordPage.deleteLinkedWorkOrder(linkedText);
        }
    }

    /**
     * Verifies that the specified SMR Record has been deleted.
     * @param beforeDeleteSMRId The ID of the SMR Record before deletion.
     */
    public async verifySMRecordDeleted(beforeDeleteSMRId: string): Promise<void> {
        const smrRecordId = this.actions.getLocator(this.elementSelectors.smrId.selector);
        await this.actions.waitForElementToBeVisible(smrRecordId, this.elementSelectors.smrId.name);
        const smrRecordIdText = await this.actions.getText(smrRecordId, this.elementSelectors.smrId.name);
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
        const searchBarLocator = this.actions.getLocator(this.elementSelectors.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, smrId, this.elementSelectors.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(this.elementSelectors.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, this.elementSelectors.getEnterSearchBar.name);
    }
}

export const deleteSMRPage = new DeleteSMRPage();