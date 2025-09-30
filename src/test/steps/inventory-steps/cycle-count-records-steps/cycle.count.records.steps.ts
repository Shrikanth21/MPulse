import { Then, When } from "@cucumber/cucumber";
import testData from '../../../../data/testData.json';
import mrtestData from '../../../../data/maintenance.records.json';
import { commonPageActions } from "../../../../pages/actions/common.page.actions";
import { generatedCycleCountRecordDescription } from "../../../../helper/get.different.description";
import { cycleCountRecordsPageActions } from "../../../../pages/actions/Inventory.pages.action/cycle-count-records-pages-action/cycle.count.records.pages.action";
import { workOrderRecordPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";
import { cycDeleteRecordPageActions } from "../../../../pages/actions/Inventory.pages.action/cycle-count-records-pages-action/cyc.delete.record.page.action";
import { wkoDeletePageAction } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.delete.page.action";
import { mrAutoConvertPageActions } from "../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.auto.convert.page.action";

let createdCycId: string;
let createdCycCount: string;
let beforeCloseStockQty: string;
let currentRecord: string;

When(/^the user navigates to the Cycle Count Records page$/, async () => {
    await cycleCountRecordsPageActions.navigateToOpenScheduledMaintenancePage(
        testData.inventoryMenuTitle,
        testData.cycle_count_records_title,
        testData.cycleCountRecordsPageURL
    );
});

When(/^the user creates a new Cycle Count Record with unique description and mandatory fields$/, async () => {
    await cycleCountRecordsPageActions.createCycleCountRecord(
        generatedCycleCountRecordDescription,
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.cycle_count_records_title
    );
});

When(/^the user creates a new Cycle Count Record with unique description in list view$/, async () => {
    await cycleCountRecordsPageActions.listViewCycleCount(
        generatedCycleCountRecordDescription
    );
});

When(/^the user fills in the mandatory fields$/, async () => {
    await cycleCountRecordsPageActions.fillInMandatoryFields(
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.cycle_count_records_title
    );
});

When(/^the user proceeds to the filter step by choosing a filter with Field, Operator, and Value$/, async () => {
    await cycleCountRecordsPageActions.selectCountType(testData.element_text.filtered_set_count_type_text);
    await cycleCountRecordsPageActions.applyCycFilter(
        testData.cyc_filter_data.field,
        testData.cyc_filter_data.operator,
        testData.cyc_filter_data.value,
        testData.cyc_filter_data.condition
    );
});

Then(/^the user should see the filtered population of items$/, async () => {
    await cycleCountRecordsPageActions.verifyFilteredPopulationLabel(testData.element_text.filtered_population_label);
});

Then(/^the user should be able to create a new Cycle Count Record with filtered population successfully$/, async () => {
    createdCycCount = await cycleCountRecordsPageActions.getCount(testData.element_text.filtered_set_count_type_text);
    await cycleCountRecordsPageActions.verifyCycleCountRecordCreated(generatedCycleCountRecordDescription);
});

Then(/^the user should be able to create a new Cycle Count Record with random population successfully$/, async () => {
    createdCycCount = await cycleCountRecordsPageActions.getCount(testData.element_text.random_sample_count_type_text);
    await cycleCountRecordsPageActions.verifyCycleCountRecordCreated(generatedCycleCountRecordDescription);
});

When(/^the user navigate to the Open Scheduled Maintenance page$/, async () => {
    createdCycId = await cycleCountRecordsPageActions.getCreatedCycId();
    await cycleCountRecordsPageActions.navigateToOpenScheduledMaintenancePage(
        testData.element_text.scheduledMaintenanceTitle,
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
});

When(/^the user set the today date in date range$/, async () => {
    await cycleCountRecordsPageActions.selectDateRange(testData.element_text.this_week, testData.element_text.openScheduledMaintenanceTitle);
});

When(/^the user search the created cycle count record$/, async () => {
    await cycleCountRecordsPageActions.searchCycleCountRecord(createdCycId, testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
});

Then(/^the user should see the created Cycle Count Record in the search results$/, async () => {
    await cycleCountRecordsPageActions.verifyCycleCountRecordInSearchResults(createdCycId);
});

When(/^the user select the searched record and convert to Work Order$/, async () => {
    await cycleCountRecordsPageActions.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
});

Then(/^the user should see the Work Order created from Cycle Count Record$/, async () => {
    await cycleCountRecordsPageActions.verifyInventorySelectedForCounting(testData.element_text.cycle_count_tab_text);
    await cycleCountRecordsPageActions.verifyInventoryCount(createdCycCount);
});

When(/^the user closes the converted Work Order record$/, async () => {
    await commonPageActions.clickTabByText(testData.element_text.financial_tab_text);
    await workOrderRecordPageActions.setFinancialFields(testData.costFields);

    await workOrderRecordPageActions.closeWorkOrder(
        testData.element_text.close_wko_text,
        testData.element_text.yes_button,
        testData.element_text.input_ok_button,
        getFutureDateFormatted(2)
    );
});

When(/^the user proceeds to the population step by choosing Constant population$/, async () => {
    await cycleCountRecordsPageActions.selectPopulation(
        testData.element_text.random_sample_count_type_text,
        testData.element_text.constant_population_count_type_text,
        testData.element_text.number_of_items
    );
});

Then(/^the user should see the constant population of items$/, async () => {
    await cycleCountRecordsPageActions.verifyPopulation(
        testData.element_text.random_sample_options,
        testData.element_text.how_many_items_to_count
    );
});

When(/^the user proceeds to the population step by choosing diminished population$/, async () => {
    await cycleCountRecordsPageActions.selectPopulation(
        testData.element_text.random_sample_count_type_text,
        testData.element_text.diminished_population_count_type_text,
        testData.element_text.number_of_items
    );
});

Then(/^the user should see the diminished population of items$/, async () => {
    await cycleCountRecordsPageActions.verifyPopulation(
        testData.element_text.random_sample_options,
        testData.element_text.how_many_items_to_count
    );
});

When(/^the user check the stock quantity of the linked inventory item$/, async () => {
    beforeCloseStockQty = await cycleCountRecordsPageActions.getInventoryStockQty(
        testData.element_text.stock_area_tab_text);
    await commonPageActions.clickLinkByText(testData.subMenuItemWorkTitle);
});

When(/^the user updates the "([^"]+)" stock quantity of the linked inventory item$/, async (populationType: string) => {
    await cycleCountRecordsPageActions.updateInventoryStockQty(
        populationType,
        testData.element_text.cycle_count_tab_text,
        beforeCloseStockQty
    );
});

Then(/^the user should verify the "([^"]+)" updated quantity in stock after Closing the record$/, async (populationType: string) => {
    await cycleCountRecordsPageActions.validateLinkedInventoryQty(
        populationType,
        testData.element_text.cycle_count_tab_text,
        testData.element_text.stock_area_tab_text,
        beforeCloseStockQty
    );
});

When(/^the user clicks on delete current Cycle Count Records$/, async () => {
    currentRecord = await cycDeleteRecordPageActions.getCurrentCycleCountIdText();
    await cycDeleteRecordPageActions.clickOnDeleteCurrentRecordButton(testData.cycle_count_records_title);
});

Then(/^the Cycle Count Record should be deleted successfully$/, async () => {
    await cycDeleteRecordPageActions.verifyCycleCountRecordDeleted(currentRecord);
});

Then(/^the user should not see the deleted Cycle Count Record in the search results$/, async () => {
    await cycDeleteRecordPageActions.searchDeletedCyc(currentRecord);
    await wkoDeletePageAction.verifyNoMatchesFoundMessage();
});

Then(/^the user waits for the cyc auto conversion to occur$/, async () => {
    await cycleCountRecordsPageActions.waitForCycAutoConversion();
});

When(/^the user enables the cyc automatic request conversion with on due date$/, async () => {
    await cycleCountRecordsPageActions.enableCycAutoRequestConversion();
});

Then(/^the user changes the automatic cyc request conversion flag$/, async () => {
    await mrAutoConvertPageActions.navigateToManagementWorkFlowPageFromOtherMenu(
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.scheduledMaintenanceOptions,
        testData.scheduledMaintenancePageURL
    );
    await cycleCountRecordsPageActions.changeCycAutoRequestConversion();
});
