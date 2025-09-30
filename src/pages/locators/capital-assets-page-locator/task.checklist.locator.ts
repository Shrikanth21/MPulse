export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const TaskCheckListPageLocators: Readonly<{
    readonly descriptionInput: LocatorDefinition;
    readonly closeButton: LocatorDefinition;
    readonly eyeIcon: LocatorDefinition;
    readonly mediaMoreButton: LocatorDefinition;
    readonly fileInput: LocatorDefinition;
    readonly uploadButton: LocatorDefinition;
    readonly getChecklistRow: (title: string) => string;
    readonly getChecklistCheckbox: (text: string) => string;
    readonly getChecklistCell: (text: string) => string;
    readonly getChecklistInput: (text: string) => string;
    readonly getElementByText: (text: string) => string;
    readonly getTaskSaveIcon: (text: string) => string;
    readonly getEditIconByRow: (text: string) => string;
    readonly getTaskMoreIcon: (text: string) => string;
}> = {
    descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
    closeButton: { selector: "button[class='close']", name: "Close Button" },
    eyeIcon: { selector: "(//i[@class='fa fa-eye'])[2]", name: "Eye Icon" },
    mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
    fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
    uploadButton: { selector: "//button[@title='Upload']", name: "Upload Button" },
    getChecklistRow: (title: string): string => `//div[contains(@title,'${title}')]/ancestor::tr`,
    getElementByText: (text: string): string => `//span[text()='${text}']`,
    getChecklistCheckbox: (text: string): string => `${TaskCheckListPageLocators.getChecklistRow(text)}//div[@role='checkbox']`,
    getChecklistCell: (text: string): string => `(${TaskCheckListPageLocators.getChecklistRow(text)}//td)[1]`,
    getChecklistInput: (text: string): string => `${TaskCheckListPageLocators.getChecklistRow(text)}//td//input[@class='dx-texteditor-input']`,
    getTaskSaveIcon: (text: string): string => `${TaskCheckListPageLocators.getElementByText(text)}/ancestor::div[@class='row panelHeader']//i[@class='fas fa-check']`,
    getEditIconByRow: (text: string): string => `${TaskCheckListPageLocators.getElementByText(text)}/ancestor::div[@class='row panelHeader']//a[@title="Edit"]`,
    getTaskMoreIcon: (text: string): string => `${TaskCheckListPageLocators.getElementByText(text)}/ancestor::div[@class='row panelHeader']//i[contains(@class,'ellipsis')]`
};