import { Then, When } from "@cucumber/cucumber"
import { generatedBuildingTaskDescription, generatedCycleCountRecordDescription, generatedDescription, generatedMaintenanceRecordDescription, generatedScheduledMaintenanceRecordDescription } from "../../../helper/get.different.description";
import { buildingRecordsPage } from "../../../pages/capital-assets-page/Building.records.page";
import path from "path";
import testData from '../../../data/testData.json';
import mrtestData from '../../../data/maintenance.records.json';
import { searchUpdateWorkOrderPage } from "../../../pages/work-order-page/search.update.wko.page";
import { globalSearchPage } from "../../../pages/global-search-page/global.search.page";
import { commonActionPage } from "../../../pages/common.action.page";
import { maintenanceRequestRecordsPage } from "../../../pages/work-order-page/maintenance-request-records-pages/maintenanceRequestRecords.page";
import { requisitionRecordsPage } from "../../../pages/Inventory-pages/por-requisition-page/requisition.records.page";
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { deleteSMRPage } from "../../../pages/scheduled-maintenance-page/delete.smr.page";
import { scheduledMaintenanceRecordsPage } from "../../../pages/scheduled-maintenance-page/scheduled.maintenance.record.page";
import { cycleCountRecordsPage } from "../../../pages/Inventory-pages/cycle-count-records-pages/cycle.count.records.page";
import { smrAutoConvert } from "../../../pages/scheduled-maintenance-page/smr.auto.convert";

const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');
let recordId: string;

When(/^the user creates a new Equipment Record with a unique description and uploads media$/, async () => {
    await buildingRecordsPage.createTaskWithMediaUpload(
        testData.icons.plusIcon,
        generatedBuildingTaskDescription,
        testData.element_text.media_text,
        testData.icons.media_link_icon,
        filePath
    );
});

When(/^the user gets the created record id$/, async () => {
    recordId = await searchUpdateWorkOrderPage.getWorkOrderId();
});

Then(/^the user searches the Equipment Records by equipment id and its description$/, async () => {
    await globalSearchPage.searchRecord(recordId + generatedBuildingTaskDescription);
});

Then(/^the user should see the Equipment Record in the search results$/, async () => {
    await globalSearchPage.verifySearchResult(
        testData.customization.recordAreaDropdownValues.equipment_Records,
        recordId,
        generatedBuildingTaskDescription);
});

When(/^the user creates a new Maintenance Request with a only description$/, async () => {
    await maintenanceRequestRecordsPage.createMaintenanceRecord(generatedMaintenanceRecordDescription);
    await commonActionPage.clickSaveButton();
    await commonActionPage.clickElementByText(testData.element_text.ok_button_text);
});

When(/^the user convert a Maintenance Request into new Work order$/, async () => {
    await maintenanceRequestRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text
    );
});

When(/^the user searches the Maintenance Request Records by request id description and status$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.convert_status);
});

Then(/^the user should see the Maintenance Request in the search results$/, async () => {
    await globalSearchPage.verifySearchResultWithStatus(
        mrtestData.maintenanceRequestSubMenuItemTitle,
        recordId,
        generatedMaintenanceRecordDescription,
        testData.element_text.convert_status,
        recordId
    );
});

When(/^the user searches the Purchase Order Records by order id and status$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + testData.element_text.closed_status_text);
});

When(/^the user closes the created Purchase Order Requisition record directly$/, async () => {
    await requisitionRecordsPage.closeRequisitionRecordWithDate(
        testData.element_text.supplier_tab_text,
        testData.element_text.close_requisition_text,
        testData.element_text.yes_button,
        getFutureDateFormatted(1),
        testData.element_text.input_ok_button
    );
});

Then(/^the user should see the Purchase Order in the search results$/, async () => {
    await globalSearchPage.verifySearchPORResultWithStatus(
        testData.requisitionMenuTitle,
        recordId
    );
});

When(/^the user creates a new Work Order with a unique description$/, async () => {
    await maintenanceRequestRecordsPage.createMaintenanceRecord(generatedDescription);
    await commonActionPage.clickSaveButton();
});

When(/^the user searches the closed Work Order Records by order id and status$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + testData.element_text.closed_status_text);
});

Then(/^the user should see the closed Work Order in the search results$/, async () => {
    await globalSearchPage.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription,
        testData.element_text.closed_status_text,
        recordId
    );
});

When(/^the user searches the Maintenance Request Records by request id description and Cancel status$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.cancel_status);
});

Then(/^the user should see the Maintenance Request in the search Cancel results$/, async () => {
    await globalSearchPage.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription,
        testData.element_text.cancel_status,
        recordId
    );
});

When(/^the user searches the Maintenance Request Records by request id description and Waiting for Reply status$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.waiting_for_reply_status);
});

Then(/^the user should see the Maintenance Request in the search Waiting for Reply results$/, async () => {
    await globalSearchPage.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedMaintenanceRecordDescription,
        testData.element_text.waiting_for_reply_status,
        recordId
    );
});

When(/^the user creates a new Scheduled Maintenance Record with a only description$/, async () => {
    await maintenanceRequestRecordsPage.createMaintenanceRecord(generatedScheduledMaintenanceRecordDescription);
    await commonActionPage.clickSaveButton();
});

When(/^the user gets the created smr record id$/, async () => {
    recordId = await deleteSMRPage.getCurrentSmrIdText();
});

When(/^the user converts the Scheduled Maintenance into a Work Order$/, async () => {
    await scheduledMaintenanceRecordsPage.navigateToOpenScheduledMaintenancePageFromSmrPage(
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
    await cycleCountRecordsPage.selectDateRange(testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.searchCycleCountRecord(recordId, testData.element_text.next_week, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text,
    );
});

When(/^User navigates back to the Scheduled Maintenance Records page$/, async () => {
    await commonActionPage.clickByLinkText(testData.scheduled_maintenance_records_title);
});

Then(/^the user navigates to more button on scheduled maintenance page$/, async () => {
    await smrAutoConvert.clickDropdownMenu();
});

Then(/^the user see the converted work order id on the scheduled maintenance page$/, async () => {
    await smrAutoConvert.verifyConvertedWorkOrder();
    await commonActionPage.clickCloseButton();
});

When(/^the user searches the Scheduled Maintenance Records by scheduled maintenance id and its description$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + generatedScheduledMaintenanceRecordDescription);
});

Then(/^the user should see the Scheduled Maintenance in the search results$/, async () => {
    await globalSearchPage.verifySearchResult(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription
    );
});

When(/^the user creates a new Cycle Count with a only description$/, async () => {
    await maintenanceRequestRecordsPage.createMaintenanceRecord(generatedCycleCountRecordDescription);
    await commonActionPage.clickSaveButton();
});

When(/^the user gets the created cyc record id$/, async () => {
    recordId = await deleteSMRPage.getCurrentSmrIdText();
});

When(/^the user converts the Cycle Count into a Work Order$/, async () => {
    await cycleCountRecordsPage.navigateToOpenScheduledMaintenancePage(
        testData.element_text.scheduledMaintenanceTitle,
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
    await cycleCountRecordsPage.selectDateRange(testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.searchCycleCountRecord(recordId, testData.element_text.next_week, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text,
    );
});

When(/^User navigates back to the Cycle Count Records page$/, async () => {
    await commonActionPage.clickByLinkText(testData.cycle_count_records_title);
});

Then(/^the user navigates to more button on cycle count page$/, async () => {
    await smrAutoConvert.clickDropdownMenu();
});

Then(/^the user see the converted work order id on the cycle count page$/, async () => {
    await smrAutoConvert.verifyConvertedWorkOrder();
    await commonActionPage.clickCloseButton();
});

When(/^the user searches the Cycle Count Records by cycle count id and its description$/, async () => {
    await globalSearchPage.searchRecord(recordId + " " + generatedCycleCountRecordDescription);
});

Then(/^the user should see the Cycle Count in the search results$/, async () => {
    await globalSearchPage.verifySearchResult(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedCycleCountRecordDescription
    );
});
