import { Page } from '@playwright/test';
import { getPage } from '../../base/base';
import { WebActions } from '../../base/web.action.util';

class BuildingRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        descriptionInputField: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input Field" },
        saveIcon: { selector: '#save-work-order', name: "Save Icon" },
        mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
        fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
        uploadButton: { selector: "//button[@title='Upload']", name: "Upload Button" },
    };

    private getLinkByTitle = (title: string): string => `//a[@title='${title}']`;
    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getLinkByTitleSecondOccurrence = (title: string): string => `(//a[@title='${title}'])[2]`;

    public async clickLinkByTitle(title: string): Promise<void> {
        await this.actions.click(this.actions.getLocator(this.getLinkByTitle(title)), title);
    }

    public async enterDescription(description: string): Promise<void> {
        await this.actions.typeText(
            this.actions.getLocator(this.elements.descriptionInputField.selector),
            description,
            this.elements.descriptionInputField.name
        );
    }

    public async clickButtonByText(buttonText: string): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.getElementByText(buttonText)),
            `${buttonText} Button`
        );
    }

    public async clickSaveIcon(): Promise<void> {
        await this.actions.click(
            this.actions.getLocator(this.elements.saveIcon.selector),
            this.elements.saveIcon.name
        );
    }

    public async uploadMediaFile(mediaButtonText: string, linkIconTitle: string, filePath: string): Promise<void> {
        await this.clickButtonByText(mediaButtonText);
        await this.actions.click(
            this.actions.getLocator(this.elements.mediaMoreButton.selector),
            this.elements.mediaMoreButton.name
        );

        await this.actions.click(
            this.actions.getLocator(this.getLinkByTitleSecondOccurrence(linkIconTitle)),
            `Second Occurrence of Link: ${linkIconTitle}`
        );

        await this.actions.uploadFile(
            this.actions.getLocator(this.elements.fileInput.selector),
            filePath,
            'Media File Upload'
        );

        await this.actions.click(
            this.actions.getLocator(this.elements.uploadButton.selector),
            this.elements.uploadButton.name
        );
    }

    public async createTaskWithMediaUpload(addButtonTitle: string, taskDescription: string, mediaButtonText: string, mediaLinkTitle: string, mediaFilePath: string): Promise<void> {
        await this.clickLinkByTitle(addButtonTitle);
        await this.enterDescription(taskDescription);
        await this.uploadMediaFile(mediaButtonText, mediaLinkTitle, mediaFilePath);
        await this.clickSaveIcon();
    }

    public async deleteBuildingRecord(crossIconTitle: string, continueButtonText: string): Promise<void> {
        await this.clickLinkByTitle(crossIconTitle);
        await this.clickButtonByText(continueButtonText);
    }
}

export const buildingRecordsPage = new BuildingRecordsPage();
