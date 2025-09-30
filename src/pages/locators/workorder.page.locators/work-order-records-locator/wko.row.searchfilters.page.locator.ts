export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoRowSearchFiltersPageLocators: Readonly<{
    readonly headerTitle: LocatorDefinition;
    readonly searchInput: LocatorDefinition;
    readonly reset: LocatorDefinition;
    readonly searchTextBox: LocatorDefinition;
}> = {
    headerTitle: { selector: "//h4[@class='left ng-binding ng-scope']", name: "Header Title" },
    searchInput: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//div[@class='dx-menu-horizontal']", name: "Search Input" },
    reset: { selector: "//li[@class='dx-menu-item-wrapper']//span[normalize-space()='Reset']", name: 'Reset option' },
    searchTextBox: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//input[@role='textbox']", name: "Search Text Box" },
};