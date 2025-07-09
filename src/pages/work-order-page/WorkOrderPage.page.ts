import { Page, expect } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { timeouts } from '../../helper/timeouts-config';
import { getCurrentMonthName } from '../../helper/date/get-current-month';

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
        popupCalendarIcon: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']/descendant::div[@class='dx-dropdowneditor-icon']", name: "Popup Calendar Icon" },
        fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
        cancelReasonInput: { selector: "//div[@title='Cancel Reason']/following-sibling::div//div[@id='Reasonforcancelation']//input", name: "Cancel Reason Input" },
        cancelReasonFormGroup: { selector: "(//div[@title='Cancel Reason']/following-sibling::div//div[@class='form-group'])[2]", name: "Cancel Reason Form Group" },
        cancelReasonEditIcon: { selector: "//div[@title='Cancel Reason']/following::span[@title='Edit Field']", name: "Cancel Reason Edit Icon" },
        numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
        callBackRedoDiv: { selector: "(//div[@id='CallBackRedo'])[2]", name: "Call Back Redo Div" },
        timeSheetSaveButton: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//a[@title='Save']", name: "Time Sheet Save Button" },
        hoursInputField: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//input[@inputmode='decimal']", name: "Hours Input Field" },
        holdCalendarIcon: { selector: "//div[@title='Hold Reason']/parent::div//div[contains(@class, 'dx-dropdowneditor-icon')]", name: "Hold Reason Dropdown Icon" },
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
        okButton: { selector: "//input[@value='Ok']", name: "Ok Button" },
        cancelReasonSave: { selector: "//div[@id='Save']", name: "Cancel Reason Save" },
        reasonForCancellationLabel: { selector: "//label[@title='Reason for Cancellation']", name: "Reason for Cancellation Label" },
        popupOverlay: { selector: "//div[@class='dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable dx-dropdowneditor-overlay-flipped']", name: "Popup Overlay" },
        selectRowInLinkAssetPopup: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']//td[@aria-label='Select row']", name: "Select Row in link asset Popup" },
        popupTextInput: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Popup Text Input" },
        modalTitle: { selector: "//div[@class='modal-body']/descendant::div[contains(text(),'The date selected is in the future, please confirm.')]", name: "Modal Title" },
        closeRequestButton: { selector: "//div[@class='modal-header ui-draggable-handle']//button[@title='Click here to close']", name: "Click here to close" },
    };

    private getLinkByTitles = (title: string): string => `//a[@title='${title}']`;
    private getInputButton = (text: string): string => `//input[@value='${text}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getCalendarDate = (day: string): string => `(//div[contains(@class, 'dx-calendar-body')]//span[text()='${day}'])[1]`;
    private getPopupCalendarDate = (day: string): string => `((//div[contains(@class, 'dx-calendar-body')])[2]//span[text()='${day}'])[1]`;
    private getMoreButton = (text: string): string => `${this.getElementByText(text)}/parent::div/following-sibling::div//div[@class='moreBtn']`;
    private getSecondPopupCalendarDate = (day: string): string => `//div[@class='dx-popup-content']/descendant::td[contains(@aria-label,'${getCurrentMonthName()}')]//span[text()='${day}']`;
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
    private getPopupGridRowByText = (text: string): string =>
        `//div[@id='popupgrid']//tr[contains(@class,'dx-row dx-data-row dx-column-lines dx-selection')]//div[text()='${text}']`;


    public async clickLinkByTitle(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getLinkByTitles(title));
        await this.actions.waitForElementToBeVisible(elementLocator, title);
        await this.actions.click(elementLocator, title);
    }

    public async selectRowInLinkAssetPopupIfVisible(): Promise<void> {
        const locator = this.actions.getLocator(this.elements.selectRowInLinkAssetPopup.selector).nth(0);
        await this.actions.waitForElementToBeVisible(locator, this.elements.selectRowInLinkAssetPopup.name);
        await this.actions.click(locator, this.elements.selectRowInLinkAssetPopup.name);
    }

    public async clickUploadMediaLink(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.getLinkByTitle.selector);
        await this.actions.click(elementLocator, this.elements.getLinkByTitle.name);
    }

    public async enterDescription(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.descriptionInput.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, this.elements.descriptionInput.name);
        await this.actions.typeText(descriptionLocator, description, this.elements.descriptionInput.name);
    }

    public async clickSaveButton(): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.elements.saveButton.selector), this.elements.saveButton.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
    }

    public async clickElementByText(fieldName: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(this.getElementByText(fieldName));
        await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${fieldName}`);
        await this.actions.click(fieldLocator, `Field: ${fieldName}`);
    }

    public async clickEditIconForField(fieldName: string): Promise<void> {
        const editIconLocator = this.actions.getLocator(this.getEditIcon(fieldName));
        await this.actions.waitForElementToBeVisible(editIconLocator, `Edit Icon for Field: ${fieldName}`);
        await this.actions.mouseHoverAndClick(editIconLocator, `Edit Icon for Field: ${fieldName}`);
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
        await this.actions.waitForElementToBeVisible(elementLocator, `Link Text: ${title}`);
        await this.actions.click(elementLocator, `Link Text: ${title}`);
    }

    public async clickOnSecondClosePopup(text: string): Promise<void> {
        const modalTitleLocator = this.actions.getLocator(this.elements.modalTitle.selector);
        if (await modalTitleLocator.isVisible()) {
            const closeRequestButtonLocator = this.actions.getLocator(this.elements.closeRequestButton.selector);
            await this.actions.click(closeRequestButtonLocator, this.elements.closeRequestButton.name);
            const inputButtonLocator = this.actions.getLocator(this.getInputButton(text));
            await this.actions.waitForElementToBeVisible(inputButtonLocator, `Input Button: ${text}`);
            await this.actions.scrollToAndClick(inputButtonLocator, `Input Button: ${text}`);
        }
    }

    public async clickInputButton(text: string): Promise<void> {
        const inputButtonLocator = this.actions.getLocator(this.getInputButton(text));
        await this.actions.waitForElementToBeVisible(inputButtonLocator, `Input Button: ${text}`);
        await this.actions.scrollToAndClick(inputButtonLocator, `Input Button: ${text}`);
    }

    public async clickCalendarOkButton(): Promise<void> {
        const okButtonLocator = this.actions.getLocator(this.elements.okButton.selector);
        await this.actions.waitForElementToBeVisible(okButtonLocator, this.elements.okButton.name);
        await this.actions.click(okButtonLocator, this.elements.okButton.name);
    }

    public async clickTaskLinkRow(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.taskLinkRow.selector);
        await this.actions.waitForElementToBeVisible(elementLocator, this.elements.taskLinkRow.name);
        await this.actions.scrollToAndClick(elementLocator, this.elements.taskLinkRow.name);
    }

    public async clickPopupCalendarIcon(): Promise<void> {
        const calendarIconLocator = this.actions.getLocator(this.elements.popupCalendarIcon.selector);
        await this.actions.waitForElementToBeVisible(calendarIconLocator, this.elements.popupCalendarIcon.name);
        await this.actions.click(calendarIconLocator, this.elements.popupCalendarIcon.name);
    }

    public async selectPopupCalendarDate(day: string): Promise<void> {
        const popupCalendarDateLocator = this.actions.getLocator(this.getPopupCalendarDate(day));
        await this.actions.click(popupCalendarDateLocator, `Popup Calendar Date: ${day}`);
        // const buttonLocator = this.actions.getLocator(this.elementByTextSecondOccurrence(buttonText));
        // await this.actions.click(buttonLocator, `Button: ${buttonText}`);
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
    public async linkTaskToWorkOrder(taskText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(taskText);
        await this.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
        await this.clickTaskLinkRow();
    }

    public async linkAssetToTask(recordText: string, assetText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickSaveButton();
        await this.selectByElementText(recordText);
        await this.clickMoreButton(assetText);
        await this.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
    }

    public async linkPersonnelToAsset(personnelText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(personnelText);
        await this.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
    }

    public async linkInventoryToAsset(inventoryText: string, linkTitle: string, buttonText: string, confirmText: string): Promise<void> {
        await this.clickMoreButton(inventoryText);
        await this.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
        await this.actions.waitForCustomDelay(timeouts.medium);
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
        await this.selectPopupCalendarDate(day);
        await this.clickInputButton(inputOkButtonText);
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);

    }

    public async clickButtonByText(buttonText: string): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.getElementByText(buttonText)), `${buttonText} Button`);
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

    public async selectDropdownValues(ddType: string): Promise<void> {
        const dropdownLocator = this.actions.getLocator(this.getdropdownById(ddType));
        await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
        const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
        await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 5000);
        const validTitles: string[] = [];
        const count = await optionsLocator.count();
        for (let i = 0; i < count; i++) {
            const el = optionsLocator.nth(i);
            const title = await el.getAttribute('title');
            if (title && title.trim() && title !== 'Edit list values') {
                validTitles.push(title.trim());
            }
        }
        const dropdownSpecificOptions = validTitles.slice(1, -1);
        if (dropdownSpecificOptions.length === 0) {
            console.warn(`No valid options found in the dropdown: ${ddType}`);
            return;
        }
        const selectedTitle = dropdownSpecificOptions[0];
        const selectedLocator = this.actions.getLocator(this.getDDvalueByTitle(selectedTitle));
        await selectedLocator.hover();
        await selectedLocator.waitFor({ state: 'visible', timeout: 5000 });
        await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${ddType}`);
    }

    public async getDropdownOptions(): Promise<string[]> {
        const locator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
        await this.actions.waitForCondition(async () => {
            const count = await locator.count();
            if (count === 0) return false;
            for (let i = 0; i < count; i++) {
                const title = await locator.nth(i).getAttribute('title');
                if (title && title.trim().length > 0) {
                    return true;
                }
            }
            return false;
        }, 5000, 'Dropdown options with non-empty titles to appear');
        const count = await locator.count();
        const optionTitles: string[] = [];
        for (let i = 0; i < count; i++) {
            const title = await locator.nth(i).getAttribute('title');
            if (title && title.trim().length > 0) {
                optionTitles.push(title);
            }
        }
        console.log(`Dropdown options: ${optionTitles}`);
        return optionTitles;
    }

    public async selectMultipleDropdownValues(ddTypes: string[]): Promise<void> {
        const seenTitles: Set<string> = new Set();
        for (const ddType of ddTypes) {
            const dropdownLocator = this.actions.getLocator(this.getdropdownById(ddType));
            await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
            const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
            await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 5000);
            const newTitles: string[] = [];
            const count = await optionsLocator.count();
            for (let i = 0; i < count; i++) {
                const el = optionsLocator.nth(i);
                const title = await el.getAttribute('title');
                if (title && title.trim() && title !== 'Edit list values' && !seenTitles.has(title.trim())) {
                    const isVisible = await el.isVisible();
                    if (isVisible) {
                        const cleanTitle = title.trim();
                        newTitles.push(cleanTitle);
                        seenTitles.add(cleanTitle);
                    }
                }
            }
            const dropdownSpecificOptions = newTitles.slice(1, -1);
            if (dropdownSpecificOptions.length === 0) {
                console.warn(`No valid options found in the dropdown: ${ddType}`);
                return;
            }
            const selectedTitle = newTitles[0];
            const selectedLocator = this.actions.getLocator(this.getDDvalueByTitle(selectedTitle));
            await selectedLocator.hover();
            await selectedLocator.waitFor({ state: 'visible', timeout: 5000 });
            await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${ddType}`);
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
        day: string
    ): Promise<void> {
        await this.clickSaveButton();
        await this.clickElementByText(closeText);
        await this.clickElementByText(yesButtonText);
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day);
        await this.clickCalendarOkButton();
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
        phoneNumber: string,
        dropdownSelections: { ddType: string[] }
    ): Promise<void> {
        await this.clickElementByText(tabName);
        await this.clickEditButton();
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.selectMultipleDropdownValues(dropdownSelections.ddType);
        await this.setPhoneNumber(phoneNumber);
        await this.clickSaveButton();
    }

    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByText(elementText));
        await this.actions.waitForElementToBeVisible(elementLocator, `Waiting for Element: ${elementText}`);
        const actualText = await this.actions.getText(elementLocator, `Element: ${elementText}`);
        await this.actions.waitForCustomDelay(timeouts.largest);
        expect(actualText).toEqual(elementText);
    }

    public async deleteRecord(crossIconTitle: string, continueButtonText: string): Promise<void> {
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);
    }

    public async setCancelReason(
        cancelReason: string,
        day: string,
        inputOkButtonText: string): Promise<void> {
        await this.actions.hoverOverElement(
            this.actions.getLocator(this.elements.reasonForCancellationLabel.selector).nth(1),
            this.elements.reasonForCancellationLabel.name
        );
        await this.actions.click(
            this.actions.getLocator(this.elements.cancelReasonEditIcon.selector),
            this.elements.cancelReasonEditIcon.name
        );
        await this.actions.typeText(this.actions.getLocator(this.elements.cancelReasonInput.selector),
            cancelReason, this.elements.cancelReasonInput.name);
        await this.actions.click(
            this.actions.getLocator(this.elements.cancelReasonSave.selector),
            this.elements.cancelReasonFormGroup.name
        );
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day);
        await this.clickInputButton(inputOkButtonText);

    }

    public async selectByElementText(radioButtonText: string): Promise<void> {
        const radioButtonLocator = this.actions.getLocator(this.getEleByText(radioButtonText));
        await this.actions.waitForElementToBeVisible(radioButtonLocator, `Radio Button: ${radioButtonText}`);
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
        const linkLocator = this.actions.getLocator(this.getLinkByTitles(linkTitle));
        if (await linkLocator.isVisible()) {
            await this.clickLinkByTitle(linkTitle);
            const moreIconLocator = this.actions.getLocator(this.getTaskMoreIcon(timeSheetDetails));
            await this.actions.click(moreIconLocator, `Task More Icon for: ${timeSheetDetails}`);
            await this.clickLinkByTitle(plusIconTitle);
            const timeSheetDetailsLocator = this.actions.getLocator(this.getPopupGridRowByText(eleText));
            await this.actions.doubleClick(timeSheetDetailsLocator, `Double Click on: ${eleText}`);
            const hoursInputLocator = this.actions.getLocator(this.elements.hoursInputField.selector);
            await this.actions.clearAndTypeText(hoursInputLocator, hours, this.elements.hoursInputField.name);
            const timeSheetSaveButtonLocator = this.actions.getLocator(this.elements.timeSheetSaveButton.selector);
            await this.actions.click(timeSheetSaveButtonLocator, this.elements.timeSheetSaveButton.name);
            const buttonLocator = this.actions.getLocator(this.getButtonByTitle(crossIconTitle));
            await this.actions.click(buttonLocator, `${crossIconTitle} Button`);
        }
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
                    await this.actions.click(labelLocator, `Label: ${label}`);
                    const calendarIconLocator = this.actions.getLocator(this.elements.holdCalendarIcon.selector).nth(1);
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
        await this.actions.waitForCustomDelay(timeouts.medium);
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
        // const calendarIconLocator = (this.actions.getLocator(this.elements.popupCalendarIcon.selector));
        // await this.actions.click(calendarIconLocator, this.elements.popupCalendarIcon.name);
        // const dateLocator = this.actions.getLocator(this.getSecondPopupCalendarDate(day)).nth(0);
        // if (await this.actions.isVisible(dateLocator, `Second Occurrence of Calendar Date: ${day}`)) {
        //     await this.actions.scrollToAndClick(dateLocator, `Second Occurrence of Calendar Date: ${day}`);
        // } else {
        //     const dateLocators = this.actions.getLocaitator(this.getSecondPopupCalendarDate(day)).nth(0);
        //     await this.actions.click(dateLocators, `Second Occurrence of Calendar Date: ${day}`);
        // }
        const locator = await this.actions.getLocator(this.elements.popupTextInput.selector);
        await this.actions.waitForElementToBeVisible(locator, this.elements.popupTextInput.name);
        await this.actions.typeText(locator, day, this.elements.popupTextInput.name);
        await this.clickInputButton(inputOkButtonText);
        await this.clickOnSecondClosePopup(inputOkButtonText);
        await this.actions.click(sideBarExpanderLocator, this.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);

    }
}

export const workOrderPage = new WorkOrderPage();
