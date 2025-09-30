import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { TaskCheckListPageLocators } from "../../locators/capital-assets-page-locator/task.checklist.locator";

class TaskCheckListPageActions {

    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }
    /**
     * Clicks on the media more button to perform actions on media.
     * @param taskName The name of the task.
     * @param specialChar The special character to identify the task.
     */
    public async performTaskChecklistActions(taskName: string, specialChar: string): Promise<void> {
        const eyeIconLocator = this.actions.getLocator(TaskCheckListPageLocators.eyeIcon.selector);
        await this.actions.waitForElementToBeVisible(eyeIconLocator, TaskCheckListPageLocators.eyeIcon.name);
        await this.actions.click(eyeIconLocator, TaskCheckListPageLocators.eyeIcon.name);
        const moreIconLocator = this.actions.getLocator(TaskCheckListPageLocators.getTaskMoreIcon(taskName));
        await this.actions.click(moreIconLocator, `Task More Icon for: ${taskName}`);
        await this.actions.click(
            this.actions.getLocator(TaskCheckListPageLocators.getEditIconByRow(taskName)),
            `Edit Icon for: ${taskName}`
        );
        await this.actions.click(this.actions.getLocator(TaskCheckListPageLocators.getChecklistCheckbox(specialChar)), `Checkbox for: ${specialChar}`);
    }

    /**
     * Enters text in the first checklist field.
     * @param fieldName The name of the field to enter text in.
     * @param text The text to enter.
     */
    public async enterTextInFirstChecklistField(fieldName: string, text: string): Promise<void> {
        const cellLocator = this.actions.getLocator(TaskCheckListPageLocators.getChecklistCell(fieldName));
        const inputLocator = this.actions.getLocator(TaskCheckListPageLocators.getChecklistInput(fieldName));
        await this.actions.scrollToAndClick(cellLocator, `Checklist Field for: ${fieldName}`);
        await this.actions.clearAndTypeText(inputLocator, text, `Checklist Field for: ${fieldName}`);
    }

    /**
     * Enters text in the second checklist field.
     * @param fieldName The name of the field to enter text in.
     * @param text The text to enter.
     */
    public async enterTextInSecondChecklistField(fieldName: string, text: string): Promise<void> {
        const cellLocator = this.actions.getLocator(TaskCheckListPageLocators.getChecklistCell(fieldName));
        const inputLocator = this.actions.getLocator(TaskCheckListPageLocators.getChecklistInput(fieldName));
        await this.actions.doubleClick(cellLocator, `Checklist Field for: ${fieldName}`);
        await this.actions.typeText(inputLocator, text, `Checklist Field for: ${fieldName}`);
    }

    /**
     * Clicks on the save button by its text.
     * @param text The text of the save button to click.
     */
    public async clickSaveButtonByText(text: string): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(TaskCheckListPageLocators.getTaskSaveIcon(text));
        await this.actions.click(saveButtonLocator, `Save Button for: ${text}`);
    }

    /**
     * Clicks on the close button to close the task details.
     */
    public async clickCloseButton(): Promise<void> {
        const closeButtonLocator = this.actions.getLocator(TaskCheckListPageLocators.closeButton.selector);
        await this.actions.waitForElementToBeVisible(closeButtonLocator, TaskCheckListPageLocators.closeButton.name);
        await this.actions.click(closeButtonLocator, TaskCheckListPageLocators.closeButton.name);
    }

    /**
     * Uploads a file to the task checklist.
     * @param filePath The path of the file to upload.
     */
    public async completeTaskChecklist(
        taskName: string,
        specialChar: string,
        firstField: string,
        firstFieldValue: string,
        secondField: string,
        secondFieldValue: string,
        saveButtonText: string
    ): Promise<void> {
        await this.performTaskChecklistActions(taskName, specialChar);
        await this.enterTextInFirstChecklistField(firstField, firstFieldValue);
        await this.enterTextInSecondChecklistField(secondField, secondFieldValue);
        await this.clickSaveButtonByText(saveButtonText);
        await this.clickCloseButton();
    }
}

export const taskCheckListPageActions = new TaskCheckListPageActions();