import { Then, When } from "@cucumber/cucumber";
import testData from "../../../data/testData.json";
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { generatedSMRAutoConversionDescription } from "../../../helper/get.different.description";
import { wkoLabelChangePageActions } from "../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.label.change.page.action";
import { mrAutoConvertPageActions } from "../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.auto.convert.page.action";
import { scheduledMaintenanceRecordsPageActions } from "../../../pages/actions/scheduled-maintenance-page-action/scheduled.maintenance.page.action";
import { smrAutoConvertAction } from "../../../pages/actions/scheduled-maintenance-page-action/smr.auto.convert.action";

When(/^the user navigates to the workflow page and selects Scheduled Maintenance options$/, async function () {
    await wkoLabelChangePageActions.navigateToManagementToolCustomizationPage(
        testData.element_text.got_it_btn,
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.scheduledMaintenanceOptions,
        testData.scheduledMaintenancePageURL
    )
});

When(/^the user enables the checkbox for automatic request conversion with on due date$/, async function () {
    await smrAutoConvertAction.enableSmrAutoConvert();
});

When(/^the user navigates to the Scheduled Maintenance Records page from the workflow page$/, async function () {
    await smrAutoConvertAction.navigateToPageFromOtherMenu(
        testData.scheduled_maintenance_title,
        testData.scheduled_maintenance_records_title,
        testData.scheduledMaintenanceRecordsPageURL
    );
});

When(/^the user sets a Fixed Schedule and specifies an earlier done date$/, async function () {
    await scheduledMaintenanceRecordsPageActions.setFixedSchedule(
        testData.element_text.scheduled_tab_text,
        getFutureDateFormatted(-1)
    );
});

Then(/^the user waits for the auto conversion to occur$/, async function () {
    await smrAutoConvertAction.waitForAutoConversion();
});

When(/^the user navigates to the Open Work Orders popup$/, async function () {
    await smrAutoConvertAction.clickDropdownMenu();
});

Then(/^the user should see the converted Work Order$/, async function () {
    await smrAutoConvertAction.verifyConvertedWorkOrder();
});

When(/^the user clicks on the converted work order records$/, async function () {
    await smrAutoConvertAction.clickOnConvertedWorkOrder();
});

Then(/^the user navigates to the Work Order record page$/, async function () {
    await scheduledMaintenanceRecordsPageActions.verifyScheduledMaintenanceRecordVisible(
        testData.wo_info.workOrderId,
        generatedSMRAutoConversionDescription,
        testData.wo_info.workOrderId
    );
});

Then(/^the user changes the automatic request conversion flag$/, async function () {
    await mrAutoConvertPageActions.navigateToManagementWorkFlowPageFromOtherMenu(
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.scheduledMaintenanceOptions,
        testData.scheduledMaintenancePageURL
    );
    await smrAutoConvertAction.revertAutoConvertSetting();
});
