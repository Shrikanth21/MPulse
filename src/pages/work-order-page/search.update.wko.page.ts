import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";

class SearchUpdateWorkOrderPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        getwoID: { selector: "//span[@id='ID']", name: 'work order ID' },
        getSearchBar: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
        getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
        getClickonTask: { selector: "//div[@class='dx-scrollable-content']/descendant::a[contains(text(),'WKO')]", name: 'select task', },
        getEditIcon: { selector: "//a[@title='Edit']//i[@class='fa fa-pencil-alt']", name: 'edit Button' },
        descriptionInput: { selector: "//div[@fieldname='RecordDescription']//input", name: "Description Input" },
        getSaveButton: { selector: "//li[@id='save-work-order']", name: 'save button' },
        getDescriptionText: { selector: "//div[@class='itemDetailInfo']/descendant::span[@id='Description']", name: 'description text' },
    };

    public async getWorkOrderId(): Promise<string> {
        const workOrderIdLocator = this.actions.getLocator(this.elements.getwoID.selector);
        return await this.actions.getText(workOrderIdLocator, this.elements.getwoID.name);
    }

    public async getDescription(): Promise<string> {
        const descriptionLocator = this.actions.getLocator(this.elements.getDescriptionText.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, this.elements.getDescriptionText.name);
        return await this.actions.getText(descriptionLocator, this.elements.getDescriptionText.name);
    }

    public async searchWorkOrder(workOrderId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(this.elements.getSearchBar.selector);
        await this.actions.typeText(searchBarLocator, workOrderId, this.elements.getSearchBar.name);
        const searchButtonLocator = this.actions.getLocator(this.elements.getEnterSearchBar.selector);
        await this.actions.click(searchButtonLocator, this.elements.getEnterSearchBar.name);
    }

    public async verifySearchResult(beforeSearchResultText: string): Promise<void> {
        const afterSearchResultTextEl = this.actions.getLocator(this.elements.getClickonTask.selector);
        const afterSearchResultText = await this.actions.getText(afterSearchResultTextEl, this.elements.getClickonTask.name);
        await this.actions.assertEqual(afterSearchResultText, beforeSearchResultText);
    }

    public async clickOnSearchResult(): Promise<void> {
        const searchResultLocator = this.actions.getLocator(this.elements.getClickonTask.selector);
        await this.actions.waitForElementToBeVisible(searchResultLocator, this.elements.getClickonTask.name);
        await this.actions.click(searchResultLocator, this.elements.getClickonTask.name);
    }

    public async clickOnEditIcon(): Promise<void> {
        const editIconLocator = this.actions.getLocator(this.elements.getEditIcon.selector);
        await this.actions.click(editIconLocator, this.elements.getEditIcon.name);
    }

    public async enterNewDescription(newDescription: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.descriptionInput.selector);
        await this.actions.typeText(descriptionLocator, newDescription, this.elements.descriptionInput.name);
    }

    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(this.elements.getSaveButton.selector);
        await this.actions.click(saveButtonLocator, this.elements.getSaveButton.name);
    }

    public async verifyUpdatedDescription(expectedDescription: string): Promise<void> {
        const descriptionTextLocator = this.actions.getLocator(this.elements.getDescriptionText.selector);
        const actualDescription = await this.actions.getText(descriptionTextLocator, this.elements.getDescriptionText.name);
        await this.actions.assertNotEqual(actualDescription, expectedDescription);
    }
}

export const searchUpdateWorkOrderPage = new SearchUpdateWorkOrderPage();
