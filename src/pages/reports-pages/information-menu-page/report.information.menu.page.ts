import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { homePageActions } from "../../actions/home.page.action/home.page.actions";
import { commonPageActions } from "../../actions/common.page.actions";

class ReportInformationMenuPage {
  private get currentPage(): Page {
    return getPage();
  }

  private get actions(): WebActions {
    return new WebActions(this.currentPage);
  }

  private elementSelectors = {
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
  }
  getDivByTitle = (title: string): string => `//div[@title='${title}']`;
  getCustomDivByTitle = (title: string): string => `//div[@class='dx-item dx-list-item dx-state-focused']/descendant::div[@title='${title}']`;
  getOptionByTitle = (title: string): string => `//div[@class='dx-item dx-list-item']/descendant::div[text()='${title}']`;

  /**
   * Clicks on a report item by its title.
   * @param title The title of the report item to click.
   */
  public async clickByTitle(title: string): Promise<void> {
    const titleTextEl = this.actions.getLocator(this.getDivByTitle(title));
    await this.actions.waitForElementToBeVisible(titleTextEl, title);
    await this.actions.click(titleTextEl, title);
  }

  /**
   * Clicks on a custom report item by its title.
   * @param title The title of the custom report item to click.
   */
  public async clickCustomByTitle(title: string): Promise<void> {
    const titleTextEl = this.actions.getLocator(this.getCustomDivByTitle(title));
    await this.actions.waitForElementToBeVisible(titleTextEl, title);
    await this.actions.click(titleTextEl, title);
  }

  /**
   * Clicks on the save button.
   */
  public async clickOnSaveButton(): Promise<void> {
    const saveButton = this.actions.getLocator(this.elementSelectors.saveButton.selector);
    await this.actions.waitForElementToBeVisible(saveButton, this.elementSelectors.saveButton.name);
    await this.actions.click(saveButton, this.elementSelectors.saveButton.name);
  }

  /**
   * Enters the report title in the title input field.
   * @param title The title to enter.
   */
  public async enterReportTitle(title: string): Promise<void> {
    const reportTitleInput = this.actions.getLocator(this.elementSelectors.reportTitle.selector);
    await this.actions.waitForElementToBeVisible(reportTitleInput, this.elementSelectors.reportTitle.name);
    await this.actions.typeText(reportTitleInput, title, this.elementSelectors.reportTitle.name);
  }

  /**
   * Enters the report description in the description input field.
   * @param description The description to enter.
   */
  public async enterReportDescription(description: string): Promise<void> {
    const reportDescriptionInput = this.actions.getLocator(this.elementSelectors.reportDescription.selector);
    await this.actions.waitForElementToBeVisible(reportDescriptionInput, this.elementSelectors.reportDescription.name);
    await this.actions.typeText(reportDescriptionInput, description, this.elementSelectors.reportDescription.name);
  }

  /**
   * Checks the "Place on Dashboard" checkbox.
   */
  public async checkPlaceOnDashboard(): Promise<void> {
    const reportShowInDashboardInput = this.actions.getLocator(this.elementSelectors.reportShowInDashboard.selector);
    await this.actions.waitForElementToBeVisible(reportShowInDashboardInput, this.elementSelectors.reportShowInDashboard.name);
    await this.actions.click(reportShowInDashboardInput, this.elementSelectors.reportShowInDashboard.name);
  }

  /**
   * Selects the display record area for the X Axis.
   * @param area The area to select.
   */
  public async selectDisplayRecordAreaX(area: string): Promise<void> {
    const reportDisplayRecordAreaXInput = this.actions.getLocator(this.elementSelectors.reportDisplayRecordAreaX.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordAreaXInput, this.elementSelectors.reportDisplayRecordAreaX.name);
    await this.actions.click(reportDisplayRecordAreaXInput, this.elementSelectors.reportDisplayRecordAreaX.name);
    await this.actions.typeText(reportDisplayRecordAreaXInput, area, this.elementSelectors.reportDisplayRecordAreaX.name);
    await this.clickByTitle(area);
  }

  /**
   * Selects the display record area for the Y Axis.
   * @param area The area to select.
   */
  public async selectDisplayRecordAreaY(area: string): Promise<void> {
    const reportDisplayRecordAreaYInput = this.actions.getLocator(this.elementSelectors.reportDisplayRecordAreaY.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordAreaYInput, this.elementSelectors.reportDisplayRecordAreaY.name);
    await this.actions.click(reportDisplayRecordAreaYInput, this.elementSelectors.reportDisplayRecordAreaY.name);
    await this.actions.typeText(reportDisplayRecordAreaYInput, area, this.elementSelectors.reportDisplayRecordAreaY.name);
    await this.clickCustomByTitle(area);
  }

  /**
   * Selects the display record field for the X Axis.
   * @param field The field to select.
   */
  public async selectDisplayRecordFieldX(field: string): Promise<void> {
    const reportDisplayRecordFieldXInput = this.actions.getLocator(this.elementSelectors.reportDisplayRecordFieldX.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordFieldXInput, this.elementSelectors.reportDisplayRecordFieldX.name);
    await this.actions.click(reportDisplayRecordFieldXInput, this.elementSelectors.reportDisplayRecordFieldX.name);
    await this.actions.typeText(reportDisplayRecordFieldXInput, field, this.elementSelectors.reportDisplayRecordFieldX.name);
    await this.clickByTitle(field);
  }

  /**
   * Selects the display record field for the Y Axis.
   * @param field The field to select.
   */
  public async selectDisplayRecordFieldY(field: string): Promise<void> {
    const reportDisplayRecordFieldYInput = this.actions.getLocator(this.elementSelectors.reportDisplayRecordFieldY.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordFieldYInput, this.elementSelectors.reportDisplayRecordFieldY.name);
    await this.actions.click(reportDisplayRecordFieldYInput, this.elementSelectors.reportDisplayRecordFieldY.name);
    await this.actions.typeText(reportDisplayRecordFieldYInput, field, this.elementSelectors.reportDisplayRecordFieldY.name);
    await this.clickCustomByTitle(field);
  }

  /**
   * Selects the display record summary.
   * @param summary The summary to select.
   */
  public async selectDisplayRecordSummary(summary: string): Promise<void> {
    const reportDisplayRecordSummaryInput = this.actions.getLocator(this.elementSelectors.reportDisplayRecordSummary.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordSummaryInput, this.elementSelectors.reportDisplayRecordSummary.name);
    await this.actions.click(reportDisplayRecordSummaryInput, this.elementSelectors.reportDisplayRecordSummary.name);
    await this.actions.typeText(reportDisplayRecordSummaryInput, summary, this.elementSelectors.reportDisplayRecordSummary.name);
    await this.clickByTitle(summary);
  }

  /**
   * Fills all fields in the display record.
   * @param displayRecord The display record data.
   */
  public async createNewInformationMenu(reportTitle: string, reportDes: string, displayRecord: { x: string; y: string; fieldX: string; fieldY: string; summary: string }): Promise<void> {
    await commonPageActions.clickAddNewRecordButton();
    await this.actions.waitForCustomDelay(timeouts.medium);
    await this.enterReportTitle(reportTitle);
    await this.enterReportDescription(reportDes);
    await this.selectDisplayRecordAreaX(displayRecord.x);
    await this.selectDisplayRecordAreaY(displayRecord.y);
    await this.selectDisplayRecordFieldX(displayRecord.fieldX);
    await this.selectDisplayRecordFieldY(displayRecord.fieldY);
    await this.selectDisplayRecordSummary(displayRecord.summary);
    await this.clickOnSaveButton();
  }

  /**
   * Gets the report ID.
   * @returns The report ID.
   */
  public async getReportId(reportTitle: string): Promise<string> {
    await commonPageActions.clickSpanByText(reportTitle);
    const reportIdElement = this.actions.getLocator(this.elementSelectors.reportId.selector);
    await this.actions.waitForElementToBeVisible(reportIdElement, this.elementSelectors.reportId.name);
    return await this.actions.getText(reportIdElement, this.elementSelectors.reportId.name);
  }

  /**
   * Verifies the visibility of the report chart.
   */
  public async verifyChartVisibility(): Promise<void> {
    await this.actions.waitForCustomDelay(timeouts.medium);
    const chartElement = this.actions.getLocator(this.elementSelectors.reportChart.selector);
    await this.actions.waitForElementToBeVisible(chartElement, this.elementSelectors.reportChart.name);
    const isVisible = await chartElement.isVisible();
    await this.actions.assertTrue(isVisible, this.elementSelectors.reportChart.name);
  }

  /**
   * Verifies the searched IM records.
   * @param actualId The actual ID to verify.
   */
  public async verifySearchedIMRecords(actualId: string): Promise<void> {
    const searchedRecordsElement = this.actions.getLocator(this.elementSelectors.searchedIMRecords.selector);
    await this.actions.waitForElementToBeVisible(searchedRecordsElement, this.elementSelectors.searchedIMRecords.name);
    const searchIdText = await this.actions.getText(searchedRecordsElement, this.elementSelectors.searchedIMRecords.name);
    await this.actions.assertEqual(searchIdText, actualId);
  }

  /**
   * Verifies the default widget displayed on the maintenance advisor.
   * @param actualWidgetTitle The actual widget title to verify.
   */
  public async verifyDefaultWidgetDisplayed(actualWidgetTitle: string): Promise<void> {
    const valueEle = await this.actions.getLocator(this.elementSelectors.reportValueTitle.selector);
    await this.actions.waitForElementToBeVisible(valueEle, this.elementSelectors.reportValueTitle.name);
    const isValueVisible = await valueEle.isVisible();
    await this.actions.assertTrue(isValueVisible, this.elementSelectors.reportValueTitle.name);

    const argumentEle = await this.actions.getLocator(this.elementSelectors.reportArgumentTitle.selector);
    await this.actions.waitForElementToBeVisible(argumentEle, this.elementSelectors.reportArgumentTitle.name);
    const isArgumentVisible = await argumentEle.isVisible();
    await this.actions.assertTrue(isArgumentVisible, this.elementSelectors.reportArgumentTitle.name);

    const defaultWidgetElement = this.actions.getLocator(this.elementSelectors.reportDraggableBlockHead.selector);
    await this.actions.waitForElementToBeVisible(defaultWidgetElement, this.elementSelectors.reportDraggableBlockHead.name);
    const reportValueTitleText = await this.actions.getText(defaultWidgetElement, this.elementSelectors.reportValueTitle.name);
    await this.actions.assertEqual(reportValueTitleText, actualWidgetTitle);
  }

  /**
   * Creates a new Information Menu with default widget for Maintenance Advisor.
   * @param reportTitle The title of the report.
   * @param reportDes The description of the report.
   * @param displayRecord The display record information.
   */
  public async createNewInformationMenuWithDefaultWidget(reportTitle: string, reportDes: string, displayRecord: { x: string; y: string; fieldX: string; fieldY: string; summary: string }): Promise<void> {
    await commonPageActions.clickAddNewRecordButton();
    await this.actions.waitForCustomDelay(timeouts.medium);
    await this.enterReportTitle(reportTitle);
    await this.enterReportDescription(reportDes);
    await this.checkPlaceOnDashboard();
    await this.selectDisplayRecordAreaX(displayRecord.x);
    await this.selectDisplayRecordAreaY(displayRecord.y);
    await this.selectDisplayRecordFieldX(displayRecord.fieldX);
    await this.selectDisplayRecordFieldY(displayRecord.fieldY);
    await this.selectDisplayRecordSummary(displayRecord.summary);
    await this.clickOnSaveButton();
  }

  /**
   * Unchecks the default widget option.
   */
  public async uncheckDefaultWidgetOption(): Promise<void> {
    commonPageActions.clickEditButton();
    await this.checkPlaceOnDashboard();
    await this.clickOnSaveButton();
  }

  /**
   * Verifies the asset count displayed in the report.
   * @param expectedAssetCount The expected asset count.
   */
  public async verifyAssetCount(expectedAssetCount: string): Promise<void> {
    const reportTitleElement = this.actions.getLocator(this.elementSelectors.reportChartByTitle.selector);
    await this.actions.waitForElementToBeVisible(reportTitleElement, this.elementSelectors.reportChartByTitle.name);
    await this.actions.click(reportTitleElement, this.elementSelectors.reportChartByTitle.name);
    const assetCount = await this.getAssetRecordCount();
    console.log(`Expected Asset Count: ${expectedAssetCount}, Actual Asset Count: ${assetCount}`);
    await this.actions.assertEqual(
      expectedAssetCount,
      assetCount.toString(),
      `Mismatch: Work Order Count = ${expectedAssetCount}, Asset Count = ${assetCount}`
    );
  }

  /**
   * Gets the Work Order record count.
   * @returns The Work Order record count.
   */
  public async getWorkOrderRecordCount(): Promise<number> {
    await this.actions.waitForCustomDelay(timeouts.huge);
    const wkoRecordCountElement = this.actions.getLocator(this.elementSelectors.wkoRecordCount.selector);
    await this.actions.waitForElementToBeVisible(wkoRecordCountElement, this.elementSelectors.wkoRecordCount.name);
    const wkoRecordCountText = await this.actions.getText(wkoRecordCountElement, this.elementSelectors.wkoRecordCount.name);
    const match = wkoRecordCountText.replace(/\s+/g, ' ').match(/of\s*(\d+)/i);
    const totalCount = match ? parseInt(match[1], 10) : 0;
    return totalCount;
  }

  /**
   * Gets the Asset record count.
   * @returns The Asset record count.
   */
  public async getAssetRecordCount(): Promise<number> {
    await this.actions.waitForCustomDelay(timeouts.medium);
    const assetCountElement = this.actions.getLocator(this.elementSelectors.reportSummaryItem.selector);
    await this.actions.waitForElementToBeVisible(assetCountElement, this.elementSelectors.reportSummaryItem.name);
    const assetCountText = await this.actions.getText(assetCountElement, this.elementSelectors.reportSummaryItem.name);
    const match = assetCountText.match(/Count:\s*(\d+)(?:\.\d+)?/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Navigates to the Report Widget page.
   * @param menuItemTitle The title of the menu item.
   * @param subMenuItemTitle The title of the sub-menu item.
   * @param expectedUrl The expected URL of the Report Widget page.
   */
  public async navigateToReportWidgetPage(
    menuItemTitle: string,
    subMenuItemTitle: string,
    expectedUrl: string
  ): Promise<void> {
    await homePageActions.clickSideMenuIcon();
    await commonPageActions.clickSpanByTitle(menuItemTitle);
    await commonPageActions.clickLinkByTitle(subMenuItemTitle);
    await this.actions.validateCurrentUrl(expectedUrl);
  }

  /**
   * Applies a set data filter.
   * @param reportTitle The title of the report.
   * @param reportDes The description of the report.
   * @param displayRecord The display record information.
   * @param filterName The name of the filter.
   * @param operator The operator to use for the filter.
   * @param value The value to filter by.
   */
  public async createNewInformationMenuRecords(
    reportTitle: string,
    reportDes: string,
    displayRecord: { x: string; y: string; fieldX: string; fieldY: string; summary: string },
    area: string,
    filterName: string,
    operator: string,
    value: string
  ): Promise<void> {
    await commonPageActions.clickAddNewRecordButton();
    await this.actions.waitForCustomDelay(timeouts.medium);
    await this.enterReportTitle(reportTitle);
    await this.enterReportDescription(reportDes);
    await this.selectDisplayRecordAreaX(displayRecord.x);
    await this.selectDisplayRecordAreaY(displayRecord.y);
    await this.selectDisplayRecordFieldX(displayRecord.fieldX);
    await this.selectDisplayRecordFieldY(displayRecord.fieldY);
    await this.selectDisplayRecordSummary(displayRecord.summary);
    await this.applySetDataFilter(area, filterName, operator, value);
    await this.clickOnSaveButton();
  }

  /**
   * Clicks on the Set Data Filter button.
   */
  public async clickSetDataFilter(): Promise<void> {
    const setDataFilterButton = this.actions.getLocator(this.elementSelectors.reportSetDataFilter.selector);
    await this.actions.waitForElementToBeVisible(setDataFilterButton, this.elementSelectors.reportSetDataFilter.name);
    await this.actions.click(setDataFilterButton, this.elementSelectors.reportSetDataFilter.name);
  }

  /**
   * Applies a set data filter.
   * @param filterName The name of the filter.
   * @param operator The operator to use for the filter.
   * @param value The value to filter by.
   */
  public async applySetDataFilter(area: string, filterName: string, operator: string, value: string): Promise<void> {
    await this.actions.waitForCustomDelay(timeouts.medium);
    await this.clickSetDataFilter();

    const customFilterFieldInput = this.actions.getLocator(this.elementSelectors.filterModalInput.selector).nth(0);
    await this.actions.waitForElementToBeVisible(customFilterFieldInput, this.elementSelectors.filterModalInput.name);
    await this.actions.click(customFilterFieldInput, this.elementSelectors.filterModalInput.name);

    const customFilterFieldInputLocator = this.actions.getLocator(this.getOptionByTitle(area));
    await this.actions.waitForClickable(customFilterFieldInputLocator, `Custom filter field with title ${area} is present`);
    await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${area}`);

    const customFilterOperatorInputLocator = this.actions.getLocator(this.elementSelectors.filterModalInput.selector).nth(1);
    await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, this.elementSelectors.filterModalInput.name);
    await this.actions.click(customFilterOperatorInputLocator, this.elementSelectors.filterModalInput.name);

    const customFilterOperatorItemLocator = this.actions.getLocator(this.getOptionByTitle(filterName));
    await this.actions.waitForElementToBeVisible(customFilterOperatorItemLocator, `Custom filter operator with title ${filterName} is present`);
    await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${filterName}`);

    const customFilterValueInputLocator = this.actions.getLocator(this.elementSelectors.filterModalInput.selector).nth(2);
    await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, this.elementSelectors.filterModalInput.name);
    await this.actions.click(customFilterValueInputLocator, this.elementSelectors.filterModalInput.name);

    const customFilterValueInput = this.actions.getLocator(this.getOptionByTitle(operator));
    await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${operator} is present`);
    await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${operator}`);

    const customFilterConditionInputLocator = this.actions.getLocator(this.elementSelectors.filterModalInput.selector).nth(3);
    await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, this.elementSelectors.filterModalInput.name);
    await this.actions.click(customFilterConditionInputLocator, this.elementSelectors.filterModalInput.name);

    const customFilterConditionInput = this.actions.getLocator(this.getOptionByTitle(value));
    await this.actions.waitForElementToBeVisible(customFilterConditionInput, `Custom filter condition input with title ${value} is present`);
    await this.actions.click(customFilterConditionInput, `Clicked on custom filter condition: ${value}`);

    await commonPageActions.clickSpanByText('Apply');
  }
}

export const reportInformationMenuPage = new ReportInformationMenuPage();
