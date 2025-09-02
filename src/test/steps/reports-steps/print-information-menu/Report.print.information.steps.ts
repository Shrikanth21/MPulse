import { Then, When } from "@cucumber/cucumber"
import { reportPrintPage } from "../../../../pages/reports-pages/print-information-menu-page/report.print.page";
import testData from "../../../../data/testData.json";
import { reportInformationMenuPage } from "../../../../pages/reports-pages/information-menu-page/report.information.menu.page";

let currentRecordInfo: string;
let allRecords: string;

When("the user clicks the print button", async () => {
    await reportPrintPage.clickPrintButton();
});

When("the user clicks the list view print button", async () => {
    await reportPrintPage.clickListViewPrintButton();
});

Then("the user should see the print information menu", async function () {
    await reportPrintPage.openReportAndValidate();
});

Then("the user gets the current record information displayed", async function () {
    currentRecordInfo = await reportPrintPage.getCurrentRecordInformation();
});

When(/^the user sets the filter to current record$/, async function () {
    await reportPrintPage.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.current_record,
        testData.element_text.ok_button_text
    );
});

Then("the user should see the correct current record information displayed", async function () {
    await reportPrintPage.verifyCurrentRecordInformation(currentRecordInfo);
});

Then("the user gets the all record information displayed", async function () {
    allRecords = (await (reportInformationMenuPage.getWorkOrderRecordCount())).toString();
});

When(/^the user sets the filter to all records$/, async function () {
    await reportPrintPage.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.all_records,
        testData.element_text.ok_button_text
    );
});

When(/^the user sets the filter to current lookup$/, async function () {
    await reportPrintPage.setFilter(
        testData.run_report.work_order_form,
        testData.include_data_from.current_lookup,
        testData.element_text.ok_button_text
    );
});

Then(/^the user should see the correct all record information displayed$/, async function () {
    await reportPrintPage.verifyAllRecordInformation(allRecords);
});

Then(/^the user should see the correct current lookup information displayed$/, async function () {
    await reportPrintPage.verifyAllRecordInformation(allRecords);
});

Then("the user verifies the download report functionality", async function () {
    await reportPrintPage.verifyDownloadReport();
});

When("the user gets the records count from the custom filter layout", async function () {
    allRecords = (await (reportInformationMenuPage.getWorkOrderRecordCount())).toString();
});
