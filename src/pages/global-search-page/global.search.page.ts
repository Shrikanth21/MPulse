import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { commonActionPage } from "../common.action.page";

class GlobalSearchPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        searchBarInput: { selector: "//input[@aria-autocomplete='inline']", name: 'search bar' },
        getEnterSearchBar: { selector: "//i[@class='fa fa-search']", name: 'click on search option' },
        searchRecordsHeader: (searchGroup: string) => `//p[contains(text(),'${searchGroup}')]`,
        searchedRequestStatusRows: (recordPage: string) => `//div[@id='search-group']//p[contains(text(),'${recordPage}')]/following::tr[@class='dx-row dx-data-row dx-column-lines dx-selection']//div`

    }

    /**
     * Searches for an equipment record by its ID.
     * @param recordId The ID of the equipment record to search for.
     */
    public async searchRecord(recordId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(this.elements.searchBarInput.selector);
        await this.actions.waitForElementToBeVisible(searchBarLocator, this.elements.searchBarInput.name);
        await this.actions.typeText(searchBarLocator, recordId, this.elements.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(this.elements.getEnterSearchBar.selector);
        await this.actions.waitForClickable(searchButtonLocator, this.elements.getEnterSearchBar.name);
        await this.actions.click(searchButtonLocator, this.elements.getEnterSearchBar.name);
    }

    /**
     * Verifies the search result for an equipment record.
     * @param recordId The ID of the equipment record.
     * @param description The description of the equipment record.
     */
    public async verifySearchResult(searchGroup: string, recordId: string, description: string): Promise<void> {
        const headerLocator = this.actions.getLocator(this.elements.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, this.elements.searchRecordsHeader(searchGroup));
        const idText = await commonActionPage.getElementByLinkText(recordId);
        const descriptionText = await commonActionPage.getElementByLinkText(description);
        await this.actions.assertContains(idText, recordId);
        await this.actions.assertContains(descriptionText, description);
    }

    /**
     * Verifies the search result for a maintenance request record.
     * @param searchGroup The search group to look in.
     * @param recordId The ID of the maintenance request record.
     * @param description The description of the maintenance request record.
     * @param status The status of the maintenance request record.
     */
    public async verifySearchResultWithStatus(searchGroup: string, recordId: string, description: string, status: string): Promise<void> {
        const headerLocator = this.actions.getLocator(this.elements.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, this.elements.searchRecordsHeader(searchGroup));
        const idText = await commonActionPage.getElementByLinkText(recordId);
        const descriptionText = await commonActionPage.getElementByLinkText(description);
        await this.actions.assertContains(idText, recordId);
        await this.actions.assertContains(descriptionText, description);
        const statusText = await this.actions.getLocator(this.elements.searchedRequestStatusRows(searchGroup));
        const actualStatusText = await statusText.innerText();
        await this.actions.assertEqual(actualStatusText, status, `The actual status text ${actualStatusText}`);
    }

    /**
     * Clicks on the "Convert to Work Order" button.
     * @param convertText The text of the button to click.
     * @param yesConvert The text of the confirmation button to click.
     * @param noButton The text of the cancellation button to click.
     */
    public async clickOnConvertWorkOrderButton(
        convertText: string,
        yesConvert: string,
        noButton: string
    ): Promise<void> {
        await commonActionPage.clickBySpanText(convertText);
        await commonActionPage.clickElementByText(yesConvert);
        await commonActionPage.clickElementByText(noButton);
    }

    /**
     * Verifies the search result for a purchase order record.
     * @param searchGroup The search group to look in.
     * @param recordId The ID of the purchase order record.
     * @param status The status of the purchase order record.
     */
    public async verifySearchPORResultWithStatus(searchGroup: string, recordId: string): Promise<void> {
        const headerLocator = this.actions.getLocator(this.elements.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, this.elements.searchRecordsHeader(searchGroup));
        const idText = await commonActionPage.getElementByLinkText(recordId);
        await this.actions.assertContains(idText, recordId);
    }
}

export const globalSearchPage = new GlobalSearchPage();
