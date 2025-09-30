import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { MrRecordsPageLoacators } from "../../../locators/workorder.page.locators/maintenance-request-records-page.locator/mr.records.page.locator";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { commonPageActions } from "../../common.page.actions";
import { workOrderRecordPageActions } from "../work-order-records-page-action/work.order.records.page.action";
import { timeouts } from "../../../../helper/timeouts-config";

class MaintenanceRequestRecordsPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the "Convert to Work Order" button in the list view.
     */
    public async clickOnConvertWKBtnInListView(): Promise<void> {
        const elementLocator = this.actions.getLocator(MrRecordsPageLoacators.convertWorkOrderBtn.selector);
        await this.actions.waitForElementToBeVisible(elementLocator, MrRecordsPageLoacators.convertWorkOrderBtn.name);
        await this.actions.click(elementLocator, MrRecordsPageLoacators.convertWorkOrderBtn.name);
    }

    /**
     * Clicks on the confirm button in a dialog message.
     */
    public async clickOnConfirmButton(): Promise<void> {
        const textLocator = this.actions.getLocator(MrRecordsPageLoacators.dialogMessage.selector).nth(0);
        if (await textLocator.isVisible()) {
            const popupText = await this.actions.getText(textLocator, MrRecordsPageLoacators.dialogMessage.name);
            if (popupText === 'OK') {
                const fieldLocator = this.actions.getLocator(MrRecordsPageLoacators.dialogMessage.selector);
                await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${MrRecordsPageLoacators.dialogMessage.name}`);
                await this.actions.click(fieldLocator, `Field: ${MrRecordsPageLoacators.dialogMessage.name}`);
            } else if (popupText === 'Yes') {
                const fieldLocator = this.actions.getLocator(MrRecordsPageLoacators.dialogMessage.selector).nth(0);
                await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${MrRecordsPageLoacators.dialogMessage.name}`);
                await this.actions.click(fieldLocator, `Field: ${MrRecordsPageLoacators.dialogMessage.name}`);
            }
        }
    }

    /**
     * Enters a value into the numbers input field.
     * @param value The value to enter into the input field.
     */
    public async enterNumbersInput(value: string): Promise<void> {
        const inputLocator = this.actions.getLocator(MrRecordsPageLoacators.numbersInput.selector);
        await this.actions.typeText(inputLocator, value, `Numbers Input: ${value}`);
    }

    /**
     * Clicks on the edit button to enable editing of the maintenance request record.
     */
    public async enterDescriptionAfterConvert(description: string): Promise<void> {
        const editButton = this.actions.getLocator(CommonPageLocators.editButton.selector);
        await this.actions.click(editButton, CommonPageLocators.editButton.name);
        await commonPageActions.enterDescription(description);
    }
    /**
     * creates a new maintenance record with the specified description.
     * @param addButtonTitle The title of the button to add a new record.
     * @param description The description of the maintenance record to create.
     */
    public async createMaintenanceRecord(
        description: string,
    ): Promise<void> {
        commonPageActions.clickAddNewRecordButton();
        await commonPageActions.enterDescription(description);
    }

    /**
     * Sets the general fields for a maintenance request record.
     * @param tabName The name of the tab to click on.
     * @param value The value to enter in the numbers input field.
     * @param dropdownSelections The dropdown selections to make.
     */
    public async setMrGeneralFields(
        tabName: string,
        value: string,
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        await commonPageActions.clickSpanByText(tabName);
        await this.enterNumbersInput(value);
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await commonPageActions.clickSaveButton();
        await this.clickOnConfirmButton();
    }

    /**
     * Validates the text of a specific element.
     * @param elementText The text of the element to validate.
     */
    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(elementText));
        await this.actions.waitForElementToBeVisible(elementLocator, `Waiting for Element: ${elementText}`);
        const actualText = await this.actions.getText(elementLocator, `Element: ${elementText}`);
        await this.actions.waitForCustomDelay(timeouts.largest);
        await this.actions.assertContains(actualText, elementText);
    }

    /**
     * Clicks on a tab element by its text.
     * @param tabText The text of the tab to click on.
     */
    public async listViewMRO(description: string): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(CommonPageLocators.sideBarExpander.selector);
        await this.actions.waitForElementToBeVisible(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(MrRecordsPageLoacators.maximizeButton.selector);
        await this.actions.waitForElementToBeVisible(maximizeButton, MrRecordsPageLoacators.maximizeButton.name);
        await this.actions.click(maximizeButton, MrRecordsPageLoacators.maximizeButton.name);
        const plusIconLocator = this.actions.getLocator(MrRecordsPageLoacators.plusIcon.selector);
        await this.actions.waitForElementToBeVisible(plusIconLocator, MrRecordsPageLoacators.plusIcon.name);
        await this.actions.click(plusIconLocator, MrRecordsPageLoacators.plusIcon.name);
        const saveBtn = this.actions.getLocator(MrRecordsPageLoacators.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, MrRecordsPageLoacators.checkIcon.name);
        await this.actions.click(saveBtn, MrRecordsPageLoacators.checkIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        const mroInputLocator = this.actions.getLocator(MrRecordsPageLoacators.mroInput.selector);
        await this.actions.waitForElementToBeVisible(mroInputLocator, MrRecordsPageLoacators.mroInput.name);
        await this.actions.typeText(mroInputLocator, description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(MrRecordsPageLoacators.okInput.selector), MrRecordsPageLoacators.okInput.name);
        const OkButton = this.actions.getLocator(MrRecordsPageLoacators.okButton.selector);
        await this.actions.waitForElementToBeVisible(OkButton, MrRecordsPageLoacators.okButton.name);
        await this.actions.click(OkButton, MrRecordsPageLoacators.okButton.name);
        const sideBarLocator = this.actions.getLocator(CommonPageLocators.sideBarExpander.selector);
        await this.actions.waitForElementToBeVisible(sideBarLocator, CommonPageLocators.sideBarExpander.name);
        await this.actions.click(sideBarLocator, CommonPageLocators.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(MrRecordsPageLoacators.hideButton.selector);
        await this.actions.click(minimizeButton, MrRecordsPageLoacators.hideButton.name);
    }

    /**
     * Clicks on the "Convert to Work Order" button.
     * @param convertText The text of the button to click.
     * @param yesConvert The text of the confirmation button to click.
     */
    public async clickOnConvertWorkOrderButton(
        convertText: string,
        yesConvert: string,
        yesButton: string
    ): Promise<void> {
        await commonPageActions.clickSpanByText(convertText);
        await commonPageActions.clickSpanByText(yesConvert);
        await commonPageActions.clickSpanByText(yesButton);
    }

    /**
     * Clicks on the "Convert to Work Order" button in the list view.
     * @param yesConvert The text of the confirmation button to click.
     * @param yesButton The text of the final confirmation button to click.
     */
    public async clickOnListViewConvertWorkOrderBtn(
        yesConvert: string,
        yesButton: string
    ): Promise<void> {
        await this.clickOnConvertWKBtnInListView();
        await commonPageActions.clickSpanByText(yesConvert);
        await commonPageActions.clickSpanByText(yesButton);
    }
}

export const mrRecordsPageAction = new MaintenanceRequestRecordsPageActions();