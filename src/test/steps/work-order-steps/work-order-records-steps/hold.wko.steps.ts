import { When, Then } from "@cucumber/cucumber";
import testData from "../../../../data/hold.wko.json";
import { workOrderPage } from "../../../../pages/work-order-page/WorkOrderPage.page";
import { getFutureDateFormatted } from "../../../../helper/date/get.future.date";

When("the user hold the created Work Order record", async function () {
  await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
  await workOrderPage.holdWKO(
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
  await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
  await workOrderPage.validateElementText(testData.element_text.hold_text);
});

When("the user delete the created new Work Order record", async function () {
  await workOrderPage.deleteRecord(
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
});
