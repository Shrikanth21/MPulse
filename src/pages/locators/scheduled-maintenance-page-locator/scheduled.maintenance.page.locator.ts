export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const ScheduledMaintenancePageLocators: Readonly<{
    readonly smrId: LocatorDefinition;
    readonly wkoId: LocatorDefinition;
    readonly smrDescription: LocatorDefinition;
    readonly wkoDescription: LocatorDefinition;
    readonly floatingTypeRadioBtn: (floatingTypeText: string) => string;
    readonly scheduleTypeText: (scheduleType: string) => string;
    readonly meterBasedinput: (input: string) => string;
    readonly scheduledDateLabel: (dateLabel: string) => string;
    readonly smrEveryTextInput: LocatorDefinition;
    readonly smrIntervalTextInput: LocatorDefinition;
    readonly recurrencePatternText: LocatorDefinition;
    readonly recurrenceIntervalText: LocatorDefinition;
    readonly mergeCheckbox: LocatorDefinition;
    readonly configTimeBasedCheckBox: LocatorDefinition;
    readonly configMeterBasedCheckBox: LocatorDefinition;
    readonly fixedRadioInput: LocatorDefinition;
    readonly fixedDoneDateInput: LocatorDefinition;
    readonly meterBasedCheckbox: LocatorDefinition;
    readonly lastMeterReadingDateLabel: LocatorDefinition;
    readonly lastMeterReadingDateValue: LocatorDefinition;
    readonly scheduledDateValue: LocatorDefinition;
    readonly smrNextDueDateValue: LocatorDefinition;
    readonly anticipatedUseInput: LocatorDefinition;
    readonly frequencyIntervalInput: LocatorDefinition;
    readonly metersListMoreBtn: LocatorDefinition;
    readonly addNewRowButton: LocatorDefinition;
    readonly serviceGridSelectedRow: LocatorDefinition;
    readonly serviceGridInput: LocatorDefinition;
    readonly saveServiceGridButton: LocatorDefinition;
    readonly serviceGridDropdownIcon: LocatorDefinition;
    readonly assetListLink: LocatorDefinition;
    readonly removeRowButton: LocatorDefinition;
    readonly configUnitsBetweenMaintenanceTextBox: LocatorDefinition;
    readonly smrNextDate: LocatorDefinition;
}> = {
    smrId: { selector: "//div[contains(@class,'textTruncate')]/descendant::span[@id='Code']", name: "SMR id" },
    wkoId: { selector: "//span[contains(@title,'WKO')]", name: "WKO id" },
    smrDescription: { selector: "//span[@id='Desc']", name: "SMR Description" },
    wkoDescription: { selector: "//span[@id='Description']", name: "WKO Description" },
    floatingTypeRadioBtn: (floatingTypeText: string) => `//input[@id='${floatingTypeText}']`,
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
    serviceGridSelectedRow: { selector: '//div[@id="serviceGridContainer"]/descendant::tr[contains(@class,"dx-row dx-data-row dx-column-lines")]/child::td', name: "Service Grid Selected Row" },
    serviceGridInput: { selector: '//div[@id="serviceGridContainer"]/descendant::input[@class="dx-texteditor-input"]', name: "Service Grid Input" },
    saveServiceGridButton: { selector: '//li[@ng-click="saveEdit()"]', name: "Save Edit button" },
    serviceGridDropdownIcon: { selector: "//div[@class='dx-datagrid-content']//div[@class='dx-dropdowneditor-icon']", name: "Service Grid Dropdown Icon" },
    assetListLink: { selector: '//datagrid[@id="AssetList"]/descendant::a[@class="dx-link ng-scope"]', name: "Asset List Link" },
    removeRowButton: { selector: '//li[@ng-click="removeRow()"]', name: "Remove Row button" },
    configUnitsBetweenMaintenanceTextBox: { selector: '//div[@dx-text-box="configUnitsBetweenMaintenanceTextBox"]/descendant::input', name: "Config Units Between Maintenance Text Box" },
    smrNextDate: { selector: '//span[@id="SMRNextDate"]', name: "SMR Next Date" },
};
