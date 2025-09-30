import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { commonPageActions } from "../common.page.actions";
import { EquipmentRecordsPageLocators } from "../../locators/capital-assets-page-locator/equipment.records.locators";

class EquipmentRecordsActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Enters text in the description input field.
     * @param description The description text to enter.
     */
    public async enterDescription(description: string): Promise<void> {
        await this.actions.typeText(
            this.actions.getLocator(EquipmentRecordsPageLocators.descriptionInputField.selector),
            description,
            EquipmentRecordsPageLocators.descriptionInputField.name
        );
    }

    /**
     * Uploads a file to the media section.
     * @param filePath The path of the file to upload.
     */
    public async uploadMediaFile(mediaButtonText: string, linkIconTitle: string, filePath: string): Promise<void> {
        await commonPageActions.clickSpanByText(mediaButtonText);
        const mediaMoreButton = this.actions.getLocator(EquipmentRecordsPageLocators.mediaMoreButton.selector);
        await this.actions.waitForElementToBeVisible(mediaMoreButton, EquipmentRecordsPageLocators.mediaMoreButton.name);
        await this.actions.click(mediaMoreButton, EquipmentRecordsPageLocators.mediaMoreButton.name);
        await this.actions.click(this.actions.getLocator(EquipmentRecordsPageLocators.getLinkByTitleSecondOccurrence(linkIconTitle)), `Second Occurrence of Link: ${linkIconTitle}`);
        await this.actions.uploadFile(this.actions.getLocator(EquipmentRecordsPageLocators.fileInput.selector), filePath, 'Media File Upload');
        await this.actions.click(this.actions.getLocator(EquipmentRecordsPageLocators.uploadButton.selector), EquipmentRecordsPageLocators.uploadButton.name);
    }

    /**
     * Creates a task with media upload.
     * @param addButtonTitle The title of the button to add a new task.
     * @param taskDescription The description of the task.
     * @param mediaButtonText The text of the media button.
     * @param mediaLinkTitle The title of the media link.
     * @param mediaFilePath The path of the media file to upload.
     */
    public async createTaskWithMediaUpload(addButtonTitle: string, taskDescription: string, mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string): Promise<void> {
        await commonPageActions.clickLinkByTitle(addButtonTitle);
        await this.enterDescription(taskDescription);
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath);
        await commonPageActions.clickSaveButton();
    }

    /**
     * Deletes a task by clicking on the delete icon and confirming the action.
     * @param subMenuItemTitle The title of the submenu item to click.
     * @param crossIconTitle The title of the cross icon to click.
     * @param continueButtonText The text of the continue button to confirm deletion.
     */
    public async deleteEquipmentTask(subMenuItemTitle: string, crossIconTitle: string, continueButtonText: string): Promise<void> {
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await commonPageActions.clickLinkByTitle(crossIconTitle);
        await commonPageActions.clickSpanByText(continueButtonText);
    }
}

export const equipmentRecordsAction = new EquipmentRecordsActions();
