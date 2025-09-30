export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const RequisitionRecordsPageLocators: Readonly<{
    readonly backorderMoreButton: LocatorDefinition;
    readonly editBackOrderButton: LocatorDefinition;
    readonly backOrderDetailsInput: LocatorDefinition;
    readonly closeBackOrderDetailsButton: LocatorDefinition;
    readonly zeroQuantityText: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
    readonly receivedQuantityText: (quantity: string) => string;
    readonly maximizeButton: LocatorDefinition;
    readonly plusIcon: LocatorDefinition;
    readonly saveIcon: LocatorDefinition;
    readonly hideButton: LocatorDefinition;
    readonly moreButton: LocatorDefinition;
    readonly editRecordButton: LocatorDefinition;
    readonly receivedOneQuantityText: LocatorDefinition;
    readonly dxLink: LocatorDefinition;
    readonly stockAreaListRows: LocatorDefinition;
    readonly stockedItemCheckbox: LocatorDefinition;
    readonly editField: LocatorDefinition;
    readonly financialInputField: LocatorDefinition;
    readonly financialSaveButton: LocatorDefinition;
    readonly stockAreaInputField: LocatorDefinition;
    readonly popupTextInput: LocatorDefinition;
    readonly okInput: LocatorDefinition;
}> = {
    backorderMoreButton: { selector: "//div[@class='moreBtn ng-scope']", name: "Backorder More Button" },
    editBackOrderButton: { selector: "//div[@id='BackOrderDetails']/descendant::a[@title='Edit']", name: "Edit BackOrder Button" },
    backOrderDetailsInput: { selector: "//div[@id='BackOrderDetails']//input[@class='dx-texteditor-input']", name: "BackOrder Details Input" },
    closeBackOrderDetailsButton: { selector: "//div[@id='BackOrderDetails-header']/descendant::i", name: "Close BackOrder Details Button" },
    zeroQuantityText: { selector: "//div[@id='BackOrderDetails']/descendant::tr//td//div[text()='0.00']", name: "Zero Quantity Text" },
    saveButton: { selector: "//div[@id='BackOrderDetails']/descendant::a[@title='Save']", name: "Save Button" },
    receivedQuantityText: (quantity: string): string => `//div[@id='InventoryList']/descendant::div[text()='${quantity}']`,
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    plusIcon: { selector: '//div[@ng-show="listviewdisplaystatus"]/descendant::div[@class="action-menu-items"]/descendant::a[@title="Add new record"]', name: "Add New Record Icon" },
    saveIcon: { selector: "//div[@ng-show='listviewdisplaystatus']/descendant::a[@title='Save']", name: "Save Icon" },
    hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
    moreButton: { selector: "//div[@class='row panelHeader']/descendant::div[@class='moreBtn']", name: "More Button" },
    editRecordButton: { selector: "//li[@ng-click='showEditMode()']", name: "Edit Record Button" },
    receivedOneQuantityText: { selector: "//tr/following::td/following::div[text()='1.00']", name: "Received Quantity 1.00 Text" },
    dxLink: { selector: "//a[@class='dx-link ng-scope']", name: "DX Link" },
    stockAreaListRows: { selector: "//gridcontrol[@id='StockAreaList']/descendant::tr[contains(@class,'dx-row dx-data')]/descendant::td", name: "Stock Area List Rows" },
    stockedItemCheckbox: { selector: '//div[@id="StockedItem"]', name: "Stocked Item Unchecked Checkbox" },
    editField: { selector: "//div[@id='StockAreaTab']/descendant::span[@title='Edit Field']", name: "Edit Field Icon" },
    financialInputField: { selector: "//div[@id='FinancialTab']/descendant::input[@class='dx-texteditor-input']", name: "Financial Input Field" },
    financialSaveButton: { selector: "//div[@id='FinancialTab']/descendant::a[@title='Save']", name: "Financial Save Button" },
    stockAreaInputField: { selector: "//div[@id='StockedItem']", name: "Stock Area Input Field" },
    popupTextInput: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Popup Text Input" },
    okInput: { selector: "[value='Ok']", name: "Ok Input" },
};