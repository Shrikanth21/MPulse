export type LocatorDefinition = {
  readonly selector: string;
  readonly name: string;
};

export const ReportInformationMenuPageLocators: Readonly<{
  readonly reportTitle: LocatorDefinition;
  readonly reportDescription: LocatorDefinition;
  readonly reportShowInDashboard: LocatorDefinition;
  readonly reportDisplayRecordAreaX: LocatorDefinition;
  readonly reportDisplayRecordAreaY: LocatorDefinition;
  readonly reportDisplayRecordFieldX: LocatorDefinition;
  readonly reportDisplayRecordFieldY: LocatorDefinition;
  readonly reportDisplayRecordSummary: LocatorDefinition;
  readonly reportChart: LocatorDefinition;
  readonly reportId: LocatorDefinition;
  readonly searchedIMRecords: LocatorDefinition;
  readonly saveButton: LocatorDefinition;
  readonly reportValueTitle: LocatorDefinition;
  readonly reportArgumentTitle: LocatorDefinition;
  readonly reportDraggableBlockHead: LocatorDefinition;
  readonly reportChartByTitle: LocatorDefinition;
  readonly reportSummaryItem: LocatorDefinition;
  readonly wkoRecordCount: LocatorDefinition;
  readonly reportSetDataFilter: LocatorDefinition;
  readonly filterModalInput: LocatorDefinition;
  readonly customFilterDropdown: (field: string) => string;
  readonly getCustomDivByTitle: (title: string) => string;
  readonly getOptionByTitle: (title: string) => string;
  readonly getDivByTitle: (title: string) => string;
}> = {
  reportTitle: { selector: "//div[@class='nonfal-top-area title-area']/descendant::input[@class='dx-texteditor-input']", name: "Report Title" },
  reportDescription: { selector: "//div[@dx-text-box='IMDescriptionConfig']//input", name: "Report Description" },
  reportShowInDashboard: { selector: "//div[@dx-check-box='IMShowInDashBoardConfig']", name: "Place on Dashboard" },
  reportDisplayRecordAreaX: { selector: '//div[@dx-select-box="lblArea1Config"]/descendant::input[@class="dx-texteditor-input"]', name: "Display Record Area (X Axis)" },
  reportDisplayRecordAreaY: { selector: '//div[@dx-select-box="lblArea2Config"]/descendant::input[@class="dx-texteditor-input"]', name: "Display Record Area (Y Axis)" },
  reportDisplayRecordFieldX: { selector: '//div[@dx-select-box="lblField1Config"]/descendant::input[@class="dx-texteditor-input"]', name: "Display Record Field (X Axis)" },
  reportDisplayRecordFieldY: { selector: '//div[@dx-select-box="lblField2Config"]/descendant::input[@class="dx-texteditor-input"]', name: "Display Record Field (Y Axis)" },
  reportDisplayRecordSummary: { selector: '//div[@dx-select-box="lblSummaryConfig"]/descendant::input[@class="dx-texteditor-input"]', name: "Display Record Summary" },
  reportChart: { selector: '//div[@dx-chart="chartConfig"]', name: "Report Chart" },
  reportId: { selector: "//span[@class='form-editor color-mpulse-red ng-binding']", name: "Report ID" },
  searchedIMRecords: { selector: "//a[contains(@title,'IM-') and @class='hot-link']", name: "Searched IM Records" },
  saveButton: { selector: "//li[@ng-click='saveInformationMenu()']", name: "Save Button" },
  reportValueTitle: { selector: "//*[@class='dxc-val-title']", name: "Value Title" },
  reportArgumentTitle: { selector: "//*[@class='dxc-arg-title']", name: "Argument Title" },
  reportDraggableBlockHead: { selector: "//*[@class='draggble-block-head ng-binding']", name: "Draggable Block Head" },
  reportChartByTitle: { selector: '//chart[@chart-title="InformationMenuData.Name"]', name: "Chart By Title" },
  reportSummaryItem: { selector: '//div[@class="dx-datagrid-summary-item dx-datagrid-text-content"]', name: "Report Summary Item" },
  wkoRecordCount: { selector: "//div[contains(@title,'Record: ') and not(@class='left listview-recordcount ng-binding')]", name: "Work Order Record Count" },
  reportSetDataFilter: { selector: '//div[@aria-label="Set Data Filter"]', name: "Set Data Filter" },
  filterModalInput: { selector: "//div[contains(@class,'modal-content popup-no')]/descendant::input[@class='dx-texteditor-input']", name: "Filter Modal Input" },
  customFilterDropdown: (field: string) => `//filterpopup[@ng-if='selectedLayoutData.CustomFilter']/descendant::div[contains(@dx-select-box,'${field}')]`,
  getCustomDivByTitle: (title: string): string => `//div[@class='dx-item dx-list-item dx-state-focused']/descendant::div[@title='${title}']`,
  getOptionByTitle: (title: string): string => `//div[@class='dx-item dx-list-item']/descendant::div[text()='${title}']`,
  getDivByTitle: (title: string): string => `//div[@title='${title}']`,
};
