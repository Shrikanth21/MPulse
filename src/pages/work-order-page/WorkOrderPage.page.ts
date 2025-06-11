import { Page, expect, selectors } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { timeouts } from '../../helper/timeouts-config';

class WorkOrderPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
        saveButton: { selector: '#save-work-order', name: "Save Button" },
        editButton: { selector: '#edit-work-order', name: "Edit Button" },
        mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
        taskLinkRow: { selector: "(//div[@class='dx-datagrid-content']//table)[2]//tr[2]", name: "Task Link Row" },
        popupCalendarIcon: { selector: "//h4/following::div[1]//div[contains(@class, 'dx-dropdowneditor-icon')]", name: "Popup Calendar Icon" },
        fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
        cancelReasonInput: { selector: "//div[@title='Cancel Reason']/following-sibling::div//div[@id='Reasonforcancelation']//input", name: "Cancel Reason Input" },
        cancelReasonFormGroup: { selector: "(//div[@title='Cancel Reason']/following-sibling::div//div[@class='form-group'])[2]", name: "Cancel Reason Form Group" },
        cancelReasonEditIcon: { selector: "//div[@title='Cancel Reason']/following::span[@title='Edit Field']", name: "Cancel Reason Edit Icon" },
        numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
        callBackRedoDiv: { selector: "(//div[@id='CallBackRedo'])[2]", name: "Call Back Redo Div" },
        timeSheetSaveButton: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//a[@title='Save']", name: "Time Sheet Save Button" },
        hoursInputField: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//input[@inputmode='decimal']", name: "Hours Input Field" },
        holdCalendarIcon: { selector: "(//div[@title='Hold Reason']/parent::div//div[contains(@class, 'dx-dropdowneditor-icon')])[2]", name: "Hold Reason Dropdown Icon" },
        getLinkByTitle: { selector: "//li[@ng-click='openMediaUploadBox()']", name: "Link By Title" },
        sideBarExpander: { selector: "[class='sideBarExpander']", name: "Sidebar Expander" },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
        checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
        wkoInput: { selector: "//div[contains(@class,'modal-content popup-no')]//input", name: "WKO Input" },
        okInput: { selector: "[value='Ok']", name: "Ok Input" },
        hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
        closeWorkOrderButton: { selector: "//button[text()='Close Work Order']", name: "Close Work Order Button" },
        yesSpan: { selector: "//span[text()='Yes']", name: "Yes Span" },
        docxFormatIcon: { selector: 'img[alt="DOCX Format"][src*="docx.svg"]', name: "DOCX Format Icon" },
    };

    private getLinkByTitles = (title: string): string => `//a[@title='${title}']`;
    private getInputButton = (text: string): string => `//input[@value='${text}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getCalendarDate = (day: string): string => `(//div[contains(@class, 'dx-calendar-body')]//span[text()='${day}'])[1]`;
    private getPopupCalendarDate = (day: string): string => `((//div[contains(@class, 'dx-calendar-body')])[2]//span[text()='${day}'])[1]`;
    private getMoreButton = (text: string): string => `${this.getElementByText(text)}/parent::div/following-sibling::div//div[@class='moreBtn']`;
    private getSecondPopupCalendarDate = (day: string): string => `//div[@class='dx-popup-content']//span[text()='${day}']`;
    private getEditIcon = (text: string): string => `${this.getElementByText(text)}/ancestor::div[contains(@class, 'activeEditor')]//span[contains(@class, 'editor') and @title='Edit Field']`;
    private elementByTextSecondOccurrence = (text: string): string => `(//span[text()='${text}'])[2]`;
    private getdropdownById = (id: string): string => `//div[@id='${id}']`;
    private getDDvalueByTitle = (title: string): string => `//div[@title='${title}']`;
    private getEleByText = (text: string): string => `//div[text()='${text}']`;
    private getLinkByTitleText = (title: string): string => `//div[@id='linkPopupGridContainer']//table//tbody//tr//td//div[@title='${title}']`;
    private getCostInputField = (fieldName: string): string => `//div[@id='${fieldName}']//div//input`;
    private getTaskMoreIcon = (text: string): string => `${this.getElementByText(text)}/ancestor::div[@class='row panelHeader']//i[contains(@class,'ellipsis')]`;
    private getButtonByTitle = (btnText: string): string => `//button[@title='${btnText}']`;
    private getById = (id: string): string => `//span[@id='${id}']`;
    private getByLabel = (label: string): string => `//label[text()='${label}']`;
    private getEditIconByLabel = (label: string): string => `${this.getByLabel(label)}/ancestor::div[contains(@class, 'activeEditor')]//span[contains(@class, 'editor') and @title='Edit Field']//i`;


    public async clickLinkByTitle(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getLinkByTitles(title));
        await this.actions.click(elementLocator, title);
    }

    public async clickUploadMediaLink(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.getLinkByTitle.selector);
        await this.actions.click(elementLocator, this.elements.getLinkByTitle.name);
    }

    public async enterDescription(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.descriptionInput.selector);
        await this.actions.typeText(descriptionLocator, description, this.elements.descriptionInput.name);
    }

    public async clickSaveButton(): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.elements.saveButton.selector), this.elements.saveButton.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
    }

    public async clickElementByText(fieldName: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(this.getElementByText(fieldName));
        await this.actions.click(fieldLocator, `Field: ${fieldName}`);
    }

    public async clickEditIconForField(fieldName: string): Promise<void> {
        const editIconLocator = this.actions.getLocator(this.getEditIcon(fieldName));
        await this.actions.click(editIconLocator, `Edit Icon for Field: ${fieldName}`);
    }

    public async selectDateFromCalendar(day: string, buttonText: string): Promise<void> {
        const dateLocator = this.actions.getLocator(this.getCalendarDate(day));
        await this.actions.click(dateLocator, `Calendar Date: ${day}`);
        //await this.actions.click(this.actions.getLocator(this.getElementByText(buttonText)), `Button: ${buttonText}`);
    }

    public async clickMoreButton(text: string): Promise<void> {
        const moreButtonLocator = this.actions.getLocator(this.getMoreButton(text));
        await this.actions.scrollToAndClick(moreButtonLocator, `${text} More Button`);
    }

    public async clickLinkText(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getLinkByTitleText(title));
        await this.actions.waitForCustomDelay(timeouts.large);
        await this.actions.click(elementLocator, `Link Text: ${title}`);
    }

    public async clickInputButton(text: string): Promise<void> {
        const inputButtonLocator = this.actions.getLocator(this.getInputButton(text));
        await this.actions.scrollToAndClick(inputButtonLocator, `Input Button: ${text}`);
    }

    public async clickTaskLinkRow(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.taskLinkRow.selector);
        await this.actions.scrollToAndClick(elementLocator, this.elements.taskLinkRow.name);
    }

    public async clickPopupCalendarIcon(): Promise<void> {
        const calendarIconLocator = this.actions.getLocator(this.elements.popupCalendarIcon.selector);
        await this.actions.click(calendarIconLocator, this.elements.popupCalendarIcon.name);
    }

    public async selectPopupCalendarDate(day: string, buttonText: string): Promise<void> {
        const popupCalendarDateLocator = this.actions.getLocator(this.getPopupCalendarDate(day));
        await this.actions.click(popupCalendarDateLocator, `Popup Calendar Date: ${day}`);
        const buttonLocator = this.actions.getLocator(this.elementByTextSecondOccurrence(buttonText));
        await this.actions.click(buttonLocator, `Button: ${buttonText}`);
    }
    public async verifyLinkedImageVisible(): Promise<void> {
        const imageLocator = this.actions.getLocator(this.elements.docxFormatIcon.selector);
        await this.actions.waitForElementToBeVisible(imageLocator, this.elements.docxFormatIcon.name);
    }

    public async createWorkOrderFromMoreDropDown(dropdownOption: string, createOption: string, description: string): Promise<void> {
        await this.currentPage.waitForTimeout(timeouts.medium);
        await this.clickLinkByTitle(dropdownOption);
        await this.clickLinkByTitle(createOption);
        await this.currentPage.waitForTimeout(timeouts.medium);
        await this.enterDescription(description);
        await this.clickSaveButton();
    }

    public async performCalendarActions(fieldName: string, editIconForField: string, day: string, buttonText: string): Promise<void> {
        await this.clickElementByText(fieldName);
        await this.clickEditIconForField(editIconForField);
        await this.currentPage.waitForTimeout(timeouts.medium);
        await this.selectDateFromCalendar(day, buttonText);
    }
    public async linkTaskToWorkOrder(taskText: string, linkTitle: string, title: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(taskText);
        await this.clickLinkByTitle(linkTitle);
        await this.clickLinkText(title);
        await this.clickInputButton(buttonText);
        await this.clickTaskLinkRow();
    }

    public async linkAssetToTask(recordText: string, assetText: string, linkTitle: string, title: string, buttonText: string): Promise<void> {
        await this.clickSaveButton();
        await this.selectByElementText(recordText);
        await this.clickMoreButton(assetText);
        await this.clickLinkByTitle(linkTitle);
        await this.clickLinkText(title);
        await this.clickInputButton(buttonText);
    }

    public async linkPersonnelToAsset(personnelText: string, linkTitle: string, title: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(personnelText);
        await this.clickLinkByTitle(linkTitle);
        await this.clickLinkText(title);
        await this.clickInputButton(buttonText);
    }

    public async linkInventoryToAsset(inventoryText: string, linkTitle: string, title: string, buttonText: string, confirmText: string): Promise<void> {
        await this.clickMoreButton(inventoryText);
        await this.clickLinkByTitle(linkTitle);
        await this.clickLinkText(title);
        await this.clickInputButton(buttonText);
        await this.clickInputButton(confirmText);
    }

    public async performHomePageActions(
        closeText: string,
        yesButtonText: string,
        day: string,
        okButtonText: string,
        inputOkButtonText: string,
        crossIconTitle: string,
        continueButtonText: string
    ): Promise<void> {
        await this.clickSaveButton();
        await this.clickElementByText(closeText);
        await this.clickElementByText(yesButtonText);
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day, okButtonText);
        await this.clickInputButton(inputOkButtonText);
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);

    }

    public async clickButtonByText(buttonText: string): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.getElementByText(buttonText)),
            `${buttonText} Button`
        );
    }

    public async uploadMediaFile(mediaButtonText: string, linkIconTitle: string, filePath: string, btnText: string): Promise<void> {
        await this.clickButtonByText(mediaButtonText);
        await this.actions.click(this.actions.getLocator(this.elements.mediaMoreButton.selector), this.elements.mediaMoreButton.name);

        await this.actions.click(this.actions.getLocator(this.elements.getLinkByTitle.selector), `Second Occurrence of Link: ${linkIconTitle}`);

        await this.actions.uploadFile(
            this.actions.getLocator(this.elements.fileInput.selector),
            filePath,
            'Media File Upload'
        );

        await this.actions.click(
            this.actions.getLocator(this.getButtonByTitle(btnText)),
            `${btnText} Button`
        );
    }

    public async createWorkOrder(addButtonTitle: string, description: string, mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string, btnTitle: string, recordText: string): Promise<void> {
        await this.currentPage.waitForTimeout(timeouts.large);
        await this.clickLinkByTitle(addButtonTitle);
        await this.enterDescription(description);
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath, btnTitle);
        await this.clickSaveButton();
        await this.selectByElementText(recordText);

    }

    public async selectDropdownValues(ddType: string, ddValue: string): Promise<void> {
        const dropdownLocator = this.actions.getLocator(this.getdropdownById(ddType));
        await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
        const optionLocator = this.actions.getLocator(this.getDDvalueByTitle(ddValue));
        await this.actions.click(optionLocator, `Dropdown Value: ${ddValue}`);
    }

    public async selectMultipleDropdownValues(dropdownSelections: { ddType: string; ddValue: string }[]): Promise<void> {
        for (const selection of dropdownSelections) {
            await this.selectDropdownValues(selection.ddType, selection.ddValue);
        }
    }

    public async clickEditButton(): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.elements.editButton.selector),
            this.elements.editButton.name
        );
    }

    public async closeWorkOrder(
        closeText: string,
        yesButtonText: string,
        day: string,
        okButtonText: string,
        inputOkButtonText: string
    ): Promise<void> {
        await this.clickSaveButton();
        await this.clickElementByText(closeText);
        await this.clickElementByText(yesButtonText);
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day, okButtonText);
        //await this.clickInputButton(inputOkButtonText);
    }

    public async setPhoneNumber(phoneNumber: string): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.elements.callBackRedoDiv.selector),
            this.elements.callBackRedoDiv.name
        );
        await this.actions.typeText(
            this.actions.getLocator(this.elements.numbersInput.selector),
            phoneNumber,
            this.elements.numbersInput.name
        );
    }
    public async setGeneralFields(
        tabName: string,
        dropdownSelections: { ddType: string; ddValue: string }[],
        phoneNumber: string
    ): Promise<void> {
        await this.clickElementByText(tabName);
        await this.clickEditButton();
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.selectMultipleDropdownValues(dropdownSelections);
        await this.setPhoneNumber(phoneNumber);
        await this.clickSaveButton();
    }

    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByText(elementText));
        await this.actions.waitForElementToBeVisible(elementLocator, `Waiting for Element: ${elementText}`);
        const isVisible = await this.actions.isVisible(elementLocator, `Element: ${elementText}`);
        const actualText = await this.actions.getText(elementLocator, `Element: ${elementText}`);

        expect(isVisible).toBeTruthy();
        expect(actualText).toEqual(elementText);
    }

    public async deleteRecord(crossIconTitle: string, continueButtonText: string): Promise<void> {
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);
    }

    public async setCancelReason(
        cancelReason: string,
        saveText: string,
        day: string,
        okButtonText: string,
        inputOkButtonText: string): Promise<void> {

        await this.actions.typeText(
            this.actions.getLocator(this.elements.cancelReasonInput.selector),
            cancelReason,
            this.elements.cancelReasonInput.name
        );

        await this.clickButtonByText(saveText);
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day, okButtonText);
        await this.clickInputButton(inputOkButtonText);

    }

    public async selectByElementText(radioButtonText: string): Promise<void> {
        const radioButtonLocator = this.actions.getLocator(this.getEleByText(radioButtonText));
        await this.actions.click(radioButtonLocator, `Radio Button: ${radioButtonText}`);
    }

    public async setCost(id: string, fieldName: string, inputField: string, cost: string): Promise<void> {
        const linkLocator = this.actions.getLocator(this.getById(id));
        await this.actions.click(linkLocator, `Link: ${id}`);

        const editIconLocator = this.actions.getLocator(this.getEditIcon(fieldName));
        await this.actions.click(editIconLocator, `Edit Icon for Field: ${fieldName}`);

        const costInputLocator = this.actions.getLocator(this.getCostInputField(inputField));
        await this.actions.clearAndTypeText(costInputLocator, cost, `Cost Input for ${inputField}`);
    }

    public async setFinancialFields(costFields: { id: string; fieldName: string; inputField: string; cost: string }[]): Promise<void> {
        for (const field of costFields) {
            await this.setCost(field.id, field.fieldName, field.inputField, field.cost);
        }
    }
    public async setEmployeeActualHours(
        personnelText: string,
        linkTitle: string,
        timeSheetDetails: string,
        plusIconTitle: string,
        eleText: string,
        hours: string,
        crossIconTitle: string
    ): Promise<void> {
        await this.clickMoreButton(personnelText);
        await this.clickLinkByTitle(linkTitle);
        const moreIconLocator = this.actions.getLocator(this.getTaskMoreIcon(timeSheetDetails));
        await this.actions.click(moreIconLocator, `Task More Icon for: ${timeSheetDetails}`);
        await this.clickLinkByTitle(plusIconTitle);
        const timeSheetDetailsLocator = this.actions.getLocator(`(${this.getEleByText(eleText)})[2]`);
        await this.actions.doubleClick(timeSheetDetailsLocator, `Double Click on: ${eleText}`);
        const hoursInputLocator = this.actions.getLocator(this.elements.hoursInputField.selector);
        await this.actions.clearAndTypeText(hoursInputLocator, hours, this.elements.hoursInputField.name);
        const timeSheetSaveButtonLocator = this.actions.getLocator(this.elements.timeSheetSaveButton.selector);
        await this.actions.click(timeSheetSaveButtonLocator, this.elements.timeSheetSaveButton.name);
        const buttonLocator = this.actions.getLocator(this.getButtonByTitle(crossIconTitle));
        await this.actions.click(buttonLocator, `${crossIconTitle} Button`);
    }

    public async changeWKOstatus(fieldName: string, editIconForField: string, radioButtonText: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.clickElementByText(fieldName);
        await this.actions.waitForDelay();
        await this.clickEditIconForField(editIconForField);
        await this.selectByElementText(radioButtonText);
    }

    public async holdWKO(
        fieldName: string,
        editIconForField: string,
        radioButtonText: string,
        labels: string[],
        ddValue: string,
        day: string,
        btnText: string
    ): Promise<void> {
        await this.changeWKOstatus(fieldName, editIconForField, radioButtonText);

        for (const label of labels) {
            const labelLocator = this.actions.getLocator(this.getByLabel(label));
            await this.actions.click(labelLocator, `Label: ${label}`);
            await this.actions.waitForDelay();
            const editIconLocator = this.actions.getLocator(this.getEditIconByLabel(label));
            await this.actions.waitForElementToBeVisible(editIconLocator, `Edit Icon for Label: ${label}`);
            await this.actions.click(editIconLocator, `Edit Icon for Label: ${label}`);

            switch (label) {
                case 'Hold Reason':
                    const dropdownValueLocator = this.actions.getLocator(this.getDDvalueByTitle(ddValue));
                    await this.actions.click(dropdownValueLocator, `Dropdown Value: ${ddValue}`);
                    break;

                case 'Hold Until':
                    const calendarIconLocator = this.actions.getLocator(this.elements.holdCalendarIcon.selector);
                    await this.actions.waitForElementToBeVisible(calendarIconLocator, this.elements.holdCalendarIcon.name);
                    await this.actions.click(calendarIconLocator, this.elements.holdCalendarIcon.name);
                    const calendarDateLocator = this.actions.getLocator(this.getPopupCalendarDate(day));
                    await this.actions.click(calendarDateLocator, `Popup Calendar Date: ${day}`);
                    break;
            }
        }

        const saveBtn = this.actions.getLocator(`(${this.getElementByText(btnText)})[2]`);
        await this.actions.click(saveBtn, `Button: ${btnText}`);
    }

    //List View Steps
    public async listViewWKO(description: string): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(this.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.checkIcon.name);
        await this.actions.click(saveBtn, this.elements.checkIcon.name);
        await this.actions.typeText(this.actions.getLocator(this.elements.wkoInput.selector).nth(0), description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
    }

    public async addMediaAndSelectRecord(mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string, btnTitle: string): Promise<void> {
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath, btnTitle);
    }

    public async closeWorkOrderWithButton(
        day: string,
        inputOkButtonText: string
    ): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(this.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.closeWorkOrderButton.selector), this.elements.closeWorkOrderButton.name);
        const yesSpanLocator = this.actions.getLocator(this.elements.yesSpan.selector);
        await this.actions.click(yesSpanLocator, this.elements.yesSpan.name);
        const calendarIconLocator = this.actions.getLocator(this.elements.popupCalendarIcon.selector);
        await this.actions.click(calendarIconLocator.nth(6), this.elements.popupCalendarIcon.name);
        const dateLocator = this.actions.getLocator(this.getSecondPopupCalendarDate(day)).nth(1);
        if (await this.actions.isVisible(dateLocator, `Second Occurrence of Calendar Date: ${day}`)) {
            await this.actions.scrollToAndClick(dateLocator, `Second Occurrence of Calendar Date: ${day}`);
        } else {
            const dateLocators = this.actions.getLocator(this.getSecondPopupCalendarDate(day)).nth(1);
            await this.actions.click(dateLocators, `Second Occurrence of Calendar Date: ${day}`);
        }
        await this.clickInputButton(inputOkButtonText);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);

    }
}

export const workOrderPage = new WorkOrderPage();
