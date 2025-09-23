import { Then, When } from "@cucumber/cucumber";
import testData from '../../../data/testData.json';
import mrtestData from '../../../data/maintenance.records.json';
import { requisitionRecordsPage } from "../../../pages/Inventory-pages/por-requisition-page/requisition.records.page";
import { scheduledMaintenanceRecordsPage } from "../../../pages/scheduled-maintenance-page/scheduled.maintenance.record.page";
import { workOrderPage } from "../../../pages/work-order-page/WorkOrderPage.page";
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { cycleCountRecordsPage } from "../../../pages/Inventory-pages/cycle-count-records-pages/cycle.count.records.page";
import { deleteSMRPage } from "../../../pages/scheduled-maintenance-page/delete.smr.page";
import { deleteWOPage } from "../../../pages/work-order-page/delete.wko.page";
import { generatedSMRAutoConversionDescription, generatedSMRFixedScheduleDescription, generatedSMRFloatingScheduleDescription, generatedSMRMeterBasedDescription } from "../../../helper/get.different.description";
import { commonPageActions } from "../../../pages/actions/common.page.actions";

let createdSmrId: string;
let currentRecord: string;
let smrType: string;

When(/^the user navigates to the Scheduled Maintenance Records page$/, async function () {
    await requisitionRecordsPage.navigateToRequisitionRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.scheduled_maintenance_title,
        testData.scheduled_maintenance_records_title,
        testData.scheduledMaintenanceRecordsPageURL
    );
});

When(/^the user creates a new SMR "(.*)" with a unique description and all mandatory fields$/, async function (description: string) {
    switch (description) {
        case "Auto Conversion":
            smrType = generatedSMRAutoConversionDescription;
            break;
        case "Fixed Schedule":
            smrType = generatedSMRFixedScheduleDescription;
            break;
        case "Floating Schedule":
            smrType = generatedSMRFloatingScheduleDescription;
            break;
        case "Meter Based":
            smrType = generatedSMRMeterBasedDescription;
            break;
        default:
            throw new Error(`Unknown description type: ${description}`);
    }
    await scheduledMaintenanceRecordsPage.createScheduledMaintenanceRecord(
        smrType,
        testData.element_text.scheduled_tab_text,
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.scheduled_maintenance_records_title
    );
});

Then(/^the newly created Scheduled Maintenance Record should be visible in the list$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyScheduledMaintenanceRecordVisible(
        testData.scheduled_maintenance_record_id_prefix,
        smrType,
        testData.scheduled_maintenance_record_id_prefix
    );
    createdSmrId = await cycleCountRecordsPage.getCreatedCycId();
});

When(/^the user links assets, personnel, and inventory to the Scheduled Maintenance Record$/, async function () {
    await commonPageActions.clickTabByText(testData.element_text.wo_info_tab_text);
    await workOrderPage.linkAssetToTask(
        testData.wo_info.assetAssignedToTask,
        testData.icons.asset_link_icon,
        testData.element_text.replace_button
    );

    await workOrderPage.linkPersonnelToAsset(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_link_icon,
        testData.element_text.link_button
    );

    await workOrderPage.linkInventoryToAsset(
        testData.wo_info.inventoryAssignedToAsset,
        testData.icons.inventory_link_icon,
        testData.element_text.link_button,
        testData.element_text.input_ok_button
    );

    await workOrderPage.setEmployeeActualHours(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_eye_icon,
        testData.element_text.timeSheetDetails_text,
        testData.icons.plusIcon_title,
        testData.element_text.hoursField_text,
        testData.element_text.hours,
        testData.icons.crossIcon_title
    );

    await commonPageActions.clickSaveButton();
});

When(/^the user sets a Floating Schedule and specifies the last done date$/, async function () {
    await scheduledMaintenanceRecordsPage.setFloatingSchedule(
        testData.element_text.scheduled_tab_text,
        testData.floating_type_id.floatOnly,
        getFutureDateFormatted(1)
    );
});

When(/^the user sets the recurrence pattern to "Daily" every "1" day$/, async function () {
    await scheduledMaintenanceRecordsPage.setRecurrencePattern(
        testData.element_text.scheduled_tab_text,
        testData.recurrence_pattern.daily,
        "1"
    );
    await commonPageActions.clickSaveButton();
});

Then(/^the Floating Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyScheduleTypeApplied(testData.floating_type.floating_schedule);
    await scheduledMaintenanceRecordsPage.verifyRecurrencePatternApplied(testData.recurrence_pattern.daily);
});

Then(/^the user converts the Scheduled Maintenance Record into a Work Order$/, async function () {
    await cycleCountRecordsPage.selectDateRange(testData.element_text.this_month, testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.searchCycleCountRecord(createdSmrId,
        testData.element_text.next_week,
        testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
});

Then(/^the Work Order should be created from the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyScheduledMaintenanceRecordVisible(
        testData.wo_info.workOrderId,
        smrType,
        testData.wo_info.workOrderId
    );
});

When(/^the user navigate to the Open Scheduled Maintenance page from SMR$/, async function () {
    await scheduledMaintenanceRecordsPage.navigateToOpenScheduledMaintenancePageFromSmrPage(
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
});

When(/^the user sets a Fixed Schedule and specifies the done date$/, async function () {
    await scheduledMaintenanceRecordsPage.setFixedSchedule(
        testData.element_text.scheduled_tab_text,
        getFutureDateFormatted(1)
    );
});

Then(/^the Fixed Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyScheduleTypeApplied(testData.floating_type.fixed_schedule);
    await scheduledMaintenanceRecordsPage.verifyRecurrencePatternApplied(testData.recurrence_pattern.daily);
});

Then(/^the user verifies the "([^"]+)"$/, async function (fieldLabel: string) {
    await scheduledMaintenanceRecordsPage.verifyScheduledTypeDateApplied(
        fieldLabel, testData.element_text.scheduled_tab_text,
    );
});

Then(/^the user verifies the next due date in the existing Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPage.verifySmrNextDueDate(testData.element_text.scheduled_tab_text);
});

When(/^the user sets a Meter Based Schedule and selects a valid asset$/, async function () {
    await scheduledMaintenanceRecordsPage.setMeterBasedSchedule(
        testData.element_text.scheduled_tab_text,
        testData.floating_type.meter_based,
        { ddType: testData.meter_based_dropdown_id.map((item: any) => item.ddType) }
    );
    await commonPageActions.clickSaveButton();
});

Then(/^the Meter Based Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyMeterBasedScheduleTypeApplied();
});

When(/^the user clicks on delete current Scheduled Maintenance Record$/, async function () {
    currentRecord = await deleteSMRPage.getCurrentSmrIdText();
    await deleteSMRPage.clickOnDeleteCurrentRecordButton(testData.scheduled_maintenance_records_title);
});

Then(/^the Scheduled Maintenance Record should be deleted successfully$/, async function () {
    await deleteSMRPage.verifySMRecordDeleted(currentRecord);
});

Then(/^the user should not see the deleted Scheduled Maintenance Record in the search results$/, async function () {
    await deleteSMRPage.searchDeletedSmr(currentRecord);
    await deleteWOPage.verifyNoMatchesFoundMessage();
});

When(/^the user fills Service Preventive Maintenance and Usage Information$/, async function () {
    await scheduledMaintenanceRecordsPage.fillServicePreventiveMaintenanceAndUsageInformation(
        testData.element_text.service_tab_text,
        testData.usage_info.anticipatedUseValue,
        testData.usage_info.frequencyIntervalValue
    );
});

When(/^the user links the inventory to the asset$/, async function () {
    await scheduledMaintenanceRecordsPage.linkInventoryToAsset(testData.element_text.service_tab_text);
});

Then(/^the newly created asset should be visible in the list$/, async function () {
    //await scheduledMaintenanceRecordsPage.verifyNewlyCreatedAssetVisible();
});
