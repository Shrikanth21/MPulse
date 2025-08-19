import { Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";
import { commonActionPage } from "../common.action.page";
import { timeouts } from "../../helper/timeouts-config";
import { homePage } from "../home-page/Home.page";

class SMRAutoConvert {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelector = {
        onDueDateRadioBtn: { selector: "//div[contains(@title,'automatically convert any Scheduled  Maintenance record to a work order')]//div[text()='on due date']", name: "On Due Date Radio Button" },
        configEnableConversionLeadTimeCheckBox: { selector: "//div[@dx-check-box='configEnableConversionLeadTimeCheckBox']", name: "Enable Conversion Lead Time Check Box" },
        dropdownMenu: { selector: "//a[@id='dropdownMenu2']", name: "Dropdown Menu" },
        openWorkOrdersPopup: { selector: "//a[@popuptype='OpenWorkOrdersPopup']", name: "Open Work Orders Popup" },
        workOrderLink: { selector: "//div[@class='modal-body view-popup-body customize ng-scope']/descendant::a[@class='dx-link ng-scope']", name: "Work Order Link" },
        editScheduledMaintenance: { selector: "//li[@ng-click='editScheduledMaintenance()']", name: "Edit Scheduled Maintenance" },
        saveScheduledMaintenance: { selector: "//li[@ng-click='saveScheduledMaintenance()']", name: "Save Scheduled Maintenance" }
    }

    /**
     * Click on the Edit Scheduled Maintenance
     */
    public async clickEditScheduledMaintenance(): Promise<void> {
        const editScheduledMaintenanceEl = await this.actions.getLocator(this.elementSelector.editScheduledMaintenance.selector);
        await this.actions.waitForClickable(editScheduledMaintenanceEl, this.elementSelector.editScheduledMaintenance.name);
        await this.actions.click(editScheduledMaintenanceEl, this.elementSelector.editScheduledMaintenance.name);
    }

    /**
     * Click on the Save Scheduled Maintenance
     */
    public async clickSaveScheduledMaintenance(): Promise<void> {
        const saveScheduledMaintenanceEl = await this.actions.getLocator(this.elementSelector.saveScheduledMaintenance.selector);
        await this.actions.waitForClickable(saveScheduledMaintenanceEl, this.elementSelector.saveScheduledMaintenance.name);
        await this.actions.click(saveScheduledMaintenanceEl, this.elementSelector.saveScheduledMaintenance.name);
    }

    /**
     * Enable SMR Auto Convert
     */
    public async enableSmrAutoConvert(): Promise<void> {
        await this.clickEditScheduledMaintenance();
        const onDueDateRadioBtnEl = await this.actions.getLocator(this.elementSelector.onDueDateRadioBtn.selector);
        await this.actions.waitForClickable(onDueDateRadioBtnEl, this.elementSelector.onDueDateRadioBtn.name);
        await this.actions.click(onDueDateRadioBtnEl, this.elementSelector.onDueDateRadioBtn.name);
        const configEnableConversionLeadTimeCheckBoxEl = await this.actions.getLocator(this.elementSelector.configEnableConversionLeadTimeCheckBox.selector);
        const isCheckedCheckbox = await this.actions.isCheckboxChecked(configEnableConversionLeadTimeCheckBoxEl, this.elementSelector.configEnableConversionLeadTimeCheckBox.name);
        if (!(isCheckedCheckbox)) {
            await this.actions.waitForClickable(configEnableConversionLeadTimeCheckBoxEl, this.elementSelector.configEnableConversionLeadTimeCheckBox.name);
            await this.actions.click(configEnableConversionLeadTimeCheckBoxEl, this.elementSelector.configEnableConversionLeadTimeCheckBox.name);
        }
        await this.clickSaveScheduledMaintenance();
    }

    /**
     * Click on the Dropdown Menu
     */
    public async clickDropdownMenu(): Promise<void> {
        const dropdownMenuEl = await this.actions.getLocator(this.elementSelector.dropdownMenu.selector);
        await this.actions.waitForClickable(dropdownMenuEl, this.elementSelector.dropdownMenu.name);
        await this.actions.click(dropdownMenuEl, this.elementSelector.dropdownMenu.name);
        const openWorkOrdersPopupEl = await this.actions.getLocator(this.elementSelector.openWorkOrdersPopup.selector);
        await this.actions.waitForClickable(openWorkOrdersPopupEl, this.elementSelector.openWorkOrdersPopup.name);
        await this.actions.click(openWorkOrdersPopupEl, this.elementSelector.openWorkOrdersPopup.name);
    }

    /**
     * Navigate to a specific page from the side menu
     * @param menuItemTitle The title of the menu item
     * @param subMenuItemTitle The title of the sub-menu item
     * @param pageURL The expected URL of the page
     */
    public async navigateToPageFromOtherMenu(menuItemTitle: string, subMenuItemTitle: string, pageURL: string): Promise<void> {
        await homePage.clickSideMenuIcon();
        await commonActionPage.clickOnSpanByTitle(menuItemTitle);
        await homePage.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(pageURL);
    }

    /**
     * Verify if SMR Auto Convert is enabled
     */
    public async waitForAutoConversion(): Promise<void> {
        await this.currentPage.reload();
        await this.actions.waitForCustomDelay(timeouts.huge);
        await commonActionPage.clickByLinkText('Scheduled Maintenance Options');
        await commonActionPage.clickByLinkText('Scheduled Maintenance Records');
    }

    /**
     * Verify if the converted Work Order is displayed
     */
    public async verifyConvertedWorkOrder(): Promise<void> {
        const workOrderLinkEl = await this.actions.getLocator(this.elementSelector.workOrderLink.selector);
        await this.actions.waitForElementToBeVisible(workOrderLinkEl, this.elementSelector.workOrderLink.name);
        await this.actions.waitForClickable(workOrderLinkEl, this.elementSelector.workOrderLink.name);
    }

    /**
     * Click on the converted Work Order
     */
    public async clickOnConvertedWorkOrder(): Promise<void> {
        const workOrderLinkEl = await this.actions.getLocator(this.elementSelector.workOrderLink.selector);
        await this.actions.waitForClickable(workOrderLinkEl, this.elementSelector.workOrderLink.name);
        await this.actions.click(workOrderLinkEl, this.elementSelector.workOrderLink.name);
    }
}

export const smrAutoConvert = new SMRAutoConvert();
