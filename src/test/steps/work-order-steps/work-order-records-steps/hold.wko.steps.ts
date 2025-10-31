import { When, Then } from "@cucumber/cucumber";
import testData1 from "../../../../data/testData.json";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";
import { workOrderRecordPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action";

When("the user hold the created Work Order record", async function () {
  await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
  await workOrderRecordPageActions.holdWKO(
    testData1.customization.languageDropdownValues.status,
    testData1.customization.languageDropdownValues.status,
    testData1.element_text.hold_status_text,
    testData1.labels,
    testData1.hold_reason_text,
    getFutureDateFormatted(2),
    testData1.element_text.save_button_text
  );
});

Then("the Work Order record should be hold successfully", async function () {
  await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
  await workOrderRecordPageActions.validateElementText(testData1.element_text.hold_status_text);
});

When("the user delete the created new Work Order record", async function () {
  await workOrderRecordPageActions.deleteRecord(
    testData1.icons.crossIcon,
    testData1.element_text.continue_button_text
  );
});
