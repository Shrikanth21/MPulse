import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { commonPageActions } from "../actions/common.page.actions";
import { CommonPageLocators } from "../locators/common.page.locator";

class CalendarPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
        currentMonthLabel: `//h2[text()='${new Date().toLocaleString("default", { month: "long" })} ${new Date().getFullYear()}']`,
        dropdownValue: (value: string) => `//div[@class='dx-item-content dx-list-item-content' and @title='${value}']`,
        eventByDateAndTitle: (title: string) => `//td[@data-date="${new Date().toISOString().split("T")[0]}"]/following::span[text()='${title}']`,
        settingsLink: { selector: "//div[@id='calendar']/preceding::a[@title='Settings']", name: "Calendar Settings" },
        addNewRecordLink: { selector: "//div[@class='contentSection']//a[@title='Add new record']", name: "Add New Record" },
        newCalendarNameInput: { selector: "//div[@class='commonHeight']/descendant::input[contains(@ng-model,'newCalendar')]", name: "New Calendar Name Input" },
        recordAreaDropdown: { selector: "//div[@dx-select-box='recordArea()']", name: "Record Area Dropdown" },
        recordAreaInput: { selector: '//div[@dx-select-box="recordArea()"]/descendant::input[@class="dx-texteditor-input"]', name: "Record Area Input" },
        startDateFieldDropdown: { selector: "//div[@dx-select-box='startDateField()']", name: "Start Date Field Dropdown" },
        startDateFieldInput: { selector: '//div[@dx-select-box="startDateField()"]/descendant::input[@class="dx-texteditor-input"]', name: "Start Date Field Input" },
        endDateFieldDropdown: { selector: "//div[@dx-select-box='endDateField()']", name: "End Date Field Dropdown" },
        endDateFieldInput: { selector: '//div[@dx-select-box="endDateField()"]/descendant::input[@class="dx-texteditor-input"]', name: "End Date Field Input" },
        saveCalendarButton: { selector: "//li[@class='ng-scope']/descendant::i[@class='fas fa-check']", name: "Save Calendar Button" },
        calendarColorInput: { selector: "//input[contains(@class,'calendar-color ng-pristine')]", name: "Calendar Color Input" },
        calendarViewIcon: { selector: "//div[@class='calendarBody ng-scope']/descendant::i[@class='far fa-calendar-alt']", name: "Calendar View Icon" },
        deleteCalendarButton: { selector: '//li[@ng-click="clickedDeleteButton()"]', name: "Delete Calendar Button" },
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
        const currentMonthLabel = await this.actions.getLocator(this.elementSelectors.currentMonthLabel);
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
        const settingsLink = await this.actions.getLocator(this.elementSelectors.settingsLink.selector);
        await this.actions.waitForClickable(settingsLink, this.elementSelectors.settingsLink.name);
        await this.actions.click(settingsLink, this.elementSelectors.settingsLink.name);
    }

    /**
     * Click on the Add New Record link.
     */
    public async clickOnAddNewRecordLink(): Promise<void> {
        const addNewRecordLink = await this.actions.getLocator(this.elementSelectors.addNewRecordLink.selector);
        await this.actions.waitForClickable(addNewRecordLink, this.elementSelectors.addNewRecordLink.name);
        await this.actions.click(addNewRecordLink, this.elementSelectors.addNewRecordLink.name);
    }

    /**
     * Enter a new calendar title.
     * @param calendarTitle The title of the new calendar.
     */
    public async enterNewCalendarTitle(calendarTitle: string): Promise<void> {
        const newCalendarNameInput = await this.actions.getLocator(this.elementSelectors.newCalendarNameInput.selector);
        await this.actions.waitForElementToBeVisible(newCalendarNameInput, this.elementSelectors.newCalendarNameInput.name);
        await this.actions.typeText(newCalendarNameInput, calendarTitle, this.elementSelectors.newCalendarNameInput.name);
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

            const valueLocator = await this.actions.getLocator(this.elementSelectors.dropdownValue(value));
            await this.actions.waitForElementToBeVisible(valueLocator, `Dropdown Value: ${value}`);
            await this.actions.click(valueLocator, `Clicked: ${value}`);
        };
        await selectDropdownValue(
            this.elementSelectors.recordAreaDropdown.selector,
            this.elementSelectors.recordAreaInput.selector,
            recordArea,
            this.elementSelectors.recordAreaDropdown.name
        );
        await selectDropdownValue(
            this.elementSelectors.startDateFieldDropdown.selector,
            this.elementSelectors.startDateFieldInput.selector,
            startDateField,
            this.elementSelectors.startDateFieldDropdown.name
        );

        await selectDropdownValue(
            this.elementSelectors.endDateFieldDropdown.selector,
            this.elementSelectors.endDateFieldInput.selector,
            endDateField,
            this.elementSelectors.endDateFieldDropdown.name
        );

        const calendarColorInput = await this.actions.getLocator(this.elementSelectors.calendarColorInput.selector);
        await this.actions.waitForElementToBeVisible(calendarColorInput, this.elementSelectors.calendarColorInput.name);
        await this.actions.clearAndTypeText(calendarColorInput, calendarColor, this.elementSelectors.calendarColorInput.name);
    }

    /**
     * Click on the Save Calendar button.
     */
    public async clickSaveCalendarButton(): Promise<void> {
        const saveButton = await this.actions.getLocator(this.elementSelectors.saveCalendarButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, this.elementSelectors.saveCalendarButton.name);
        await this.actions.click(saveButton, this.elementSelectors.saveCalendarButton.name);
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
        const eventDateLocator = this.actions.getLocator(this.elementSelectors.eventByDateAndTitle(expectedRecords));
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
        const calendarViewIcon = await this.actions.getLocator(this.elementSelectors.calendarViewIcon.selector);
        await this.actions.waitForElementToBeVisible(calendarViewIcon, this.elementSelectors.calendarViewIcon.name);
        await this.actions.click(calendarViewIcon, this.elementSelectors.calendarViewIcon.name);
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
        const deleteButton = await this.actions.getVisibleLocator(this.elementSelectors.deleteCalendarButton.selector);
        await this.actions.waitForElementToBeVisible(deleteButton, this.elementSelectors.deleteCalendarButton.name);
        await this.actions.click(deleteButton, this.elementSelectors.deleteCalendarButton.name);
        await commonPageActions.clickSpanByText(yesSpanText);
        await commonPageActions.clickLinkByTitle(dashboardTab);
    }
}

export const calendarPage = new CalendarPage();
