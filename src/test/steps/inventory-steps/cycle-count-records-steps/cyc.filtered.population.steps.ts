import { Then, When } from "@cucumber/cucumber";
import { requisitionRecordsPage } from "../../../../pages/Inventory-pages/por-requisition-page/requisition.records.page";
import testData from '../../../../data/testData.json';
import mrtestData from '../../../../data/maintenance.records.json';
import { generatedCycleCountRecordDescription } from "../../../../helper/get.different.description";
import { cycleCountRecordsPage } from "../../../../pages/Inventory-pages/cycle-count-records-pages/cycle.count.records.page";
import { workOrderPage } from "../../../../pages/work-order-page/WorkOrderPage.page";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";
import { commonActionPage } from "../../../../pages/common.action.page";
import { deleteCycleCountRecordPage } from "../../../../pages/Inventory-pages/cycle-count-records-pages/delete.cyc.record.page";
import { deleteWOPage } from "../../../../pages/work-order-page/delete.wko.page";

let createdCycId: string;
let createdCycCount: string;
let beforeCloseStockQty: string;
let currentRecord: string;

When(/^the user navigates to the Cycle Count Records page$/, async () => {
    await requisitionRecordsPage.navigateToRequisitionRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.inventoryMenuTitle,
        testData.cycle_count_records_title,
        testData.cycleCountRecordsPageURL
    );
});

When(/^the user creates a new Cycle Count Record with unique description and mandatory fields$/, async () => {
    await cycleCountRecordsPage.createCycleCountRecord(
        generatedCycleCountRecordDescription,
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.cycle_count_records_title
    );
});

When(/^the user creates a new Cycle Count Record with unique description in list view$/, async () => {
    await cycleCountRecordsPage.listViewCycleCount(
        generatedCycleCountRecordDescription
    );
});

When(/^the user fills in the mandatory fields$/, async () => {
    await cycleCountRecordsPage.fillInMandatoryFields(
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.cycle_count_records_title
    );
});

When(/^the user proceeds to the filter step by choosing a filter with Field, Operator, and Value$/, async () => {
    await cycleCountRecordsPage.selectCountType(testData.element_text.filtered_set_count_type_text);
    await cycleCountRecordsPage.applyCycFilter(
        testData.cyc_filter_data.field,
        testData.cyc_filter_data.operator,
        testData.cyc_filter_data.value,
        testData.cyc_filter_data.condition
    );
});

Then(/^the user should see the filtered population of items$/, async () => {
    await cycleCountRecordsPage.verifyFilteredPopulationLabel(testData.element_text.filtered_population_label);
});

Then(/^the user should be able to create a new Cycle Count Record with filtered population successfully$/, async () => {
    createdCycCount = await cycleCountRecordsPage.getCount(testData.element_text.filtered_set_count_type_text);
    await cycleCountRecordsPage.verifyCycleCountRecordCreated(generatedCycleCountRecordDescription);
});

Then(/^the user should be able to create a new Cycle Count Record with random population successfully$/, async () => {
    createdCycCount = await cycleCountRecordsPage.getCount(testData.element_text.random_sample_count_type_text);
    await cycleCountRecordsPage.verifyCycleCountRecordCreated(generatedCycleCountRecordDescription);
});

When(/^the user navigate to the Open Scheduled Maintenance page$/, async () => {
    createdCycId = await cycleCountRecordsPage.getCreatedCycId();
    await cycleCountRecordsPage.navigateToOpenScheduledMaintenancePage(
        testData.element_text.scheduledMaintenanceTitle,
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
});

When(/^the user set the today date in date range$/, async () => {
    await cycleCountRecordsPage.selectDateRange(testData.element_text.today_date, testData.element_text.openScheduledMaintenanceTitle);
});

When(/^the user search the created cycle count record$/, async () => {
    await cycleCountRecordsPage.searchCycleCountRecord(createdCycId);
});

Then(/^the user should see the created Cycle Count Record in the search results$/, async () => {
    await cycleCountRecordsPage.verifyCycleCountRecordInSearchResults(createdCycId);
});

When(/^the user select the searched record and convert to Work Order$/, async () => {
    await cycleCountRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
});

Then(/^the user should see the Work Order created from Cycle Count Record$/, async () => {
    await cycleCountRecordsPage.verifyInventorySelectedForCounting(testData.element_text.cycle_count_tab_text);
    await cycleCountRecordsPage.verifyInventoryCount(createdCycCount);
});

When(/^the user closes the converted Work Order record$/, async () => {
    await commonActionPage.clickTabByText(testData.element_text.financial_tab_text);
    await workOrderPage.setFinancialFields(testData.costFields);

    await workOrderPage.closeWorkOrder(
        testData.element_text.close_wko_text,
        testData.element_text.yes_button,
        testData.element_text.input_ok_button,
        getFutureDateFormatted(2)
    );
});

When(/^the user proceeds to the population step by choosing Constant population$/, async () => {
    await cycleCountRecordsPage.selectPopulation(
        testData.element_text.random_sample_count_type_text,
        testData.element_text.constant_population_count_type_text,
        testData.element_text.number_of_items
    );
});

Then(/^the user should see the constant population of items$/, async () => {
    await cycleCountRecordsPage.verifyPopulation(
        testData.element_text.random_sample_options,
        testData.element_text.how_many_items_to_count
    );
});

When(/^the user proceeds to the population step by choosing diminished population$/, async () => {
    await cycleCountRecordsPage.selectPopulation(
        testData.element_text.random_sample_count_type_text,
        testData.element_text.diminished_population_count_type_text,
        testData.element_text.number_of_items
    );
});

Then(/^the user should see the diminished population of items$/, async () => {
    await cycleCountRecordsPage.verifyPopulation(
        testData.element_text.random_sample_options,
        testData.element_text.how_many_items_to_count
    );
});

When(/^the user check the stock quantity of the linked inventory item$/, async () => {
    beforeCloseStockQty = await cycleCountRecordsPage.getInventoryStockQty(
        testData.element_text.stock_area_tab_text);
    await commonActionPage.clickByLinkText(testData.subMenuItemWorkTitle);
});

When(/^the user updates the "([^"]+)" stock quantity of the linked inventory item$/, async (populationType: string) => {
    await cycleCountRecordsPage.updateInventoryStockQty(
        populationType,
        testData.element_text.cycle_count_tab_text,
        beforeCloseStockQty
    );
});

Then(/^the user should verify the "([^"]+)" updated quantity in stock after Closing the record$/, async (populationType: string) => {
    await cycleCountRecordsPage.validateLinkedInventoryQty(
        populationType,
        testData.element_text.cycle_count_tab_text,
        testData.element_text.stock_area_tab_text,
        beforeCloseStockQty
    );
});

When(/^the user clicks on delete current Cycle Count Records$/, async () => {
    currentRecord = await deleteCycleCountRecordPage.getCurrentCycleCountIdText();
    await deleteCycleCountRecordPage.clickOnDeleteCurrentRecordButton(testData.cycle_count_records_title);
});

Then(/^the Cycle Count Record should be deleted successfully$/, async () => {
    await deleteCycleCountRecordPage.verifyCycleCountRecordDeleted(currentRecord);
});

Then(/^the user should not see the deleted Cycle Count Record in the search results$/, async () => {
    await deleteCycleCountRecordPage.searchDeleTedCyc(currentRecord);
    await deleteWOPage.verifyNoMatchesFoundMessage();
});
