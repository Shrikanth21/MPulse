export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const MaintenanceTaskRecordsPageLocators: Readonly<{
    readonly priorityDropdown: LocatorDefinition;
    readonly listItemContent: LocatorDefinition;
    readonly linkAdditionalTaskButton: LocatorDefinition;
    readonly linkRecordButton: LocatorDefinition;
    readonly filterColumnIdInput: LocatorDefinition;
    readonly dropdownToggleRight: LocatorDefinition;
    readonly createWorkOrderButton: LocatorDefinition;
}> = {
    priorityDropdown: { selector: '//div[@id="LK_GENPRIOR"]', name: "Priority Dropdown" },
    listItemContent: { selector: '//div[@class="dx-item-content dx-list-item-content"]', name: "List Item Content" },
    linkAdditionalTaskButton: { selector: '//a[@title="Link Additional Task"]', name: "Link Additional Task Button" },
    linkRecordButton: { selector: '//input[@title="Click here to link a record"]', name: "Link Record Button" },
    filterColumnIdInput: { selector: '//td[@aria-label="Column ID#, Filter cell"]/descendant::input', name: "Filter Column ID Input" },
    dropdownToggleRight: { selector: '//a[@class="dropdown-toggle right"]', name: "Dropdown Toggle Right" },
    createWorkOrderButton: { selector: '//a[@title="Create Work Order"]', name: "Create Work Order Button" }
};