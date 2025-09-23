import { expect, Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";
import { workOrderPage } from "../work-order-page/WorkOrderPage.page";
import { homePageActions } from "../actions/home.page.action/home.page.actions";
import { commonPageActions } from "../actions/common.page.actions";
import { CommonPageLocators } from "../locators/common.page.locator";

class ScheduledMaintenanceRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
        smrId: { selector: "//div[contains(@class,'textTruncate')]/descendant::span[@id='Code']", name: "SMR id" },
        wkoId: { selector: "//span[contains(@title,'WKO')]", name: "WKO id" },
        smrDescription: { selector: "//span[@id='Desc']", name: "SMR Description" },
        wkoDescription: { selector: "//span[@id='Description']", name: "WKO Description" },
        floatingTypeRadioBtn: (floatingTypeText: string) => `//input[@id='${floatingTypeText}']`, name: "Floating Schedule Type radio button",
        scheduleTypeText: (scheduleType: string) => `//div[contains(@class,'schedule-type scheduledtype-left')]/descendant::div/descendant::b[contains(text(),'${scheduleType}')]`,
        meterBasedinput: (input: string) => `//div[@dx-select-box='${input}']`,
        scheduledDateLabel: (dateLabel: string) => `//b[contains(text(), "${dateLabel}")]`,
        smrEveryTextInput: { selector: "//div[contains(@class,'daily-mobile')]/descendant::input[@type='text']", name: "SMR Every text input" },
        smrIntervalTextInput: { selector: "//div[@class='schedule-type']//input[@class='dx-texteditor-input']", name: "SMR Interval text input" },
        recurrencePatternText: { selector: "//div[@class='panel-body schedule-type']/descendant::div[@class='ng-binding']", name: "Floating Schedule Meter" },
        recurrenceIntervalText: { selector: "//input[@id='floatOnly floatMeter']", name: "Recurrence Interval text" },
        mergeCheckbox: { selector: "//div[contains(@data-options,'dxView ')]//div[@id='SMRMERGE']//span[@class='dx-checkbox-icon']", name: "Merge checkbox" },
        configTimeBasedCheckBox: { selector: "//div[@dx-check-box='configTimeBasedCheckBox']", name: "Config Time Based checkbox" },
        configMeterBasedCheckBox: { selector: "//div[@dx-check-box='configMeterBasedCheckBox']", name: "Config Meter Based checkbox" },
        fixedRadioInput: { selector: "//div[@class='schedule-type scheduledtype-left']/descendant::div//input[contains(@class,'touched')]", name: "Fixed Schedule Type radio button" },
        fixedDoneDateInput: { selector: "//div[@class='schedule-type scheduledtype-left']//input[@class='dx-texteditor-input']", name: "Fixed Done Date input" },
        meterBasedCheckbox: { selector: "//span[text()='Use Meter Based Scheduling?']", name: "Use Meter Based Scheduling checkbox" },
        lastMeterReadingDateLabel: { selector: "//label[text()=' Last Meter Reading Date ']", name: "Last Meter Reading Date label" },
        lastMeterReadingDateValue: { selector: "//span[@class='pull-left']/child::b", name: "Last Meter Reading Date value" },
        scheduledDateValue: { selector: "//div[@class='pull-left margin_L5 ng-binding ng-scope']", name: "Scheduled Date container" },
        smrNextDueDateValue: { selector: "//span[@id='SMRNextDate']", name: "SMR Next Due Date value" },
        anticipatedUseInput: { selector: "//div[@id='AnticipatedUse']/descendant::input[@inputmode='decimal']", name: "Anticipated Use input" },
        frequencyIntervalInput: { selector: "//div[@id='FrequencyInterval']", name: "Frequency Interval input" },
        metersListMoreBtn: { selector: "//servicegrid[@id='MetersList']/descendant::div[@class='moreBtn']", name: "Meters List More Button" },
        addNewRowButton: { selector: "//li[@ng-click='insertNewRow()']", name: "Add New Row button" },
        serviceGridSelectedRow: { selector: '//div[@id="serviceGridContainer"]/descendant::tr[@class=\'dx-row dx-data-row dx-column-lines dx-selection\']/child::td', name: "Service Grid Selected Row" },
        saveServiceGridButton: { selector: '//li[@ng-click="saveEdit()"]', name: "Save Edit button" },
        serviceGridDropdownIcon: { selector: "//div[@class='dx-datagrid-content']//div[@class='dx-dropdowneditor-icon']", name: "Service Grid Dropdown Icon" },
    }

    /**
     * Checks the state of the Merge Scheduled Maintenance Records checkbox.
     */
    public async checkMergeCheckbox(): Promise<void> {
        const mergeCheckboxElement = await this.actions.getLocator(this.elementSelectors.mergeCheckbox.selector);
        await this.actions.waitForElementToBeVisible(mergeCheckboxElement, this.elementSelectors.mergeCheckbox.name);
        await this.actions.click(mergeCheckboxElement, this.elementSelectors.mergeCheckbox.name);
    }

    /**
     * Checks the state of the Config Time Based checkbox.
     */
    public async checkConfigTimeBasedCheckbox(): Promise<void> {
        const configTimeBasedCheckBoxElement = await this.actions.getLocator(this.elementSelectors.configTimeBasedCheckBox.selector);
        if (!(await this.actions.isCheckboxChecked(configTimeBasedCheckBoxElement, this.elementSelectors.configTimeBasedCheckBox.name))) {
            await this.actions.click(configTimeBasedCheckBoxElement, this.elementSelectors.configTimeBasedCheckBox.name);
        }
    }

    /**
     * Checks the state of the Config Meter Based checkbox.
     */
    public async checkConfigMeterBasedCheckbox(): Promise<void> {
        const configMeterBasedCheckBoxElement = await this.actions.getLocator(this.elementSelectors.configMeterBasedCheckBox.selector);
        if (!(await this.actions.isCheckboxChecked(configMeterBasedCheckBoxElement, this.elementSelectors.configMeterBasedCheckBox.name))) {
            await this.actions.click(configMeterBasedCheckBoxElement, this.elementSelectors.configMeterBasedCheckBox.name);
        }
    }

    /**
     * Creates a new Scheduled Maintenance Record.
     * @param description The description of the record.
     * @param tabName The name of the tab to select.
     * @param dropdownSelections The dropdown selections for the record.
     * @param divTitle The title of the div containing the record.
     */
    public async createScheduledMaintenanceRecord(
        description: string,
        tabName: string,
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        commonPageActions.clickAddNewRecordButton();
        await commonPageActions.enterDescription(description);
        await commonPageActions.clickTabByText(tabName);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
    }

    /**
     * Verifies that the Scheduled Maintenance Record is visible.
     * @param page The page context (e.g., "SMR" or "WKO").
     * @param description The description of the record.
     * @param startWithText The text that the SMR ID should start with.
     */
    public async verifyScheduledMaintenanceRecordVisible(page: string, description: string, startWithText: string): Promise<void> {
        switch (page) {
            case "SMR":
                const smrIdElement = await this.actions.getLocator(this.elementSelectors.smrId.selector);
                await this.actions.waitForElementToBeVisible(smrIdElement, this.elementSelectors.smrId.name);
                const smrId = await this.actions.getText(smrIdElement, this.elementSelectors.smrId.name);
                await this.actions.assertStartsWith(smrId, startWithText, this.elementSelectors.smrId.name);
                const smrDescriptionElement = await this.actions.getLocator(this.elementSelectors.smrDescription.selector);
                await this.actions.waitForElementToBeVisible(smrDescriptionElement, this.elementSelectors.smrDescription.name);
                const smrDescription = await this.actions.getText(smrDescriptionElement, this.elementSelectors.smrDescription.name);
                await this.actions.assertEqual(smrDescription, description, this.elementSelectors.smrDescription.name);
                break;
            case "WKO":
                const openWkoIdElement = await this.actions.getLocator(this.elementSelectors.wkoId.selector);
                await this.actions.waitForElementToBeVisible(openWkoIdElement, this.elementSelectors.wkoId.name);
                const openWkoId = await openWkoIdElement.innerText();
                await this.actions.assertStartsWith(openWkoId, startWithText, this.elementSelectors.wkoId.name);
                const wkoDescriptionElement = await this.actions.getLocator(this.elementSelectors.wkoDescription.selector);
                await this.actions.waitForElementToBeVisible(wkoDescriptionElement, this.elementSelectors.wkoDescription.name);
                const wkoDescription = await this.actions.getText(wkoDescriptionElement, this.elementSelectors.wkoDescription.name);
                await this.actions.assertEqual(wkoDescription, description, this.elementSelectors.wkoDescription.name);
                break;
            default:
                throw new Error(`Unexpected page: ${page}`);
        }
    }

    /**
     * Sets the Floating Schedule for the Scheduled Maintenance Record.
     * @param floatingScheduleType The type of the floating schedule.
     * @param date The date for the floating schedule.
     */
    public async setFloatingSchedule(tabName: string, floatingScheduleType: string, date: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickEditButton();
        await this.checkConfigTimeBasedCheckbox();
        const floatingScheduleElement = await this.actions.getLocator(this.elementSelectors.floatingTypeRadioBtn(floatingScheduleType));
        await this.actions.waitForElementToBeVisible(floatingScheduleElement, `Floating Schedule Type: ${floatingScheduleType}`);
        await this.actions.click(floatingScheduleElement, `click on Floating Schedule Type: ${floatingScheduleType}`);
        const intervalInputEl = await this.actions.getLocator(this.elementSelectors.smrIntervalTextInput.selector);
        await this.actions.waitForElementToBeVisible(intervalInputEl, this.elementSelectors.smrIntervalTextInput.name);
        await this.actions.clearAndTypeText(intervalInputEl, date, this.elementSelectors.smrIntervalTextInput.name);
    }

    /**
     * Sets the Fixed Schedule for the Scheduled Maintenance Record.
     * @param tabName The name of the tab.
     * @param doneDate The done date for the fixed schedule.
     */
    public async setFixedSchedule(tabName: string, doneDate: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickEditButton();
        await this.checkConfigTimeBasedCheckbox();
        const fixedRadioInputEl = await this.actions.getLocator(this.elementSelectors.fixedRadioInput.selector);
        await this.actions.waitForElementToBeVisible(fixedRadioInputEl, this.elementSelectors.fixedRadioInput.name);
        await this.actions.click(fixedRadioInputEl, this.elementSelectors.fixedRadioInput.name);
        const fixedDoneDateInputEl = await this.actions.getLocator(this.elementSelectors.fixedDoneDateInput.selector);
        await this.actions.waitForElementToBeVisible(fixedDoneDateInputEl, this.elementSelectors.fixedDoneDateInput.name);
        await this.actions.clearAndTypeText(fixedDoneDateInputEl, doneDate, this.elementSelectors.fixedDoneDateInput.name);
    }

    /**
     * Sets the recurrence pattern for the Scheduled Maintenance Record.
     * @param recurrencePattern The recurrence pattern to set.
     * @param recurrenceDay The day of the recurrence.
     */
    public async setRecurrencePattern(tabName: string, recurrencePattern: string, recurrenceDay: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickByDivText(recurrencePattern);
        const recurrencePatternInputEl = await this.actions.getLocator(this.elementSelectors.smrEveryTextInput.selector);
        await this.actions.waitForElementToBeVisible(recurrencePatternInputEl, this.elementSelectors.smrEveryTextInput.name);
        await this.actions.typeText(recurrencePatternInputEl, recurrenceDay, this.elementSelectors.smrEveryTextInput.name);
    }

    /**
     * Verifies that the Floating Schedule is applied.
     */
    public async verifyScheduleTypeApplied(scheduleType: string): Promise<void> {
        const scheduleTypeElement = await this.actions.getLocator(this.elementSelectors.scheduleTypeText(scheduleType));
        await this.actions.waitForElementToBeVisible(scheduleTypeElement, `Schedule Type text '${scheduleType}'`);
        const scheduleTypeText = await this.actions.getText(scheduleTypeElement, `Schedule Type text '${scheduleType}'`);
        await this.actions.assertTrue(scheduleTypeText.includes(scheduleType), `Schedule Type text '${scheduleType}'`);
    }

    /**
     * Verifies that the Fixed Schedule is applied.
     */
    public async verifyFixedScheduleApplied(): Promise<void> {
        const scheduleTypeElement = await this.actions.getLocator(this.elementSelectors.scheduleTypeText('Fixed schedule'));
        await this.actions.waitForElementToBeVisible(scheduleTypeElement, `Schedule Type text 'Fixed schedule'`);
        const scheduleType = await this.actions.getText(scheduleTypeElement, `Schedule Type text 'Fixed schedule'`);
        await this.actions.assertTrue(scheduleType.includes('Fixed schedule'), `Schedule Type text 'Fixed schedule'`);
    }

    /**
     * Verifies that the Recurrence Pattern is applied.
     * @param recurrencePatternText The text of the recurrence pattern to verify.
     */
    public async verifyRecurrencePatternApplied(recurrencePatternText: string): Promise<void> {
        const recurrencePatternElement = await this.actions.getLocator(this.elementSelectors.recurrencePatternText.selector);
        await this.actions.waitForElementToBeVisible(recurrencePatternElement, this.elementSelectors.recurrencePatternText.name);
        const recurrencePattern = await this.actions.getText(recurrencePatternElement, this.elementSelectors.recurrencePatternText.name);
        await this.actions.assertTrue(recurrencePattern.includes(recurrencePatternText), this.elementSelectors.recurrencePatternText.name);
    }

    /**
     * Navigates to the Open Scheduled Maintenance page from SMR.
     * @param subMenuItemTitle The title of the sub-menu item.
     * @param expectedUrl The expected URL of the page.
     */
    public async navigateToOpenScheduledMaintenancePageFromSmrPage(
        subMenuItemTitle: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /*
     * Selects values from multiple dropdowns.
     * Ignores duplicate values across dropdowns.
     * Skips empty option if present as the first value.
     * @param ddTypes Array of dropdown IDs
     * @param fallbackTitle Title to click if no valid options are found
     */
    public async selectAssetDropdownValues(ddTypes: string[]): Promise<void> {
        const seenTitles: Set<string> = new Set();
        for (const ddType of ddTypes) {
            const dropdownLocator = this.actions.getLocator(this.elementSelectors.meterBasedinput(ddType));
            await this.actions.click(dropdownLocator, `Dropdown: ${ddType}`);
            const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content") and @title]');
            await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
            const newTitles: string[] = [];
            const count = await optionsLocator.count();
            for (let i = 0; i < count; i++) {
                const el = optionsLocator.nth(i);
                const title = (await el.getAttribute('title'))?.trim();
                if (title && title.length > 0 && title !== 'Edit list values' && !seenTitles.has(title)) {
                    const isVisible = await el.isVisible();
                    if (isVisible) {
                        newTitles.push(title);
                        seenTitles.add(title);
                    }
                }
            }
            let selectedTitle = newTitles[0];
            if (selectedTitle === '' && newTitles.length > 1) {
                selectedTitle = newTitles[1]; // take the next valid option
            }

            const selectedLocator = this.actions.getLocator(CommonPageLocators.getDivById(selectedTitle));
            await selectedLocator.waitFor({ state: 'visible', timeout: 2000 });
            await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${ddType}`);
        }
    }


    /**
     * Sets the meter-based schedule.
     * @param tabName The name of the tab to click.
     * @param meterBasedDropdownId The ID of the meter-based dropdown.
     * @param dropdown The dropdown information.
     */
    public async setMeterBasedSchedule(tabName: string,
        meterBasedDropdownId: string,
        dropdown: { ddType: string[] }
    ): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickEditButton();
        await commonPageActions.clickLinkByText(meterBasedDropdownId);
        await this.checkConfigMeterBasedCheckbox();
        await this.selectAssetDropdownValues(dropdown.ddType);
    }

    /**
     * Verifies that the meter-based schedule type is applied.
     */
    public async verifyMeterBasedScheduleTypeApplied(): Promise<void> {
        const meterBasedScheduleElement = await this.actions.getLocator(this.elementSelectors.meterBasedCheckbox.selector);
        await this.actions.waitForElementToBeVisible(meterBasedScheduleElement, this.elementSelectors.meterBasedCheckbox.name);
        const meterBasedSchedule = await this.actions.getText(meterBasedScheduleElement, this.elementSelectors.meterBasedCheckbox.name);
        await this.actions.assertTrue(meterBasedSchedule.includes('Meter Based Scheduling'), this.elementSelectors.meterBasedCheckbox.name);
        const lastMeterReadingDateElement = await this.actions.getLocator(this.elementSelectors.lastMeterReadingDateLabel.selector);
        await this.actions.waitForElementToBeVisible(lastMeterReadingDateElement, this.elementSelectors.lastMeterReadingDateLabel.name);
        const lastMeterReadingDate = await this.actions.getText(lastMeterReadingDateElement, this.elementSelectors.lastMeterReadingDateLabel.name);
        await this.actions.assertTrue(lastMeterReadingDate.includes('Last Meter Reading Date'), this.elementSelectors.lastMeterReadingDateLabel.name);
    }

    /**
     * Verifies that the scheduled type date is applied.
     * @param dateLabel the date label to verify
     * @param tabName the name of the tab containing the scheduled date
     */
    public async verifyScheduledTypeDateApplied(dateLabel: string, tabName: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const scheduledDateLabel = this.actions.getLocator(this.elementSelectors.scheduledDateLabel(dateLabel));
        await this.actions.waitForElementToBeVisible(scheduledDateLabel, `Scheduled Date Label: ${dateLabel}`);
        const scheduledDateText = await this.actions.getText(scheduledDateLabel, `Getting text for Scheduled Date Label: ${dateLabel}`);
        await this.actions.assertTrue(scheduledDateText.includes(dateLabel), `Expected Scheduled Date Label text to include "${dateLabel}", and got "${scheduledDateText}"`);
    }

    /**
     * Verifies the SMR Next Due Date is correctly displayed.
     * @param tabName the name of the tab containing the SMR Next Due Date
     */
    public async verifySmrNextDueDate(tabName: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const scheduledDateValueLocator = this.actions.getLocator(this.elementSelectors.scheduledDateValue.selector);
        const smrNextDueDateValueLocator = this.actions.getLocator(this.elementSelectors.smrNextDueDateValue.selector);
        const scheduledDateText = (await scheduledDateValueLocator.textContent())?.trim();
        const smrNextDateText = (await smrNextDueDateValueLocator.textContent())?.trim();
        if (!scheduledDateText) throw new Error("Scheduled Date is not available");
        if (!smrNextDateText) throw new Error("SMR Next Due Date is not available");
        const scheduledDate = new Date(scheduledDateText);
        const smrNextDate = new Date(smrNextDateText);
        if (isNaN(scheduledDate.getTime()) || isNaN(smrNextDate.getTime())) {
            throw new Error(`Invalid date format: Scheduled='${scheduledDateText}', Next='${smrNextDateText}'`);
        }
        const expectedNextDate = new Date(scheduledDate);
        expectedNextDate.setDate(expectedNextDate.getDate() + 1);
        const formattedExpected = expectedNextDate.toLocaleDateString();
        const formattedActual = smrNextDate.toLocaleDateString();
        expect(formattedActual).toBe(formattedExpected);
    }

    /**
     * Selects the first value from each of the three dropdowns in the service grid row and types '10' into the selected row.
     */
    /**
     * Selects the first available value from each dropdown in the service grid row by index.
     * Skips duplicate values and "Edit list values".
     * @param indices Array of dropdown indices (1-based)
     * @param fallbackTitle Title to click if no valid options are found
     */
    public async selectMultipleServiceGridDropdownValues(indices: number[]): Promise<void> {
        const seenTitles: Set<string> = new Set();
        for (const idx of indices) {
            const dropdownLocator = this.actions.getLocator(this.elementSelectors.serviceGridSelectedRow.selector).nth(idx);
            await this.actions.click(dropdownLocator, `Dropdown at index ${idx}`);
            const clickDropdownLocator = this.actions.getLocator(this.elementSelectors.serviceGridDropdownIcon.selector);
            await this.actions.waitForElementToBeVisible(clickDropdownLocator, this.elementSelectors.serviceGridDropdownIcon.name);
            await this.actions.click(clickDropdownLocator, this.elementSelectors.serviceGridDropdownIcon.name);
            const optionsLocator = this.actions.getLocator('//div[@title]');
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
                await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
                console.warn(`No valid options found in the dropdown: ${indices}. Leaving it empty.`);
                continue;
            }
            const selectedTitle = newTitles[0];
            const selectedLocator = await this.actions.getLocator(CommonPageLocators.getDivByTitle(selectedTitle));
            await selectedLocator.hover();
            await selectedLocator.waitFor({ state: 'visible', timeout: 2000 });
            await selectedLocator.scrollIntoViewIfNeeded();
            await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from ${indices}`);
        }
    }

    public async enterMultipleServiceGridInputsValues(
        values: { [key: number]: string }
    ): Promise<void> {
        for (const [index, value] of Object.entries(values)) {
            const inputLocator = this.actions.getLocator(this.elementSelectors.serviceGridSelectedRow.selector).nth(Number(index));
            await this.actions.waitForElementToBeVisible(inputLocator, `Input at index ${index}`);
            await this.actions.clearAndTypeText(inputLocator, value, `Input at index ${index}`);
        }
    }

    /**
     * Fills in the service preventive maintenance and usage information.
     * @param tabName The name of the tab to click.
     * @param anticipatedUseValue The anticipated use value to enter.
     * @param frequencyIntervalValue The frequency interval value to enter.
     */
    public async fillServicePreventiveMaintenanceAndUsageInformation(
        tabName: string,
        anticipatedUseValue: string,
        frequencyIntervalValue: string
    ): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickEditButton();
        const anticipatedUseInputEl = await this.actions.getLocator(this.elementSelectors.anticipatedUseInput.selector);
        await this.actions.waitForElementToBeVisible(anticipatedUseInputEl, this.elementSelectors.anticipatedUseInput.name);
        await this.actions.clearAndTypeText(anticipatedUseInputEl, anticipatedUseValue, this.elementSelectors.anticipatedUseInput.name);
        const frequencyIntervalInputEl = await this.actions.getLocator(this.elementSelectors.frequencyIntervalInput.selector);
        await this.actions.waitForElementToBeVisible(frequencyIntervalInputEl, this.elementSelectors.frequencyIntervalInput.name);
        await this.actions.click(frequencyIntervalInputEl, this.elementSelectors.frequencyIntervalInput.name);
        await commonPageActions.clickDivByTitle(frequencyIntervalValue);
    }

    /**
     * 
     * @param tabName The name of the tab to click.
     * Links inventory items to the asset by adding meters in the Meters List service grid.
     */
    public async linkInventoryToAsset(
        tabName: string
    ): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const metersListMoreBtnEl = await this.actions.getLocator(this.elementSelectors.metersListMoreBtn.selector);
        await this.actions.waitForElementToBeVisible(metersListMoreBtnEl, this.elementSelectors.metersListMoreBtn.name);
        await this.actions.mouseHoverAndClick(metersListMoreBtnEl, this.elementSelectors.metersListMoreBtn.name);
        const addNewRowButtonEl = await this.actions.getLocator(this.elementSelectors.addNewRowButton.selector);
        await this.actions.waitForElementToBeVisible(addNewRowButtonEl, this.elementSelectors.addNewRowButton.name);
        await this.actions.click(addNewRowButtonEl, this.elementSelectors.addNewRowButton.name);
        await this.selectMultipleServiceGridDropdownValues([1, 2, 3]);
        await this.enterMultipleServiceGridInputsValues({ 4: '5', 5: '10', 6: '1' });
        const saveServiceGridButtonEl = await this.actions.getLocator(this.elementSelectors.saveServiceGridButton.selector);
        await this.actions.waitForElementToBeVisible(saveServiceGridButtonEl, this.elementSelectors.saveServiceGridButton.name);
        await this.actions.click(saveServiceGridButtonEl, this.elementSelectors.saveServiceGridButton.name);
    }
}

export const scheduledMaintenanceRecordsPage = new ScheduledMaintenanceRecordsPage();
