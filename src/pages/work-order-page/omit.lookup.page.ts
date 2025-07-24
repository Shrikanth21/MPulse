import { expect, Page, selectors } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { gridHeaderSearchFiltersPage } from "./grid.header.searchfilters.page";
import { timeouts } from "../../helper/timeouts-config";
import { commonActionPage } from "../common.action.page";

class OmitAndLookupPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the first work order record in the grid.
     */
    public async clickFirstWorkOrderRecord(): Promise<void> {
        const recordLocator = this.actions.getLocator(commonActionPage.getRowCellSelector(2)).nth(0);
        await this.actions.waitForElementToBeVisible(recordLocator, "First Work Order Record");
        await this.actions.click(recordLocator, "First Work Order Record");
    }

    /**
     * Clicks on the "Omit" button in the grid header.
     * @param btnText The text of the button to click.
     */
    public async clickOnButton(btnText: string): Promise<void> {
        const buttonTextEl = await this.actions.getLocator(commonActionPage.getButtonByText(btnText));
        await this.actions.waitForElementToBeVisible(buttonTextEl, `${btnText} is visible`);
        await this.actions.click(buttonTextEl, `${btnText} is clickable`);
    }

    /**
     * Verifies that the first work order record is not visible after omitting.
     * This is done by checking that the record is hidden in the grid.
     */
    public async verifyOmitRecord(): Promise<void> {
        const recordLocator = this.actions.getLocator(commonActionPage.getRowCellSelector(2)).nth(0);
        await this.actions.waitForElementToBeHidden(recordLocator, "First Work Order Record");
    }

    /**
     * Verifies that the "Lookup" button is visible and clickable.
     * @param btnText The text of the button to click.
     */
    public async verifyOnlyWorkOrderVisible(workOrderId: string): Promise<void> {
        const expectedRecord = this.actions.getLocator(commonActionPage.getCustomDivByTitle(workOrderId));
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.waitForElementToBeVisible(expectedRecord, `Work Order ${workOrderId} is visible`);
    }
}

export const omitAndLookupPage = new OmitAndLookupPage();
