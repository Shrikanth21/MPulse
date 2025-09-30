import { Then, When } from "@cucumber/cucumber";
import testData from '../../../data/testData.json';
import mrtestData from '../../../data/maintenance.records.json';
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { commonPageActions } from "../../../pages/actions/common.page.actions";
import { workOrderRecordPageActions } from "../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { wkoDeletePageAction } from "../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.delete.page.action";
import { requisitionRecordsPageActions } from "../../../pages/actions/Inventory.pages.action/por-requisition-page-action/requisition.records.page.action";
import { cycleCountRecordsPageActions } from "../../../pages/actions/Inventory.pages.action/cycle-count-records-pages-action/cycle.count.records.pages.action";
import { scheduledMaintenanceRecordsPageActions } from "../../../pages/actions/scheduled-maintenance-page-action/scheduled.maintenance.page.action";
import { smrDeletePageAction } from "../../../pages/actions/scheduled-maintenance-page-action/smr.delete.page.action";
import { generatedSMRAutoConversionDescription, generatedSMRFixedScheduleDescription, generatedSMRFloatingScheduleDescription, generatedSMRMeterBasedDescription } from "../../../helper/get.different.description";

let createdSmrId: string;
let currentRecord: string;
let smrType: string;
let smrNextDate: string;

When(/^the user navigates to the Scheduled Maintenance Records page$/, async function () {
    await requisitionRecordsPageActions.navigateToRequisitionRecordsPage(
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
    await scheduledMaintenanceRecordsPageActions.createScheduledMaintenanceRecord(
        smrType,
        testData.element_text.scheduled_tab_text,
        { ddType: testData.cycleCountDropdownSelections.map((item: any) => item.ddType) },
        testData.scheduled_maintenance_records_title
    );
});

Then(/^the newly created Scheduled Maintenance Record should be visible in the list$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyScheduledMaintenanceRecordVisible(
        testData.scheduled_maintenance_record_id_prefix,
        smrType,
        testData.scheduled_maintenance_record_id_prefix
    );
    createdSmrId = await cycleCountRecordsPageActions.getCreatedCycId();
});

When(/^the user links assets, personnel, and inventory to the Scheduled Maintenance Record$/, async function () {
    await commonPageActions.clickTabByText(testData.element_text.wo_info_tab_text);
    await workOrderRecordPageActions.linkAssetToTask(
        testData.wo_info.assetAssignedToTask,
        testData.icons.asset_link_icon,
        testData.element_text.replace_button
    );

    await workOrderRecordPageActions.linkPersonnelToAsset(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_link_icon,
        testData.element_text.link_button
    );

    await workOrderRecordPageActions.linkInventoryToAsset(
        testData.wo_info.inventoryAssignedToAsset,
        testData.icons.inventory_link_icon,
        testData.element_text.link_button,
        testData.element_text.input_ok_button
    );

    await workOrderRecordPageActions.setEmployeeActualHours(
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

When(/^the user links assets, personnel, and inventory to the meter based Scheduled Maintenance Record$/, async function () {
    await commonPageActions.clickTabByText(testData.element_text.wo_info_tab_text);
    await workOrderRecordPageActions.linkAssetToTask(
        testData.wo_info.assetAssignedToTask,
        testData.icons.asset_link_icon,
        testData.element_text.replace_button
    );

    await workOrderRecordPageActions.linkPersonnelToAsset(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_link_icon,
        testData.element_text.link_button
    );

    await workOrderRecordPageActions.linkInventoryToAsset(
        testData.wo_info.inventoryAssignedToAsset,
        testData.icons.inventory_link_icon,
        testData.element_text.link_button,
        testData.element_text.input_ok_button
    );

    await workOrderRecordPageActions.setEmployeeActualHours(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_eye_icon,
        testData.element_text.timeSheetDetails_text,
        testData.icons.plusIcon_title,
        testData.element_text.hoursField_text,
        testData.element_text.hours,
        testData.icons.crossIcon_title
    );

    await commonPageActions.clickSaveButton();

    await scheduledMaintenanceRecordsPageActions.clickOnAssetListLink();

    await scheduledMaintenanceRecordsPageActions.fillServicePreventiveMaintenanceAndUsageInformation(
        testData.element_text.service_tab_text,
        testData.usage_info.anticipatedUseValue,
        testData.usage_info.frequencyIntervalValue
    );

    await scheduledMaintenanceRecordsPageActions.linkInventoryToAsset(testData.element_text.service_tab_text);
});

When(/^the user sets a Floating Schedule and specifies the last done date$/, async function () {
    await scheduledMaintenanceRecordsPageActions.setFloatingSchedule(
        testData.element_text.scheduled_tab_text,
        testData.floating_type_id.floatOnly,
        getFutureDateFormatted(1)
    );
});

When(/^the user sets the recurrence pattern to "Daily" every "1" day$/, async function () {
    await scheduledMaintenanceRecordsPageActions.setRecurrencePattern(
        testData.element_text.scheduled_tab_text,
        testData.recurrence_pattern.daily,
        "1"
    );
    await commonPageActions.clickSaveButton();
});

Then(/^the Floating Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyScheduleTypeApplied(testData.floating_type.floating_schedule);
    await scheduledMaintenanceRecordsPageActions.verifyRecurrencePatternApplied(testData.recurrence_pattern.daily);
});

Then(/^the user converts the Scheduled Maintenance Record into a Work Order$/, async function () {
    await cycleCountRecordsPageActions.searchCycleCountRecord(createdSmrId,
        testData.element_text.this_month,
        testData.element_text.openScheduledMaintenanceTitle);
    await cycleCountRecordsPageActions.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
});

Then(/^the Work Order should be created from the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyScheduledMaintenanceRecordVisible(
        testData.wo_info.workOrderId,
        smrType,
        testData.wo_info.workOrderId
    );
});

When(/^the user navigate to the Open Scheduled Maintenance page from SMR$/, async function () {
    await scheduledMaintenanceRecordsPageActions.navigateToOpenScheduledMaintenancePageFromSmrPage(
        testData.element_text.openScheduledMaintenanceTitle,
        testData.openScheduledMaintenancePageURL
    );
});

When(/^the user sets a Fixed Schedule and specifies the done date$/, async function () {
    await scheduledMaintenanceRecordsPageActions.setFixedSchedule(
        testData.element_text.scheduled_tab_text,
        getFutureDateFormatted(1)
    );
});

Then(/^the Fixed Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyScheduleTypeApplied(testData.floating_type.fixed_schedule);
    await scheduledMaintenanceRecordsPageActions.verifyRecurrencePatternApplied(testData.recurrence_pattern.daily);
});

Then(/^the user verifies the "([^"]+)"$/, async function (fieldLabel: string) {
    await scheduledMaintenanceRecordsPageActions.verifyScheduledTypeDateApplied(
        fieldLabel, testData.element_text.scheduled_tab_text,
    );
});

Then(/^the user verifies the next due date in the existing Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifySmrNextDueDate(testData.element_text.scheduled_tab_text);
});

When(/^the user sets a Meter Based Schedule and selects a valid asset$/, async function () {
    await scheduledMaintenanceRecordsPageActions.setMeterBasedSchedule(
        testData.element_text.scheduled_tab_text,
        testData.floating_type.meter_based,
        { ddType: testData.meter_based_dropdown_id.map((item: any) => item.ddType) }
    );
});

When(/^the user sets Units between Maintenance and next Schedule date$/, async function () {
    smrNextDate = await scheduledMaintenanceRecordsPageActions.getSMRNextDateValue();
    await scheduledMaintenanceRecordsPageActions.setUnitsBetweenMaintenance(
        testData.element_text.units_between_maintenance
    );
    await commonPageActions.clickSaveButton();
});

Then(/^the user should see that the Next Date is calculated based on the meter reading and units between maintenance$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifySMRNextDateCalculated(
        smrNextDate,
        testData.usage_info.anticipatedUseValue,
        testData.element_text.units_between_maintenance
    );
});

Then(/^the Meter Based Schedule should be successfully applied to the Scheduled Maintenance Record$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyMeterBasedScheduleTypeApplied();
});

When(/^the user clicks on delete current Scheduled Maintenance Record$/, async function () {
    currentRecord = await smrDeletePageAction.getCurrentSmrIdText();
    await smrDeletePageAction.clickOnDeleteCurrentRecordButton(testData.scheduled_maintenance_records_title);
});

Then(/^the Scheduled Maintenance Record should be deleted successfully$/, async function () {
    await smrDeletePageAction.verifySMRecordDeleted(currentRecord);
});

Then(/^the user should not see the deleted Scheduled Maintenance Record in the search results$/, async function () {
    await smrDeletePageAction.searchDeletedSmr(currentRecord);
    await wkoDeletePageAction.verifyNoMatchesFoundMessage();
});
