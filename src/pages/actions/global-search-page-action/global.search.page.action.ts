import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { commonPageActions } from "../common.page.actions";
import { CommonPageLocators } from "../../locators/common.page.locator";
import { mrRecordsPageAction } from "../workorder.page.action/maintenance-request-records-page.action/mr.records.page.action";
import { GlobalSearchPageLocators } from "../../locators/global-search-page-locator/global.search.page.locator";

class GlobalSearchPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Searches for an equipment record by its ID.
     * @param recordId The ID of the equipment record to search for.
     */
    public async searchRecord(recordId: string): Promise<void> {
        const searchBarLocator = this.actions.getLocator(GlobalSearchPageLocators.searchBarInput.selector);
        await this.actions.waitForElementToBeVisible(searchBarLocator, GlobalSearchPageLocators.searchBarInput.name);
        await this.actions.typeText(searchBarLocator, recordId, GlobalSearchPageLocators.searchBarInput.name);
        const searchButtonLocator = this.actions.getLocator(GlobalSearchPageLocators.getEnterSearchBar.selector);
        await this.actions.waitForClickable(searchButtonLocator, GlobalSearchPageLocators.getEnterSearchBar.name);
        await this.actions.click(searchButtonLocator, GlobalSearchPageLocators.getEnterSearchBar.name);
    }

    /**
     * Verifies the search result for an equipment record.
     * @param recordId The ID of the equipment record.
     * @param description The description of the equipment record.
     */
    public async verifySearchResult(searchGroup: string, recordId: string, description: string): Promise<void> {
        const headerLocator = await this.actions.getLocator(GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        const idText = await CommonPageLocators.getLinkByText(recordId);
        const descriptionText = await CommonPageLocators.getLinkByText(description);
        await this.actions.assertContains(idText, recordId);
        await this.actions.assertContains(descriptionText, description);
    }

    /**
     * Clicks all "Show More" links to expand search results.
     */
    public async clickAllShowMoreLinks(): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        let showMoreLinks = this.actions.getLocator(GlobalSearchPageLocators.showMoreLink.selector);
        while (await showMoreLinks.count() > 0) {
            const count = await showMoreLinks.count();
            for (let i = 0; i < count; i++) {
                const button = showMoreLinks.nth(i);
                if (await button.isVisible()) {
                    await button.scrollIntoViewIfNeeded();
                    await button.waitFor({ state: "visible" });
                    await button.click();
                    await this.actions.waitForCustomDelay(timeouts.small);
                }
            }
            showMoreLinks = this.actions.getLocator(GlobalSearchPageLocators.showMoreLink.selector);
        }
    }

    /**
     * Verifies the search result for a maintenance request record.
     * @param searchGroup The search group to look in.
     * @param recordId The ID of the maintenance request record.
     * @param description The description of the maintenance request record.
     * @param status The status of the maintenance request record.
     * @param title The title of the maintenance request record.
     */
    public async verifySearchResultWithStatus(searchGroup: string, recordId: string, description: string, status: string, title: string): Promise<void> {
        await this.clickAllShowMoreLinks();
        const headerLocator = this.actions.getLocator(GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        const idText = await CommonPageLocators.getLinkByText(recordId);
        const descriptionText = await CommonPageLocators.getLinkByText(description);
        await this.actions.assertContains(idText, recordId);
        await this.actions.assertContains(descriptionText, description);
        const statusText = await this.actions.getLocator(GlobalSearchPageLocators.searchedRequestStatusRows(searchGroup));
        const isVisible = await statusText.isVisible();
        if (!isVisible) {
            await commonPageActions.clickLinkByTitle(title);
            await mrRecordsPageAction.validateElementText(status);
        } else {
            const actualStatusText = await statusText.innerText();
            await this.actions.assertEqual(actualStatusText, status, `The actual status text ${actualStatusText}`);
        }
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
        await commonPageActions.clickSpanByText(convertText);
        await commonPageActions.clickLinkByText(yesConvert);
        await commonPageActions.clickLinkByText(noButton);
    }

    /**
     * Verifies the search result for a purchase order record.
     * @param searchGroup The search group to look in.
     * @param recordId The ID of the purchase order record.
     * @param status The status of the purchase order record.
     */
    public async verifySearchPORResultWithStatus(searchGroup: string, recordId: string): Promise<void> {
        const headerLocator = this.actions.getLocator(GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        await this.actions.waitForElementToBeVisible(headerLocator, GlobalSearchPageLocators.searchRecordsHeader(searchGroup));
        const idText = await CommonPageLocators.getLinkByText(recordId);
        await this.actions.assertContains(idText, recordId);
    }
}

export const globalSearchPageActions = new GlobalSearchPageActions();