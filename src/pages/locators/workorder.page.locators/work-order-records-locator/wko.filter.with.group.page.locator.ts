export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WorkOrderFilterWithGroupPageLocators: Readonly<{
    Groupcheckbox: LocatorDefinition;
    groupExpandIcon: LocatorDefinition;
    statusGroupedHeader: LocatorDefinition;
    createdByGroupedHeader: LocatorDefinition;
    groupPanelDefault: LocatorDefinition;
    groupPanelAfterDrop: LocatorDefinition;
}> = {
    Groupcheckbox: { selector: "  //label[contains(., 'Group')]/input[@type='checkbox']", name: "Group" },
    groupExpandIcon: { selector: "//td[@class='dx-command-expand dx-datagrid-group-space dx-datagrid-expand dx-selection-disabled']", name: "Grouped Expand Icon" },
    statusGroupedHeader: { selector: "//td[starts-with(normalize-space(), 'Status:')]", name: "Grouped Header - Status" },
    createdByGroupedHeader: { selector: "//td[starts-with(normalize-space(), 'Created By:')]", name: "Grouped Header - Created By" },
    groupPanelDefault: { selector: "//div[@class='dx-group-panel-message']", name: "Default Group Panel" },
    groupPanelAfterDrop: { selector: "//div[@class='dx-datagrid-group-panel']", name: "Group Panel After Drop" }
};
