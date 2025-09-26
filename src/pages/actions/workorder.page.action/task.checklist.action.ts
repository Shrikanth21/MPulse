import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { TaskChecklistsPageLocators } from "../../locators/workorder.page.locators/task.checklist.page.locator";
import { CommonPageLocators } from "../../locators/common.page.locator";
import { commonPageActions } from "../common.page.actions";
import { MaintenanceTaskRecordsPageLocators } from "../../locators/workorder.page.locators/maintenance.task.records.page.locator";
import { timeouts } from "../../../helper/timeouts-config";

class TaskChecklistAction {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the "Add New Record" button to add a new task checklist record.
     */
    public async clickOnAddNewRecordButton(): Promise<void> {
        const addNewRecordButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.addNewRecordButton.selector);
        await this.actions.waitForElementToBeVisible(addNewRecordButtonLocator, TaskChecklistsPageLocators.addNewRecordButton.name);
        await this.actions.click(addNewRecordButtonLocator, TaskChecklistsPageLocators.addNewRecordButton.name);
    }

    /**
     * Enters a description in the task checklist.
     * @param description The description to enter in the task checklist.
     */
    public async enterTaskChecklistDescription(description: string): Promise<void> {
        const descriptionInputLocator = this.actions.getLocator(TaskChecklistsPageLocators.descriptionInput.selector);
        await this.actions.waitForElementToBeVisible(descriptionInputLocator, TaskChecklistsPageLocators.descriptionInput.name);
        await this.actions.typeText(descriptionInputLocator, description, TaskChecklistsPageLocators.descriptionInput.name);
    }

    public async getTaskChecklistId(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const taskChecklistIdLocator = this.actions.getLocator(TaskChecklistsPageLocators.taskChecklistId.selector);
        await this.actions.waitForElementToBeVisible(taskChecklistIdLocator, TaskChecklistsPageLocators.taskChecklistId.name);
        return this.actions.getText(taskChecklistIdLocator, TaskChecklistsPageLocators.taskChecklistId.name);
    }

    /**
     * Clicks on the "Save" button to save the task checklist.
     */
    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, TaskChecklistsPageLocators.saveButton.name);
        await this.actions.click(saveButtonLocator, TaskChecklistsPageLocators.saveButton.name);
    }

    /**
     * Adds a new task checklist item.
     * @param taskChecklistDescription The description of the task checklist.
     * @param newChecklistItem The new checklist item to add.
     */
    public async addTaskChecklistItem(
        taskChecklistDescription: string,
        newChecklistItem: string
    ): Promise<void> {
        await this.clickOnAddNewRecordButton();
        await this.enterTaskChecklistDescription(taskChecklistDescription);
        const onCompletionCheckboxLocator = this.actions.getVisibleLocator(TaskChecklistsPageLocators.onCompletionSectionCheckbox.selector);
        await this.actions.waitForElementToBeVisible(onCompletionCheckboxLocator, TaskChecklistsPageLocators.onCompletionSectionCheckbox.name);
        await this.actions.click(onCompletionCheckboxLocator, TaskChecklistsPageLocators.onCompletionSectionCheckbox.name);
        const onCloseCheckboxLocator = this.actions.getVisibleLocator(TaskChecklistsPageLocators.onCloseSectionCheckbox.selector);
        await this.actions.waitForElementToBeVisible(onCloseCheckboxLocator, TaskChecklistsPageLocators.onCloseSectionCheckbox.name);
        await this.actions.click(onCloseCheckboxLocator, TaskChecklistsPageLocators.onCloseSectionCheckbox.name);
        const moreButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.moreButton.selector);
        await this.actions.waitForElementToBeVisible(moreButtonLocator, TaskChecklistsPageLocators.moreButton.name);
        await this.actions.mouseHoverAndClick(moreButtonLocator, TaskChecklistsPageLocators.moreButton.name);
        const addChecklistLocator = this.actions.getLocator(TaskChecklistsPageLocators.addEventButton.selector);
        await this.actions.waitForElementToBeVisible(addChecklistLocator, TaskChecklistsPageLocators.addEventButton.name);
        await this.actions.click(addChecklistLocator, TaskChecklistsPageLocators.addEventButton.name);
        const addElementInputLocator = this.actions.getLocator(TaskChecklistsPageLocators.addElementInput.selector);
        await this.actions.waitForElementToBeVisible(addElementInputLocator, TaskChecklistsPageLocators.addElementInput.name);
        await this.actions.typeText(addElementInputLocator, newChecklistItem, TaskChecklistsPageLocators.addElementInput.name);
        const saveToTabButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.saveToTabButton.selector);
        await this.actions.waitForElementToBeVisible(saveToTabButtonLocator, TaskChecklistsPageLocators.saveToTabButton.name);
        await this.actions.click(saveToTabButtonLocator, TaskChecklistsPageLocators.saveToTabButton.name);
        await this.clickOnSaveButton();
    }

    /**
     * Verifies that the task checklist ID is displayed.
     */
    public async verifyTaskChecklistIDIsDisplayed(description: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const taskChecklistIdLocator = this.actions.getLocator(TaskChecklistsPageLocators.taskChecklistId.selector);
        await this.actions.waitForElementToBeVisible(taskChecklistIdLocator, TaskChecklistsPageLocators.taskChecklistId.name);
        const descriptionText = this.actions.getLocator(CommonPageLocators.getSpanByTitle(description));
        await this.actions.waitForElementToBeVisible(descriptionText, `Task Checklist with description ${description}`);
        const isVisible = await descriptionText.isVisible();
        await this.actions.assertTrue(
            isVisible,
            `Task Checklist with description "${description}" is not visible. Locator: ${CommonPageLocators.getSpanByTitle(description)}`
        );
    }

    /**
     * Verifies that a task checklist item exists.
     * @param newChecklistItem The new checklist item to verify.
     */
    public async verifyTaskChecklistItemExists(newChecklistItem: string): Promise<void> {
        const checklistItemLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(newChecklistItem));
        const isVisible = await checklistItemLocator.isVisible();
        await this.actions.assertTrue(isVisible, `Checklist item with name ${newChecklistItem} is visible`);
    }

    /**
     * Navigates to the maintenance task records page.
     * @param title The title of the maintenance task records page to navigate to.
     * @param expectedUrl The expected URL of the maintenance task records page.
     */
    public async navigateToMaintananceTaskRecords(title: string, expectedUrl: string): Promise<void> {
        await commonPageActions.clickSideMenuIcon();
        await commonPageActions.clickLinkByTitle(title);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Selects a value from the priority dropdown.
     */
    public async selectDropdownValue(): Promise<void> {
        const dropdownLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.priorityDropdown.selector);
        await this.actions.waitForElementToBeVisible(dropdownLocator, MaintenanceTaskRecordsPageLocators.priorityDropdown.name);
        await this.actions.click(dropdownLocator, MaintenanceTaskRecordsPageLocators.priorityDropdown.name);
        const dropdownValueLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.listItemContent.selector).nth(1);
        await this.actions.waitForElementToBeVisible(dropdownValueLocator, MaintenanceTaskRecordsPageLocators.listItemContent.name);
        await this.actions.click(dropdownValueLocator, MaintenanceTaskRecordsPageLocators.listItemContent.name);
    }

    /**
     * Adds a new maintenance record.
     * @param maintenanceDescription The description for the maintenance record.
     * @param taskCheckListID The ID of the task checklist.
     */
    public async addNewMaintenanceRecord(
        maintenanceDescription: string,
        taskCheckListID: string
    ): Promise<void> {
        await this.clickOnAddNewRecordButton();
        await this.enterTaskChecklistDescription(maintenanceDescription);
        await this.selectDropdownValue();
        const linkCheckList = this.actions.getLocator(TaskChecklistsPageLocators.moreButtonTaskChecklist.selector);
        await this.actions.waitForElementToBeVisible(linkCheckList, TaskChecklistsPageLocators.moreButtonTaskChecklist.name);
        await this.actions.mouseHoverAndClick(linkCheckList, TaskChecklistsPageLocators.moreButtonTaskChecklist.name);
        const linkAdditionalTaskButtonLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.linkAdditionalTaskButton.selector);
        await this.actions.waitForElementToBeVisible(linkAdditionalTaskButtonLocator, MaintenanceTaskRecordsPageLocators.linkAdditionalTaskButton.name);
        await this.actions.click(linkAdditionalTaskButtonLocator, MaintenanceTaskRecordsPageLocators.linkAdditionalTaskButton.name);
        const searchCreatedTaskListLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.filterColumnIdInput.selector);
        await this.actions.waitForElementToBeVisible(searchCreatedTaskListLocator, MaintenanceTaskRecordsPageLocators.filterColumnIdInput.name);
        await this.actions.typeText(searchCreatedTaskListLocator, taskCheckListID, MaintenanceTaskRecordsPageLocators.filterColumnIdInput.name);
        await commonPageActions.clickDivByTitle(taskCheckListID);
        const linkRecordButtonLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.linkRecordButton.selector);
        await this.actions.waitForElementToBeVisible(linkRecordButtonLocator, MaintenanceTaskRecordsPageLocators.linkRecordButton.name);
        await this.actions.click(linkRecordButtonLocator, MaintenanceTaskRecordsPageLocators.linkRecordButton.name);
        await this.clickOnSaveButton();
    }

    /**
     * Verifies that a maintenance task is visible.
     * @param description The description of the maintenance task to verify.
     */
    public async verifyMaintenanceTaskVisible(description: string): Promise<void> {
        const maintenanceTaskRecordLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(description));
        const isVisible = await maintenanceTaskRecordLocator.isVisible();
        await this.actions.assertTrue(isVisible, `Maintenance Task with description ${description} is visible`);
    }

    /**
     * Navigates to the work orders page.
     * @param title The title of the work orders page to navigate to.
     * @param expectedUrl The expected URL of the work orders page.
     */
    public async navigateToWorkOrdersPage(title: string): Promise<void> {
        const dropdownToggleRightLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.dropdownToggleRight.selector);
        await this.actions.waitForElementToBeVisible(dropdownToggleRightLocator, MaintenanceTaskRecordsPageLocators.dropdownToggleRight.name);
        await this.actions.click(dropdownToggleRightLocator, MaintenanceTaskRecordsPageLocators.dropdownToggleRight.name);
        await commonPageActions.clickLinkByTitle(title);
    }

    /**
     * Creates a new work order with the specified maintenance task.
     * @param workOrderDescription The description for the work order.
     */
    public async createWorkOrderWithMaintenanceTask(
        workOrderDescription: string
    ): Promise<void> {
        await this.enterTaskChecklistDescription(workOrderDescription);
        await this.clickOnSaveButton();
    }

    /**
     * Verifies that a maintenance task is visible in the work order.
     * @param id The ID of the maintenance task to verify.
     * @param description The description of the maintenance task to verify.
     */
    public async verifyMaintenanceTaskVisibleInWorkOrder(id: string, description: string): Promise<void> {
        await commonPageActions.clickTabByText('WO Information');
        const maintenanceTaskRecordIdLocator = this.actions.getLocator(CommonPageLocators.getLinkByText(id));
        const isIdVisible = await maintenanceTaskRecordIdLocator.isVisible();
        await this.actions.assertTrue(isIdVisible, `Maintenance Task with ID ${id} is visible`);
        const maintenanceTaskRecordLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(description));
        const isVisible = await maintenanceTaskRecordLocator.isVisible();
        await this.actions.assertTrue(isVisible, `Maintenance Task with description ${description} is visible`);
    }

    /**
     * Clicks on the "View Task Details" link to view the details of the task checklist.
     */
    public async clickOnViewTaskDetailsLink(): Promise<void> {
        const viewTaskDetailsLinkLocator = this.actions.getLocator(TaskChecklistsPageLocators.viewTaskDetailsLink.selector);
        await this.actions.waitForElementToBeVisible(viewTaskDetailsLinkLocator, TaskChecklistsPageLocators.viewTaskDetailsLink.name);
        await this.actions.click(viewTaskDetailsLinkLocator, TaskChecklistsPageLocators.viewTaskDetailsLink.name);
    }

    /**
     * Checks the created task checklist by editing it, marking the checkbox, and saving the changes.
     */
    public async checkCreatedTaskChecklist(): Promise<void> {
        await commonPageActions.clickTabByText('WO Information');
        await this.clickOnViewTaskDetailsLink();
        const moreBtntonLocator = this.actions.getLocator(TaskChecklistsPageLocators.taskChecklistMoreButton.selector);
        await this.actions.waitForElementToBeVisible(moreBtntonLocator, TaskChecklistsPageLocators.taskChecklistMoreButton.name);
        await this.actions.mouseHoverAndClick(moreBtntonLocator, TaskChecklistsPageLocators.taskChecklistMoreButton.name);
        const editTaskChecklistButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.editTaskChecklistButton.selector);
        await this.actions.waitForElementToBeVisible(editTaskChecklistButtonLocator, TaskChecklistsPageLocators.editTaskChecklistButton.name);
        await this.actions.click(editTaskChecklistButtonLocator, TaskChecklistsPageLocators.editTaskChecklistButton.name);
        const taskChecklistCheckboxLocator = this.actions.getLocator(TaskChecklistsPageLocators.taskChecklistCheckbox.selector);
        await this.actions.waitForElementToBeVisible(taskChecklistCheckboxLocator, TaskChecklistsPageLocators.taskChecklistCheckbox.name);
        await this.actions.click(taskChecklistCheckboxLocator, TaskChecklistsPageLocators.taskChecklistCheckbox.name);
        const saveEditTaskChecklistButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.saveEditTaskChecklistButton.selector);
        await this.actions.waitForElementToBeVisible(saveEditTaskChecklistButtonLocator, TaskChecklistsPageLocators.saveEditTaskChecklistButton.name);
        await this.actions.click(saveEditTaskChecklistButtonLocator, TaskChecklistsPageLocators.saveEditTaskChecklistButton.name);
        const closeTaskListPopUpButtonLocator = this.actions.getLocator(TaskChecklistsPageLocators.closeTaskListPopUpButton.selector);
        await this.actions.waitForElementToBeVisible(closeTaskListPopUpButtonLocator, TaskChecklistsPageLocators.closeTaskListPopUpButton.name);
        await this.actions.click(closeTaskListPopUpButtonLocator, TaskChecklistsPageLocators.closeTaskListPopUpButton.name);
    }

    /**
     * Closes the work order with the task checklist.
     */
    public async closeWorkOrderWithTaskChecklist(): Promise<void> {
        const closeWorkOrderButtonLocator = this.actions.getLocator(MaintenanceTaskRecordsPageLocators.dropdownToggleRight.selector);
        await this.actions.waitForElementToBeVisible(closeWorkOrderButtonLocator, MaintenanceTaskRecordsPageLocators.dropdownToggleRight.name);
        await this.actions.click(closeWorkOrderButtonLocator, MaintenanceTaskRecordsPageLocators.dropdownToggleRight.name);
        await commonPageActions.clickLinkByTitle('Close Work Order');
        await commonPageActions.clickSpanByText('Yes');
    }
}

export const taskChecklistAction = new TaskChecklistAction();
