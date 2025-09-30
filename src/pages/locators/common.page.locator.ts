export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const CommonPageLocators: Readonly<{
    readonly sideBarExpander: LocatorDefinition;
    readonly editButton: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
    readonly maximizeButton: LocatorDefinition;
    readonly descriptionInput: LocatorDefinition;
    readonly addNewRecordButton: LocatorDefinition;
    readonly closeButton: LocatorDefinition;
}> & {
    readonly getSpanByText: (text: string) => string;
    readonly getTabByText: (text: string) => string;
    readonly getLinkByTitle: (title: string) => string;
    readonly getSpanByTitle: (title: string) => string;
    readonly getDivByTitle: (title: string) => string;
    readonly getDivByText: (text: string) => string;
    readonly getColumnCellByTitle: (title: string) => string;
    readonly getTabByTitle: (title: string) => string;
    readonly getValueDivByTitle: (title: string) => string;
    readonly getColumnHeaderByText: (text: string) => string;
    readonly getGroupedHeaderByText: (text: string) => string;
    readonly getRowCellByIndex: (index: number) => string;
    readonly getLabelByTitle: (title: string) => string;
    readonly getButtonByText: (text: string) => string;
    readonly getDivById: (id: string) => string;
    readonly getButtonByTitle: (title: string) => string;
    readonly getLabelByText: (text: string) => string;
    readonly getLinkByText: (text: string) => string;
    readonly getSpanById: (id: string) => string;
} = {
    sideBarExpander: { selector: "[class='sideBarExpander']", name: "Sidebar Expander" },
    editButton: { selector: "//a[@title='Edit']//i[@class='fa fa-pencil-alt']", name: "Edit Button" },
    saveButton: { selector: "#save-work-order", name: "Save Button" },
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
    addNewRecordButton: { selector: "//div[@class='action-menu-items']/descendant::a[@title='Add new record']", name: "Add New Record Button" },
    closeButton: { selector: "//button[@title='Click here to close']", name: "Close Button" },

    getSpanByText: (text) => `//span[text()='${text}']`,
    getTabByText: (text) => `//span[@class='dFlex']//span[text()='${text}']`,
    getLinkByTitle: (title) => `//a[@title='${title}']`,
    getSpanByTitle: (title) => `//span[@title='${title}']`,
    getSpanById: (id) => `//span[@id='${id}']`,
    getDivByTitle: (title) => `//div[contains(@title,'${title}')]`,
    getDivByText: (text) => `//div[text()='${text}']`,
    getColumnCellByTitle: (title) => `//div[@title='${title}']`,
    getTabByTitle: (title) => `//li[@title='${title}']`,
    getValueDivByTitle: (title) => `//div[@title='${title}' and contains(@class, 'dx-item-content')]`,
    getColumnHeaderByText: (text) => `//div[@role='presentation' and normalize-space()='${text}']`,
    getGroupedHeaderByText: (text) => `//div[contains(@class,'dx-group-panel-item') and normalize-space()='${text}']`,
    getRowCellByIndex: (index) => `//td[contains(@aria-describedby,'dx-col') and @aria-colindex='${index}']`,
    getLabelByTitle: (title) => `//label[@title='${title}']`,
    getButtonByText: (text) => `//button[normalize-space()='${text}']`,
    getDivById: (id) => `//div[@id='${id}']`,
    getButtonByTitle: (title) => `//button[@title='${title}']`,
    getLabelByText: (text) => `//label[text()='${text}']`,
    getLinkByText: (text) => `//a[normalize-space()='${text}']`
};
