export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const smrAutoConvertLocators: Readonly<{
    readonly onDueDateRadioBtn: LocatorDefinition;
    readonly configEnableConversionLeadTimeCheckBox: LocatorDefinition;
    readonly dropdownMenu: LocatorDefinition;
    readonly openWorkOrdersPopup: LocatorDefinition;
    readonly workOrderLink: LocatorDefinition;
    readonly editScheduledMaintenance: LocatorDefinition;
    readonly saveScheduledMaintenance: LocatorDefinition;
    readonly doNotConvertRadioBtn: LocatorDefinition;
}> = {
    onDueDateRadioBtn: { selector: "//div[contains(@title,'automatically convert any Scheduled  Maintenance record to a work order')]//div[text()='on due date']", name: "On Due Date Radio Button" },
    configEnableConversionLeadTimeCheckBox: { selector: "//div[@dx-check-box='configEnableConversionLeadTimeCheckBox']", name: "Enable Conversion Lead Time Check Box" },
    dropdownMenu: { selector: "//a[@id='dropdownMenu2']", name: "Dropdown Menu" },
    openWorkOrdersPopup: { selector: "//a[@popuptype='OpenWorkOrdersPopup']", name: "Open Work Orders Popup" },
    workOrderLink: { selector: "//div[@class='modal-body view-popup-body customize ng-scope']/descendant::a[@class='dx-link ng-scope']", name: "Work Order Link" },
    editScheduledMaintenance: { selector: "//li[@ng-click='editScheduledMaintenance()']", name: "Edit Scheduled Maintenance" },
    saveScheduledMaintenance: { selector: "//li[@ng-click='saveScheduledMaintenance()']", name: "Save Scheduled Maintenance" },
    doNotConvertRadioBtn: { selector: "//div[contains(@title,'Scheduled  Maintenance record')]/descendant::div[text()='do not convert']", name: "Do Not Convert radio button" },
};
