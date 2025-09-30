export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoLabelChangePageLocators: Readonly<{
    readonly recordAreaDropdown: LocatorDefinition;
    readonly editLanguageButton: LocatorDefinition;
    readonly labelInput: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
}> = {
    recordAreaDropdown: { selector: "//div[@id='rightBlock']//input[@class='dx-texteditor-input']", name: "Record Area Dropdown" },
    editLanguageButton: { selector: "//li[@ng-click='editLanguage()']", name: "Edit Language Button" },
    labelInput: { selector: "//input[@ng-model='item.langData.Label']", name: "Label Input" },
    saveButton: { selector: "//a[@title='Save']", name: "Save Button" },
};
