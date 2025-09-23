import { Page, selectors } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { deleteWOPage } from "../../work-order-page/delete.wko.page";
import { timeouts } from "../../../helper/timeouts-config";
import { searchUpdateWorkOrderPage } from "../../work-order-page/search.update.wko.page";
import { commonPageActions } from "../../actions/common.page.actions";

class DeleteCycleCountRecordPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
        cycId: { selector: "//div[contains(@class,'textTruncate')]//span[@id='Code']", name: "Cycle Count Code" },
        getLinkedWKO: { selector: "//div[@class='confirm-delete-inner ng-scope']/descendant::td[contains(.,'WKO')]", name: "Linked Work Order" },
        modalTitle: { selector: "//h4[@class='modal-title left']", name: "Modal Title" },
        closeModalButton: { selector: "//button[@ng-click='closeModal()']", name: "Close Modal Button" },
        searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
        getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
    };

    /**
     * Gets the text of the current Cycle Count ID.
     * @returns The text of the Cycle Count ID.
     */
    public async getCurrentCycleCountIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedCycID = this.actions.getLocator(this.elementSelectors.cycId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedCycID, this.elementSelectors.cycId.name);
        return await this.actions.getText(beforeSortedCycID, this.elementSelectors.cycId.name);
    }

    /**
     * Clicks on the delete button for the current Cycle Count Record.
     */
    public async clickOnDeleteCurrentRecordButton(linkedText: string): Promise<void> {
        await deleteWOPage.deleteCurrentWO();
        const modalTitle = await this.actions.getLocator(this.elementSelectors.modalTitle.selector);
        await this.actions.waitForElementToBeVisible(modalTitle, this.elementSelectors.modalTitle.name);
        if (await this.actions.isVisible(modalTitle, this.elementSelectors.modalTitle.name)) {
            await this.deleteLinkedWorkOrder(linkedText);
        }
    }

    /**
     * Verifies that the specified Cycle Count Record has been deleted.
     * @param recordId The ID of the Cycle Count Record to verify.
     */
    public async verifyCycleCountRecordDeleted(beforeDeleteCYCId: string): Promise<void> {
        const cycRecordId = this.actions.getLocator(this.elementSelectors.cycId.selector);
        await this.actions.waitForElementToBeVisible(cycRecordId, this.elementSelectors.cycId.name);
        const cycRecordIdText = await this.actions.getText(cycRecordId, this.elementSelectors.cycId.name);
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
    public async searchDeleTedCyc(cycId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(this.elementSelectors.searchBarInput.selector);
        await this.actions.typeText(searchBarLocator, cycId, this.elementSelectors.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(this.elementSelectors.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, this.elementSelectors.getEnterSearchBar.name);
    }

    /**
     * Gets the text of the linked Work Order.
     * @returns The text of the linked Work Order.
     */
    public async getLinkedWorkOrderText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const linkedWOLocator = this.actions.getLocator(this.elementSelectors.getLinkedWKO.selector);
        await this.actions.waitForElementToBeVisible(linkedWOLocator, this.elementSelectors.getLinkedWKO.name);
        return await this.actions.getText(linkedWOLocator, this.elementSelectors.getLinkedWKO.name);
    }

    /**
     * Deletes the linked Work Order.
     */
    public async deleteLinkedWorkOrder(linkedText: string): Promise<void> {
        const linkedWorkOrder = await this.getLinkedWorkOrderText();
        const closeModalButton = this.actions.getLocator(this.elementSelectors.closeModalButton.selector);
        await this.actions.waitForElementToBeVisible(closeModalButton, this.elementSelectors.closeModalButton.name);
        await this.actions.click(closeModalButton, this.elementSelectors.closeModalButton.name);
        await searchUpdateWorkOrderPage.searchWorkOrder(linkedWorkOrder);
        await searchUpdateWorkOrderPage.clickOnSearchResult();
        await deleteWOPage.deleteCurrentWO();
        await commonPageActions.clickLinkByText(linkedText);
        await deleteWOPage.deleteCurrentWO();
    }
}

export const deleteCycleCountRecordPage = new DeleteCycleCountRecordPage();
