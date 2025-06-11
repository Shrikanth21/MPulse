import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";

export class DeleteWOPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private Elements = {
        deleteWOPage: { selector: "//i[@class='far fa-times-circle']", name: 'Delete workorder page cross button' },
        continueButton: { selector: "//span[normalize-space()='Continue']", name: 'Continue button on Alert window' },
        getWorkOrderId: { selector: "//span[@id='ID']", name: 'Work Order ID' },
    };

    public async getCurrentWorkOrderIdText(): Promise<string> {
        const beforesortedwoID = this.actions.getLocator(this.Elements.getWorkOrderId.selector);
        return await this.actions.getText(beforesortedwoID, this.Elements.getWorkOrderId.name);
    }

    public async deletecurrentwo(): Promise<void> {
        const deletewolocator = this.actions.getLocator(this.Elements.deleteWOPage.selector);
        await this.actions.click(deletewolocator, this.Elements.deleteWOPage.name);
        const continueButtonEL = this.actions.getLocator(this.Elements.continueButton.selector);
        await this.actions.click(continueButtonEL, this.Elements.continueButton.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    public async verifyDeletedWOId(beforeDeleteWorkOrderId: string): Promise<void> {
        const workOrderIdLocator = this.actions.getLocator(this.Elements.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        const workOrderIdText = await this.actions.getText(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        await this.actions.assertNotEqual(workOrderIdText, beforeDeleteWorkOrderId);
    }
}

export const deleteWOPage = new DeleteWOPage();
