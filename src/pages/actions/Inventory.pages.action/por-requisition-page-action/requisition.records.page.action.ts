import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { generateSupplierFormData } from "../../../../helper/requisition.supplier.details";
import { commonPageActions } from "../../common.page.actions";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { homePageActions } from "../../home-page-action/home.page.actions";
import { RequisitionRecordsPageLocators } from "../../../locators/Inventory.pages.locator/por-requisition-page-locator/requisition.records.page.locator";
import { workOrderRecordPageActions } from "../../workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { timeouts } from "../../../../helper/timeouts-config";

class RequisitionRecordsPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Navigates to the Requisition Records page.
     * @param homePageUrl 
     * @param gotItButtonText 
     * @param menuItemTitle 
     * @param subMenuItemTitle 
     * @param expectedUrl 
     */
    public async navigateToRequisitionRecordsPage(
        homePageUrl: string,
        gotItButtonText: string,
        menuItemTitle: string,
        subMenuItemTitle: string,
        expectedUrl: string
    ): Promise<void> {
        await this.actions.validateCurrentUrl(homePageUrl);
        await homePageActions.clickButtonByText(gotItButtonText);
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickLinkByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * fill Purchase Order Requisition with mandatory fields.
     */
    public async fillSupplierDetails(): Promise<void> {
        const formData = generateSupplierFormData();

        for (const [inputId, value] of Object.entries(formData)) {
            const inputLocator = this.actions.getLocator(`#${inputId} input`);
            await this.actions.waitForElementToBeVisible(inputLocator, inputId);
            await inputLocator.fill(value);
        }
    }

    /**
     * Saves the backorder details.
     */
    public async saveBackorderDetails(): Promise<void> {
        const saveButton = this.actions.getLocator(RequisitionRecordsPageLocators.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, RequisitionRecordsPageLocators.saveButton.name);
        await this.actions.click(saveButton, RequisitionRecordsPageLocators.saveButton.name);
    }

    /**
     * Closes the backorder details.
     */
    public async closeBackorderDetails(): Promise<void> {
        const closeButton = this.actions.getLocator(RequisitionRecordsPageLocators.closeBackOrderDetailsButton.selector);
        await this.actions.waitForElementToBeVisible(closeButton, RequisitionRecordsPageLocators.closeBackOrderDetailsButton.name);
        await this.actions.click(closeButton, RequisitionRecordsPageLocators.closeBackOrderDetailsButton.name);
    }

    /**
     * Creates a new Purchase Order Requisition with mandatory fields.
     * @param addButtonTitle The title of the add button.
     */
    public async createRequisitionWithMandatoryFields(
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        await commonPageActions.clickAddNewRecordButton();
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonPageActions.clickSaveButton();
    }

    /**
     * Updates the Quantity Received for a Purchase Order Requisition.
     * @param quantity The new quantity received.
     */
    public async updateReceivedQuantity(quantity: string): Promise<void> {
        const moreButton = this.actions.getLocator(RequisitionRecordsPageLocators.backorderMoreButton.selector);
        await this.actions.waitForElementToBeVisible(moreButton, RequisitionRecordsPageLocators.backorderMoreButton.name);
        await this.actions.click(moreButton, RequisitionRecordsPageLocators.backorderMoreButton.name);
        const editButton = this.actions.getLocator(RequisitionRecordsPageLocators.editBackOrderButton.selector);
        await this.actions.waitForElementToBeVisible(editButton, RequisitionRecordsPageLocators.editBackOrderButton.name);
        await this.actions.click(editButton, RequisitionRecordsPageLocators.editBackOrderButton.name);
        await this.actions.click(this.actions.getLocator(RequisitionRecordsPageLocators.zeroQuantityText.selector).nth(1), RequisitionRecordsPageLocators.zeroQuantityText.name);
        const inputField = this.actions.getLocator(RequisitionRecordsPageLocators.backOrderDetailsInput.selector);
        await this.actions.waitForElementToBeVisible(inputField, RequisitionRecordsPageLocators.backOrderDetailsInput.name);
        await this.actions.typeText(inputField, quantity, RequisitionRecordsPageLocators.backOrderDetailsInput.name);
        await commonPageActions.clickDivById("BackOrderDetails-header");
        await this.saveBackorderDetails();
        await this.closeBackorderDetails();
        await commonPageActions.clickSaveButton();
    }

    /**
     * Closes a Purchase Order Requisition record.
     * @param status The status text to verify.
     * @param yesButton The text of the confirmation button.
     */
    public async closeRequisitionRecord(tabName: string, status: string, yesButton: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickSpanByText(status);
        await commonPageActions.clickSpanByText(yesButton);
    }

    /**
     * Validates the Received Quantity displayed in the specified tab.
     * @param tabName The name of the tab to activate.
     * @param quantity The expected quantity to validate.
     */
    public async validateReceivedQuantity(tabName: string, quantity: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const quantityLocator = this.actions.getLocator(RequisitionRecordsPageLocators.receivedQuantityText(quantity));
        await this.actions.waitForElementToBeVisible(quantityLocator, `Quantity: ${quantity}`);
        const actualQuantity = await this.actions.getText(quantityLocator, `Quantity: ${quantity}`);
        await this.actions.assertEqual(actualQuantity, quantity, `Quantity Received: ${quantity}`);
    }

    /**
     * Creates a new Purchase Order Requisition record from List view.
     * This method clicks the plus icon to create a new record and saves it.
     */
    public async listViewPOR(): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(CommonPageLocators.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(RequisitionRecordsPageLocators.maximizeButton.selector);
        await this.actions.click(maximizeButton, RequisitionRecordsPageLocators.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(RequisitionRecordsPageLocators.plusIcon.selector), RequisitionRecordsPageLocators.plusIcon.name);
        const saveBtn = this.actions.getLocator(RequisitionRecordsPageLocators.saveIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, RequisitionRecordsPageLocators.saveIcon.name);
        await this.actions.click(saveBtn, RequisitionRecordsPageLocators.saveIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(RequisitionRecordsPageLocators.hideButton.selector);
        await this.actions.click(minimizeButton, RequisitionRecordsPageLocators.hideButton.name);
    }

    /**
     * Closes a Purchase Order Requisition record from the List view.
     * @param closeRequestButton The text of the close request button.
     * @param yesButton The text of the confirmation button.
     */
    public async closeRequisitionRecordFromListView(closeRequestButton: string, yesButton: string): Promise<void> {
        await commonPageActions.clickButtonByTitle(closeRequestButton);
        await commonPageActions.clickSpanByText(yesButton);
    }

    /**
     * Fills in the mandatory fields for a Purchase Order Requisition record.
     * @param tabName The name of the tab to activate.
     * @param dropdownSelections The dropdown selections to make.
     */
    public async fillMandatoryFields(tabName: string, dropdownSelections: { ddType: string[] }, divTitle: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickEditButton();
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonPageActions.clickSaveButton();
    }

    /**
     * Gets the inventory stock quantity for a specific tab.
     * @param tabText The text of the tab to retrieve the stock quantity from.
     * @returns The stock quantity as a string.
     */
    public async getInventoryStockQty(tabText: string): Promise<string> {
        const inventoryListItem = this.actions.getLocator(RequisitionRecordsPageLocators.dxLink.selector);
        await this.actions.waitForElementToBeVisible(inventoryListItem, RequisitionRecordsPageLocators.dxLink.name);
        await this.actions.click(inventoryListItem, RequisitionRecordsPageLocators.dxLink.name);
        await commonPageActions.clickTabByText(tabText);
        const checkbox = this.actions.getLocator(RequisitionRecordsPageLocators.stockedItemCheckbox.selector).first();
        const isChecked = await this.actions.isCheckboxChecked(checkbox, RequisitionRecordsPageLocators.stockedItemCheckbox.name);
        if (!isChecked) {
            const stockedItemSpan = await CommonPageLocators.getSpanByText('Stocked Item?');
            await this.actions.mouseHoverAndClick(this.actions.getLocator(stockedItemSpan), 'Stocked Item?');
            const editFieldIcon = this.actions.getLocator(RequisitionRecordsPageLocators.editField.selector);
            await this.actions.waitForElementToBeVisible(editFieldIcon, RequisitionRecordsPageLocators.editField.name);
            await this.actions.click(editFieldIcon, RequisitionRecordsPageLocators.editField.name);
            const stockAreaInputField = this.actions.getLocator(RequisitionRecordsPageLocators.stockAreaInputField.selector).nth(1);
            await this.actions.waitForElementToBeVisible(stockAreaInputField, RequisitionRecordsPageLocators.stockAreaInputField.name);
            await this.actions.click(stockAreaInputField, RequisitionRecordsPageLocators.stockAreaInputField.name);
            await commonPageActions.clickSaveButton();
        } else {
            console.log('Checkbox is already checked and visible');
        }
        const quantityLocator = this.actions.getLocator(RequisitionRecordsPageLocators.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, RequisitionRecordsPageLocators.stockAreaListRows.name);
        const beforeClosingQuantity = await this.actions.getText(quantityLocator, RequisitionRecordsPageLocators.stockAreaListRows.name);
        console.log(`Before Closing Quantity: ${beforeClosingQuantity}`);
        return beforeClosingQuantity;
    }

    /**
     * Validates the linked inventory quantity after closing a record.
     * @param tabText The text of the tab to validate.
     * @param beforeCloseStockQty The stock quantity before closing the record.
     */
    public async validateLinkedInventoryQuantity(
        tabText: string,
        beforeCloseStockQty: string,
        newQuantity: string
    ): Promise<void> {
        const inventoryListItem = this.actions.getLocator(RequisitionRecordsPageLocators.dxLink.selector);
        await this.actions.waitForElementToBeVisible(inventoryListItem, RequisitionRecordsPageLocators.dxLink.name);
        await this.actions.click(inventoryListItem, RequisitionRecordsPageLocators.dxLink.name);
        await commonPageActions.clickTabByText(tabText);
        const quantityLocator = this.actions.getLocator(RequisitionRecordsPageLocators.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, RequisitionRecordsPageLocators.stockAreaListRows.name);
        const afterCloseStockQtyText = await this.actions.getText(quantityLocator, RequisitionRecordsPageLocators.stockAreaListRows.name);
        const afterCloseStockQty = Number(afterCloseStockQtyText);
        const beforeQty = Number(beforeCloseStockQty);
        const addedQty = Number(newQuantity);
        const expectedQty = beforeQty + addedQty;
        await this.actions.assertEqual(
            afterCloseStockQty.toString(),
            expectedQty.toString(),
            `Linked Inventory Quantity after closing is incorrect. Expected: ${expectedQty}, Actual: ${afterCloseStockQty}`
        );
    }

    /**
     * Updates the order quantity for a specific tab.
     * @param tabText The text of the tab to update.
     * @param newQuantity The new quantity to set.
     */
    public async updateOrderQuantity(tabText: string, newQuantity: string): Promise<void> {
        await commonPageActions.clickLinkByText('Requisition Records');
        await commonPageActions.clickTabByText(tabText);
        const inventoryMoreBtnEl = this.actions.getLocator(RequisitionRecordsPageLocators.moreButton.selector);
        await this.actions.waitForElementToBeVisible(inventoryMoreBtnEl, RequisitionRecordsPageLocators.moreButton.name);
        await this.actions.click(inventoryMoreBtnEl, RequisitionRecordsPageLocators.moreButton.name);
        const editBtnEl = this.actions.getLocator(RequisitionRecordsPageLocators.editRecordButton.selector);
        await this.actions.waitForElementToBeVisible(editBtnEl, RequisitionRecordsPageLocators.editRecordButton.name);
        await this.actions.click(editBtnEl, RequisitionRecordsPageLocators.editRecordButton.name);
        const quantityLocatorEl = this.actions.getLocator(RequisitionRecordsPageLocators.receivedOneQuantityText.selector);
        await this.actions.waitForElementToBeVisible(quantityLocatorEl, RequisitionRecordsPageLocators.receivedOneQuantityText.name);
        await this.actions.click(quantityLocatorEl, RequisitionRecordsPageLocators.receivedOneQuantityText.name);
        const inputField = this.actions.getLocator(RequisitionRecordsPageLocators.financialInputField.selector).first();
        await this.actions.waitForElementToBeVisible(inputField, RequisitionRecordsPageLocators.financialInputField.name);
        await this.actions.typeText(inputField, newQuantity, RequisitionRecordsPageLocators.financialInputField.name);
        const saveButton = this.actions.getLocator(RequisitionRecordsPageLocators.financialSaveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, RequisitionRecordsPageLocators.financialSaveButton.name);
        await this.actions.click(saveButton, RequisitionRecordsPageLocators.financialSaveButton.name);
    }

    /**
     * Closes a requisition record with a specific date.
     * @param tabText The text of the tab to close.
     * @param closeButtonText The text of the close button.
     * @param yesButtonText The text of the yes button.
     * @param date The date to set in the popup.
     */
    public async closeRequisitionRecordWithDate(
        tabText: string,
        closeButtonText: string,
        yesButtonText: string,
        date: string,
        inputOkButtonText: string
    ): Promise<void> {
        await commonPageActions.clickTabByText(tabText);
        await commonPageActions.clickSpanByText(closeButtonText);
        await commonPageActions.clickSpanByText(yesButtonText);
        const locator = await this.actions.getLocator(RequisitionRecordsPageLocators.popupTextInput.selector);
        await this.actions.waitForElementToBeVisible(locator, RequisitionRecordsPageLocators.popupTextInput.name);
        await this.actions.typeText(locator, date, RequisitionRecordsPageLocators.popupTextInput.name);
        await this.actions.waitForClickable(this.actions.getLocator(RequisitionRecordsPageLocators.okInput.selector), RequisitionRecordsPageLocators.okInput.name);
        await this.actions.click(this.actions.getLocator(RequisitionRecordsPageLocators.okInput.selector), RequisitionRecordsPageLocators.okInput.name);
        await workOrderRecordPageActions.clickOnSecondClosePopup(inputOkButtonText);
    }
}

export const requisitionRecordsPageActions = new RequisitionRecordsPageActions();
