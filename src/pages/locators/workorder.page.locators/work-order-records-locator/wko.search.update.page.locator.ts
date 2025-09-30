export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoSearchUpdatePageLocators: Readonly<{
    readonly workOrderIdLabel: LocatorDefinition;
    readonly searchBarInput: LocatorDefinition;
    readonly getEnterSearchBar: LocatorDefinition;
    readonly getClickonTask: LocatorDefinition;
    readonly descriptionInput: LocatorDefinition;
    readonly getSaveButton: LocatorDefinition;
    readonly getDescriptionText: LocatorDefinition;
}> = {
    workOrderIdLabel: { selector: "//span[@id='ID']", name: 'work order ID' },
    searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
    getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
    getClickonTask: { selector: "//div[@class='dx-scrollable-content']/descendant::a[contains(text(),'WKO')]", name: 'select task', },
    descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
    getSaveButton: { selector: "//li[@id='save-work-order']", name: 'save button' },
    getDescriptionText: { selector: "//div[@class='itemDetailInfo']/descendant::span[@id='Description']", name: 'description text' },
};
