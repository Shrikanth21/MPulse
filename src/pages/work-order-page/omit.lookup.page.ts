import { expect, Page, selectors } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { gridHeaderSearchFiltersPage } from "./grid.header.searchfilters.page";
import { timeouts } from "../../helper/timeouts-config";

class OmitAndLookupPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private getWorkOrderById = (id: string): string => `//div[@title='${id}']`
    private getbuttonByText = (btnText: string): string => `//button[normalize-space()='${btnText}']`;

    public async clickFirstWorkOrderRecord(): Promise<void> {
        const recordLocator = this.actions.getLocator(gridHeaderSearchFiltersPage.getRowCellSelector(2)).nth(0);
        await this.actions.waitForElementToBeVisible(recordLocator, "First Work Order Record");
        await this.actions.click(recordLocator, "First Work Order Record");
    }

    public async clickOnButton(btnText: string): Promise<void> {
        const buttonTextEl = await this.actions.getLocator(this.getbuttonByText(btnText));
        await this.actions.waitForElementToBeVisible(buttonTextEl, `${btnText} is visible`);
        await this.actions.click(buttonTextEl, `${btnText} is clickable`);
    }

    public async verifyOmitRecord(): Promise<void> {
        const recordLocator = this.actions.getLocator(gridHeaderSearchFiltersPage.getRowCellSelector(2)).nth(0);
        await this.actions.waitForElementToBeHidden(recordLocator, "First Work Order Record");
    }

    public async verifyOnlyWorkOrderVisible(workOrderId: string): Promise<void> {
        const expectedRecord = this.actions.getLocator(this.getWorkOrderById(workOrderId));
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.waitForElementToBeVisible(expectedRecord, `Work Order ${workOrderId} is visible`);
    }
}

export const omitAndLookupPage = new OmitAndLookupPage();
