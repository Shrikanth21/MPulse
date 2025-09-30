import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { WkoMaintenanceAdvisorPageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.maintenance.advisor.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";

class WkoMaintenanceAdvisorPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Navigates to a specific page in the Maintenance Advisor.
     * @param pages The name of the page to navigate to.
     */
    public async navigateToPages(pages: string): Promise<void> {
        const pageLink = this.actions.getLocator(CommonPageLocators.getLinkByTitle(pages));
        await this.actions.waitForElementToBeVisible(pageLink, `${pages} link`);
        await this.actions.click(pageLink, `${pages} link`);
    }

    /**
     * Verifies the page title after navigation.
     * @param title The expected title of the page.
     */
    public async verifyPageTitle(title: string): Promise<void> {
        const pageTitle = this.actions.getLocator(CommonPageLocators.getLinkByTitle(title));
        await this.actions.waitForElementToBeVisible(pageTitle, `Page title: ${title}`);
        const actualTitle = await this.actions.getText(pageTitle, `Page title: ${title}`);
        await this.actions.assertEqual(actualTitle, title, `Page title should be "${title}"`);
    }

    /**
     * Clicks on the dropdown toggle to open the dropdown menu.
     */
    public async clickOnDropdownToggle(): Promise<void> {
        const dropdownToggle = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.dropdownToggle.selector);
        await this.actions.waitForElementToBeVisible(dropdownToggle, WkoMaintenanceAdvisorPageLocators.dropdownToggle.name);
        await this.actions.click(dropdownToggle, WkoMaintenanceAdvisorPageLocators.dropdownToggle.name);
    }

    /**
     * Drags a column header to the group panel to group by that column.
     * @param columnName The name of the column to drag and drop.
     */
    public async selectConfigureDashboard(): Promise<void> {
        await this.clickOnDropdownToggle();
        const configureDashboardOption = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.configureDashboardOption.selector);
        await this.actions.waitForElementToBeVisible(configureDashboardOption, WkoMaintenanceAdvisorPageLocators.configureDashboardOption.name);
        await this.actions.click(configureDashboardOption, WkoMaintenanceAdvisorPageLocators.configureDashboardOption.name);
        const savedLayoutsLocator = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.savedLayouts.selector);
        await this.actions.waitForElementToBeVisible(savedLayoutsLocator, WkoMaintenanceAdvisorPageLocators.savedLayouts.name);
    }

    /**
     * Selects a saved layout from the dropdown.
     * @param layoutName The name of the layout to select.
     */
    public async selectSavedLayout(layoutName: string): Promise<void> {
        await this.selectConfigureDashboard();
        const savedLayoutLocator = this.actions.getLocator(CommonPageLocators.getLabelByTitle(layoutName));
        await this.actions.waitForElementToBeVisible(savedLayoutLocator, `Saved Layout: ${layoutName}`);
        await this.actions.click(savedLayoutLocator, `Saved Layout: ${layoutName}`);
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(CommonPageLocators.getLabelByTitle(`Work Order Records-${layoutName}`)),
            `Work Order Records - ${layoutName}`
        );
    }

    /**
     * Verifies that the draggable block head exists.
     * @param layoutName The name of the layout to verify.
     */
    public async verifyDraggableBlockHeadExists(layoutName: string): Promise<void> {
        const draggableBlockHead = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.draggableBlockHead.selector);
        await this.actions.waitForElementToBeVisible(draggableBlockHead, WkoMaintenanceAdvisorPageLocators.draggableBlockHead.name);
        const actualText = await this.actions.getText(draggableBlockHead, WkoMaintenanceAdvisorPageLocators.draggableBlockHead.name);
        await this.actions.assertEqual(actualText.trim(), `Work Order Records-${layoutName}`, "Draggable block head text mismatch");
    }

    /**
     * Verifies that the color code is applied correctly to the Maintenance Advisor.
     * @param expectedColor The expected color code to verify.
     */
    public async verifyMaintenanceAdvisorColorCodeApplied(expectedColor: string): Promise<void> {
        const colorCodeFilterInput = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.dataRows.selector).nth(0);
        await this.actions.waitForElementToBeVisible(colorCodeFilterInput, WkoMaintenanceAdvisorPageLocators.dataRows.name);
        await this.actions.waitForCustomDelay(timeouts.small);
        let appliedColor = await this.actions.getCSSProperty(colorCodeFilterInput, 'background-color', WkoMaintenanceAdvisorPageLocators.dataRows.name);
        if (!appliedColor || appliedColor === 'transparent') {
            const parentLocator = colorCodeFilterInput.locator('..');
            appliedColor = await this.actions.getCSSProperty(parentLocator, 'background-color', `Parent of ${WkoMaintenanceAdvisorPageLocators.dataRows.name}`);
        }
        await this.actions.assertEqual(appliedColor, expectedColor, `Color code "${expectedColor}" is not applied correctly. Found: "${appliedColor}"`);
    }

    /**
     * Removes the current layout from the Maintenance Advisor.
     */
    public async removeLayout(): Promise<void> {
        await this.selectConfigureDashboard();
        const removeButton = this.actions.getLocator(WkoMaintenanceAdvisorPageLocators.removeButton.selector);
        await this.actions.waitForElementToBeVisible(removeButton, WkoMaintenanceAdvisorPageLocators.removeButton.name);
        await this.actions.click(removeButton, WkoMaintenanceAdvisorPageLocators.removeButton.name);
    }
}

export const wkoMaintenanceAdvisorPageActions = new WkoMaintenanceAdvisorPageActions();
