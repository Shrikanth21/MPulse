export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const GlobalSearchPageLocators: Readonly<{
    readonly searchBarInput: LocatorDefinition;
    readonly getEnterSearchBar: LocatorDefinition;
    readonly searchRecordsHeader: (searchGroup: string) => string;
    readonly searchedRequestStatusRows: (recordPage: string) => string;
    readonly showMoreLink: LocatorDefinition;
}> = {
    searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
    getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
    searchRecordsHeader: (searchGroup: string) => `//p[contains(text(),'${searchGroup}')]`,
    searchedRequestStatusRows: (recordPage: string) => `//div[@id='search-group']//p[contains(text(),'${recordPage}')]/following::tr[@class='dx-row dx-data-row dx-column-lines dx-selection']//div`,
    showMoreLink: { selector: '//a[@class="show-more"]', name: 'show more link' }
}