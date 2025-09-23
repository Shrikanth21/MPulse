import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { generateSupplierFormData } from "../../../helper/requisition.supplier.details";
import { timeouts } from "../../../helper/timeouts-config";
import { workOrderPage } from "../../work-order-page/WorkOrderPage.page";
import { homePageActions } from "../../actions/home.page.action/home.page.actions";
import { commonPageActions } from "../../actions/common.page.actions";
import { CommonPageLocators } from "../../locators/common.page.locator";

class RequisitionRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        backorderMoreButton: { selector: "//div[@class='moreBtn ng-scope']", name: "Backorder More Button" },
        editBackOrderButton: { selector: "//div[@id='BackOrderDetails']/descendant::a[@title='Edit']", name: "Edit BackOrder Button" },
        backOrderDetailsInput: { selector: "//div[@id='BackOrderDetails']//input[@class='dx-texteditor-input']", name: "BackOrder Details Input" },
        closeBackOrderDetailsButton: { selector: "//div[@id='BackOrderDetails-header']/descendant::i", name: "Close BackOrder Details Button" },
        zeroQuantityText: { selector: "//div[@id='BackOrderDetails']/descendant::tr//td//div[text()='0.00']", name: "Zero Quantity Text" },
        saveButton: { selector: "//div[@id='BackOrderDetails']/descendant::a[@title='Save']", name: "Save Button" },
        receivedQuantityText: (quantity: string): string => `//div[@id='InventoryList']/descendant::div[text()='${quantity}']`,
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        plusIcon: { selector: '//div[@ng-show="listviewdisplaystatus"]/descendant::div[@class="action-menu-items"]/descendant::a[@title="Add new record"]', name: "Add New Record Icon" },
        saveIcon: { selector: "//div[@ng-show='listviewdisplaystatus']/descendant::a[@title='Save']", name: "Save Icon" },
        hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
        moreButton: { selector: "//div[@class='row panelHeader']/descendant::div[@class='moreBtn']", name: "More Button" },
        editRecordButton: { selector: "//li[@ng-click='showEditMode()']", name: "Edit Record Button" },
        receivedOneQuantityText: { selector: "//tr/following::td/following::div[text()='1.00']", name: "Received Quantity 1.00 Text" },
        dxLink: { selector: "//a[@class='dx-link ng-scope']", name: "DX Link" },
        stockAreaListRows: { selector: "//gridcontrol[@id='StockAreaList']/descendant::tr[contains(@class,'dx-row dx-data')]/descendant::td", name: "Stock Area List Rows" },
        stockedItemCheckbox: { selector: '//div[@id="StockedItem" and @aria-checked="false"]', name: "Stocked Item Unchecked Checkbox" },
        editField: { selector: "//div[@id='StockAreaTab']/descendant::span[@title='Edit Field']", name: "Edit Field Icon" },
        financialInputField: { selector: "//div[@id='FinancialTab']/descendant::input[@class='dx-texteditor-input']", name: "Financial Input Field" },
        financialSaveButton: { selector: "//div[@id='FinancialTab']/descendant::a[@title='Save']", name: "Financial Save Button" },
        stockAreaInputField: { selector: "//div[@id='StockedItem']", name: "Stock Area Input Field" },
        popupTextInput: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Popup Text Input" },
        okInput: { selector: "[value='Ok']", name: "Ok Input" },
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
        const saveButton = this.actions.getLocator(this.elements.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, this.elements.saveButton.name);
        await this.actions.click(saveButton, this.elements.saveButton.name);
    }

    /**
     * Closes the backorder details.
     */
    public async closeBackorderDetails(): Promise<void> {
        const closeButton = this.actions.getLocator(this.elements.closeBackOrderDetailsButton.selector);
        await this.actions.waitForElementToBeVisible(closeButton, this.elements.closeBackOrderDetailsButton.name);
        await this.actions.click(closeButton, this.elements.closeBackOrderDetailsButton.name);
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
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonPageActions.clickSaveButton();
    }

    /**
     * Updates the Quantity Received for a Purchase Order Requisition.
     * @param quantity The new quantity received.
     */
    public async updateReceivedQuantity(quantity: string): Promise<void> {
        const moreButton = this.actions.getLocator(this.elements.backorderMoreButton.selector);
        await this.actions.waitForElementToBeVisible(moreButton, this.elements.backorderMoreButton.name);
        await this.actions.click(moreButton, this.elements.backorderMoreButton.name);
        const editButton = this.actions.getLocator(this.elements.editBackOrderButton.selector);
        await this.actions.waitForElementToBeVisible(editButton, this.elements.editBackOrderButton.name);
        await this.actions.click(editButton, this.elements.editBackOrderButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.zeroQuantityText.selector).nth(1), this.elements.zeroQuantityText.name);
        const inputField = this.actions.getLocator(this.elements.backOrderDetailsInput.selector);
        await this.actions.waitForElementToBeVisible(inputField, this.elements.backOrderDetailsInput.name);
        await this.actions.typeText(inputField, quantity, this.elements.backOrderDetailsInput.name);
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
        const quantityLocator = this.actions.getLocator(this.elements.receivedQuantityText(quantity));
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
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.saveIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.saveIcon.name);
        await this.actions.click(saveBtn, this.elements.saveIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
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
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonPageActions.clickSaveButton();
    }

    /**
     * Gets the inventory stock quantity for a specific tab.
     * @param tabText The text of the tab to retrieve the stock quantity from.
     * @returns The stock quantity as a string.
     */
    public async getInventoryStockQty(tabText: string): Promise<string> {
        const inventoryListItem = this.actions.getLocator(this.elements.dxLink.selector);
        await this.actions.waitForElementToBeVisible(inventoryListItem, this.elements.dxLink.name);
        await this.actions.click(inventoryListItem, this.elements.dxLink.name);
        await commonPageActions.clickTabByText(tabText);
        // const checkbox = this.actions.getLocator(this.elements.stockedItemCheckbox.selector).first();
        // const isChecked = await this.actions.isCheckboxChecked(checkbox, this.elements.stockedItemCheckbox.name);
        // if (isChecked) {
        //     console.log('✅ Checkbox is already checked and visible');
        // } else {
        //     await commonActionPage.clickBySpanText('Stocked Item?');
        //     const editFieldIcon = this.actions.getLocator(this.elements.editField.selector);
        //     await this.actions.waitForElementToBeVisible(editFieldIcon, this.elements.editField.name);
        //     await this.actions.click(editFieldIcon, this.elements.editField.name);
        //     const stockAreaInputField = this.actions.getLocator(this.elements.stockAreaInputField.selector).first();
        //     await this.actions.waitForElementToBeVisible(stockAreaInputField, this.elements.stockAreaInputField.name);
        //     await this.actions.click(stockAreaInputField, this.elements.stockAreaInputField.name);
        // }
        const quantityLocator = this.actions.getLocator(this.elements.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, this.elements.stockAreaListRows.name);
        const beforeClosingQuantity = await this.actions.getText(quantityLocator, this.elements.stockAreaListRows.name);
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
        const inventoryListItem = this.actions.getLocator(this.elements.dxLink.selector);
        await this.actions.waitForElementToBeVisible(inventoryListItem, this.elements.dxLink.name);
        await this.actions.click(inventoryListItem, this.elements.dxLink.name);
        await commonPageActions.clickTabByText(tabText);
        const quantityLocator = this.actions.getLocator(this.elements.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, this.elements.stockAreaListRows.name);
        const afterCloseStockQtyText = await this.actions.getText(quantityLocator, this.elements.stockAreaListRows.name);
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
        const inventoryMoreBtnEl = this.actions.getLocator(this.elements.moreButton.selector);
        await this.actions.waitForElementToBeVisible(inventoryMoreBtnEl, this.elements.moreButton.name);
        await this.actions.click(inventoryMoreBtnEl, this.elements.moreButton.name);
        const editBtnEl = this.actions.getLocator(this.elements.editRecordButton.selector);
        await this.actions.waitForElementToBeVisible(editBtnEl, this.elements.editRecordButton.name);
        await this.actions.click(editBtnEl, this.elements.editRecordButton.name);
        const quantityLocatorEl = this.actions.getLocator(this.elements.receivedOneQuantityText.selector);
        await this.actions.waitForElementToBeVisible(quantityLocatorEl, this.elements.receivedOneQuantityText.name);
        await this.actions.click(quantityLocatorEl, this.elements.receivedOneQuantityText.name);
        const inputField = this.actions.getLocator(this.elements.financialInputField.selector).first();
        await this.actions.waitForElementToBeVisible(inputField, this.elements.financialInputField.name);
        await this.actions.typeText(inputField, newQuantity, this.elements.financialInputField.name);
        const saveButton = this.actions.getLocator(this.elements.financialSaveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, this.elements.financialSaveButton.name);
        await this.actions.click(saveButton, this.elements.financialSaveButton.name);
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
        const locator = await this.actions.getLocator(this.elements.popupTextInput.selector);
        await this.actions.waitForElementToBeVisible(locator, this.elements.popupTextInput.name);
        await this.actions.typeText(locator, date, this.elements.popupTextInput.name);
        await this.actions.waitForClickable(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await workOrderPage.clickOnSecondClosePopup(inputOkButtonText);
    }
}

export const requisitionRecordsPage = new RequisitionRecordsPage();
