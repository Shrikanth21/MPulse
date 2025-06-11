import { Given, When, Then } from "@cucumber/cucumber";
import testData from "../../../data/hold.wko.json";
import * as path from "path";
import { loginPage } from "../../../pages/login-page/Login.page";
import { homePage } from "../../../pages/home-page/Home.page";
import { workOrderPage } from "../../../pages/work-order-page/WorkOrderPage.page";
import { generatedDescription } from "../../../helper/get.different.description";
import { getRandomString } from "../../../helper/get-random-string";
import { getFutureDay } from "../../../helper/date/get.future.date";
import { WebActions } from "../../../base/web.action.util";

const filePath = path.resolve(__dirname, "../../docs/MPulse.docx");
let actions: WebActions;

Given("the user logs to the application", async function () {
  const credentials = await loginPage.loadExcelCredentials();
  await loginPage.login(credentials.username);
});

When("the user navigate to the Work Order Record page", async function () {
  await homePage.navigateToCapitalAssetsRecordsPage(
    testData.homePageURL,
    testData.element_text.got_it_btn,
    testData.menuItemTitle,
    testData.subMenuItemTitle,
    testData.workOrderRecordsPageURL
  );
});

When(
  "the user creates new Work Order with a unique description and upload media",
  async function () {
    await workOrderPage.createWorkOrder(
      testData.icons.plusIcon,
      generatedDescription,
      testData.element_text.media_text,
      testData.icons.media_link_icon,
      filePath,
      testData.element_text.upload_text,
      generatedDescription
    );
    await workOrderPage.setGeneralFields(
      testData.element_text.general_tab_text,
      testData.dropdownSelections,
      getRandomString("digits", 10)
    );
  }
);

Then(
  "the newly created Work Order status should be Open status",
  async function () {
    await workOrderPage.validateElementText(testData.element_text.open_status_text);
  }
);

When("the user assign due date to the Work Order", async function () {
  await workOrderPage.performCalendarActions(
    testData.icons.calendarIcon,
    testData.icons.calendarIcon,
    getFutureDay(2),
    testData.element_text.ok_button_text
  );
});

When(
  "the user link asset, personnel, and inventory to the Work Order",
  async function () {
    await workOrderPage.linkAssetToTask(generatedDescription,
      testData.wo_info.assetAssignedToTask,
      testData.icons.asset_link_icon,
      testData.wo_info.assetId,
      testData.element_text.replace_button
    );

    await workOrderPage.selectByElementText(generatedDescription);


    await workOrderPage.linkPersonnelToAsset(
      testData.wo_info.personnelAssignedToAsset,
      testData.icons.personnel_link_icon,
      testData.wo_info.empId,
      testData.element_text.link_button
    );
    await workOrderPage.selectByElementText(generatedDescription);

    await workOrderPage.linkInventoryToAsset(
      testData.wo_info.inventoryAssignedToAsset,
      testData.icons.inventory_link_icon,
      testData.wo_info.inventoryId,
      testData.element_text.link_button,
      testData.element_text.input_ok_button
    );
    await workOrderPage.selectByElementText(generatedDescription);


    await workOrderPage.setEmployeeActualHours(
      testData.wo_info.personnelAssignedToAsset,
      testData.icons.personnel_eye_icon,
      testData.element_text.timeSheetDetails_text,
      testData.icons.plusIcon_title,
      testData.element_text.hoursField_text,
      testData.element_text.hours,
      testData.icons.crossIcon_title
    );
    await workOrderPage.selectByElementText(generatedDescription);
    await workOrderPage.setFinancialFields(testData.costFields);
  }
);

When("the user hold the created Work Order record", async function () {
  actions = new WebActions(this.page);
  await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
  await actions.performKeyboardShortcutWithRobot();
  await workOrderPage.clickSaveButton();
  await workOrderPage.holdWKO(
    testData.element_text.status_text,
    testData.element_text.status_text,
    testData.element_text.hold_text,
    testData.labels,
    testData.element_text.hold_reason_text,
    getFutureDay(2),
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
