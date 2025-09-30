export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const smrDeleteRecordLocators: Readonly<{
    readonly smrId: LocatorDefinition;
    readonly modalTitle: LocatorDefinition;
    readonly closeModalButton: LocatorDefinition;
    readonly searchBarInput: LocatorDefinition;
    readonly getEnterSearchBar: LocatorDefinition;
}> = {
    smrId: { selector: "//div[contains(@class,'textTruncate')]//span[@id='Code']", name: "SMR ID" },
    modalTitle: { selector: "//h4[@class='modal-title left']", name: "Modal Title" },
    closeModalButton: { selector: "//button[@ng-click='closeModal()']", name: "Close Modal Button" },
    searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
    getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' }
};
