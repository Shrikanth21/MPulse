import { expect, Locator, Page, selectors } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import logger from "../../helper/loggs/logger";
import { timeouts } from "../../helper/timeouts-config";
import { commonActionPage } from "../common.action.page";

class WithGroupFilterPage {

    page: any;
    private get currentPage(): Page {
        return getPage();
    }
    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }
    private elements = {
        Groupcheckbox: { selector: "  //label[contains(., 'Group')]/input[@type='checkbox']", name: "Group" },
        groupExpandIcon: { selector: "//td[@class='dx-command-expand dx-datagrid-group-space dx-datagrid-expand dx-selection-disabled']", name: "Grouped Expand Icon" },
        statusGroupedHeader: { selector: "//td[starts-with(normalize-space(), 'Status:')]", name: "Grouped Header - Status" },
        createdByGroupedHeader: { selector: "//td[starts-with(normalize-space(), 'Created By:')]", name: "Grouped Header - Created By" },
        groupPanelDefault: { selector: "//div[@class='dx-group-panel-message']", name: "Default Group Panel" },
        groupPanelAfterDrop: { selector: "//div[@class='dx-datagrid-group-panel']", name: "Group Panel After Drop" }
    };

    /**
     * Clicks on the group checkbox to enable grouping.
     */
    public async clickGroupCheckbox(): Promise<void> {
        const groupCheckbox = this.actions.getLocator(this.elements.Groupcheckbox.selector);
        await this.actions.click(groupCheckbox, this.elements.Groupcheckbox.name);
    }

    /**
     * Verifies that the group checkbox is checked.
     * @returns A boolean indicating whether the group checkbox is checked.
     */
    public async expandStatusGroup(): Promise<void> {
        const expandIcon = this.actions.getLocator(this.elements.groupExpandIcon.selector).nth(0);
        await this.actions.waitForElementToBeVisible(expandIcon, this.elements.groupExpandIcon.name);
        if (await expandIcon.isVisible()) {
            await this.actions.click(expandIcon, "Status group expand icon");
        }
    }

    public async expandCreatedByGroup(): Promise<void> {
        const expandIcons = this.actions.getLocator(this.elements.groupExpandIcon.selector).nth(1);
        await this.actions.click(expandIcons, this.elements.groupExpandIcon.name);
    }

    /**
     * Drags a column header to the group panel to group by that column.
     * @param columnName The name of the column to drag and drop.
     */
    public async dragColumnToGroupPanel(columnName: string): Promise<void> {
        switch (columnName) {
            case 'Status':
                const sourceLocator = this.actions.getLocator(commonActionPage.getColumnHeaderLocator(columnName));
                const targetLocator = this.actions.getLocator(this.elements.groupPanelDefault.selector);
                await this.actions.dragAndDrop(sourceLocator, targetLocator, `${columnName} header`, 'Group panel');
                await this.actions.waitForCustomDelay(timeouts.medium);
                break;
            case 'Created By':
                const sourceLocatorSecond = this.actions.getLocator(commonActionPage.getColumnHeaderLocator(columnName));
                const targetLocatorSecond = this.actions.getLocator(this.elements.groupPanelAfterDrop.selector);
                await this.actions.dragAndDrop(sourceLocatorSecond, targetLocatorSecond, `${columnName} header`, 'Group panel');
                break;
            default:
                break;
        }
    }

    /**
     * Verifies that the group checkbox is checked.
     * @returns A boolean indicating whether the group checkbox is checked.
     */
    public async verifyGroupedColumnHeaderExists(columnName: string): Promise<void> {
        const groupHeaderLocator = this.actions.getLocator(commonActionPage.getGroupedHeaderLocator(columnName));
        await this.actions.waitForElementToBeVisible(groupHeaderLocator, `Grouped column header "${columnName}" should be visible`);
        const actualText = await this.actions.getText(groupHeaderLocator, `Verifying grouped column header text`);
        await this.actions.assertEqual(actualText.trim(), columnName, `Grouped column header "${columnName}" text mismatch`);
    }

    /**
     * Verifies that the group checkbox is checked.
     * @returns A boolean indicating whether the group checkbox is checked.
     */
    public async verifyGroupedColumnHeadersVisible(groupByText: string): Promise<void> {
        switch (groupByText) {
            case 'Status': {
                const statusHeaderLocator = this.actions.getLocator(this.elements.statusGroupedHeader.selector).nth(0);
                await this.actions.waitForElementToBeVisible(statusHeaderLocator, "Grouped Header - Status");
                const headerText = await this.actions.getText(statusHeaderLocator, "Grouped Header - Status");
                await this.actions.assertContains(headerText, "Status:");
                await this.expandStatusGroup();
                break;
            }
            case 'Created By': {
                const createdByHeaderLocator = this.actions.getLocator(this.elements.createdByGroupedHeader.selector).nth(0);
                await this.actions.waitForElementToBeVisible(createdByHeaderLocator, "Grouped Header - Created By");
                const headerText = await this.actions.getText(createdByHeaderLocator, "Grouped Header - Created By");
                await this.actions.assertContains(headerText, "Created By:");
                break;
            }
            default:
                logger.warn(`No assertion defined for groupByText: ${groupByText}`);
                break;
        }
    }
}

export const withGroupFilterPage = new WithGroupFilterPage();
