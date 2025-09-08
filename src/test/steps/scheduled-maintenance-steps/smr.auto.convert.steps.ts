import { Then, When } from "@cucumber/cucumber";
import { smrAutoConvert } from "../../../pages/scheduled-maintenance-page/smr.auto.convert";
import { labelChangePage } from "../../../pages/work-order-page/label.change.page";
import testData from "../../../data/testData.json";
import { scheduledMaintenanceRecordsPage } from "../../../pages/scheduled-maintenance-page/scheduled.maintenance.record.page";
import { getFutureDateFormatted } from "../../../helper/date/get.future.date";
import { generatedSMRAutoConversionDescription } from "../../../helper/get.different.description";
import { mrAutoConvertPage } from "../../../pages/work-order-page/maintenance-request-records-pages/mr.auto.convert.page";

When(/^the user navigates to the workflow page and selects Scheduled Maintenance options$/, async function () {
    await labelChangePage.navigateToManagementToolCustomizationPage(
        testData.element_text.got_it_btn,
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.scheduledMaintenanceOptions,
        testData.scheduledMaintenancePageURL
    )
});

When(/^the user enables the checkbox for automatic request conversion with on due date$/, async function () {
    await smrAutoConvert.enableSmrAutoConvert();
});

When(/^the user navigates to the Scheduled Maintenance Records page from the workflow page$/, async function () {
    await smrAutoConvert.navigateToPageFromOtherMenu(
        testData.scheduled_maintenance_title,
        testData.scheduled_maintenance_records_title,
        testData.scheduledMaintenanceRecordsPageURL
    );
});

When(/^the user sets a Fixed Schedule and specifies an earlier done date$/, async function () {
    await scheduledMaintenanceRecordsPage.setFixedSchedule(
        testData.element_text.scheduled_tab_text,
        getFutureDateFormatted(-1)
    );
});

Then(/^the user waits for the auto conversion to occur$/, async function () {
    await smrAutoConvert.waitForAutoConversion();
});

When(/^the user navigates to the Open Work Orders popup$/, async function () {
    await smrAutoConvert.clickDropdownMenu();
});

Then(/^the user should see the converted Work Order$/, async function () {
    await smrAutoConvert.verifyConvertedWorkOrder();
});

When(/^the user clicks on the converted work order records$/, async function () {
    await smrAutoConvert.clickOnConvertedWorkOrder();
});

Then(/^the user navigates to the Work Order record page$/, async function () {
    await scheduledMaintenanceRecordsPage.verifyScheduledMaintenanceRecordVisible(
        testData.wo_info.workOrderId,
        generatedSMRAutoConversionDescription,
        testData.wo_info.workOrderId
    );
});

Then(/^the user changes the automatic request conversion flag$/, async function () {
    await mrAutoConvertPage.navigateToManagementWorkFlowPageFromOtherMenu(
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.scheduledMaintenanceOptions,
        testData.scheduledMaintenancePageURL
    );
    await smrAutoConvert.revertAutoConvertSetting();
});
