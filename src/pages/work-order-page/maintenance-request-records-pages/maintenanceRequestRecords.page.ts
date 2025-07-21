import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { workOrderPage } from "../WorkOrderPage.page";

class MaintenanceRequestRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
        editButton: { selector: "//a[@title='Edit']//i[@class='fa fa-pencil-alt']", name: "Edit Button" },
        saveButton: { selector: "#save-work-order", name: "Save Button" },
        sideBarExpander: { selector: "[class='sideBarExpander']", name: "Sidebar Expander" },
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

    private getElementByText = (text: string): string => `//span[text()='${text}']`;

    public async clickOnConvertWKBtnInListView(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.convertWorkOrderBtn.selector);
        await this.actions.waitForElementToBeVisible(elementLocator, this.elements.convertWorkOrderBtn.name);
        await this.actions.click(elementLocator, this.elements.convertWorkOrderBtn.name);
    }

    public async clickElementByText(text: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByText(text));
        await this.actions.waitForElementToBeVisible(elementLocator, `Element: ${text}`);
        await this.actions.click(elementLocator, `Element: ${text}`);
    }

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

    public async enterNumbersInput(value: string): Promise<void> {
        const inputLocator = this.actions.getLocator(this.elements.numbersInput.selector);
        await this.actions.typeText(inputLocator, value, `Numbers Input: ${value}`);
    }

    public async enterDescriptionAfterConvert(description: string): Promise<void> {
        const editButton = this.actions.getLocator(this.elements.editButton.selector);
        await this.actions.click(editButton, this.elements.editButton.name);
        await workOrderPage.enterDescription(description);
        const saveBtn = this.actions.getLocator(this.elements.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.saveButton.name);
        await this.actions.click(saveBtn, this.elements.saveButton.name);
    }

    public async createMaintenanceRecord(
        addButtonTitle: string,
        description: string,
    ): Promise<void> {
        await this.currentPage.waitForTimeout(timeouts.large);
        await workOrderPage.clickLinkByTitle(addButtonTitle);
        await workOrderPage.enterDescription(description);
    }

    public async setMrGeneralFields(
        tabName: string,
        value: string,
        dropdownSelections: { ddType: string[] },
    ): Promise<void> {
        await this.clickElementByText(tabName);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.enterNumbersInput(value);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType);
        await workOrderPage.clickSaveButton();
        await this.clickOnConfirmButton();
    }

    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByText(elementText));
        await this.actions.waitForElementToBeVisible(elementLocator, `Waiting for Element: ${elementText}`);
        const actualText = await this.actions.getText(elementLocator, `Element: ${elementText}`);
        await this.actions.waitForCustomDelay(timeouts.largest);
        await this.actions.assertContains(actualText, elementText);
    }

    public async listViewMRO(description: string): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(this.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
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
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
    }

    public async clickOnConvertWorkOrderButton(
        convertText: string,
        yesConvert: string,
        yesButton: string
    ): Promise<void> {
        await this.clickElementByText(convertText);
        await this.clickElementByText(yesConvert);
        await this.clickElementByText(yesButton);
    }

     public async clickOnListViewConvertWorkOrderBtn(
        yesConvert: string,
        yesButton: string
    ): Promise<void> {
        await this.clickOnConvertWKBtnInListView();
        await this.clickElementByText(yesConvert);
        await this.clickElementByText(yesButton);
    }
}
export const maintenanceRequestRecordsPage = new MaintenanceRequestRecordsPage();
