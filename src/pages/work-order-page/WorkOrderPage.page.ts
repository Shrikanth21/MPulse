import { Page, expect } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { timeouts } from '../../helper/timeouts-config';
import { getCurrentMonthName } from '../../helper/date/get-current-month';
import { commonActionPage } from '../common.action.page';

class WorkOrderPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        editButton: { selector: '#edit-work-order', name: "Edit Button" },
        mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
        taskLinkRow: { selector: "(//div[@class='dx-datagrid-content']//table)[2]//tr[2]", name: "Task Link Row" },
        popupCalendarIcon: { selector: "//div[contains(@class,'modal-content')]/descendant::div[@class='dx-dropdowneditor-icon']", name: "Popup Calendar Icon" },
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
        cancelPopupTextInputModal: { selector: "//div[@class='modal-content ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Cancel Popup Text Input Modal" },
    };

    private getInputButton = (text: string): string => `//input[@value='${text}']`;
    private getOkButton = (text: string): string => `//input[@title='${text}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getCalendarDate = (day: string): string => `(//div[contains(@class, 'dx-calendar-body')]//span[text()='${day}'])[1]`;
    private getPopupCalendarDate = (day: string): string => `((//div[contains(@class, 'dx-calendar-body')])[2]//span[text()='${day}'])[1]`;
    private getMoreButton = (text: string): string => `${this.getElementByText(text)}/parent::div/following-sibling::div//div[@class='moreBtn']`;
    private getEditIcon = (text: string): string => `${this.getElementByText(text)}/ancestor::div[contains(@class, 'activeEditor')]//span[contains(@class, 'editor') and @title='Edit Field']`;
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

    /**
     * Clicks a link by its text.
     * @param text The text of the link to click.
     */
    public async selectRowInLinkAssetPopupIfVisible(): Promise<void> {
        const locator = this.actions.getLocator(this.elements.selectRowInLinkAssetPopup.selector).nth(0);
        await this.actions.waitForElementToBeVisible(locator, this.elements.selectRowInLinkAssetPopup.name);
        await this.actions.click(locator, this.elements.selectRowInLinkAssetPopup.name);
    }

    /**
     * Clicks on the "Upload Media" link in the media section.
     */
    public async clickUploadMediaLink(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.getLinkByTitle.selector);
        await this.actions.click(elementLocator, this.elements.getLinkByTitle.name);
    }

    /**
     * Clicks on the text input field in the popup.
     * @param text The text to enter in the input field.
     */
    public async clickElementByText(fieldName: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(this.getElementByText(fieldName));
        await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${fieldName}`);
        await this.actions.mouseHoverAndClick(fieldLocator, `Field: ${fieldName}`);
    }

    /**
     * Clicks on the edit icon for a specific field.
     * @param fieldName The name of the field to edit.
     */
    public async clickEditIconForField(fieldName: string): Promise<void> {
        const editIconLocator = this.actions.getLocator(this.getEditIcon(fieldName));
        await this.actions.waitForElementToBeVisible(editIconLocator, `Edit Icon for Field: ${fieldName}`);
        await this.actions.scrollToElement(editIconLocator, `Edit Icon for Field: ${fieldName}`);
        await this.actions.click(editIconLocator, `Edit Icon for Field: ${fieldName}`);
        const activeElement = await this.actions.getActiveElement();
        await activeElement.evaluate(el => el.tagName);
    }

    /**
     * Select the date from the calendar.
     * @param day The day to select from the calendar.
     * @param buttonText The text of the button to click after selecting the date.
     */
    public async selectDateFromCalendar(day: string, buttonText: string): Promise<void> {
        const dateLocator = this.actions.getLocator(this.getCalendarDate(day));
        await this.actions.click(dateLocator, `Calendar Date: ${day}`);
        await this.actions.click(this.actions.getLocator(this.getElementByText(buttonText)), `Button: ${buttonText}`);
    }

    /**
     * Clicks on the "More" button for a specific text.
     * @param text The text of the element to click the "More" button for.
     */
    public async clickMoreButton(text: string): Promise<void> {
        const moreButtonLocator = this.actions.getLocator(this.getMoreButton(text));
        await this.actions.scrollToAndClick(moreButtonLocator, `${text} More Button`);
    }

    /**
     * Clicks on link by its text.
     * @param title The text of the link to click.
     */
    public async clickLinkText(title: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getLinkByTitleText(title));
        await this.actions.waitForElementToBeVisible(elementLocator, `Link Text: ${title}`);
        await this.actions.click(elementLocator, `Link Text: ${title}`);
    }

    /**
     * click on second second popup calendar date.
     * @param day The day to select from the second popup calendar.
     */
    public async clickOnSecondClosePopup(text: string): Promise<void> {
        const modalTitleLocator = await this.actions.getLocator(this.elements.modalTitle.selector);
        if (await modalTitleLocator.isVisible()) {
            const inputButtonLocator = await this.actions.getLocator(this.getOkButton(text));
            await this.actions.waitForElementToBeVisible(inputButtonLocator, `Input Button: ${text}`);
            await this.actions.scrollToAndClick(inputButtonLocator, `Input Button: ${text}`);
            await this.actions.waitForClickable(this.actions.getLocator(this.elements.okButton.selector), this.elements.okButton.name);
            await this.actions.click(this.actions.getLocator(this.elements.okButton.selector), this.elements.okButton.name);
        }
    }

    /**
     * Clicks on input button by its text.
     * @param text The text of the button to click.
     */
    public async clickInputButton(text: string): Promise<void> {
        const inputButtonLocator = this.actions.getLocator(this.getInputButton(text));
        if (await inputButtonLocator.isVisible()) {
            await this.actions.waitForElementToBeVisible(inputButtonLocator, `Input Button: ${text}`);
            await this.actions.scrollToAndClick(inputButtonLocator, `Input Button: ${text}`);
        }
    }
    /**
     * clicks on the "Ok" button in the calendar popup.
     * @param text The text of the button to click.
     */
    public async clickCalendarOkButton(): Promise<void> {
        const okButtonLocator = this.actions.getLocator(this.elements.okButton.selector);
        await this.actions.waitForElementToBeVisible(okButtonLocator, this.elements.okButton.name);
        await this.actions.click(okButtonLocator, this.elements.okButton.name);
    }

    /**
     * Clicks on the task link row.
     */
    public async clickTaskLinkRow(): Promise<void> {
        const elementLocator = this.actions.getLocator(this.elements.taskLinkRow.selector);
        await this.actions.waitForElementToBeVisible(elementLocator, this.elements.taskLinkRow.name);
        await this.actions.scrollToAndClick(elementLocator, this.elements.taskLinkRow.name);
    }

    /**
     * clicks on the calendar icon in the popup.
     */
    public async clickPopupCalendarIcon(): Promise<void> {
        const calendarIconLocator = this.actions.getLocator(this.elements.popupCalendarIcon.selector);
        await this.actions.waitForElementToBeVisible(calendarIconLocator, this.elements.popupCalendarIcon.name);
        await this.actions.click(calendarIconLocator, this.elements.popupCalendarIcon.name);
    }

    /**
     * Selects a date from the popup calendar.
     * @param day The day to select from the popup calendar.
     */
    public async selectPopupCalendarDate(day: string): Promise<void> {
        const popupCalendarDateLocator = this.actions.getLocator(this.getPopupCalendarDate(day));
        await this.actions.click(popupCalendarDateLocator, `Popup Calendar Date: ${day}`);
    }

    /**
     * Verifies that the linked image is visible.
     */
    public async verifyLinkedImageVisible(): Promise<void> {
        const imageLocator = this.actions.getLocator(this.elements.docxFormatIcon.selector);
        await this.actions.waitForElementToBeVisible(imageLocator, this.elements.docxFormatIcon.name);
    }

    /**
     * Creates a work order from the "More" dropdown.
     * @param dropdownOption The option in the "More" dropdown to select.
     * @param createOption The option to create a work order.
     * @param description The description of the work order.
     */
    public async createWorkOrderFromMoreDropDown(dropdownOption: string, createOption: string, description: string): Promise<void> {
        await this.currentPage.waitForTimeout(timeouts.medium);
        await commonActionPage.clickLinkByTitle(dropdownOption);
        await commonActionPage.clickLinkByTitle(createOption);
        await this.currentPage.waitForTimeout(timeouts.medium);
        await commonActionPage.enterDescription(description);
        await commonActionPage.clickSaveButton();
    }

    /**
     * Clicks on the calendar icon in the popup.
     * @param fieldName The name of the field to click.
     * @param editIconForField The edit icon for the field.
     * @param day The day to select from the calendar.
     * @param buttonText The text of the button to click.
     */
    public async performCalendarActions(fieldName: string, editIconForField: string, day: string, buttonText: string): Promise<void> {
        await this.clickElementByText(fieldName);
        await this.clickEditIconForField(editIconForField);
        await this.currentPage.waitForTimeout(timeouts.medium);
        await this.selectDateFromCalendar(day, buttonText);
    }

    /**
     * Links a task to a work order.
     * @param taskText The text of the task to link.
     * @param linkTitle The title of the link to click.
     * @param buttonText The text of the button to click.
     */
    public async linkTaskToWorkOrder(taskText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(taskText);
        await commonActionPage.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
        await this.clickTaskLinkRow();
    }

    /**
     * Links an asset to a task.
     * @param recordText The text of the record to link.
     * @param assetText The text of the asset to link.
     * @param linkTitle The title of the link to click.
     * @param buttonText The text of the button to click.
     */
    public async linkAssetToTask(recordText: string, assetText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(assetText);
        await commonActionPage.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
    }

    /**
     * Links a personnel to an asset.
     * @param personnelText The text of the personnel to link.
     * @param linkTitle The title of the link to click.
     * @param buttonText The text of the button to click.
     */
    public async linkPersonnelToAsset(personnelText: string, linkTitle: string, buttonText: string): Promise<void> {
        await this.clickMoreButton(personnelText);
        await commonActionPage.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
    }

    /**
     * Links an inventory item to an asset.
     * @param inventoryText The text of the inventory item to link.
     * @param linkTitle The title of the link to click.
     * @param buttonText The text of the button to click.
     * @param confirmText The text of the confirmation button to click.
     */
    public async linkInventoryToAsset(inventoryText: string, linkTitle: string, buttonText: string, confirmText: string): Promise<void> {
        await this.clickMoreButton(inventoryText);
        await commonActionPage.clickLinkByTitle(linkTitle);
        await this.selectRowInLinkAssetPopupIfVisible();
        await this.clickInputButton(buttonText);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.clickInputButton(confirmText);
    }

    /**
     * Performs a series of actions on the home page.
     * @param closeText The text of the close button.
     * @param yesButtonText The text of the yes button.
     * @param day The day to select from the calendar.
     * @param inputOkButtonText The text of the input ok button.
     * @param crossIconTitle The title of the cross icon.
     * @param continueButtonText The text of the continue button.
     */
    public async performHomePageActions(
        closeText: string,
        yesButtonText: string,
        day: string,
        inputOkButtonText: string,
        crossIconTitle: string,
        continueButtonText: string
    ): Promise<void> {
        await commonActionPage.clickSaveButton();
        await this.clickElementByText(closeText);
        await this.clickElementByText(yesButtonText);
        await this.clickPopupCalendarIcon();
        await this.selectPopupCalendarDate(day);
        await this.clickInputButton(inputOkButtonText);
        await commonActionPage.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);

    }

    /**
     * Clicks a button by its text.
     * @param buttonText The text of the button to click.
     */
    public async clickButtonByText(buttonText: string): Promise<void> {
        const buttonLocator = this.actions.getLocator(this.getElementByText(buttonText));
        await this.actions.waitForElementToBeVisible(buttonLocator, `Button: ${buttonText}`);
        await this.actions.click(buttonLocator, `Button: ${buttonText}`);
    }

    /**
     * Uploads a media file.
     * @param mediaButtonText The text of the media button.
     * @param linkIconTitle The title of the link icon.
     * @param filePath The path to the media file.
     * @param btnText The text of the button to click.
     */
    public async uploadMediaFile(mediaButtonText: string, linkIconTitle: string, filePath: string, btnText: string): Promise<void> {
        await this.clickButtonByText(mediaButtonText);
        await this.actions.waitForClickable(this.actions.getLocator(this.elements.mediaMoreButton.selector), this.elements.mediaMoreButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.mediaMoreButton.selector), this.elements.mediaMoreButton.name);
        await this.actions.waitForClickable(this.actions.getLocator(this.elements.getLinkByTitle.selector), `Link: ${linkIconTitle}`);
        await this.actions.click(this.actions.getLocator(this.elements.getLinkByTitle.selector), `Second Occurrence of Link: ${linkIconTitle}`);
        await this.actions.waitForElementToBeVisible(this.actions.getLocator(this.elements.fileInput.selector), this.elements.fileInput.name);
        await this.actions.uploadFile(this.actions.getLocator(this.elements.fileInput.selector), filePath, 'Media File Upload');
        await this.actions.waitForClickable(this.actions.getLocator(this.getButtonByTitle(btnText)), `${btnText} Button`);
        await this.actions.click(this.actions.getLocator(this.getButtonByTitle(btnText)), `${btnText} Button`);
    }

    /**
     * Creates a work order with the specified parameters.
     * @param addButtonTitle The title of the add button.
     * @param description The description of the work order.
     * @param mediaButtonText The text of the media button.
     * @param mediaLinkTitle The title of the media link.
     * @param mediaFilePath The path to the media file.
     * @param btnTitle The title of the button.
     * @param recordText 
     */
    public async createWorkOrder(addButtonTitle: string, description: string, mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string, btnTitle: string): Promise<void> {
        await this.currentPage.waitForTimeout(timeouts.large);
        await commonActionPage.clickLinkByTitle(addButtonTitle);
        await commonActionPage.enterDescription(description);
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath, btnTitle);
    }

    /**
     * Selects a value from a dropdown.
     * @param ddType The type of the dropdown.
     * @returns 
     */
    public async selectDropdownValues(ddType: string, title: string): Promise<void> {
        const dropdownLocator = this.actions.getLocator(this.getdropdownById(ddType));
        await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
        const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
        await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
        const validTitles: string[] = [];
        const count = await optionsLocator.count();
        for (let i = 0; i < count; i++) {
            const el = optionsLocator.nth(i);
            const title = await el.getAttribute('title');
            if (title && title.trim() && title !== 'Edit list values') {
                validTitles.push(title.trim());
            }
        }
        if (validTitles.length === 0) {
            console.warn(`No valid options found in the dropdown: ${ddType}. Leaving it empty.`);
            await commonActionPage.clickByDivTitle(title);
            return;
        }
        const selectedTitle = validTitles[0];
        const selectedLocator = this.actions.getLocator(this.getDDvalueByTitle(selectedTitle));
        await selectedLocator.hover();
        await selectedLocator.waitFor({ state: 'visible', timeout: 3000 });
        await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${ddType}`);
    }

    /**
     * Retrieves the options from a dropdown.
     * @returns An array of option titles.
     */
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
        }, 3000, 'Dropdown options with non-empty titles to appear');
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

    /**
     * Selects multiple values from dropdowns.
     * @param ddTypes The types of the dropdowns.
     */
    public async selectMultipleDropdownValues(ddTypes: string[], title: string): Promise<void> {
        const seenTitles: Set<string> = new Set();
        for (const ddType of ddTypes) {
            const dropdownLocator = this.actions.getLocator(this.getdropdownById(ddType));
            await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
            const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
            await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
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
            if (newTitles.length === 0) {
                await commonActionPage.clickByDivTitle(title);
                await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
                console.warn(`No valid options found in the dropdown: ${ddType}. Leaving it empty.`);
                continue;
            }
            const selectedTitle = newTitles[0];
            const selectedLocator = this.actions.getLocator(this.getDDvalueByTitle(selectedTitle));
            await selectedLocator.hover();
            await selectedLocator.waitFor({ state: 'visible', timeout: 2000 });
            await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${ddType}`);
        }
    }

    /**
     * Clicks the "Edit" button on the work order page.
     * @returns A promise that resolves when the button is clicked.
     */
    public async clickEditButton(): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.elements.editButton.selector), this.elements.editButton.name);
    }

    /**
     * Closes the work order.
     * @param closeText The text of the close button.
     * @param yesButtonText The text of the yes button.
     * @param inputOkButtonText The text of the OK button in the input dialog.
     * @param day The day to set for the close date.
     */
    public async closeWorkOrder(
        closeText: string,
        yesButtonText: string,
        inputOkButtonText: string,
        day: string
    ): Promise<void> {
        await commonActionPage.clickSaveButton();
        await this.clickElementByText(closeText);
        await this.clickElementByText(yesButtonText);
        await this.selectCloseDate(day);
        await this.clickOnSecondClosePopup(inputOkButtonText);
    }

    /**
     * Sets the phone number in the work order.
     * @param phoneNumber The phone number to set.
     */
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

    /**
     * Sets the general fields in the work order.
     * @param tabName The name of the tab to select.
     * @param phoneNumber The phone number to set.
     * @param dropdownSelections The dropdown selections to make.
     */
    public async setGeneralFields(
        tabName: string,
        phoneNumber: string,
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        await this.clickElementByText(tabName);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
        await this.setPhoneNumber(phoneNumber);
        await commonActionPage.clickSaveButton();
    }

    /**
     * Validates the text of a specific element on the page.
     * @param elementText The expected text of the element.
     */
    public async validateElementText(elementText: string): Promise<void> {
        const elementLocator = this.actions.getLocator(this.getElementByText(elementText));
        await this.actions.waitForElementToBeVisible(elementLocator, `Waiting for Element: ${elementText}`);
        const actualText = await this.actions.getText(elementLocator, `Element: ${elementText}`);
        await this.actions.assertEqual(actualText, elementText, `Element text mismatch: ${actualText} !== ${elementText}`);
    }

    /**
     * Deletes a record from the work order page.
     * @param crossIconTitle The title of the cross icon to click.
     * @param continueButtonText The text of the continue button.
     */
    public async deleteRecord(crossIconTitle: string, continueButtonText: string): Promise<void> {
        await commonActionPage.clickLinkByTitle(crossIconTitle);
        await this.clickElementByText(continueButtonText);
    }

    /**
     * Sets the reason for cancellation in the work order.
     * @param cancelReason The reason for cancellation.
     * @param day The day to set for the cancellation date.
     * @param inputOkButtonText The text of the OK button in the input dialog.
     */
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
        await this.selectCancelDate(day);
        await this.clickOnSecondClosePopup(inputOkButtonText);

    }

    /**
     * Selects a radio button by its text.
     * @param radioButtonText The text of the radio button to select.
     */
    public async selectByElementText(radioButtonText: string): Promise<void> {
        const radioButtonLocator = this.actions.getLocator(this.getEleByText(radioButtonText));
        await this.actions.waitForElementToBeVisible(radioButtonLocator, `Radio Button: ${radioButtonText}`);
        await this.actions.waitForCustomDelay(timeouts.large);
        await this.actions.click(radioButtonLocator, `Radio Button: ${radioButtonText}`);
    }

    /**
     * Sets the cost for a specific field in the work order.
     * @param id The ID of the work order.
     * @param fieldName The name of the field to edit.
     * @param inputField The input field to set the cost.
     * @param cost The cost value to set.
     */
    public async setCost(id: string, fieldName: string, inputField: string, cost: string): Promise<void> {
        await commonActionPage.clickTabByText('Financial')
        const linkLocator = this.actions.getLocator(this.getById(id));
        await this.actions.click(linkLocator, `Link: ${id}`);

        const editIconLocator = this.actions.getLocator(this.getEditIcon(fieldName));
        await this.actions.click(editIconLocator, `Edit Icon for Field: ${fieldName}`);

        const costInputLocator = this.actions.getLocator(this.getCostInputField(inputField));
        await this.actions.clearAndTypeText(costInputLocator, cost, `Cost Input for ${inputField}`);
    }

    /**
     * Sets the financial fields in the work order.
     * @param costFields The array of cost field objects to set.
     */
    public async setFinancialFields(costFields: { id: string; fieldName: string; inputField: string; cost: string }[]): Promise<void> {
        for (const field of costFields) {
            await this.setCost(field.id, field.fieldName, field.inputField, field.cost);
        }
        await this.actions.waitForCustomDelay(timeouts.small);
    }

    /**
     * Sets the actual hours for an employee in the work order.
     * @param personnelText The text of the personnel to set hours for.
     * @param linkTitle The title of the link to click.
     * @param timeSheetDetails The details of the timesheet.
     * @param plusIconTitle The title of the plus icon to click.
     * @param eleText The text of the element to double-click.
     * @param hours The number of hours to set.
     * @param crossIconTitle The title of the cross icon to click after saving.
     */
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
        const linkLocator = this.actions.getLocator(commonActionPage.getElementByTitle(linkTitle));
        if (await linkLocator.isVisible()) {
            await commonActionPage.clickLinkByTitle(linkTitle);
            const moreIconLocator = this.actions.getLocator(this.getTaskMoreIcon(timeSheetDetails));
            await this.actions.click(moreIconLocator, `Task More Icon for: ${timeSheetDetails}`);
            await commonActionPage.clickLinkByTitle(plusIconTitle);
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

    /**
     * Changes the status of a work order.
     * @param fieldName The name of the field to change.
     * @param editIconForField The edit icon for the field.
     * @param radioButtonText The text of the radio button to select.
     */
    public async changeWKOstatus(fieldName: string, editIconForField: string, radioButtonText: string): Promise<void> {
        await this.clickElementByText(fieldName);
        await this.clickEditIconForField(editIconForField);
        await this.selectByElementText(radioButtonText);
    }

    /**
     * Sets the hold information for a work order.
     * @param fieldName The name of the field to change.
     * @param editIconForField The edit icon for the field.
     * @param radioButtonText The text of the radio button to select.
     * @param labels The labels to click.
     * @param ddValue The dropdown value to select.
     * @param day The day to hold the work order.
     * @param btnText The text of the button to click.
     */
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
            await this.actions.waitForClickable(labelLocator, `Label: ${label}`);
            await this.actions.click(labelLocator, `Label: ${label}`);
            const editIconLocator = this.actions.getLocator(this.getEditIconByLabel(label));
            await this.actions.waitForClickable(editIconLocator, `Edit Icon for Label: ${label}`);
            await this.actions.click(editIconLocator, `Edit Icon for Label: ${label}`);

            switch (label) {
                case 'Hold Reason':
                    const dropdownValueLocator = this.actions.getLocator(this.getDDvalueByTitle(ddValue));
                    await this.actions.waitForClickable(dropdownValueLocator, `Dropdown Value: ${ddValue}`);
                    await this.actions.click(dropdownValueLocator, `Dropdown Value: ${ddValue}`);
                    break;

                case 'Hold Until':
                    await this.actions.waitForClickable(labelLocator, `Dropdown Value: ${label}`);
                    await this.actions.click(labelLocator, `Clicking Hold Until Label: ${label}`);
                    await this.selectHoldDate(day);
                    break;
            }
        }

        const saveBtn = this.actions.getLocator(`(${this.getElementByText(btnText)})[2]`);
        await this.actions.click(saveBtn, `Button: ${btnText}`);
    }

    /**
     * Lists the work order details in a view.
     * @param description The description of the work order.
     */
    public async listViewWKO(description: string): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.checkIcon.name);
        await this.actions.click(saveBtn, this.elements.checkIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.typeText(this.actions.getLocator(this.elements.wkoInput.selector).nth(0), description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
        await commonActionPage.clickEditButton();
    }

    /**
     * Adds media and selects a record.
     * @param mediaButtonText The text of the media button.
     * @param mediaLinkTitle The title of the media link.
     * @param mediaFilePath The file path of the media.
     * @param btnTitle The title of the button.
     */
    public async addMediaAndSelectRecord(mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string, btnTitle: string): Promise<void> {
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath, btnTitle);
    }

    /**
     * Selects the close date for the work order.
     * @param day The day to select as the close date.
     */
    public async selectCloseDate(day: string): Promise<void> {
        const locator = await this.actions.getLocator(this.elements.popupTextInput.selector);
        await this.actions.waitForElementToBeVisible(locator, this.elements.popupTextInput.name);
        await this.actions.typeText(locator, day, this.elements.popupTextInput.name);
        await this.actions.waitForClickable(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
    }

    /**
     * Selects the cancel date for the work order.
     * @param day The day to select as the cancel date.
     */
    public async selectCancelDate(day: string): Promise<void> {
        const locator = await this.actions.getLocator(this.elements.cancelPopupTextInputModal.selector);
        await this.actions.waitForElementToBeVisible(locator, this.elements.cancelPopupTextInputModal.name);
        await this.actions.typeText(locator, day, this.elements.cancelPopupTextInputModal.name);
        await this.actions.waitForClickable(this.actions.getLocator(this.elements.okButton.selector), this.elements.okButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.okButton.selector), this.elements.okButton.name);
    }

    /**
     * Selects the hold date for the work order.
     * @param day The day to select as the hold date.
     */
    public async selectHoldDate(day: string): Promise<void> {
        const locator = await this.actions.getLocator(this.elements.popupTextInput.selector).nth(2);
        await this.actions.waitForElementToBeVisible(locator, this.elements.popupTextInput.name);
        await this.actions.typeText(locator, day, this.elements.popupTextInput.name);
    }

    /**
     * Closes the work order with the specified button.
     * @param day The day to select as the close date.
     * @param inputOkButtonText The text of the OK button.
     */
    public async closeWorkOrderWithButton(
        day: string,
        inputOkButtonText: string
    ): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.closeWorkOrderButton.selector), this.elements.closeWorkOrderButton.name);
        const yesSpanLocator = this.actions.getLocator(this.elements.yesSpan.selector);
        await this.actions.click(yesSpanLocator, this.elements.yesSpan.name);
        await this.selectCloseDate(day);
        await this.clickOnSecondClosePopup(inputOkButtonText);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
    }
}

export const workOrderPage = new WorkOrderPage();
