import { Then, When } from "@cucumber/cucumber";
import testData from '../../../../data/testData.json';
import { homePageActions } from "../../../../pages/actions/home-page-action/home.page.actions";
import { taskChecklistAction } from "../../../../pages/actions/workorder.page.action/task-checklist-action/task.checklist.action";
import { generatedCheckBoxName, generatedMaintenanceTaskRecordDescription, generatedTaskChecklistName, generateWorkOrderWithTaskDescription } from "../../../../helper/get.different.description";

let checkListId: string;
let maintenanceTaskId: string;

When(/^the user navigates to the Task Checklists page$/, async () => {
    await homePageActions.navigateToCapitalAssetsRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.menuItemWorkTitle,
        testData.task_checklists_title,
        testData.taskChecklistsPageURL);
});

When(/^the user creates a new Task Checklist with a unique name and all mandatory fields$/, async () => {
    await taskChecklistAction.addTaskChecklistItem(
        generatedTaskChecklistName,
        generatedCheckBoxName
    );
});

Then(/^the newly created Task Checklist should be visible in the list$/, async () => {
    checkListId = await taskChecklistAction.getTaskChecklistId();
    console.log('Task Checklist ID:', checkListId);
    await taskChecklistAction.verifyTaskChecklistIDIsDisplayed(generatedTaskChecklistName);
    await taskChecklistAction.verifyTaskChecklistItemExists(generatedCheckBoxName);
});

When(/^the user navigates to the Maintenance Task Records page$/, async () => {
    await taskChecklistAction.navigateToMaintananceTaskRecords(
        testData.maintenance_task_records_title,
        testData.maintenanceTaskRecordsPageURL
    );
});

When(/^the user creates a new Maintenance Task and links the previously created Task Checklist$/, async () => {
    await taskChecklistAction.addNewMaintenanceRecord(
        generatedMaintenanceTaskRecordDescription,
        checkListId
    );
});

Then(/^the newly created Maintenance Task should be visible in the list$/, async () => {
    maintenanceTaskId = await taskChecklistAction.getTaskChecklistId();
    await taskChecklistAction.verifyMaintenanceTaskVisible(generatedMaintenanceTaskRecordDescription);
});

When(/^the user navigates to the Work Orders page$/, async () => {
    await taskChecklistAction.navigateToWorkOrdersPage(
        testData.createWorkOrderButton
    );
});

When(/^the user creates a new Work Order with created Maintenance Task$/, async () => {
    await taskChecklistAction.createWorkOrderWithMaintenanceTask(
        generateWorkOrderWithTaskDescription
    );
});

Then(/^the user verifies that the Maintenance Task Record is present in the Work Order$/, async () => {
    await taskChecklistAction.verifyMaintenanceTaskVisibleInWorkOrder(
        maintenanceTaskId,
        generatedMaintenanceTaskRecordDescription
    );
});

When(/^the user checks the created task checklist in the Work Order$/, async () => {
    await taskChecklistAction.checkCreatedTaskChecklist();
});

When(/^the user closes the created Work Order record with task checklist$/, async () => {
    await taskChecklistAction.closeWorkOrderWithTaskChecklist();
});

When(/^the user closes the work order without checking the task checklist$/, async () => {
    await taskChecklistAction.closeWorkOrderWithoutCheckingTaskChecklist();
});

Then(/^the user should see a warning message indicating that there are incomplete tasks$/, async () => {
    await taskChecklistAction.verifyIncompleteTasksWarningMessage();
});
