import { Page, request } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { APIRequestContext } from "@playwright/test";
import { ApiHelper } from "../../helper/api-helper/authentication-login";
import { CommonPageLocators } from "../locators/common.page.locator";

let apiRequestContext: APIRequestContext;
class OmitAndLookupPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
        recordCount: { selector: '//div[@class="right ng-binding ng-scope"]', name: 'record count' },
    };

    /**
     * Clicks on the first work order record in the grid.
     */
    public async clickFirstWorkOrderRecord(): Promise<void> {
        const recordLocator = this.actions.getLocator(CommonPageLocators.getRowCellByIndex(2)).nth(0);
        await this.actions.waitForElementToBeVisible(recordLocator, "First Work Order Record");
        await this.actions.click(recordLocator, "First Work Order Record");
    }

    /**
     * Clicks on the "Omit" button in the grid header.
     * @param btnText The text of the button to click.
     */
    public async clickOnButton(btnText: string): Promise<void> {
        const buttonTextEl = await this.actions.getLocator(CommonPageLocators.getButtonByText(btnText));
        await this.actions.waitForElementToBeVisible(buttonTextEl, `${btnText} is visible`);
        await this.actions.click(buttonTextEl, `${btnText} is clickable`);
    }

    /**
     * Verifies that the first work order record is not visible after omitting.
     * This is done by checking that the record is hidden in the grid.
     */
    public async verifyOmitRecord(omitRecord: string): Promise<void> {
        apiRequestContext = await request.newContext();
        const apiHelper = new ApiHelper(apiRequestContext);
        const allData = await apiHelper.loadData('<>', omitRecord);
        allData.forEach(async (element: string) => {
            await this.actions.assertNotEqual(element, omitRecord, `Verifying that the omitted record ${omitRecord} is not present`);
        });
    }

    /**
     * Verifies that the "Lookup" button is visible and clickable.
     * @param btnText The text of the button to click.
     */
    public async verifyOnlyWorkOrderVisible(workOrderId: string): Promise<void> {
        const expectedRecord = this.actions.getLocator(CommonPageLocators.getDivByTitle(workOrderId));
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.waitForElementToBeVisible(expectedRecord, `Work Order ${workOrderId} is visible`);
    }

    /**
     * Gets the total record count displayed on the page.
     * @returns The total record count.
     */
    public async getTotalRecordCount(): Promise<number> {
        const recordCountLocator = this.actions.getLocator(this.elementSelectors.recordCount.selector);
        await this.actions.waitForElementToBeVisible(recordCountLocator, this.elementSelectors.recordCount.name);
        const recordCountText = await this.actions.getText(recordCountLocator, this.elementSelectors.recordCount.name);
        const matches = recordCountText.match(/of\s+(\d+)/i);
        return matches ? parseInt(matches[1], 10) : 0;
    }

    /**
     * Verifies that the count of records after omitting is as expected.
     * @param afterOmitCount The expected record count after omitting.
     */
    public async verifyCountAfterOmitRecord(afterOmitCount: string): Promise<void> {
        const recordCount = await this.getTotalRecordCount();
        await this.actions.assertNotEqual(recordCount.toString(), afterOmitCount, `Expected ${afterOmitCount} to be omitted, but found ${recordCount} records.`);
    }
}

export const omitAndLookupPage = new OmitAndLookupPage();
