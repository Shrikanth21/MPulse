import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { WorkOrderFilterWithGroupPageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.filter.with.group.page.locator";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";
import logger from "../../../../helper/logger";

class WithGroupFilterPageActions {
    private get currentPage(): Page {
        return getPage();
    }
    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the group checkbox to enable grouping.
     */
    public async clickGroupCheckbox(): Promise<void> {
        const groupCheckbox = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.Groupcheckbox.selector);
        await this.actions.waitForElementToBeVisible(groupCheckbox, WorkOrderFilterWithGroupPageLocators.Groupcheckbox.name);
        await this.actions.click(groupCheckbox, WorkOrderFilterWithGroupPageLocators.Groupcheckbox.name);
    }

    /**
     * Verifies that the group checkbox is checked.
     * @returns A boolean indicating whether the group checkbox is checked.
     */
    public async expandStatusGroup(): Promise<void> {
        const expandIcon = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.groupExpandIcon.selector).nth(0);
        await this.actions.waitForElementToBeVisible(expandIcon, WorkOrderFilterWithGroupPageLocators.groupExpandIcon.name);
        if (await expandIcon.isVisible()) {
            await this.actions.click(expandIcon, WorkOrderFilterWithGroupPageLocators.groupExpandIcon.name);
        }
    }

    public async expandCreatedByGroup(): Promise<void> {
        const expandIcons = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.groupExpandIcon.selector).nth(1);
        await this.actions.waitForElementToBeVisible(expandIcons, WorkOrderFilterWithGroupPageLocators.groupExpandIcon.name);
        await this.actions.click(expandIcons, WorkOrderFilterWithGroupPageLocators.groupExpandIcon.name);
    }

    /**
     * Drags a column header to the group panel to group by that column.
     * @param columnName The name of the column to drag and drop.
     */
    public async dragColumnToGroupPanel(columnName: string): Promise<void> {
        switch (columnName) {
            case 'Status':
                const sourceLocator = this.actions.getLocator(CommonPageLocators.getColumnHeaderByText(columnName));
                const targetLocator = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.groupPanelDefault.selector);
                await this.actions.dragAndDrop(sourceLocator, targetLocator, `${columnName} header`, 'Group panel');
                await this.actions.waitForCustomDelay(timeouts.medium);
                break;
            case 'Created By':
                const sourceLocatorSecond = this.actions.getLocator(CommonPageLocators.getColumnHeaderByText(columnName));
                const targetLocatorSecond = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.groupPanelAfterDrop.selector);
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
        const groupHeaderLocator = this.actions.getLocator(CommonPageLocators.getGroupedHeaderByText(columnName));
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
                const statusHeaderLocator = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.statusGroupedHeader.selector).nth(0);
                await this.actions.waitForElementToBeVisible(statusHeaderLocator, "Grouped Header - Status");
                const headerText = await this.actions.getText(statusHeaderLocator, "Grouped Header - Status");
                await this.actions.assertContains(headerText, "Status:");
                await this.expandStatusGroup();
                break;
            }
            case 'Created By': {
                const createdByHeaderLocator = this.actions.getLocator(WorkOrderFilterWithGroupPageLocators.createdByGroupedHeader.selector).nth(0);
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

export const wkoFilterWithGroupPageActions = new WithGroupFilterPageActions();
