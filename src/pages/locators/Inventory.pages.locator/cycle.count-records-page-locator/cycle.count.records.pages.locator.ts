export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const CycleCountRecordsPageLocators: Readonly<{
    readonly countTypeDropdown: LocatorDefinition;
    readonly filterInput: LocatorDefinition;
    readonly cycId: LocatorDefinition;
    readonly cycDesc: LocatorDefinition;
    readonly dateRangeInput: LocatorDefinition;
    readonly searchTextBox: LocatorDefinition;
    readonly searchedId: LocatorDefinition;
    readonly inventorySelectedForCounting: LocatorDefinition;
    readonly numberOfItem: LocatorDefinition;
    readonly itemsToCount: LocatorDefinition;
    readonly cycleCountLinks: LocatorDefinition;
    readonly itemsToCountInput: LocatorDefinition;
    readonly moreButton: LocatorDefinition;
    readonly editLink: LocatorDefinition;
    readonly cycleCountTab: LocatorDefinition;
    readonly cycleCountLink: LocatorDefinition;
    readonly dxLink: LocatorDefinition;
    readonly stockAreaListRows: LocatorDefinition;
    readonly stockInput: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
    readonly maximizeButton: LocatorDefinition;
    readonly plusIcon: LocatorDefinition;
    readonly checkIcon: LocatorDefinition;
    readonly wkoInput: LocatorDefinition;
    readonly okInput: LocatorDefinition;
    readonly hideButton: LocatorDefinition;
    readonly floatStartDateInput: LocatorDefinition;
    readonly onDueDateRadioBtn: LocatorDefinition;
    readonly doNotConvertRadioBtn: LocatorDefinition;
}> = {
    countTypeDropdown: { selector: "//div[@id='CCOUNTCOUNTTYPE']", name: "Count Type Dropdown" },
    filterInput: { selector: "//tr[@ng-if='showFilters']/descendant::div[@class='dx-texteditor-container']//input", name: "Filter Input" },
    cycId: { selector: "//span[@id='Code']", name: "Code Span" },
    cycDesc: { selector: "//span[@id='Desc']", name: "Description Span" },
    dateRangeInput: { selector: "//div[@title='Date Range']/descendant::div[@class='dx-texteditor-container']", name: "Date Range Input" },
    searchTextBox: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//input[@role='textbox']", name: "Search Text Box" },
    searchedId: { selector: "//a[@class='dx-link ng-scope']", name: "Searched ID" },
    inventorySelectedForCounting: { selector: "//span[@title='Inventory selected for counting']", name: "Inventory Selected For Counting Span" },
    numberOfItem: { selector: "//div[@class='form-group-control-wrap-inner']/child::span[@class='form-editor ng-binding']", name: "Number Of Item" },
    itemsToCount: { selector: "//span[@id='CCOUNTITEMSTOCOUNT']", name: "Items To Count Span" },
    cycleCountLinks: { selector: "//datagrid[@id='CycleCount']/descendant::tr/descendant::a", name: "Cycle Count Links" },
    itemsToCountInput: { selector: "//div[@id='CCOUNTITEMSTOCOUNT']/descendant::input", name: "Items To Count Input" },
    moreButton: { selector: "//datagrid[@id='CycleCount']//descendant::div[@class='moreBtn']", name: "More Button" },
    editLink: { selector: "//datagrid[@id='CycleCount']/descendant::a[@title='Edit']", name: "Edit Link" },
    cycleCountTab: { selector: "//div[@id='CycleCountTab']//table[contains(@class,'dx-datagrid-table dx-datagrid-table-fixed dx-select')]//tr[1]//td[last()]", name: "Cycle Count Tab" },
    cycleCountLink: { selector: '(//a[@class="dx-link ng-scope"])[2]', name: 'Cycle Count Tab' },
    dxLink: { selector: "//a[@class='dx-link ng-scope']", name: "DX Link" },
    stockAreaListRows: { selector: "//gridcontrol[@id='StockAreaList']/descendant::tr[contains(@class,'dx-row dx-data')]/descendant::td", name: "Stock Area List Rows" },
    stockInput: { selector: "//div[@id='CycleCountTab']//table[contains(@class,'dx-datagrid-table dx-datagrid-table-fixed dx-select')]//tr[1]//td[last()]//input", name: "Stock Input" },
    saveButton: { selector: "//div[@id='CycleCountTab']/descendant::a[@title='Save']", name: "Save Button" },
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
    checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
    wkoInput: { selector: "//div[contains(@class,'modal-content popup-no')]//input", name: "WKO Input" },
    okInput: { selector: "[value='Ok']", name: "Ok Input" },
    hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
    floatStartDateInput: { selector: '//div[@dx-date-box="configFloatStartDateBox"]//input[@role="combobox"]', name: "Float Start Date Input" },
    onDueDateRadioBtn: { selector: "//div[contains(@title,'automatically convert any Cycle Count record to a work order')]//div[text()='on due date']", name: "On Due Date Radio Button" },
    doNotConvertRadioBtn: { selector: "//div[contains(@title,'automatically convert any Cycle Count record to a work order')]//div[text()='do not convert']", name: "Do Not Convert Radio Button" }
};
