import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { workOrderPage } from "../WorkOrderPage.page";
import { timeouts } from "../../../helper/timeouts-config";
import { homePageActions } from "../../actions/home.page.action/home.page.actions";
import { commonPageActions } from "../../actions/common.page.actions";
import { CommonPageLocators } from "../../locators/common.page.locator";

class MrAutoConvertPage {

  private get currentPage(): Page {
    return getPage();
  }

  private get actions(): WebActions {
    return new WebActions(this.currentPage);
  }

  private elements = {
    editButton: { selector: "li[ng-show='!EditMode && !SingleEditFlag'] i[class='fa fa-pencil-alt']", name: "Edit Button" },
    configAutoConvertMRtoWOCheckBox: { selector: "//div[@dx-check-box='configAutoConvertMRtoWOCheckBox']//span[@class='dx-checkbox-icon']", name: "check box Button" },
    moreButton: { selector: "//div[@class='row panelHeader']/descendant::div[@class='moreBtn']", name: "More Button" },
    savebutton: { selector: "//li[@title='Save']", name: "Save Button" },
    dialogMessage: { selector: "//div[@class='dx-dialog-message']", name: "Dialog Message" },
  };

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
    const editButton = this.actions.getLocator(this.elements.editButton.selector);
    await this.actions.waitForElementToBeVisible(editButton, this.elements.editButton.name);
    await this.actions.click(editButton, this.elements.editButton.name);

    if (!(await this.actions.isCheckboxChecked(this.actions.getLocator(this.elements.configAutoConvertMRtoWOCheckBox.selector), this.elements.configAutoConvertMRtoWOCheckBox.name))) {
      await this.actions.click(this.actions.getLocator(this.elements.configAutoConvertMRtoWOCheckBox.selector), this.elements.configAutoConvertMRtoWOCheckBox.name);
    }

    /**
     * Clicks the "Save" button in the Maintenance Request Records page.
     */
    const saveButton = this.actions.getLocator(this.elements.savebutton.selector);
    await this.actions.waitForElementToBeVisible(saveButton, this.elements.savebutton.name);
    await this.actions.click(saveButton, this.elements.savebutton.name);
  }

  /**
   * Links inventory to the Maintenance Request.
   * @param title The title of the inventory item.
   * @param buttonText The text of the button to click.
   */
  public async linkInventoryToMaintenanceRequest(tabText: string, title: string, buttonText: string): Promise<void> {
    await commonPageActions.clickTabByText(tabText);
    const moreButton = this.actions.getLocator(this.elements.moreButton.selector);
    await this.actions.click(moreButton, this.elements.moreButton.name);
    const linkInventory = this.actions.getLocator(CommonPageLocators.getLinkByTitle(title));
    await this.actions.waitForElementToBeVisible(linkInventory, title);
    await this.actions.click(linkInventory, title);
    await workOrderPage.selectRowInLinkAssetPopupIfVisible();
    await workOrderPage.clickInputButton(buttonText);
    await this.actions.waitForCustomDelay(timeouts.medium);
  }

  /**
   * Verifies the auto-conversion dialog text.
   * @param text The expected dialog text.
   */
  public async verifyAutoConvert(text: string): Promise<void> {
    const textElement = await this.actions.getLocator(this.elements.dialogMessage.selector);
    await this.actions.waitForElementToBeVisible(textElement, this.elements.dialogMessage.name);
    const dialogText = await this.actions.getText(textElement, this.elements.dialogMessage.name);
    await this.actions.assertEqual(dialogText, text, `Dialog Text: ${text}`);
  }
}

export const mrAutoConvertPage = new MrAutoConvertPage();
