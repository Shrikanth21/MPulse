import { Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';

class TaskChecklistPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
        closeButton: { selector: "button[class='close']", name: "Close Button" },
        eyeIcon: { selector: "(//i[@class='fa fa-eye'])[2]", name: "Eye Icon" },
        mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
        fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
        uploadButton: { selector: "//button[@title='Upload']", name: "Upload Button" },
    };

    private getChecklistRow = (title: string): string => `//div[contains(@title,'${title}')]/ancestor::tr`;
    private getChecklistCheckbox = (text: string): string => `${this.getChecklistRow(text)}//div[@role='checkbox']`;
    private getChecklistCell = (text: string): string => `(${this.getChecklistRow(text)}//td)[1]`;
    private getChecklistInput = (text: string): string => `${this.getChecklistRow(text)}//td//input[@class='dx-texteditor-input']`;
    private getLinkByTitle = (title: string): string => `//a[@title='${title}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getTaskSaveIcon = (text: string): string => `${this.getElementByText(text)}/ancestor::div[@class='row panelHeader']//i[@class='fas fa-check']`;
    private getEditIconByRow = (text: string): string => `${this.getElementByText(text)}/ancestor::div[@class='row panelHeader']//a[@title="Edit"]`;
    private getTaskMoreIcon = (text: string): string => `${this.getElementByText(text)}/ancestor::div[@class='row panelHeader']//i[contains(@class,'ellipsis')]`;

    /**
     * Clicks on the eye icon to view task details.
     * @param taskName The name of the task to view.
     */
    public async clickEyeIcon(taskName: string): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.getTaskSaveIcon(taskName)), `Eye Icon for: ${taskName}`);
    }

    /**
     * Clicks on the media more button to perform actions on media.
     * @param taskName The name of the task.
     * @param specialChar The special character to identify the task.
     */
    public async performTaskChecklistActions(taskName: string, specialChar: string): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.elements.eyeIcon.selector),
            this.elements.eyeIcon.name
        );
        const moreIconLocator = this.actions.getLocator(this.getTaskMoreIcon(taskName));
        await this.actions.click(moreIconLocator, `Task More Icon for: ${taskName}`);
        await this.actions.click(
            this.actions.getLocator(this.getEditIconByRow(taskName)),
            `Edit Icon for: ${taskName}`
        );
        await this.actions.click(
            this.actions.getLocator(this.getChecklistCheckbox(specialChar)),
            `Checkbox for: ${specialChar}`
        );
    }

    /**
     * Enters text in the first checklist field.
     * @param fieldName The name of the field to enter text in.
     * @param text The text to enter.
     */
    public async enterTextInFirstChecklistField(fieldName: string, text: string): Promise<void> {
        const cellLocator = this.actions.getLocator(this.getChecklistCell(fieldName));
        const inputLocator = this.actions.getLocator(this.getChecklistInput(fieldName));
        await this.actions.scrollToAndClick(cellLocator, `Checklist Field for: ${fieldName}`);
        await this.actions.clearAndTypeText(inputLocator, text, `Checklist Field for: ${fieldName}`);
    }

    /**
     * Enters text in the second checklist field.
     * @param fieldName The name of the field to enter text in.
     * @param text The text to enter.
     */
    public async enterTextInSecondChecklistField(fieldName: string, text: string): Promise<void> {
        const cellLocator = this.actions.getLocator(this.getChecklistCell(fieldName));
        const inputLocator = this.actions.getLocator(this.getChecklistInput(fieldName));
        await this.actions.doubleClick(cellLocator, `Checklist Field for: ${fieldName}`);
        await this.actions.typeText(inputLocator, text, `Checklist Field for: ${fieldName}`);
    }

    /**
     * Clicks on the save button by its text.
     * @param text The text of the save button to click.
     */
    public async clickSaveButtonByText(text: string): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(this.getTaskSaveIcon(text));
        await this.actions.click(saveButtonLocator, `Save Button for: ${text}`);
    }

    /**
     * Clicks on the close button to close the task details.
     */
    public async clickCloseButton(): Promise<void> {
        const closeButtonLocator = this.actions.getLocator(this.elements.closeButton.selector);
        await this.actions.click(closeButtonLocator, this.elements.closeButton.name);
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

export const taskChecklistPage = new TaskChecklistPage();
