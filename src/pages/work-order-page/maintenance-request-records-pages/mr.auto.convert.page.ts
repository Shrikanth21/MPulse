import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { workOrderPage } from "../WorkOrderPage.page";
import { homePage } from "../../home-page/Home.page";

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

  private getTabByText = (text: string): string => `//span[@class='dFlex']//span[text()='${text}']`;
  private getElementByTitle = (title: string): string => `//a[@title='${title}']`;
  private getTitleBySpan = (title: string): string => `//span[@title='${title}']`;

  public async clickTabByText(text: string): Promise<void> {
    const tabLocator = this.actions.getLocator(this.getTabByText(text));
    await this.actions.waitForElementToBeVisible(tabLocator, `Tab: ${text}`);
    await this.actions.click(tabLocator, `Tab: ${text}`);
  }

  public async clickOnSpanByTitle(title: string): Promise<void> {
    const spanLocator = this.actions.getLocator(this.getTitleBySpan(title));
    await this.actions.waitForElementToBeVisible(spanLocator, `Span: ${title}`);
    await this.actions.click(spanLocator, `Span: ${title}`);
  }

  public async navigateToMaintenanceRecordsPageFromOtherMenu(
          menuItemTitle: string,
          subMenuItemTitle: string,
          expectedUrl: string
      ): Promise<void> {
          await homePage.clickSideMenuIcon();
          await this.clickOnSpanByTitle(menuItemTitle);
          await homePage.clickLinkByTitle(subMenuItemTitle);
          await homePage.validateCurrentUrl(expectedUrl);
      }

      public async navigateToManagementWorkFlowPageFromOtherMenu(
          menuItemTitle: string,
          subMenuItemTitle: string,
          subMenuItemTitles: string,
          expectedUrl: string
      ): Promise<void> {
          await homePage.clickSideMenuIcon();
          await this.clickOnSpanByTitle(menuItemTitle);
          await homePage.clickLinkByTitle(subMenuItemTitle);
          await homePage.clickCustomizationMenuByTitle(subMenuItemTitles);
          await homePage.validateCurrentUrl(expectedUrl);
      }

  public async clickOnToAutomaticRequestConversionCheckbox(): Promise<void> {
    const editButton = this.actions.getLocator(this.elements.editButton.selector);
    await this.actions.waitForElementToBeVisible(editButton, this.elements.editButton.name);
    await this.actions.click(editButton, this.elements.editButton.name);

    if (!(await this.actions.isCheckboxChecked(this.actions.getLocator(this.elements.configAutoConvertMRtoWOCheckBox.selector), this.elements.configAutoConvertMRtoWOCheckBox.name))) {
      await this.actions.click(this.actions.getLocator(this.elements.configAutoConvertMRtoWOCheckBox.selector), this.elements.configAutoConvertMRtoWOCheckBox.name);
    }

    const saveButton = this.actions.getLocator(this.elements.savebutton.selector);
    await this.actions.waitForElementToBeVisible(saveButton, this.elements.savebutton.name);
    await this.actions.click(saveButton, this.elements.savebutton.name);
  }

  public async linkInventoryToMaintenanceRequest(title: string, buttonText: string): Promise<void> {
    await this.clickTabByText("Inventory");

    const moreButton = this.actions.getLocator(this.elements.moreButton.selector);
    await this.actions.click(moreButton, this.elements.moreButton.name);

    const linkInventory = this.actions.getLocator(this.getElementByTitle(title));
    await this.actions.waitForElementToBeVisible(linkInventory, title);
    await this.actions.click(linkInventory, title);

    await workOrderPage.selectRowInLinkAssetPopupIfVisible();

    await workOrderPage.clickInputButton(buttonText);
  }

  public async verifyAutoConvert(text: string): Promise<void> {
    const textElement = await this.actions.getLocator(this.elements.dialogMessage.selector);
    await this.actions.waitForElementToBeVisible(textElement, this.elements.dialogMessage.name);
    const dialogText = await this.actions.getText(textElement, this.elements.dialogMessage.name);
    await this.actions.assertEqual(dialogText, text, `Dialog Text: ${text}`);
  }
}

export const mrAutoConvertPage = new MrAutoConvertPage();
