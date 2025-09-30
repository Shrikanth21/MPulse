import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { homePageActions } from "../home-page-action/home.page.actions";
import { commonPageActions } from "../common.page.actions";
import { timeouts } from "../../../helper/timeouts-config";
import { smrAutoConvertLocators } from "../../locators/scheduled-maintenance-page-locator/smr.auto.convert.locator";

class SMRAutoConvertAction {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Click on the Edit Scheduled Maintenance
     */
    public async clickEditScheduledMaintenance(): Promise<void> {
        const editScheduledMaintenanceEl = await this.actions.getLocator(smrAutoConvertLocators.editScheduledMaintenance.selector);
        await this.actions.waitForClickable(editScheduledMaintenanceEl, smrAutoConvertLocators.editScheduledMaintenance.name);
        await this.actions.click(editScheduledMaintenanceEl, smrAutoConvertLocators.editScheduledMaintenance.name);
    }

    /**
     * Click on the Save Scheduled Maintenance
     */
    public async clickSaveScheduledMaintenance(): Promise<void> {
        const saveScheduledMaintenanceEl = await this.actions.getLocator(smrAutoConvertLocators.saveScheduledMaintenance.selector);
        await this.actions.waitForClickable(saveScheduledMaintenanceEl, smrAutoConvertLocators.saveScheduledMaintenance.name);
        await this.actions.click(saveScheduledMaintenanceEl, smrAutoConvertLocators.saveScheduledMaintenance.name);
    }

    /**
     * Enable SMR Auto Convert
     */
    public async enableSmrAutoConvert(): Promise<void> {
        await this.clickEditScheduledMaintenance();
        const onDueDateRadioBtnEl = await this.actions.getLocator(smrAutoConvertLocators.onDueDateRadioBtn.selector);
        await this.actions.waitForClickable(onDueDateRadioBtnEl, smrAutoConvertLocators.onDueDateRadioBtn.name);
        await this.actions.click(onDueDateRadioBtnEl, smrAutoConvertLocators.onDueDateRadioBtn.name);
        const configEnableConversionLeadTimeCheckBoxEl = await this.actions.getLocator(smrAutoConvertLocators.configEnableConversionLeadTimeCheckBox.selector);
        const isCheckedCheckbox = await this.actions.isCheckboxChecked(configEnableConversionLeadTimeCheckBoxEl, smrAutoConvertLocators.configEnableConversionLeadTimeCheckBox.name);
        if (!(isCheckedCheckbox)) {
            await this.actions.waitForClickable(configEnableConversionLeadTimeCheckBoxEl, smrAutoConvertLocators.configEnableConversionLeadTimeCheckBox.name);
            await this.actions.click(configEnableConversionLeadTimeCheckBoxEl, smrAutoConvertLocators.configEnableConversionLeadTimeCheckBox.name);
        }
        await this.clickSaveScheduledMaintenance();
    }

    /**
     * Click on the Dropdown Menu
     */
    public async clickDropdownMenu(): Promise<void> {
        const dropdownMenuEl = await this.actions.getLocator(smrAutoConvertLocators.dropdownMenu.selector);
        await this.actions.waitForClickable(dropdownMenuEl, smrAutoConvertLocators.dropdownMenu.name);
        await this.actions.click(dropdownMenuEl, smrAutoConvertLocators.dropdownMenu.name);
        const openWorkOrdersPopupEl = await this.actions.getLocator(smrAutoConvertLocators.openWorkOrdersPopup.selector);
        await this.actions.waitForClickable(openWorkOrdersPopupEl, smrAutoConvertLocators.openWorkOrdersPopup.name);
        await this.actions.click(openWorkOrdersPopupEl, smrAutoConvertLocators.openWorkOrdersPopup.name);
    }

    /**
     * Navigate to a specific page from the side menu
     * @param menuItemTitle The title of the menu item
     * @param subMenuItemTitle The title of the sub-menu item
     * @param pageURL The expected URL of the page
     */
    public async navigateToPageFromOtherMenu(menuItemTitle: string, subMenuItemTitle: string, pageURL: string): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickSpanByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(pageURL);
    }

    /**
     * Verify if SMR Auto Convert is enabled
     */
    public async waitForAutoConversion(): Promise<void> {
        await this.currentPage.reload();
        await this.actions.waitForCustomDelay(timeouts.huge);
        await this.currentPage.reload();
        await commonPageActions.clickLinkByText('Scheduled Maintenance Options');
        await commonPageActions.clickLinkByText('Scheduled Maintenance Records');
    }

    /**
     * Get the Work Order ID of the converted Work Order
     * @returns the Work Order ID of the converted Work Order
     */
    public async getConvertedWorkOrderID(): Promise<string> {
        const workOrderLinkEl = await this.actions.getLocator(smrAutoConvertLocators.workOrderLink.selector);
        await this.actions.waitForElementToBeVisible(workOrderLinkEl, smrAutoConvertLocators.workOrderLink.name);
        const workOrderID = await workOrderLinkEl.innerText();
        return workOrderID;
    }

    /**
     * Verify if the converted Work Order is displayed
     */
    public async verifyConvertedWorkOrder(): Promise<void> {
        const workOrderLinkEl = await this.actions.getLocator(smrAutoConvertLocators.workOrderLink.selector);
        await this.actions.waitForElementToBeVisible(workOrderLinkEl, smrAutoConvertLocators.workOrderLink.name);
        await this.actions.waitForClickable(workOrderLinkEl, smrAutoConvertLocators.workOrderLink.name);
    }

    /**
     * Click on the converted Work Order
     */
    public async clickOnConvertedWorkOrder(): Promise<void> {
        const workOrderLinkEl = await this.actions.getLocator(smrAutoConvertLocators.workOrderLink.selector);
        await this.actions.waitForClickable(workOrderLinkEl, smrAutoConvertLocators.workOrderLink.name);
        await this.actions.click(workOrderLinkEl, smrAutoConvertLocators.workOrderLink.name);
    }

    /**
     * Reverts the auto-convert setting to "Do Not Convert".
     */
    public async revertAutoConvertSetting(): Promise<void> {
        await this.clickEditScheduledMaintenance();
        const doNotConvertRadioBtnElement = await this.actions.getLocator(smrAutoConvertLocators.doNotConvertRadioBtn.selector);
        await this.actions.waitForElementToBeVisible(doNotConvertRadioBtnElement, smrAutoConvertLocators.doNotConvertRadioBtn.name);
        await this.actions.click(doNotConvertRadioBtnElement, smrAutoConvertLocators.doNotConvertRadioBtn.name);
        await this.clickSaveScheduledMaintenance();
    }
}

export const smrAutoConvertAction = new SMRAutoConvertAction();
