import { When, Then } from "@cucumber/cucumber";
import testData from "../../../../data/hold.wko.json";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";
import { workOrderRecordPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action";

When("the user hold the created Work Order record", async function () {
  await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
  await workOrderRecordPageActions.holdWKO(
    testData.element_text.status_text,
    testData.element_text.status_text,
    testData.element_text.hold_text,
    testData.labels,
    testData.element_text.hold_reason_text,
    getFutureDateFormatted(2),
    testData.element_text.save_button_text
  );
});

Then("the Work Order record should be hold successfully", async function () {
  await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
  await workOrderRecordPageActions.validateElementText(testData.element_text.hold_text);
});

When("the user delete the created new Work Order record", async function () {
  await workOrderRecordPageActions.deleteRecord(
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
});
