import { Given, When, Then } from '@cucumber/cucumber';
import testData from '../../../data/testData.json';
import * as path from 'path';
import { generatedBuildingTaskDescription, generatedEqTaskDescription } from '../../../helper/get.different.description';
import { getFutureDay } from '../../../helper/date/get.future.date';
import { loginPageActions } from '../../../pages/actions/login-page-action/login.page.actions';
import { homePageActions } from '../../../pages/actions/home-page-action/home.page.actions';
import { equipmentRecordsAction } from '../../../pages/actions/capital-assets-action-page/equipment.records.actions';
import { taskCheckListPageActions } from '../../../pages/actions/capital-assets-action-page/task.checklist.action.page';
import { workOrderRecordPageActions } from '../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action';

const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');

Given('the user logs into the application', async function () {
  const credentials = await loginPageActions.loadExcelCredentials();
  await loginPageActions.login(credentials.username, credentials.password);
});

Given(/^the user selects a specific database$/, async () => {
  await loginPageActions.selectDatabase(testData.db_name);
});

When('the user navigates to the Equipment Records page', async function () {
  await homePageActions.navigateToCapitalAssetsRecordsPage(
    testData.homePageURL,
    testData.element_text.got_it_btn,
    testData.menuItemTitle,
    testData.subMenuItemTitle,
    testData.equipmentRecordsPageURL
  );
});

When('the user creates a new asset with a unique description and uploads media', async function () {
  await equipmentRecordsAction.createTaskWithMediaUpload(
    testData.icons.plusIcon,
    generatedEqTaskDescription,
    testData.element_text.media_text,
    testData.icons.media_link_icon,
    filePath
  );
});

When('the user creates a new Work Order linked to the asset', async function () {
  await workOrderRecordPageActions.createWorkOrderFromMoreDropDown(testData.icons.dropdownIcon, testData.create_wko, generatedBuildingTaskDescription);
});

When('the user assigns a future due date to the Work Order', async function () {
  await workOrderRecordPageActions.performCalendarActions(
    testData.icons.calendarIcon,
    testData.icons.calendarIcon,
    getFutureDay(2),
    testData.element_text.ok_button_text
  );
});

When('the user links task, asset, personnel, and inventory to the Work Order', async function () {
  await workOrderRecordPageActions.linkTaskToWorkOrder(
    testData.wo_info.taskAssignedToWorkOrder,
    testData.icons.task_link_icon,
    testData.element_text.link_button
  );

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
});

When('the user completes all fields in the task checklist', async function () {
  await taskCheckListPageActions.completeTaskChecklist(
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
  await workOrderRecordPageActions.performHomePageActions(
    testData.element_text.close_wko_text,
    testData.element_text.yes_button,
    getFutureDay(2),
    testData.element_text.ok_button_text,
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
  await equipmentRecordsAction.deleteEquipmentTask(
    testData.subMenuItemTitle,
    testData.icons.crossIcon,
    testData.element_text.continue_button_text
  );
});
