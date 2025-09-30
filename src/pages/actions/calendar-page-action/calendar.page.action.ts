import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { commonPageActions } from "../common.page.actions";
import { timeouts } from "../../../helper/timeouts-config";
import { CommonPageLocators } from "../../locators/common.page.locator";
import { CalendarPageLocators } from "../../locators/calendar-page-locator/calendar.page.locator";

class CalendarPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Navigate to a specific calendar tab.
     * @param tabName The name of the tab to navigate to.
     */
    public async navigateToCalendarTab(tabName1: string, tabName2: string, currentUrl: string): Promise<void> {
        await commonPageActions.clickLinkByTitle(tabName1);
        await commonPageActions.clickLinkByTitle(tabName2);
        await this.actions.validateCurrentUrl(currentUrl);
    }

    /**
     * Verify the current month calendar view is displayed.
     */
    public async verifyCurrentMonthCalendarView(): Promise<void> {
        const currentMonthLabel = await this.actions.getLocator(CalendarPageLocators.currentMonthLabel);
        await this.actions.waitForElementToBeVisible(currentMonthLabel, "Current Month Label");
        const currentMonthText = await currentMonthLabel.innerText();
        console.log("Current Month Text:", currentMonthText);
        const isVisible = await currentMonthLabel.isVisible();
        await this.actions.assertTrue(isVisible, "Current Month Label");
    }

    /**
     * Click on the Calendar Settings link.
     */
    public async clickOnCalendarSettingsLink(): Promise<void> {
        const settingsLink = await this.actions.getLocator(CalendarPageLocators.settingsLink.selector);
        await this.actions.waitForClickable(settingsLink, CalendarPageLocators.settingsLink.name);
        await this.actions.click(settingsLink, CalendarPageLocators.settingsLink.name);
    }

    /**
     * Click on the Add New Record link.
     */
    public async clickOnAddNewRecordLink(): Promise<void> {
        const addNewRecordLink = await this.actions.getLocator(CalendarPageLocators.addNewRecordLink.selector);
        await this.actions.waitForClickable(addNewRecordLink, CalendarPageLocators.addNewRecordLink.name);
        await this.actions.click(addNewRecordLink, CalendarPageLocators.addNewRecordLink.name);
    }

    /**
     * Enter a new calendar title.
     * @param calendarTitle The title of the new calendar.
     */
    public async enterNewCalendarTitle(calendarTitle: string): Promise<void> {
        const newCalendarNameInput = await this.actions.getLocator(CalendarPageLocators.newCalendarNameInput.selector);
        await this.actions.waitForElementToBeVisible(newCalendarNameInput, CalendarPageLocators.newCalendarNameInput.name);
        await this.actions.typeText(newCalendarNameInput, calendarTitle, CalendarPageLocators.newCalendarNameInput.name);
    }

    /**
     * Select values from the record area dropdown.
     * @param recordArea The record area to select.
     * @param startDateField The start date to select.
     * @param endDateField The end date to select.
     * @param calendarColor The color of the calendar event.
     */
    public async selectValueFromRecordAreaDropdown(
        recordArea: string,
        startDateField: string,
        endDateField: string,
        calendarColor: string
    ): Promise<void> {
        const selectDropdownValue = async (
            dropdownSelector: string,
            inputSelector: string,
            value: string,
            dropdownName: string
        ) => {
            const dropdown = await this.actions.getLocator(dropdownSelector);
            await this.actions.waitForElementToBeVisible(dropdown, dropdownName);
            await this.actions.click(dropdown, dropdownName);

            const input = await this.actions.getLocator(inputSelector);
            await this.actions.waitForElementToBeVisible(input, dropdownName + " Input");
            await this.actions.clearAndTypeText(input, value, dropdownName + " Input");

            const valueLocator = await this.actions.getLocator(CalendarPageLocators.dropdownValue(value));
            await this.actions.waitForElementToBeVisible(valueLocator, `Dropdown Value: ${value}`);
            await this.actions.click(valueLocator, `Clicked: ${value}`);
        };
        await selectDropdownValue(
            CalendarPageLocators.recordAreaDropdown.selector,
            CalendarPageLocators.recordAreaInput.selector,
            recordArea,
            CalendarPageLocators.recordAreaDropdown.name
        );
        await selectDropdownValue(
            CalendarPageLocators.startDateFieldDropdown.selector,
            CalendarPageLocators.startDateFieldInput.selector,
            startDateField,
            CalendarPageLocators.startDateFieldDropdown.name
        );

        await selectDropdownValue(
            CalendarPageLocators.endDateFieldDropdown.selector,
            CalendarPageLocators.endDateFieldInput.selector,
            endDateField,
            CalendarPageLocators.endDateFieldDropdown.name
        );

        const calendarColorInput = await this.actions.getLocator(CalendarPageLocators.calendarColorInput.selector);
        await this.actions.waitForElementToBeVisible(calendarColorInput, CalendarPageLocators.calendarColorInput.name);
        await this.actions.clearAndTypeText(calendarColorInput, calendarColor, CalendarPageLocators.calendarColorInput.name);
    }

    /**
     * Click on the Save Calendar button.
     */
    public async clickSaveCalendarButton(): Promise<void> {
        const saveButton = await this.actions.getLocator(CalendarPageLocators.saveCalendarButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, CalendarPageLocators.saveCalendarButton.name);
        await this.actions.click(saveButton, CalendarPageLocators.saveCalendarButton.name);
    }

    /**
     * Create a new calendar filter.
     * @param recordArea The record area to filter.
     * @param startDateField The start date field to filter.
     * @param endDateField The end date field to filter.
     * @param calendarColor The color of the calendar events to filter.
     */
    public async createCalendarFilter(
        calendarTitle: string,
        recordArea: string,
        startDateField: string,
        endDateField: string,
        calendarColor: string
    ): Promise<void> {
        await this.clickOnCalendarSettingsLink();
        await this.clickOnAddNewRecordLink();
        await this.enterNewCalendarTitle(calendarTitle);
        await this.selectValueFromRecordAreaDropdown(
            recordArea,
            startDateField,
            endDateField,
            calendarColor
        );
        await this.clickSaveCalendarButton();
    }

    /**
     * Verify the details of a calendar record.
     * @param expectedRecords The expected records.
     */
    public async verifyCalendarRecordDetails(expectedRecords: string): Promise<void> {
        const eventDateLocator = this.actions.getLocator(CalendarPageLocators.eventByDateAndTitle(expectedRecords));
        await this.actions.waitForElementToBeVisible(await eventDateLocator, `Calendar Event: ${expectedRecords}`);
        const actualRecord = await eventDateLocator.innerText();
        console.log("Actual Record:", actualRecord);
        await this.actions.assertEqual(actualRecord, expectedRecords, "Calendar Event Title");
    }

    /**
     * Navigate to the Calendar View.
     * @param dashboardTab The title of the dashboard tab.
     * @param calendarTab The title of the calendar tab.
     * @param calendarView The title of the calendar view.
     */
    public async navigateToCalendarView(calendarTab: string, calendarView: string): Promise<void> {
        await commonPageActions.clickLinkByTitle(calendarTab);
        await this.clickOnCalendarSettingsLink();
        await this.actions.waitForCustomDelay(timeouts.medium);
        const calendarViewIcon = await this.actions.getLocator(CalendarPageLocators.calendarViewIcon.selector);
        await this.actions.waitForElementToBeVisible(calendarViewIcon, CalendarPageLocators.calendarViewIcon.name);
        await this.actions.click(calendarViewIcon, CalendarPageLocators.calendarViewIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        const calendarViewLocator = await this.actions.getLocator(CommonPageLocators.getSpanByText(calendarView));
        await this.actions.waitForElementToBeVisible(calendarViewLocator, `Calendar View: ${calendarView}`);
        const isVisible = await calendarViewLocator.isVisible();
        await this.actions.assertTrue(isVisible, `Calendar View: ${calendarView}`);
    }

    /**
     * Delete the created calendar record.
     * @param yesSpanText The text of the "Yes" span to click.
     * @param dashboardTab The title of the dashboard tab to navigate to.
     */
    public async deleteCalendarRecord(yesSpanText: string, dashboardTab: string): Promise<void> {
        await this.clickOnCalendarSettingsLink();
        const deleteButton = await this.actions.getVisibleLocator(CalendarPageLocators.deleteCalendarButton.selector);
        await this.actions.waitForElementToBeVisible(deleteButton, CalendarPageLocators.deleteCalendarButton.name);
        await this.actions.click(deleteButton, CalendarPageLocators.deleteCalendarButton.name);
        await commonPageActions.clickSpanByText(yesSpanText);
        await commonPageActions.clickLinkByTitle(dashboardTab);
    }
}

export const calendarPageActions = new CalendarPageActions();
