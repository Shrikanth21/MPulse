import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { homePage } from "../../home-page/Home.page";
import { commonActionPage } from "../../common.action.page";
import { generateSupplierFormData } from "../../../helper/requisition.supplier.details";
import { timeouts } from "../../../helper/timeouts-config";
import { mrAutoConvertPage } from "../../work-order-page/maintenance-request-records-pages/mr.auto.convert.page";
import { maintenanceRequestRecordsPage } from "../../work-order-page/maintenance-request-records-pages/maintenanceRequestRecords.page";
import { workOrderPage } from "../../work-order-page/WorkOrderPage.page";

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
        recivedQuantityText: (quantity: string): string => `//div[@id='InventoryList']/descendant::div[text()='${quantity}']`,
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        plusIcon: { selector: '//div[@ng-show="listviewdisplaystatus"]/descendant::div[@class="action-menu-items"]/descendant::a[@title="Add new record"]', name: "Add New Record Icon" },
        saveIcon: { selector: "//div[@ng-show='listviewdisplaystatus']/descendant::a[@title='Save']", name: "Save Icon" },
        hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
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
        await homePage.clickButtonByText(gotItButtonText);
        await homePage.clickSideMenuIcon();
        await homePage.clickLinkByTitle(menuItemTitle);
        await homePage.clickLinkByTitle(subMenuItemTitle);
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
        addButtonTitle: string,
        divTitle: string
    ): Promise<void> {
        await commonActionPage.clickLinkByTitle(addButtonTitle);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonActionPage.clickSaveButton();
    }

    /**
     * Updates the Quantity Received for a Purchase Order Requisition.
     * @param quantity The new quantity received.
     */
    public async updateRecivedQuantity(quantity: string): Promise<void> {
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
        await commonActionPage.clickByDivId("BackOrderDetails-header");
        await this.saveBackorderDetails();
        await this.closeBackorderDetails();
        await commonActionPage.clickSaveButton();
    }

    /**
     * Closes a Purchase Order Requisition record.
     * @param status The status text to verify.
     * @param yesButton The text of the confirmation button.
     */
    public async closeRequisitionRecord(tabName: string, status: string, yesButton: string): Promise<void> {
        await commonActionPage.clickTabByText(tabName);
        await commonActionPage.clickElementByText(status);
        await commonActionPage.clickElementByText(yesButton);
    }

    /**
     * Validates the Received Quantity displayed in the specified tab.
     * @param tabName The name of the tab to activate.
     * @param quantity The expected quantity to validate.
     */
    public async validateReceivedQuantity(tabName: string, quantity: string): Promise<void> {
        await commonActionPage.clickTabByText(tabName);
        const quantityLocator = this.actions.getLocator(this.elements.recivedQuantityText(quantity));
        await this.actions.waitForElementToBeVisible(quantityLocator, `Quantity: ${quantity}`);
        const actualQuantity = await this.actions.getText(quantityLocator, `Quantity: ${quantity}`);
        await this.actions.assertEqual(actualQuantity, quantity, `Quantity Received: ${quantity}`);
    }

    /**
     * Creates a new Purchase Order Requisition record from List view.
     * This method clicks the plus icon to create a new record and saves it.
     */
    public async listViewPOR(): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.saveIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.saveIcon.name);
        await this.actions.click(saveBtn, this.elements.saveIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
    }

    /**
     * Closes a Purchase Order Requisition record from the List view.
     * @param closeRequestButton The text of the close request button.
     * @param yesButton The text of the confirmation button.
     */
    public async closeRequisitionRecordFromListView(closeRequestButton: string, yesButton: string): Promise<void> {
        await commonActionPage.clickButtonByTitle(closeRequestButton);
        await commonActionPage.clickElementByText(yesButton);
    }

    /**
     * Fills in the mandatory fields for a Purchase Order Requisition record.
     * @param tabName The name of the tab to activate.
     * @param dropdownSelections The dropdown selections to make.
     */
    public async fillMandatoryFields(tabName: string, dropdownSelections: { ddType: string[] }, divTitle: string): Promise<void> {
        await commonActionPage.clickTabByText(tabName);
        await commonActionPage.clickEditButton();
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.fillSupplierDetails();
        await commonActionPage.clickSaveButton();
    }
}

export const requisitionRecordsPage = new RequisitionRecordsPage();
