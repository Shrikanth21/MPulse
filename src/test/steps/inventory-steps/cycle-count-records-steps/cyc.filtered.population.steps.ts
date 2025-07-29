import { Then, When } from "@cucumber/cucumber";
import { requisitionRecordsPage } from "../../../../pages/Inventory-pages/por-requisition-page/requisition.records.page";
import testData from '../../../../data/testData.json';
import mrtestData from '../../../../data/maintenance.records.json';
import { generatedCycleCountRecordDescription } from "../../../../helper/get.different.description";
import { cycleCountRecordsPage } from "../../../../pages/Inventory-pages/cycle-count-records-pages/cycle.count.records.page";
import { maintenanceRequestRecordsPage } from "../../../../pages/work-order-page/maintenance-request-records-pages/maintenanceRequestRecords.page";
import { workOrderPage } from "../../../../pages/work-order-page/WorkOrderPage.page";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";
import { commonActionPage } from "../../../../pages/common.action.page";

let createdCycId: string;
let createdCycCount: string;

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
        testData.element_text.count_type_text,
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) }
    );
});

When(/^the user proceeds to the filter step by choosing a filter with Field, Operator, and Value$/, async () => {
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

Then(/^the user should be able to create a new Cycle Count Record successfully$/, async () => {
    createdCycCount = await cycleCountRecordsPage.getCount();
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