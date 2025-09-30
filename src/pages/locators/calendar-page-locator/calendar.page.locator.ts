export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const CalendarPageLocators: Readonly<{
    readonly currentMonthLabel: string;
    readonly dropdownValue: (value: string) => string;
    readonly eventByDateAndTitle: (title: string) => string;
    readonly settingsLink: LocatorDefinition;
    readonly addNewRecordLink: LocatorDefinition;
    readonly newCalendarNameInput: LocatorDefinition;
    readonly recordAreaDropdown: LocatorDefinition;
    readonly recordAreaInput: LocatorDefinition;
    readonly startDateFieldDropdown: LocatorDefinition;
    readonly startDateFieldInput: LocatorDefinition;
    readonly endDateFieldDropdown: LocatorDefinition;
    readonly endDateFieldInput: LocatorDefinition;
    readonly saveCalendarButton: LocatorDefinition;
    readonly calendarColorInput: LocatorDefinition;
    readonly calendarViewIcon: LocatorDefinition;
    readonly deleteCalendarButton: LocatorDefinition;
}> = {
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
};
