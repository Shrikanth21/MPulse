import { Then, When } from "@cucumber/cucumber"
import { generatedBuildingTaskDescription, generatedCycleCountRecordDescription, generatedDescription, generatedMaintenanceRecordDescription, generatedScheduledMaintenanceRecordDescription } from "../../../helper/get.different.description";
import path from "path";
import testData from '../../../data/testData.json';
import mrtestData from '../../../data/maintenance.records.json';
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { commonPageActions } from "../../../pages/actions/common.page.actions";
import { equipmentRecordsAction } from "../../../pages/actions/capital-assets-action-page/equipment.records.actions";
import { globalSearchPageActions } from "../../../pages/actions/global-search-page-action/global.search.page.action";
import { wkoSearchUpdatePageActions } from "../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.search.update.page.action";
import { mrRecordsPageAction } from "../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.records.page.action";
import { requisitionRecordsPageActions } from "../../../pages/actions/Inventory.pages.action/por-requisition-page-action/requisition.records.page.action";
import { cycleCountRecordsPageActions } from "../../../pages/actions/Inventory.pages.action/cycle-count-records-pages-action/cycle.count.records.pages.action";
import { scheduledMaintenanceRecordsPageActions } from "../../../pages/actions/scheduled-maintenance-page-action/scheduled.maintenance.page.action";
import { smrAutoConvertAction } from "../../../pages/actions/scheduled-maintenance-page-action/smr.auto.convert.action";
import { smrDeletePageAction } from "../../../pages/actions/scheduled-maintenance-page-action/smr.delete.page.action";

const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');
let recordId: string;
let convertedWkoId: string;

When(/^the user creates a new Equipment Record with a unique description and uploads media$/, async () => {
    await equipmentRecordsAction.createTaskWithMediaUpload(
        testData.icons.plusIcon,
        generatedBuildingTaskDescription,
        testData.element_text.media_text,
        testData.icons.media_link_icon,
        filePath
    );
});

When(/^the user gets the created record id$/, async () => {
    recordId = await wkoSearchUpdatePageActions.getWorkOrderId();
});

Then(/^the user searches the Equipment Records by equipment id and its description$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + generatedBuildingTaskDescription);
});

Then(/^the user should see the Equipment Record in the search results$/, async () => {
    await globalSearchPageActions.verifySearchResult(
        testData.customization.recordAreaDropdownValues.equipment_Records,
        recordId,
        generatedBuildingTaskDescription);
});

When(/^the user creates a new Maintenance Request with a only description$/, async () => {
    await mrRecordsPageAction.createMaintenanceRecord(generatedMaintenanceRecordDescription);
    await commonPageActions.clickSaveButton();
    await commonPageActions.clickSpanByText(testData.element_text.ok_button_text);
});

When(/^the user convert a Maintenance Request into new Work order$/, async () => {
    await mrRecordsPageAction.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text
    );
});

When(/^the user searches the Maintenance Request Records by request id description and status$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.convert_status);
});

Then(/^the user should see the Maintenance Request in the search results$/, async () => {
    await globalSearchPageActions.verifySearchResultWithStatus(
        mrtestData.maintenanceRequestSubMenuItemTitle,
        recordId,
        generatedMaintenanceRecordDescription,
        testData.element_text.convert_status,
        recordId
    );
});

When(/^the user searches the Purchase Order Records by order id and status$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + " " + testData.element_text.closed_status_text);
});

When(/^the user closes the created Purchase Order Requisition record directly$/, async () => {
    await requisitionRecordsPageActions.closeRequisitionRecordWithDate(
        testData.element_text.supplier_tab_text,
        testData.element_text.close_requisition_text,
        testData.element_text.yes_button,
        getFutureDateFormatted(1),
        testData.element_text.input_ok_button
    );
});

Then(/^the user should see the Purchase Order in the search results$/, async () => {
    await globalSearchPageActions.verifySearchPORResultWithStatus(
        testData.requisitionMenuTitle,
        recordId
    );
});

When(/^the user creates a new Work Order with a unique description$/, async () => {
    await mrRecordsPageAction.createMaintenanceRecord(generatedDescription);
    await commonPageActions.clickSaveButton();
});

When(/^the user searches the closed Work Order Records by order id and status$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + " " + testData.element_text.closed_status_text);
});

Then(/^the user should see the closed Work Order in the search results$/, async () => {
    await globalSearchPageActions.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription,
        testData.element_text.closed_status_text,
        recordId
    );
});

When(/^the user searches the Maintenance Request Records by request id description and Cancel status$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.cancel_status);
});

Then(/^the user should see the Maintenance Request in the search Cancel results$/, async () => {
    await globalSearchPageActions.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription,
        testData.element_text.cancel_status,
        recordId
    );
});

When(/^the user searches the Maintenance Request Records by request id description and Waiting for Reply status$/, async () => {
    await globalSearchPageActions.searchRecord(recordId + " " + generatedMaintenanceRecordDescription + " " + testData.element_text.waiting_for_reply_status);
});

Then(/^the user should see the Maintenance Request in the search Waiting for Reply results$/, async () => {
    await globalSearchPageActions.verifySearchResultWithStatus(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedMaintenanceRecordDescription,
        testData.element_text.waiting_for_reply_status,
        recordId
    );
});

When(/^the user creates a new Scheduled Maintenance Record with a only description$/, async () => {
    await mrRecordsPageAction.createMaintenanceRecord(generatedScheduledMaintenanceRecordDescription);
    await commonPageActions.clickSaveButton();
});

When(/^the user gets the created smr record id$/, async () => {
    recordId = await smrDeletePageAction.getCurrentSmrIdText();
});

When(/^the user converts the Scheduled Maintenance into a Work Order$/, async () => {
    await scheduledMaintenanceRecordsPageActions.navigateToOpenScheduledMaintenancePageFromSmrPage(
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
    await cycleCountRecordsPageActions.selectDateRange(testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPageActions.searchCycleCountRecord(recordId, testData.element_text.next_week, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPageActions.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text,
    );
});

When(/^User navigates back to the Scheduled Maintenance Records page$/, async () => {
    await commonPageActions.clickLinkByText(testData.scheduled_maintenance_records_title);
});

Then(/^the user navigates to more button on scheduled maintenance page$/, async () => {
    await smrAutoConvertAction.clickDropdownMenu();
});

Then(/^the user see the converted work order id on the scheduled maintenance page$/, async () => {
    convertedWkoId = await smrAutoConvertAction.getConvertedWorkOrderID();
    await smrAutoConvertAction.verifyConvertedWorkOrder();
    await commonPageActions.clickCloseButton();
});

When(/^the user searches the Scheduled Maintenance Records by scheduled maintenance id and its description$/, async () => {
    await globalSearchPageActions.searchRecord(convertedWkoId + " " + generatedScheduledMaintenanceRecordDescription);
});

When(/^the user click on the searched converted work order record$/, async () => {
    await commonPageActions.clickLinkByText(convertedWkoId);
});

Then(/^the user should see the Scheduled Maintenance in the search results$/, async () => {
    await globalSearchPageActions.verifySearchResult(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedDescription
    );
});

When(/^the user creates a new Cycle Count with a only description$/, async () => {
    await mrRecordsPageAction.createMaintenanceRecord(generatedCycleCountRecordDescription);
    await commonPageActions.clickSaveButton();
});

When(/^the user gets the created cyc record id$/, async () => {
    recordId = await smrDeletePageAction.getCurrentSmrIdText();
});

When(/^the user converts the Cycle Count into a Work Order$/, async () => {
    await cycleCountRecordsPageActions.navigateToOpenScheduledMaintenancePage(
        testData.element_text.scheduledMaintenanceTitle,
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
    await cycleCountRecordsPageActions.selectDateRange(testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPageActions.searchCycleCountRecord(recordId, testData.element_text.next_week, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPageActions.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        testData.element_text.no_button_text,
    );
});

When(/^User navigates back to the Cycle Count Records page$/, async () => {
    await commonPageActions.clickLinkByText(testData.cycle_count_records_title);
});

Then(/^the user navigates to more button on cycle count page$/, async () => {
    await smrAutoConvertAction.clickDropdownMenu();
});

Then(/^the user see the converted work order id on the cycle count page$/, async () => {
    convertedWkoId = await smrAutoConvertAction.getConvertedWorkOrderID();
    await smrAutoConvertAction.verifyConvertedWorkOrder();
    await commonPageActions.clickCloseButton();
});

When(/^the user searches the Cycle Count Records by cycle count id and its description$/, async () => {
    await globalSearchPageActions.searchRecord(convertedWkoId + " " + generatedCycleCountRecordDescription);
});

Then(/^the user should see the Cycle Count in the search results$/, async () => {
    await globalSearchPageActions.verifySearchResult(
        testData.subMenuItemWorkTitle,
        recordId,
        generatedCycleCountRecordDescription
    );
});
