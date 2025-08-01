import { Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";
import { timeouts } from "../../helper/timeouts-config";
import { commonActionPage } from "../common.action.page";

class GridPage {

  private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }
    
    private Elements = {
        sortingWorkOrderByID: { selector: '//div[@dx-data-grid="listviewgrid"]/descendant::div[text()="ID#"]', name: 'sort workorder by id' },
        beforeWorkOrderID: { selector: "//td[contains(@aria-describedby,'dx-col') and @aria-colindex='2']", name: 'first workID' },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        sideBarCollapse: { selector: "//div[@class='sideBarExOptions']//i[@class='fas fa-chevron-left']", name: "Sidebar Collapse Icon" },
    };

    /**
     * Gets the text of the current work order ID.
     * @returns The text of the current work order ID.
     */
    public async getCurrentWorkOrderIdText(): Promise<string> {
        const beforesortedwoID = this.actions.getLocator(this.Elements.beforeWorkOrderID.selector).nth(0);
        await this.actions.waitForElementToBeVisible(beforesortedwoID, this.Elements.beforeWorkOrderID.name);
        return await this.actions.getText(beforesortedwoID, this.Elements.beforeWorkOrderID.name);
    }

    /**
     * Clicks on the sidebar expander to expand the sidebar.
     */
    public async clickOnSideBarExpander(): Promise<void> {
        const sideBarExpander = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpander, commonActionPage.elements.sideBarExpander.name);
    }

    /**
     * Clicks on the maximize button to maximize the grid view.
     */
    public async clickOnMaximizeButton(): Promise<void> {
        const maximizeButton = this.actions.getLocator(this.Elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.Elements.maximizeButton.name);
    }

    /**
     * Clicks on the column header to sort by Work Order ID.
     */
    public async clickColumnHeader(): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.large);
        const sortbyid = this.actions.getLocator(this.Elements.sortingWorkOrderByID.selector);
        await this.actions.waitForElementToBeVisible(sortbyid, this.Elements.sortingWorkOrderByID.name);
        await this.actions.click(sortbyid, this.Elements.sortingWorkOrderByID.name);
        await this.currentPage.waitForTimeout(timeouts.largest);
    }

    /**
     * Clicks on the sidebar collapse icon to collapse the sidebar.
     */
    public async clickOnSideBarCollapse(): Promise<void> {
        const sideBarCollapse = this.actions.getLocator(this.Elements.sideBarCollapse.selector);
        await this.actions.click(sideBarCollapse, this.Elements.sideBarCollapse.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    /**
     * Verifies that the Work Order ID is sorted correctly after clicking the column header.
     * @param beforesortedText The Work Order ID before sorting.
     */
    public async verifySortedWorkOrderId(beforesortedText: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const afteresortedwoID = this.actions.getLocator(this.Elements.beforeWorkOrderID.selector).nth(0);
        await this.actions.waitForElementToBeVisible(afteresortedwoID, this.Elements.beforeWorkOrderID.name);
        const aftereSortedwoID = await afteresortedwoID.innerText();
        console.log(`Before sorted Work Order ID: ${beforesortedText} and After sorted Work Order ID: ${aftereSortedwoID}`);
        await this.actions.assertNotEqual(
            aftereSortedwoID,
            beforesortedText,
            `Work Order ID "${aftereSortedwoID}" should not be equal to the previous Work Order ID "${beforesortedText}"`
        );
    }
}

export const gridPage = new GridPage();
