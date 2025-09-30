import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { WkoGridHeaderSortingLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.grid.header.sorting.locator";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";

class WkoGridHeaderSortingActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the sort up icon to sort the work order records in ascending order.
     */
    public async clickOnSortUpIcon(): Promise<void> {
        const sortUpIcon = this.actions.getLocator(WkoGridHeaderSortingLocators.sortUpIcon.selector);
        await this.actions.waitForElementToBeVisible(sortUpIcon, WkoGridHeaderSortingLocators.sortUpIcon.name);
        await this.actions.click(sortUpIcon, WkoGridHeaderSortingLocators.sortUpIcon.name);
    }

    /**
     * Gets the text of the current work order ID.
     * @returns The text of the current work order ID.
     */
    public async getCurrentWorkOrderIdText(): Promise<string> {
        const beforesortedwoID = this.actions.getLocator(WkoGridHeaderSortingLocators.beforeWorkOrderID.selector).nth(0);
        await this.actions.waitForElementToBeVisible(beforesortedwoID, WkoGridHeaderSortingLocators.beforeWorkOrderID.name);
        return await this.actions.getText(beforesortedwoID, WkoGridHeaderSortingLocators.beforeWorkOrderID.name);
    }

    /**
     * Clicks on the sidebar expander to expand the sidebar.
     */
    public async clickOnSideBarExpander(): Promise<void> {
        const sideBarExpander = this.actions.getLocator(CommonPageLocators.sideBarExpander.selector);
        await this.actions.waitForElementToBeVisible(sideBarExpander, CommonPageLocators.sideBarExpander.name);
        await this.actions.click(sideBarExpander, CommonPageLocators.sideBarExpander.name);
    }

    /**
     * Clicks on the maximize button to maximize the grid view.
     */
    public async clickOnMaximizeButton(): Promise<void> {
        const maximizeButton = this.actions.getLocator(CommonPageLocators.maximizeButton.selector);
        await this.actions.waitForElementToBeVisible(maximizeButton, CommonPageLocators.maximizeButton.name);
        await this.actions.click(maximizeButton, CommonPageLocators.maximizeButton.name);
    }

    /**
     * Clicks on the column header to sort by Work Order ID.
     */
    public async clickColumnHeader(): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.large);
        const sortbyid = this.actions.getLocator(WkoGridHeaderSortingLocators.sortingWorkOrderByID.selector);
        await this.actions.waitForElementToBeVisible(sortbyid, WkoGridHeaderSortingLocators.sortingWorkOrderByID.name);
        await this.actions.click(sortbyid, WkoGridHeaderSortingLocators.sortingWorkOrderByID.name);
        const isVisible = this.actions.getLocator(WkoGridHeaderSortingLocators.sortUpIcon.selector);
        if (await isVisible.isVisible()) {
            await this.clickOnSortUpIcon();
        }
        await this.currentPage.waitForTimeout(timeouts.largest);
    }

    /**
     * Clicks on the sidebar collapse icon to collapse the sidebar.
     */
    public async clickOnSideBarCollapse(): Promise<void> {
        const sideBarCollapse = this.actions.getLocator(WkoGridHeaderSortingLocators.sideBarCollapse.selector);
        await this.actions.waitForElementToBeVisible(sideBarCollapse, WkoGridHeaderSortingLocators.sideBarCollapse.name);
        await this.actions.click(sideBarCollapse, WkoGridHeaderSortingLocators.sideBarCollapse.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    /**
     * Verifies that the Work Order ID is sorted correctly after clicking the column header.
     * @param beforesortedText The Work Order ID before sorting.
     */
    public async verifySortedWorkOrderId(beforesortedText: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const afteresortedwoID = this.actions.getLocator(WkoGridHeaderSortingLocators.beforeWorkOrderID.selector).nth(0);
        await this.actions.waitForElementToBeVisible(afteresortedwoID, WkoGridHeaderSortingLocators.beforeWorkOrderID.name);
        const aftereSortedwoID = await afteresortedwoID.innerText();
        console.log(`Before sorted Work Order ID: ${beforesortedText} and After sorted Work Order ID: ${aftereSortedwoID}`);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.assertNotEqual(
            aftereSortedwoID,
            beforesortedText,
            `Work Order ID "${aftereSortedwoID}" should not be equal to the previous Work Order ID "${beforesortedText}"`
        );
    }
}
export const wkoGridHeaderSortingActions = new WkoGridHeaderSortingActions();