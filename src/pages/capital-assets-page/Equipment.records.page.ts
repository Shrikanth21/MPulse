import { Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';
import { commonActionPage } from '../common.action.page';

class EquipmentRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        descriptionInputField: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input Field" },
        mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
        fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
        uploadButton: { selector: "//button[@title='Upload']", name: "Upload Button" },
    };

    private getLinkByTitle = (title: string): string => `//a[@title='${title}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getLinkByTitleSecondOccurrence = (title: string): string => `(//a[@title='${title}'])[2]`;

    /**
     * Clicks on a link by its title.
     * @param title The title of the link to click.
     */
    public async clickLinkByTitle(title: string): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.getLinkByTitle(title)), title);
    }

    /**
     * Enters text in the description input field.
     * @param description The description text to enter.
     */
    public async enterDescription(description: string): Promise<void> {
        await this.actions.typeText(
            this.actions.getLocator(this.elements.descriptionInputField.selector),
            description,
            this.elements.descriptionInputField.name
        );
    }

    /**
     * Clicks on a button by its text.
     * @param buttonText The text of the button to click.
     */
    public async clickButtonByText(buttonText: string): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.getElementByText(buttonText)),
            `${buttonText} Button`
        );
    }

    /**
     * Uploads a file to the media section.
     * @param filePath The path of the file to upload.
     */
    public async uploadMediaFile(mediaButtonText: string, linkIconTitle: string, filePath: string): Promise<void> {
        await this.clickButtonByText(mediaButtonText);
        await this.actions.click(this.actions.getLocator(this.elements.mediaMoreButton.selector),this.elements.mediaMoreButton.name);
        await this.actions.click(this.actions.getLocator(this.getLinkByTitleSecondOccurrence(linkIconTitle)),`Second Occurrence of Link: ${linkIconTitle}`);
        await this.actions.uploadFile(this.actions.getLocator(this.elements.fileInput.selector),filePath,'Media File Upload');
        await this.actions.click(this.actions.getLocator(this.elements.uploadButton.selector),this.elements.uploadButton.name);
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
        await this.clickLinkByTitle(addButtonTitle);
        await this.enterDescription(taskDescription);
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath);
        await commonActionPage.clickSaveButton();
    }

    /**
     * Deletes a task by clicking on the delete icon and confirming the action.
     * @param subMenuItemTitle The title of the submenu item to click.
     * @param crossIconTitle The title of the cross icon to click.
     * @param continueButtonText The text of the continue button to confirm deletion.
     */
    public async deleteEquipmentTask(subMenuItemTitle: string, crossIconTitle: string, continueButtonText: string): Promise<void> {
        await this.clickLinkByTitle(subMenuItemTitle);
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickButtonByText(continueButtonText);
    }
}

export const equipmentRecordsPage = new EquipmentRecordsPage();
