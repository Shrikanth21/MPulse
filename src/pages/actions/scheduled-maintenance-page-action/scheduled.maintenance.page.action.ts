import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { commonPageActions } from "../common.page.actions";
import { workOrderRecordPageActions } from "../workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { homePageActions } from "../home-page-action/home.page.actions";
import { CommonPageLocators } from "../../locators/common.page.locator";
import { ScheduledMaintenancePageLocators } from "../../locators/scheduled-maintenance-page-locator/scheduled.maintenance.page.locator";

class ScheduledMaintenanceRecordsPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Checks the state of the Merge Scheduled Maintenance Records checkbox.
     */
    public async checkMergeCheckbox(): Promise<void> {
        const mergeCheckboxElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.mergeCheckbox.selector);
        await this.actions.waitForElementToBeVisible(mergeCheckboxElement, ScheduledMaintenancePageLocators.mergeCheckbox.name);
        await this.actions.click(mergeCheckboxElement, ScheduledMaintenancePageLocators.mergeCheckbox.name);
    }

    /**
     * Checks the state of the Config Time Based checkbox.
     */
    public async checkConfigTimeBasedCheckbox(): Promise<void> {
        const configTimeBasedCheckBoxElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.configTimeBasedCheckBox.selector);
        if (!(await this.actions.isCheckboxChecked(configTimeBasedCheckBoxElement, ScheduledMaintenancePageLocators.configTimeBasedCheckBox.name))) {
            await this.actions.click(configTimeBasedCheckBoxElement, ScheduledMaintenancePageLocators.configTimeBasedCheckBox.name);
        }
    }

    /**
     * Checks the state of the Config Meter Based checkbox.
     */
    public async checkConfigMeterBasedCheckbox(): Promise<void> {
        const configMeterBasedCheckBoxElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.configMeterBasedCheckBox.selector);
        if (!(await this.actions.isCheckboxChecked(configMeterBasedCheckBoxElement, ScheduledMaintenancePageLocators.configMeterBasedCheckBox.name))) {
            await this.actions.click(configMeterBasedCheckBoxElement, ScheduledMaintenancePageLocators.configMeterBasedCheckBox.name);
        }
    }

    /**
     * Gets the Scheduled Date value.
     * @returns The Scheduled Date value as a string.
     */
    public async getSMRNextDateValue(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const smrNextDateElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.smrNextDate.selector);
        await this.actions.waitForElementToBeVisible(smrNextDateElement, ScheduledMaintenancePageLocators.smrNextDate.name);
        return await this.actions.getText(smrNextDateElement, ScheduledMaintenancePageLocators.smrNextDate.name);
    }

    /**
     * Enters a value in the Units Between Maintenance text box.
     * @param value Value to enter in the Units Between Maintenance text box
     */
    public async setUnitsBetweenMaintenance(value: string): Promise<void> {
        const unitsBetweenMaintenanceElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.configUnitsBetweenMaintenanceTextBox.selector);
        await this.actions.waitForElementToBeVisible(unitsBetweenMaintenanceElement, ScheduledMaintenancePageLocators.configUnitsBetweenMaintenanceTextBox.name);
        await this.actions.typeText(unitsBetweenMaintenanceElement, value, ScheduledMaintenancePageLocators.configUnitsBetweenMaintenanceTextBox.name);
    }

    /**
     * Verifies that the Next Date is calculated based on the meter reading and units between maintenance.
     * @param previousNextDate Previous Next Date value
     * @param anticipatedUseStr Anticipated Use value as string
     * @param unitsBetweenMaintenance Units Between Maintenance value as string
     */
    public async verifySMRNextDateCalculated(previousNextDate: string, anticipatedUseStr: string, unitsBetweenMaintenance: string): Promise<void> {
        const currentNextDate = await this.getSMRNextDateValue();
        const prevDate = new Date(previousNextDate);
        const anticipatedUse = parseFloat(anticipatedUseStr);
        const units = parseInt(unitsBetweenMaintenance, 10);
        const daysToAdd = units / anticipatedUse;
        const expectedNextDate = new Date(prevDate);
        expectedNextDate.setDate(expectedNextDate.getDate() + daysToAdd);
        const actualNextDate = new Date(currentNextDate);
        const formattedExpected = expectedNextDate.toLocaleDateString();
        const formattedActual = actualNextDate.toLocaleDateString();
        await this.actions.assertToBe(formattedActual, formattedExpected,
            `Verifying that the Next Date is correctly calculated based on the meter reading and units between maintenance. Expected: ${formattedExpected},
             Actual: ${formattedActual}`);
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
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
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
                const smrIdElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.smrId.selector);
                await this.actions.waitForElementToBeVisible(smrIdElement, ScheduledMaintenancePageLocators.smrId.name);
                const smrId = await this.actions.getText(smrIdElement, ScheduledMaintenancePageLocators.smrId.name);
                await this.actions.assertStartsWith(smrId, startWithText, ScheduledMaintenancePageLocators.smrId.name);
                const smrDescriptionElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.smrDescription.selector);
                await this.actions.waitForElementToBeVisible(smrDescriptionElement, ScheduledMaintenancePageLocators.smrDescription.name);
                const smrDescription = await this.actions.getText(smrDescriptionElement, ScheduledMaintenancePageLocators.smrDescription.name);
                await this.actions.assertEqual(smrDescription, description, ScheduledMaintenancePageLocators.smrDescription.name);
                break;
            case "WKO":
                const openWkoIdElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.wkoId.selector);
                await this.actions.waitForElementToBeVisible(openWkoIdElement, ScheduledMaintenancePageLocators.wkoId.name);
                const openWkoId = await openWkoIdElement.innerText();
                await this.actions.assertStartsWith(openWkoId, startWithText, ScheduledMaintenancePageLocators.wkoId.name);
                const wkoDescriptionElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.wkoDescription.selector);
                await this.actions.waitForElementToBeVisible(wkoDescriptionElement, ScheduledMaintenancePageLocators.wkoDescription.name);
                const wkoDescription = await this.actions.getText(wkoDescriptionElement, ScheduledMaintenancePageLocators.wkoDescription.name);
                await this.actions.assertEqual(wkoDescription, description, ScheduledMaintenancePageLocators.wkoDescription.name);
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
        const floatingScheduleElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.floatingTypeRadioBtn(floatingScheduleType));
        await this.actions.waitForElementToBeVisible(floatingScheduleElement, `Floating Schedule Type: ${floatingScheduleType}`);
        await this.actions.click(floatingScheduleElement, `click on Floating Schedule Type: ${floatingScheduleType}`);
        const intervalInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.smrIntervalTextInput.selector);
        await this.actions.waitForElementToBeVisible(intervalInputEl, ScheduledMaintenancePageLocators.smrIntervalTextInput.name);
        await this.actions.clearAndTypeText(intervalInputEl, date, ScheduledMaintenancePageLocators.smrIntervalTextInput.name);
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
        const fixedRadioInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.fixedRadioInput.selector);
        await this.actions.waitForElementToBeVisible(fixedRadioInputEl, ScheduledMaintenancePageLocators.fixedRadioInput.name);
        await this.actions.click(fixedRadioInputEl, ScheduledMaintenancePageLocators.fixedRadioInput.name);
        const fixedDoneDateInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.fixedDoneDateInput.selector);
        await this.actions.waitForElementToBeVisible(fixedDoneDateInputEl, ScheduledMaintenancePageLocators.fixedDoneDateInput.name);
        await this.actions.clearAndTypeText(fixedDoneDateInputEl, doneDate, ScheduledMaintenancePageLocators.fixedDoneDateInput.name);
    }

    /**
     * Sets the recurrence pattern for the Scheduled Maintenance Record.
     * @param recurrencePattern The recurrence pattern to set.
     * @param recurrenceDay The day of the recurrence.
     */
    public async setRecurrencePattern(tabName: string, recurrencePattern: string, recurrenceDay: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        await commonPageActions.clickByDivText(recurrencePattern);
        const recurrencePatternInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.smrEveryTextInput.selector);
        await this.actions.waitForElementToBeVisible(recurrencePatternInputEl, ScheduledMaintenancePageLocators.smrEveryTextInput.name);
        await this.actions.typeText(recurrencePatternInputEl, recurrenceDay, ScheduledMaintenancePageLocators.smrEveryTextInput.name);
    }

    /**
     * Verifies that the Floating Schedule is applied.
     */
    public async verifyScheduleTypeApplied(scheduleType: string): Promise<void> {
        const scheduleTypeElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.scheduleTypeText(scheduleType));
        await this.actions.waitForElementToBeVisible(scheduleTypeElement, `Schedule Type text '${scheduleType}'`);
        const scheduleTypeText = await this.actions.getText(scheduleTypeElement, `Schedule Type text '${scheduleType}'`);
        await this.actions.assertTrue(scheduleTypeText.includes(scheduleType), `Schedule Type text '${scheduleType}'`);
    }

    /**
     * Verifies that the Fixed Schedule is applied.
     */
    public async verifyFixedScheduleApplied(): Promise<void> {
        const scheduleTypeElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.scheduleTypeText('Fixed schedule'));
        await this.actions.waitForElementToBeVisible(scheduleTypeElement, `Schedule Type text 'Fixed schedule'`);
        const scheduleType = await this.actions.getText(scheduleTypeElement, `Schedule Type text 'Fixed schedule'`);
        await this.actions.assertTrue(scheduleType.includes('Fixed schedule'), `Schedule Type text 'Fixed schedule'`);
    }

    /**
     * Verifies that the Recurrence Pattern is applied.
     * @param recurrencePatternText The text of the recurrence pattern to verify.
     */
    public async verifyRecurrencePatternApplied(recurrencePatternText: string): Promise<void> {
        const recurrencePatternElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.recurrencePatternText.selector);
        await this.actions.waitForElementToBeVisible(recurrencePatternElement, ScheduledMaintenancePageLocators.recurrencePatternText.name);
        const recurrencePattern = await this.actions.getText(recurrencePatternElement, ScheduledMaintenancePageLocators.recurrencePatternText.name);
        await this.actions.assertTrue(recurrencePattern.includes(recurrencePatternText), ScheduledMaintenancePageLocators.recurrencePatternText.name);
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
            const dropdownLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.meterBasedinput(ddType));
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
                selectedTitle = newTitles[1];
            }
            const selectedLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(selectedTitle));
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
        const configTimeBasedCheckBoxElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.configTimeBasedCheckBox.selector);
        if ((await this.actions.isCheckboxChecked(configTimeBasedCheckBoxElement, ScheduledMaintenancePageLocators.configTimeBasedCheckBox.name))) {
            await this.actions.click(configTimeBasedCheckBoxElement, ScheduledMaintenancePageLocators.configTimeBasedCheckBox.name);
        }
        await commonPageActions.clickLinkByText(meterBasedDropdownId);
        await this.checkConfigMeterBasedCheckbox();
        await this.selectAssetDropdownValues(dropdown.ddType);
    }

    /**
     * Verifies that the meter-based schedule type is applied.
     */
    public async verifyMeterBasedScheduleTypeApplied(): Promise<void> {
        const meterBasedScheduleElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.meterBasedCheckbox.selector);
        await this.actions.waitForElementToBeVisible(meterBasedScheduleElement, ScheduledMaintenancePageLocators.meterBasedCheckbox.name);
        const meterBasedSchedule = await this.actions.getText(meterBasedScheduleElement, ScheduledMaintenancePageLocators.meterBasedCheckbox.name);
        await this.actions.assertTrue(meterBasedSchedule.includes('Meter Based Scheduling'), ScheduledMaintenancePageLocators.meterBasedCheckbox.name);
        const lastMeterReadingDateElement = await this.actions.getLocator(ScheduledMaintenancePageLocators.lastMeterReadingDateLabel.selector);
        await this.actions.waitForElementToBeVisible(lastMeterReadingDateElement, ScheduledMaintenancePageLocators.lastMeterReadingDateLabel.name);
        const lastMeterReadingDate = await this.actions.getText(lastMeterReadingDateElement, ScheduledMaintenancePageLocators.lastMeterReadingDateLabel.name);
        await this.actions.assertTrue(lastMeterReadingDate.includes('Last Meter Reading Date'), ScheduledMaintenancePageLocators.lastMeterReadingDateLabel.name);
    }

    /**
     * Verifies that the scheduled type date is applied.
     * @param dateLabel the date label to verify
     * @param tabName the name of the tab containing the scheduled date
     */
    public async verifyScheduledTypeDateApplied(dateLabel: string, tabName: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const scheduledDateLabel = this.actions.getLocator(ScheduledMaintenancePageLocators.scheduledDateLabel(dateLabel));
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
        const scheduledDateValueLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.scheduledDateValue.selector);
        const smrNextDueDateValueLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.smrNextDueDateValue.selector);
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
        await this.actions.assertToBe(formattedActual, formattedExpected,
            `Verifying that the SMR Next Due Date is correctly displayed. Expected: ${formattedExpected}, Actual: ${formattedActual}`);
    }

    /**
     * Click on the Asset List link to navigate to the Asset List page.
     */
    public async clickOnAssetListLink(): Promise<void> {
        const assetListLinkEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.assetListLink.selector);
        await this.actions.waitForElementToBeVisible(assetListLinkEl, ScheduledMaintenancePageLocators.assetListLink.name);
        await this.actions.click(assetListLinkEl, ScheduledMaintenancePageLocators.assetListLink.name);
    }

    /**
     * Selects the first available value from each dropdown in the service grid row by index.
     * Skips duplicate values and "Edit list values".
     * @param indices Array of dropdown indices (1-based)
     * @param fallbackTitle Title to click if no valid options are found
     */
    public async selectMultipleServiceGridDropdownValues(indices: number[]): Promise<void> {
        const seenTitles: Set<string> = new Set();
        for (const idx of indices) {
            const dropdownLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.serviceGridSelectedRow.selector).nth(idx);
            await this.actions.click(dropdownLocator, `Dropdown at index ${idx}`);
            const clickDropdownLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.serviceGridDropdownIcon.selector);
            await this.actions.waitForElementToBeVisible(clickDropdownLocator, ScheduledMaintenancePageLocators.serviceGridDropdownIcon.name);
            await this.actions.click(clickDropdownLocator, ScheduledMaintenancePageLocators.serviceGridDropdownIcon.name);
            const optionsLocator = this.actions.getLocator('//div[contains(@class, "dx-item-content dx-list-item-content") and text()]');
            await this.actions.waitForNewDropdownOptionsToLoad(optionsLocator, 3000);
            const newTitles: string[] = [];
            const count = await optionsLocator.count();
            for (let i = 0; i < count; i++) {
                const el = optionsLocator.nth(i);
                let title = (await el.getAttribute('title'))?.trim();
                if (!title || title.length === 0) {
                    title = (await el.textContent())?.trim() || '';
                }
                if (title && title !== 'Edit list values' && !seenTitles.has(title)) {
                    const isVisible = await el.isVisible();
                    if (isVisible) {
                        newTitles.push(title);
                        seenTitles.add(title);
                    }
                }
            }
            let selectedTitle: string | undefined;
            if (newTitles.length > 1 && newTitles[0] === '') {
                selectedTitle = newTitles[1];
            } else if (newTitles.length > 0) {
                selectedTitle = newTitles[0];
            }
            if (!selectedTitle) {
                console.warn(`No valid options found in the dropdown: ${idx}. Leaving it empty.`);
                continue;
            }
            const selectedLocator = this.actions.getLocator(CommonPageLocators.getDivByText(selectedTitle));
            await selectedLocator.waitFor({ state: 'visible', timeout: 2000 });
            await this.actions.click(selectedLocator, `Selecting "${selectedTitle}" from dropdown at index ${idx}`);
        }
    }

    /**
     * Enters multiple values into the service grid inputs.
     * @param values Object mapping input indices to values
     */
    public async enterMultipleServiceGridInputsValues(
        values: { [key: number]: string }
    ): Promise<void> {
        for (const [index, value] of Object.entries(values)) {
            const locator = this.actions.getLocator(ScheduledMaintenancePageLocators.serviceGridSelectedRow.selector).nth(Number(index));
            await this.actions.waitForElementToBeVisible(locator, `Clicking input at index ${index}`);
            await this.actions.click(locator, `Clicking input at index ${index}`);
            const inputLocator = this.actions.getLocator(ScheduledMaintenancePageLocators.serviceGridInput.selector);
            await this.actions.waitForElementToBeVisible(inputLocator, ScheduledMaintenancePageLocators.serviceGridInput.name);
            await this.actions.clearAndTypeText(inputLocator, value, `Typing into input at index ${index}`);
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
        const anticipatedUseInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.anticipatedUseInput.selector);
        await this.actions.waitForElementToBeVisible(anticipatedUseInputEl, ScheduledMaintenancePageLocators.anticipatedUseInput.name);
        await this.actions.clearAndTypeText(anticipatedUseInputEl, anticipatedUseValue, ScheduledMaintenancePageLocators.anticipatedUseInput.name);
        const frequencyIntervalInputEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.frequencyIntervalInput.selector);
        await this.actions.waitForElementToBeVisible(frequencyIntervalInputEl, ScheduledMaintenancePageLocators.frequencyIntervalInput.name);
        await this.actions.click(frequencyIntervalInputEl, ScheduledMaintenancePageLocators.frequencyIntervalInput.name);
        await commonPageActions.clickDivByTitle(frequencyIntervalValue);
    }

    /**
     * Links inventory items to an asset in the Scheduled Maintenance Record.
     * @param tabName The name of the tab to click.
     */
    public async linkInventoryToAsset(
        tabName: string
    ): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const metersListMoreBtnEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.metersListMoreBtn.selector);
        await this.actions.waitForElementToBeVisible(metersListMoreBtnEl, ScheduledMaintenancePageLocators.metersListMoreBtn.name);
        await this.actions.mouseHoverAndClick(metersListMoreBtnEl, ScheduledMaintenancePageLocators.metersListMoreBtn.name);
        const isVisible = await this.actions.getLocator(ScheduledMaintenancePageLocators.removeRowButton.selector).isVisible();
        if (isVisible) {
            const removeRowButtonEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.removeRowButton.selector);
            await this.actions.waitForElementToBeVisible(removeRowButtonEl, ScheduledMaintenancePageLocators.removeRowButton.name);
            await this.actions.click(removeRowButtonEl, ScheduledMaintenancePageLocators.removeRowButton.name);
            await commonPageActions.clickSpanByText('Yes');
        }
        await this.actions.mouseHoverAndClick(metersListMoreBtnEl, ScheduledMaintenancePageLocators.metersListMoreBtn.name);
        const addNewRowButtonEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.addNewRowButton.selector);
        await this.actions.waitForElementToBeVisible(addNewRowButtonEl, ScheduledMaintenancePageLocators.addNewRowButton.name);
        await this.actions.click(addNewRowButtonEl, ScheduledMaintenancePageLocators.addNewRowButton.name);
        await this.selectMultipleServiceGridDropdownValues([1, 2, 3]);
        await this.enterMultipleServiceGridInputsValues({ 4: '5', 5: '10', 6: '1' });
        const saveServiceGridButtonEl = await this.actions.getLocator(ScheduledMaintenancePageLocators.saveServiceGridButton.selector);
        await this.actions.waitForElementToBeVisible(saveServiceGridButtonEl, ScheduledMaintenancePageLocators.saveServiceGridButton.name);
        await this.actions.click(saveServiceGridButtonEl, ScheduledMaintenancePageLocators.saveServiceGridButton.name);
        await commonPageActions.clickSaveButton();
        await commonPageActions.clickLinkByTitle('Scheduled Maintenance Records');
        await this.actions.waitForCustomDelay(timeouts.small);
    }
}

export const scheduledMaintenanceRecordsPageActions = new ScheduledMaintenanceRecordsPageActions();
