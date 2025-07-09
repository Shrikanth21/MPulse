import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";

class MaintenanceAdvisorPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        dropdownToggle: { selector: "//a[@class='dropdown-toggle pointer']", name: 'dropdown toggle' },
        draggableBlockHead: { selector: "//p[@class='draggble-block-head ng-binding']", name: 'draggable block head' },
        savedLayouts: { selector: "//div[@title='Saved Layouts']", name: 'saved layouts' },
        removeButton: { selector: "//button[@class='removebtn']", name: 'remove button' },
        configureDashboardOption: { selector: "//a[@title='Configure Dashboard']", name: 'configure dashboard option' },
        dataRows: { selector: "//tr[contains(@class, 'dx-row dx-data-row dx-column-lines')]", name: 'data rows' },
    };

    private getMaintenanceAdvisorLink = (title: string): string => `//a[@title='${title}']`;
    public getLabelByTitle = (layoutName: string): string => `//label[@title='${layoutName}']`;

    public async navigateToPages(pages: string): Promise<void> {
        const pageLink = this.actions.getLocator(this.getMaintenanceAdvisorLink(pages));
        await this.actions.waitForElementToBeVisible(pageLink, `${pages} link`);
        await this.actions.click(pageLink, `${pages} link`);
    }

    public async verifyPageTitle(title: string): Promise<void> {
        const pageTitle = this.actions.getLocator(this.getMaintenanceAdvisorLink(title));
        await this.actions.waitForElementToBeVisible(pageTitle, `Page title: ${title}`);
        const actualTitle = await this.actions.getText(pageTitle, `Page title: ${title}`);
        await this.actions.assertEqual(actualTitle, title, `Page title should be "${title}"`);
    }

    public async clickOnDropdownToggle(): Promise<void> {
        const dropdownToggle = this.actions.getLocator(this.elements.dropdownToggle.selector);
        await this.actions.waitForElementToBeVisible(dropdownToggle, this.elements.dropdownToggle.name);
        await this.actions.click(dropdownToggle, this.elements.dropdownToggle.name);
    }

    public async selectConfigureDashboard(): Promise<void> {
        await this.clickOnDropdownToggle();
        const configureDashboardOption = this.actions.getLocator(this.elements.configureDashboardOption.selector);
        await this.actions.waitForElementToBeVisible(configureDashboardOption, this.elements.configureDashboardOption.name);
        await this.actions.click(configureDashboardOption, this.elements.configureDashboardOption.name);
        const savedLayoutsLocator = this.actions.getLocator(this.elements.savedLayouts.selector);
        await this.actions.waitForElementToBeVisible(savedLayoutsLocator, this.elements.savedLayouts.name);
    }

    public async selectSavedLayout(layoutName: string): Promise<void> {
        await this.selectConfigureDashboard();
        const savedLayoutLocator = this.actions.getLocator(this.getLabelByTitle(layoutName));
        await this.actions.waitForElementToBeVisible(savedLayoutLocator, `Saved Layout: ${layoutName}`);
        await this.actions.click(savedLayoutLocator, `Saved Layout: ${layoutName}`);
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(this.getLabelByTitle(`Work Order Records-${layoutName}`)),
            `Work Order Records - ${layoutName}`
        );
    }

    public async verifyDraggableBlockHeadExists(layoutName: string): Promise<void> {
        const draggableBlockHead = this.actions.getLocator(this.elements.draggableBlockHead.selector);
        await this.actions.waitForElementToBeVisible(draggableBlockHead, this.elements.draggableBlockHead.name);
        const actualText = await this.actions.getText(draggableBlockHead, this.elements.draggableBlockHead.name);
        await this.actions.assertEqual(actualText.trim(), `Work Order Records-${layoutName}`, "Draggable block head text mismatch");
    }

    public async verifyMaintenanceAdvisorColorCodeApplied(color: string): Promise<void> {
        const colorCodeFilterInput = this.actions.getLocator(this.elements.dataRows.selector).nth(0);
        await this.actions.waitForElementToBeVisible(colorCodeFilterInput, this.elements.dataRows.name);
        const appliedColor = await this.actions.getCSSProperty(colorCodeFilterInput, 'background-color', this.elements.dataRows.name);
        console.log(`Applied color code: ${appliedColor}`);
        await this.actions.assertEqual(appliedColor, color, `Color code for ${color} is not applied correctly`);
    }

    public async removeLayout(layoutName: string): Promise<void> {
        await this.selectConfigureDashboard();
        const removeButton = this.actions.getLocator(this.elements.removeButton.selector);
        await this.actions.waitForElementToBeVisible(removeButton, this.elements.removeButton.name);
        await this.actions.click(removeButton, this.elements.removeButton.name);
    }
}

export const maintenanceAdvisorPage = new MaintenanceAdvisorPage();
