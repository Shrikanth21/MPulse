import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { workOrderPage } from "../WorkOrderPage.page";
import { commonActionPage } from "../../common.action.page";

class MaintenanceRequestRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
        checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
        mroInput: { selector: "//div[contains(@class,'modal-content popup-no')]//input", name: "WKO Input" },
        okInput: { selector: "[value='Ok']", name: "Ok Input" },
        hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
        okButton: { selector: "//div[@aria-label='OK']", name: "OK Button" },
        dialogMessage: { selector: "//div[@class='dx-dialog-message']/following::span[@class='dx-button-text']", name: "Dialog Message" },
        convertWorkOrderBtn: { selector: "//button[@title='Convert to Work Order']", name: "Convert to Work Order Button" }
    };

    /**
     * Clicks on the "Convert to Work Order" button in the list view.
     */
    public async clickOnConvertWKBtnInListView(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.convertWorkOrderBtn.selector);
        await this.actions.waitForElementToBeVisible(elementLocator, this.elements.convertWorkOrderBtn.name);
        await this.actions.click(elementLocator, this.elements.convertWorkOrderBtn.name);
    }

    /**
     * Clicks on the confirm button in a dialog message.
     */
    public async clickOnConfirmButton(): Promise<void> {
        const textLocator = this.actions.getLocator(this.elements.dialogMessage.selector).nth(0);
        if (await textLocator.isVisible()) {
            const popupText = await this.actions.getText(textLocator, this.elements.dialogMessage.name);
            if (popupText === 'OK') {
                const fieldLocator = this.actions.getLocator(this.elements.dialogMessage.selector);
                await this.actions.click(fieldLocator, `Field: ${this.elements.dialogMessage.name}`);
            } else if (popupText === 'Yes') {
                const fieldLocator = this.actions.getLocator(this.elements.dialogMessage.selector).nth(0);
                await this.actions.click(fieldLocator, `Field: ${this.elements.dialogMessage.name}`);
            }
        }
    }

    /**
     * Enters a value into the numbers input field.
     * @param value The value to enter into the input field.
     */
    public async enterNumbersInput(value: string): Promise<void> {
        const inputLocator = this.actions.getLocator(this.elements.numbersInput.selector);
        await this.actions.typeText(inputLocator, value, `Numbers Input: ${value}`);
    }

    /**
     * Clicks on the edit button to enable editing of the maintenance request record.
     */
    public async enterDescriptionAfterConvert(description: string): Promise<void> {
        const editButton = this.actions.getLocator(commonActionPage.elements.editButton.selector);
        await this.actions.click(editButton, commonActionPage.elements.editButton.name);
        await workOrderPage.enterDescription(description);
        await commonActionPage.clickSaveButton();
    }
    /**
     * creates a new maintenance record with the specified description.
     * @param addButtonTitle The title of the button to add a new record.
     * @param description The description of the maintenance record to create.
     */
    public async createMaintenanceRecord(
        addButtonTitle: string,
        description: string,
    ): Promise<void> {
        await commonActionPage.clickLinkByTitle(addButtonTitle);
        await workOrderPage.enterDescription(description);
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
    ): Promise<void> {
        await commonActionPage.clickElementByText(tabName);
        await this.enterNumbersInput(value);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType);
        await commonActionPage.clickSaveButton();
        await this.clickOnConfirmButton();
    }

    /**
     * Validates the text of a specific element.
     * @param elementText The text of the element to validate.
     */
    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(commonActionPage.getElementByText(elementText));
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
        const sideBarExpanderLocator = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.checkIcon.name);
        await this.actions.click(saveBtn, this.elements.checkIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.typeText(this.actions.getLocator(this.elements.mroInput.selector).nth(0), description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        const OkButton = this.actions.getLocator(this.elements.okButton.selector);
        await this.actions.click(OkButton, this.elements.okButton.name);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
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
        await commonActionPage.clickElementByText(convertText);
        await commonActionPage.clickElementByText(yesConvert);
        await commonActionPage.clickElementByText(yesButton);
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
        await commonActionPage.clickElementByText(yesConvert);
        await commonActionPage.clickElementByText(yesButton);
    }
}
export const maintenanceRequestRecordsPage = new MaintenanceRequestRecordsPage();
