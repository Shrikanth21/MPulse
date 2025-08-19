import { Given, When, Then } from '@cucumber/cucumber';
import testData from '../../../data/testData.json';
import * as path from 'path';
import { loginPage } from '../../../pages/login-page/Login.page';
import { homePage } from '../../../pages/home-page/Home.page';
import { equipmentRecordsPage } from '../../../pages/capital-assets-page/Equipment.records.page';
import { generatedBuildingTaskDescription, generatedDescription, generatedEqTaskDescription } from '../../../helper/get.different.description';
import { workOrderPage } from '../../../pages/work-order-page/WorkOrderPage.page';
import { getFutureDay } from '../../../helper/date/get.future.date';
import { taskChecklistPage } from '../../../pages/capital-assets-page/Task.checkList.page';

const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');

Given('the user logs into the application', async function () {
  const credentials = await loginPage.loadExcelCredentials();
  await loginPage.login(credentials.username);
});

Given(/^the user selects a specific database$/, async () => {
  await loginPage.selectDatabase(testData.db_name);
});

When('the user navigates to the Equipment Records page', async function () {
  await homePage.navigateToCapitalAssetsRecordsPage(
    testData.homePageURL,
    testData.element_text.got_it_btn,
    testData.menuItemTitle,
    testData.subMenuItemTitle,
    testData.equipmentRecordsPageURL
  );
});

When('the user creates a new asset with a unique description and uploads media', async function () {
  await equipmentRecordsPage.createTaskWithMediaUpload(
    testData.icons.plusIcon,
    generatedEqTaskDescription,
    testData.element_text.media_text,
    testData.icons.media_link_icon,
    filePath
  );
});

When('the user creates a new Work Order linked to the asset', async function () {
  await workOrderPage.createWorkOrderFromMoreDropDown(testData.icons.dropdownIcon, testData.create_wko, generatedBuildingTaskDescription);
});

When('the user assigns a future due date to the Work Order', async function () {
  await workOrderPage.performCalendarActions(
    testData.icons.calendarIcon,
    testData.icons.calendarIcon,
    getFutureDay(2),
    testData.element_text.ok_button_text
  );
});

When('the user links task, asset, personnel, and inventory to the Work Order', async function () {
  await workOrderPage.linkTaskToWorkOrder(
    testData.wo_info.taskAssignedToWorkOrder,
    testData.icons.task_link_icon,
    testData.element_text.link_button
  );

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
});

When('the user completes all fields in the task checklist', async function () {
  await taskChecklistPage.completeTaskChecklist(
    testData.element_text.task_checkList_text,
    testData.icons.special_char,
    testData.CheckListFields_data.checkList_first_field,
    testData.CheckListFields_data.inputValue,
    testData.CheckListFields_data.checkList_second_field,
    testData.CheckListFields_data.inputValue,
    testData.element_text.task_checkList_text
  );
});

Then('the user closes the Work Order and deletes the associated asset', async function () {
  await workOrderPage.performHomePageActions(
    testData.element_text.close_wko_text,
    testData.element_text.yes_button,
    getFutureDay(2),
    testData.element_text.ok_button_text,
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
  await equipmentRecordsPage.deleteEquipmentTask(
    testData.subMenuItemTitle,
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
});
