import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { commonPageActions } from "../../common.page.actions";
import { timeouts } from "../../../../helper/timeouts-config";
import { homePageActions } from "../../home-page-action/home.page.actions";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { ReportInformationMenuPageLocators } from "../../../locators/reports-pages-locator/information-menu-page-locator/report.information.menu.page.locator";

class ReportInformationMenuPageActions {
  private get currentPage(): Page {
    return getPage();
  }

  private get actions(): WebActions {
    return new WebActions(this.currentPage);
  }

  /**
   * Clicks on a report item by its title.
   * @param title The title of the report item to click.
   */

  /**
   * Clicks on a custom report item by its title.
   * @param title The title of the custom report item to click.
   */
  public async clickCustomByTitle(title: string): Promise<void> {
    const titleTextEl = this.actions.getLocator(ReportInformationMenuPageLocators.getCustomDivByTitle(title));
    await this.actions.waitForElementToBeVisible(titleTextEl, title);
    await this.actions.click(titleTextEl, title);
  }

  public async clickDivByTitle(title: string): Promise<void> {
    const divElement = this.actions.getLocator(ReportInformationMenuPageLocators.getDivByTitle(title));
    await this.actions.waitForElementToBeVisible(divElement, `Title: ${title} is present`);
    await this.actions.click(divElement, `Clicked on title: ${title}`);
  }

  /**
   * Clicks on the save button.
   */
  public async clickOnSaveButton(): Promise<void> {
    const saveButton = this.actions.getLocator(ReportInformationMenuPageLocators.saveButton.selector);
    await this.actions.waitForElementToBeVisible(saveButton, ReportInformationMenuPageLocators.saveButton.name);
    await this.actions.click(saveButton, ReportInformationMenuPageLocators.saveButton.name);
  }

  /**
   * Enters the report title in the title input field.
   * @param title The title to enter.
   */
  public async enterReportTitle(title: string): Promise<void> {
    const reportTitleInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportTitle.selector);
    await this.actions.waitForElementToBeVisible(reportTitleInput, ReportInformationMenuPageLocators.reportTitle.name);
    await this.actions.typeText(reportTitleInput, title, ReportInformationMenuPageLocators.reportTitle.name);
  }

  /**
   * Enters the report description in the description input field.
   * @param description The description to enter.
   */
  public async enterReportDescription(description: string): Promise<void> {
    const reportDescriptionInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDescription.selector);
    await this.actions.waitForElementToBeVisible(reportDescriptionInput, ReportInformationMenuPageLocators.reportDescription.name);
    await this.actions.typeText(reportDescriptionInput, description, ReportInformationMenuPageLocators.reportDescription.name);
  }

  /**
   * Checks the "Place on Dashboard" checkbox.
   */
  public async checkPlaceOnDashboard(): Promise<void> {
    const reportShowInDashboardInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportShowInDashboard.selector);
    await this.actions.waitForElementToBeVisible(reportShowInDashboardInput, ReportInformationMenuPageLocators.reportShowInDashboard.name);
    await this.actions.click(reportShowInDashboardInput, ReportInformationMenuPageLocators.reportShowInDashboard.name);
  }

  /**
   * Selects the display record area for the X Axis.
   * @param area The area to select.
   */
  public async selectDisplayRecordAreaX(area: string): Promise<void> {
    const reportDisplayRecordAreaXInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDisplayRecordAreaX.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordAreaXInput, ReportInformationMenuPageLocators.reportDisplayRecordAreaX.name);
    await this.actions.click(reportDisplayRecordAreaXInput, ReportInformationMenuPageLocators.reportDisplayRecordAreaX.name);
    await this.actions.typeText(reportDisplayRecordAreaXInput, area, ReportInformationMenuPageLocators.reportDisplayRecordAreaX.name);
    await this.clickCustomByTitle(area);
  }

  /**
   * Selects the display record area for the Y Axis.
   * @param area The area to select.
   */
  public async selectDisplayRecordAreaY(area: string): Promise<void> {
    const reportDisplayRecordAreaYInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDisplayRecordAreaY.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordAreaYInput, ReportInformationMenuPageLocators.reportDisplayRecordAreaY.name);
    await this.actions.click(reportDisplayRecordAreaYInput, ReportInformationMenuPageLocators.reportDisplayRecordAreaY.name);
    await this.actions.typeText(reportDisplayRecordAreaYInput, area, ReportInformationMenuPageLocators.reportDisplayRecordAreaY.name);
    await this.clickCustomByTitle(area);
  }

  /**
   * Selects the display record field for the X Axis.
   * @param field The field to select.
   */
  public async selectDisplayRecordFieldX(field: string): Promise<void> {
    const reportDisplayRecordFieldXInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDisplayRecordFieldX.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordFieldXInput, ReportInformationMenuPageLocators.reportDisplayRecordFieldX.name);
    await this.actions.click(reportDisplayRecordFieldXInput, ReportInformationMenuPageLocators.reportDisplayRecordFieldX.name);
    await this.actions.typeText(reportDisplayRecordFieldXInput, field, ReportInformationMenuPageLocators.reportDisplayRecordFieldX.name);
    await this.clickCustomByTitle(field);
  }

  /**
   * Selects the display record field for the Y Axis.
   * @param field The field to select.
   */
  public async selectDisplayRecordFieldY(field: string): Promise<void> {
    const reportDisplayRecordFieldYInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDisplayRecordFieldY.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordFieldYInput, ReportInformationMenuPageLocators.reportDisplayRecordFieldY.name);
    await this.actions.click(reportDisplayRecordFieldYInput, ReportInformationMenuPageLocators.reportDisplayRecordFieldY.name);
    await this.actions.typeText(reportDisplayRecordFieldYInput, field, ReportInformationMenuPageLocators.reportDisplayRecordFieldY.name);
    await this.clickCustomByTitle(field);
  }

  /**
   * Selects the display record summary.
   * @param summary The summary to select.
   */
  public async selectDisplayRecordSummary(summary: string): Promise<void> {
    const reportDisplayRecordSummaryInput = this.actions.getLocator(ReportInformationMenuPageLocators.reportDisplayRecordSummary.selector);
    await this.actions.waitForElementToBeVisible(reportDisplayRecordSummaryInput, ReportInformationMenuPageLocators.reportDisplayRecordSummary.name);
    await this.actions.click(reportDisplayRecordSummaryInput, ReportInformationMenuPageLocators.reportDisplayRecordSummary.name);
    await this.actions.typeText(reportDisplayRecordSummaryInput, summary, ReportInformationMenuPageLocators.reportDisplayRecordSummary.name);
    await this.clickDivByTitle(summary);
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
    const reportIdElement = this.actions.getLocator(ReportInformationMenuPageLocators.reportId.selector);
    await this.actions.waitForElementToBeVisible(reportIdElement, ReportInformationMenuPageLocators.reportId.name);
    return await this.actions.getText(reportIdElement, ReportInformationMenuPageLocators.reportId.name);
  }

  /**
   * Verifies the visibility of the report chart.
   */
  public async verifyChartVisibility(): Promise<void> {
    await this.actions.waitForCustomDelay(timeouts.medium);
    const chartElement = this.actions.getLocator(ReportInformationMenuPageLocators.reportChart.selector);
    await this.actions.waitForElementToBeVisible(chartElement, ReportInformationMenuPageLocators.reportChart.name);
    const isVisible = await chartElement.isVisible();
    await this.actions.assertTrue(isVisible, ReportInformationMenuPageLocators.reportChart.name);
  }

  /**
   * Verifies the searched IM records.
   * @param actualId The actual ID to verify.
   */
  public async verifySearchedIMRecords(actualId: string): Promise<void> {
    const searchedRecordsElement = this.actions.getLocator(ReportInformationMenuPageLocators.searchedIMRecords.selector);
    await this.actions.waitForElementToBeVisible(searchedRecordsElement, ReportInformationMenuPageLocators.searchedIMRecords.name);
    const searchIdText = await this.actions.getText(searchedRecordsElement, ReportInformationMenuPageLocators.searchedIMRecords.name);
    await this.actions.assertEqual(searchIdText, actualId);
  }

  /**
   * Verifies the default widget displayed on the maintenance advisor.
   * @param actualWidgetTitle The actual widget title to verify.
   */
  public async verifyDefaultWidgetDisplayed(actualWidgetTitle: string): Promise<void> {
    const valueEle = await this.actions.getLocator(ReportInformationMenuPageLocators.reportValueTitle.selector);
    await this.actions.waitForElementToBeVisible(valueEle, ReportInformationMenuPageLocators.reportValueTitle.name);
    const isValueVisible = await valueEle.isVisible();
    await this.actions.assertTrue(isValueVisible, ReportInformationMenuPageLocators.reportValueTitle.name);

    const argumentEle = await this.actions.getLocator(ReportInformationMenuPageLocators.reportArgumentTitle.selector);
    await this.actions.waitForElementToBeVisible(argumentEle, ReportInformationMenuPageLocators.reportArgumentTitle.name);
    const isArgumentVisible = await argumentEle.isVisible();
    await this.actions.assertTrue(isArgumentVisible, ReportInformationMenuPageLocators.reportArgumentTitle.name);

    const defaultWidgetElement = this.actions.getLocator(ReportInformationMenuPageLocators.reportDraggableBlockHead.selector);
    await this.actions.waitForElementToBeVisible(defaultWidgetElement, ReportInformationMenuPageLocators.reportDraggableBlockHead.name);
    const reportValueTitleText = await this.actions.getText(defaultWidgetElement, ReportInformationMenuPageLocators.reportValueTitle.name);
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
    const reportTitleElement = this.actions.getLocator(ReportInformationMenuPageLocators.reportChartByTitle.selector);
    await this.actions.waitForElementToBeVisible(reportTitleElement, ReportInformationMenuPageLocators.reportChartByTitle.name);
    await this.actions.click(reportTitleElement, ReportInformationMenuPageLocators.reportChartByTitle.name);
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
    const wkoRecordCountElement = this.actions.getLocator(ReportInformationMenuPageLocators.wkoRecordCount.selector);
    await this.actions.waitForElementToBeVisible(wkoRecordCountElement, ReportInformationMenuPageLocators.wkoRecordCount.name);
    const wkoRecordCountText = await this.actions.getText(wkoRecordCountElement, ReportInformationMenuPageLocators.wkoRecordCount.name);
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
    const assetCountElement = this.actions.getLocator(ReportInformationMenuPageLocators.reportSummaryItem.selector);
    await this.actions.waitForElementToBeVisible(assetCountElement, ReportInformationMenuPageLocators.reportSummaryItem.name);
    const assetCountText = await this.actions.getText(assetCountElement, ReportInformationMenuPageLocators.reportSummaryItem.name);
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
    const setDataFilterButton = this.actions.getLocator(ReportInformationMenuPageLocators.reportSetDataFilter.selector);
    await this.actions.waitForElementToBeVisible(setDataFilterButton, ReportInformationMenuPageLocators.reportSetDataFilter.name);
    await this.actions.click(setDataFilterButton, ReportInformationMenuPageLocators.reportSetDataFilter.name);
  }

  /**
       * Applies a custom filter with the specified parameters.
       * @param filterName The name of the filter to apply.
       * @param operator The operator to use for the filter.
       * @param value The value to filter by.
       * @param condition The condition to apply to the filter.
       */
  public async applyCustomFilterWithDate(filterName: string, operator: string, value: string, condition: string): Promise<void> {
    await this.actions.waitForCustomDelay(timeouts.medium);
    const customFilterFieldInput = this.actions.getLocator(ReportInformationMenuPageLocators.customFilterDropdown('fieldDropDown'));
    await this.actions.waitForElementToBeVisible(customFilterFieldInput, ReportInformationMenuPageLocators.customFilterDropdown.name);
    await this.actions.click(customFilterFieldInput, ReportInformationMenuPageLocators.customFilterDropdown.name);

    const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName));
    await this.actions.waitForElementToBeVisible(customFilterFieldInputLocator, `Custom filter field with title ${filterName} is present`);
    await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${filterName}`);

    const customFilterOperatorInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.customFilterDropdown('operatorDropDown'));
    await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);
    await this.actions.click(customFilterOperatorInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);

    const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator));
    await this.actions.waitForElementToBeVisible(customFilterOperatorItemLocator, `Custom filter operator item with title ${operator} is present`);
    await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${operator}`);

    const customFilterValueInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.customFilterDropdown('dateDropDown'));
    await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);
    await this.actions.click(customFilterValueInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);

    const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
    await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${value} is present`);
    await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${value}`);

    const customFilterConditionInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.customFilterDropdown('conditionDropDown'));
    await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);
    await this.actions.click(customFilterConditionInputLocator, ReportInformationMenuPageLocators.customFilterDropdown.name);

    const customFilterConditionItemLocator = this.actions.getLocator(CommonPageLocators.getDivByText(condition));
    await this.actions.waitForElementToBeVisible(customFilterConditionItemLocator, `Custom filter condition item with title ${condition} is present`);
    await this.actions.click(customFilterConditionItemLocator, `Clicked on custom filter condition: ${condition}`);
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

    const customFilterFieldInput = this.actions.getLocator(ReportInformationMenuPageLocators.filterModalInput.selector).nth(0);
    await this.actions.waitForElementToBeVisible(customFilterFieldInput, ReportInformationMenuPageLocators.filterModalInput.name);
    await this.actions.click(customFilterFieldInput, ReportInformationMenuPageLocators.filterModalInput.name);

    const customFilterFieldInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.getOptionByTitle(area));
    await this.actions.waitForClickable(customFilterFieldInputLocator, `Custom filter field with title ${area} is present`);
    await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${area}`);

    const customFilterOperatorInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.filterModalInput.selector).nth(1);
    await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);
    await this.actions.click(customFilterOperatorInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);

    const customFilterOperatorItemLocator = this.actions.getLocator(ReportInformationMenuPageLocators.getOptionByTitle(filterName));
    await this.actions.waitForElementToBeVisible(customFilterOperatorItemLocator, `Custom filter operator with title ${filterName} is present`);
    await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${filterName}`);

    const customFilterValueInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.filterModalInput.selector).nth(2);
    await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);
    await this.actions.click(customFilterValueInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);

    const customFilterValueInput = this.actions.getLocator(ReportInformationMenuPageLocators.getOptionByTitle(operator));
    await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${operator} is present`);
    await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${operator}`);

    const customFilterConditionInputLocator = this.actions.getLocator(ReportInformationMenuPageLocators.filterModalInput.selector).nth(3);
    await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);
    await this.actions.click(customFilterConditionInputLocator, ReportInformationMenuPageLocators.filterModalInput.name);

    const customFilterConditionInput = this.actions.getLocator(ReportInformationMenuPageLocators.getOptionByTitle(value));
    await this.actions.waitForElementToBeVisible(customFilterConditionInput, `Custom filter condition input with title ${value} is present`);
    await this.actions.click(customFilterConditionInput, `Clicked on custom filter condition: ${value}`);

    await commonPageActions.clickSpanByText('Apply');
  }
}

export const reportInformationMenuPageActions = new ReportInformationMenuPageActions();
