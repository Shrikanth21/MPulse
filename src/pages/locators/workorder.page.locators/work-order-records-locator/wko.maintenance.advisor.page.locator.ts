export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoMaintenanceAdvisorPageLocators: Readonly<{
    readonly dropdownToggle: LocatorDefinition;
    readonly draggableBlockHead: LocatorDefinition;
    readonly savedLayouts: LocatorDefinition;
    readonly removeButton: LocatorDefinition;
    readonly configureDashboardOption: LocatorDefinition;
    readonly dataRows: LocatorDefinition;
}> = {
    dropdownToggle: { selector: "//a[@class='dropdown-toggle pointer']", name: 'dropdown toggle' },
    draggableBlockHead: { selector: "//p[@class='draggble-block-head ng-binding']", name: 'draggable block head' },
    savedLayouts: { selector: "//div[@title='Saved Layouts']", name: 'saved layouts' },
    removeButton: { selector: "//button[@class='removebtn']", name: 'remove button' },
    configureDashboardOption: { selector: "//a[@title='Configure Dashboard']", name: 'configure dashboard option' },
    dataRows: { selector: "//tr[contains(@class, 'dx-row dx-data-row dx-column-lines')]", name: 'data rows' },
};