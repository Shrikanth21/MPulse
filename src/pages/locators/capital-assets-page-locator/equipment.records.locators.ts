export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const EquipmentRecordsPageLocators: Readonly<{
    readonly descriptionInputField: LocatorDefinition;
    readonly mediaMoreButton: LocatorDefinition;
    readonly fileInput: LocatorDefinition;
    readonly uploadButton: LocatorDefinition;
    readonly getLinkByTitleSecondOccurrence: (title: string) => string;
}> = {
    getLinkByTitleSecondOccurrence: (title: string): string => `(//a[@title='${title}'])[2]`,
    descriptionInputField: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input Field" },
    mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
    fileInput: { selector: "//input[@title='Choose Files' and contains(@class,'custom-file-input')]", name: "File Input" },
    uploadButton: { selector: "//button[@title='Upload']", name: "Upload Button" },
};