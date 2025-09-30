export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WorkOrderFilterPageLocators: Readonly<{
    readonly navbarBrand: LocatorDefinition;
    readonly customizeButton: LocatorDefinition;
    readonly customizeModalHeader: LocatorDefinition;
    readonly addLayoutButton: LocatorDefinition;
    readonly layoutEntryInput: LocatorDefinition;
    readonly applyButton: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
    readonly expandGridDropdownIcon: LocatorDefinition;
    readonly deleteCurrentRecord: LocatorDefinition;
    readonly confirmYesButton: LocatorDefinition;
    readonly confirmNoButton: LocatorDefinition;
    readonly listItems: LocatorDefinition;
    readonly customFilterDropdown: (field: string) => string;
    readonly customFilterDropdowns: LocatorDefinition;
    readonly colorCodeDropdown: (field: string) => string;
    readonly colorInput: LocatorDefinition;
    readonly dataRows: LocatorDefinition;
    readonly addMoreFilterButton: LocatorDefinition;
    readonly expandGridDropdownInput: LocatorDefinition;
}> = {
    navbarBrand: { selector: "//a[@class='navbar-brand']", name: "Navbar Brand" },
    customizeButton: { selector: "//i[@class='fas fa-cog']", name: "Customize Button" },
    customizeModalHeader: { selector: "//div[@class='modal-header ng-binding ui-draggable-handle' and contains(text(),'Customize')]", name: "Customize Modal Header" },
    addLayoutButton: { selector: "//li[@title='Add']//i[@class='fa fa-plus']", name: "Add Layout Button" },
    layoutEntryInput: { selector: "//input[@id='layoutEntry']", name: "Layout Entry Input" },
    applyButton: { selector: "//button[@title='Apply']", name: "Apply Button" },
    saveButton: { selector: "//li[@title='Save']//i[@class='fas fa-check']", name: "Save Button" },
    expandGridDropdownIcon: { selector: "//div[@class='expand-grid-left']//div[@class='dx-dropdowneditor-icon']", name: "Expand Grid Dropdown Icon" },
    deleteCurrentRecord: { selector: "//li[@ng-hide='hideLayoutSelector']//i[@class='far fa-times-circle']", name: "Delete Current Layout Record" },
    confirmYesButton: { selector: "//div[@aria-label='Yes']", name: "Confirm Yes Button" },
    confirmNoButton: { selector: "//div[@aria-label='No']", name: "Confirm No Button" },
    listItems: { selector: "//div[@class='dx-item dx-list-item']", name: "List Items" },
    customFilterDropdown: (field: string) => `//filterpopup[@ng-if='selectedLayoutData.CustomFilter']/descendant::div[contains(@dx-select-box,'${field}')]`,
    customFilterDropdowns: { selector: "//div[@ng-switch-when='customfilter']/descendant::input[@class='dx-texteditor-input']", name: "Custom Filter Input" },
    colorCodeDropdown: (field: string) => `//filterpopup[@ng-if='selectedLayoutData.ColorFilter']/descendant::div[contains(@dx-select-box,'${field}')]/descendant::input[@class='dx-texteditor-input']`,
    colorInput: { selector: "//input[contains(@class, 'default-color-asb')]", name: "Color Input" },
    dataRows: { selector: "//tr[contains(@class, 'dx-row dx-data-row dx-column')]", name: "Data Rows" },
    addMoreFilterButton: { selector: "//a[@title='Add']", name: "Add More Filter Button" },
    expandGridDropdownInput: { selector: "//div[contains(@class,'expand-grid-left')]//input[@class='dx-texteditor-input']", name: "Expand Grid Dropdown Input" },
};