import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { homePageActions } from "../../home-page-action/home.page.actions";
import { commonPageActions } from "../../common.page.actions";
import { MrAutoConvertPageLocators } from "../../../locators/workorder.page.locators/maintenance-request-records-page.locator/mr.auto.convert.page.locator";
import { workOrderRecordPageActions } from "../work-order-records-page-action/work.order.records.page.action";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";

class MrAutoConvertPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Navigates to the Maintenance Request Records page from another menu.
     * @param menuItemTitle 
     * @param subMenuItemTitle 
     * @param expectedUrl 
     */
    public async navigateToMaintenanceRecordsPageFromOtherMenu(
        menuItemTitle: string,
        subMenuItemTitle: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickSpanByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Navigates to the Management Workflow page from another menu.
     * @param menuItemTitle 
     * @param subMenuItemTitle 
     * @param subMenuItemTitles 
     * @param expectedUrl 
     */
    public async navigateToManagementWorkFlowPageFromOtherMenu(
        menuItemTitle: string,
        subMenuItemTitle: string,
        subMenuItemTitles: string,
        expectedUrl: string
    ): Promise<void> {
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickSpanByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await homePageActions.clickCustomizationMenuByTitle(subMenuItemTitles);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Clicks on the "Convert to Work Order" checkbox in the Maintenance Request Records page.
     * This method first clicks the edit button to enable editing mode, then checks the checkbox if
     */
    public async clickOnToAutomaticRequestConversionCheckbox(): Promise<void> {
        const editButton = this.actions.getLocator(MrAutoConvertPageLocators.editButton.selector);
        await this.actions.waitForElementToBeVisible(editButton, MrAutoConvertPageLocators.editButton.name);
        await this.actions.click(editButton, MrAutoConvertPageLocators.editButton.name);
        if (!(await this.actions.isCheckboxChecked(this.actions.getLocator(MrAutoConvertPageLocators.configAutoConvertMRtoWOCheckBox.selector), MrAutoConvertPageLocators.configAutoConvertMRtoWOCheckBox.name))) {
            await this.actions.click(this.actions.getLocator(MrAutoConvertPageLocators.configAutoConvertMRtoWOCheckBox.selector), MrAutoConvertPageLocators.configAutoConvertMRtoWOCheckBox.name);
        }

        /**
         * Clicks the "Save" button in the Maintenance Request Records page.
         */
        const saveButton = this.actions.getLocator(MrAutoConvertPageLocators.savebutton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, MrAutoConvertPageLocators.savebutton.name);
        await this.actions.click(saveButton, MrAutoConvertPageLocators.savebutton.name);
    }

    /**
     * Links inventory to the Maintenance Request.
     * @param title The title of the inventory item.
     * @param buttonText The text of the button to click.
     */
    public async linkInventoryToMaintenanceRequest(tabText: string, title: string, buttonText: string): Promise<void> {
        await commonPageActions.clickTabByText(tabText);
        const moreButton = this.actions.getLocator(MrAutoConvertPageLocators.moreButton.selector);
        await this.actions.click(moreButton, MrAutoConvertPageLocators.moreButton.name);
        const linkInventory = this.actions.getLocator(CommonPageLocators.getLinkByTitle(title));
        await this.actions.waitForElementToBeVisible(linkInventory, title);
        await this.actions.click(linkInventory, title);
        await workOrderRecordPageActions.selectRowInLinkAssetPopupIfVisible();
        await workOrderRecordPageActions.clickInputButton(buttonText);
        await this.actions.waitForCustomDelay(timeouts.medium);
    }

    /**
     * Verifies the auto-conversion dialog text.
     * @param text The expected dialog text.
     */
    public async verifyAutoConvert(text: string): Promise<void> {
        const textElement = await this.actions.getLocator(MrAutoConvertPageLocators.dialogMessage.selector);
        await this.actions.waitForElementToBeVisible(textElement, MrAutoConvertPageLocators.dialogMessage.name);
        const dialogText = await this.actions.getText(textElement, MrAutoConvertPageLocators.dialogMessage.name);
        await this.actions.assertEqual(dialogText, text, `Dialog Text: ${text}`);
    }
}

export const mrAutoConvertPageActions = new MrAutoConvertPageActions();
