import { Then, When } from "@cucumber/cucumber"
import testData from "../../../../data/testData.json";
import { reportInformationMenuPageActions } from "../../../../pages/actions/reports-pages-action/information-menu-page-action/report.information.menu.page,action";
import { reportPrintPageActions } from "../../../../pages/actions/reports-pages-action/print-information-menu-page-action/report.print.page.action";

let currentRecordInfo: string;
let allRecords: string;

When("the user clicks the print button", async () => {
    await reportPrintPageActions.clickPrintButton();
});

When("the user clicks the list view print button", async () => {
    await reportPrintPageActions.clickListViewPrintButton();
});

Then("the user should see the print information menu", async function () {
    await reportPrintPageActions.openReportAndValidate();
});

Then("the user gets the current record information displayed", async function () {
    currentRecordInfo = await reportPrintPageActions.getCurrentRecordInformation();
});

When(/^the user sets the filter to current record$/, async function () {
    await reportPrintPageActions.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.current_record,
        testData.element_text.ok_button_text
    );
});

Then("the user should see the correct current record information displayed", async function () {
    await reportPrintPageActions.verifyCurrentRecordInformation(currentRecordInfo);
});

Then("the user gets the all record information displayed", async function () {
    allRecords = (await (reportInformationMenuPageActions.getWorkOrderRecordCount())).toString();
});

When(/^the user sets the filter to all records$/, async function () {
    await reportPrintPageActions.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.all_records,
        testData.element_text.ok_button_text
    );
});

When(/^the user sets the filter to current lookup$/, async function () {
    await reportPrintPageActions.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.current_lookup,
        testData.element_text.ok_button_text
    );
});

Then(/^the user should see the correct all record information displayed$/, async function () {
    await reportPrintPageActions.verifyAllRecordInformation(allRecords);
});

Then(/^the user should see the correct current lookup information displayed$/, async function () {
    await reportPrintPageActions.verifyAllRecordInformation(allRecords);
});

Then("the user verifies the download report functionality", async function () {
    await reportPrintPageActions.verifyDownloadReport();
});

When("the user gets the records count from the custom filter layout", async function () {
    allRecords = (await (reportInformationMenuPageActions.getWorkOrderRecordCount())).toString();
});
