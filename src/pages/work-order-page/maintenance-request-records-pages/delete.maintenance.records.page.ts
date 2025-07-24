import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";
import { approvalFlowPage } from "./approval.flow.page";
import { deleteWOPage } from "../delete.wko.page";
import { commonActionPage } from "../../common.action.page";

class DeleteMaintenanceRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private Elements = {
        deleteWOPage: { selector: "//i[@class='far fa-times-circle']", name: 'Delete workorder page cross button' },
        continueButton: { selector: "//span[normalize-space()='Continue']", name: 'Continue button on Alert window' },
        getMRId: { selector: "//span[@id='ID']", name: 'Maintenance Request ID' },
        noMatchesFound: { selector: "//div[contains(text(),'No matches found.')]", name: 'No matches found message' },
        requestStatus: { selector: "//div[@id='tabSection']/descendant::span[@id='RequestStatusDesc']", name: 'Request Status' },
        wkoCode: { selector: "//span[@fieldname='WkoCode']", name: 'Work Order Code' },
        deleteWorkOrderListItem: { selector: "//li[@id='delete-work-order']", name: 'Delete Work Order list item' },
        deleteContinueButton: { selector: '//div[@aria-label="Continue"]', name: 'Continue button with aria-label' },
        maintenanceRequestRecordsLink: { selector: '//a[@title="Maintenance Request Records"]', name: 'Maintenance Request Records link' },
    };

    /**
     * Gets the text of the current Maintenance Request record ID.
     * @returns The text of the Maintenance Request record ID.
     */
    public async getCurrentMRRecordIdText(): Promise<string> {
        const beforesortedwoID = this.actions.getLocator(this.Elements.getMRId.selector);
        return await this.actions.getText(beforesortedwoID, this.Elements.getMRId.name);
    }

    /**
     * Verifies the status of the Maintenance Request record.
     * @returns The status text of the Maintenance Request record.
     */
    public async verifyMRStatus(): Promise<string> {
        const requestStatusLocator = this.actions.getLocator(this.Elements.requestStatus.selector);
        return await this.actions.getText(requestStatusLocator, this.Elements.requestStatus.name);
    }

    /**
     * Deletes the current Maintenance Request record.
     * @param text The text to click on for deletion confirmation.
     */
    public async deleteCurrentMR(text: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const requestStatusText = await this.verifyMRStatus();
        if (requestStatusText === 'Converted') {
            const wkoCodeLocator = this.actions.getLocator(this.Elements.wkoCode.selector);
            await this.actions.waitForElementToBeVisible(wkoCodeLocator, this.Elements.wkoCode.name);
            await this.actions.click(wkoCodeLocator, this.Elements.wkoCode.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
            await deleteWOPage.deleteCurrentWO();
            const maintenanceRequestRecordsLink = this.actions.getLocator(this.Elements.maintenanceRequestRecordsLink.selector);
            await this.actions.waitForElementToBeVisible(maintenanceRequestRecordsLink, this.Elements.maintenanceRequestRecordsLink.name);
            await this.actions.click(maintenanceRequestRecordsLink, this.Elements.maintenanceRequestRecordsLink.name);
            await this.currentPage.waitForTimeout(timeouts.large);
            const deletemrlocator = this.actions.getLocator(this.Elements.deleteWOPage.selector);
            await this.actions.click(deletemrlocator, this.Elements.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(this.Elements.continueButton.selector);
            await this.actions.click(continueButtonEL, this.Elements.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        } else if (requestStatusText === 'Pending' || requestStatusText === 'Cancel') {
            const deletemrlocator = this.actions.getLocator(this.Elements.deleteWOPage.selector);
            await this.actions.click(deletemrlocator, this.Elements.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(this.Elements.continueButton.selector);
            await this.actions.click(continueButtonEL, this.Elements.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        } else if (requestStatusText === 'Waiting for Reply') {
            await commonActionPage.clickElementByText(text)
            const deletemrlocator = this.actions.getLocator(this.Elements.deleteWOPage.selector);
            await this.actions.click(deletemrlocator, this.Elements.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(this.Elements.continueButton.selector);
            await this.actions.click(continueButtonEL, this.Elements.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        }
    }

    /**
     * Verifies that the Maintenance Request ID is no longer present after deletion.
     * @param beforeDeleteMRId The Maintenance Request ID before deletion.
     */
    public async verifyDeletedMRId(beforeDeleteMRId: string): Promise<void> {
        const MRIdLocator = this.actions.getLocator(this.Elements.getMRId.selector);
        await this.actions.waitForElementToBeVisible(MRIdLocator, this.Elements.getMRId.name);
        const MRIdText = await this.actions.getText(MRIdLocator, this.Elements.getMRId.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.assertNotEqual(
            MRIdText,
            beforeDeleteMRId,
            `Maintenance Request ID "${beforeDeleteMRId}" should not be present after deletion, but found "${MRIdText}".`
        );
    }

    /**
     * Verifies that the "No matches found" message is displayed.
     */
    public async verifyNoMatchesFoundMessage(): Promise<void> {
        const noMatchesFoundLocator = this.actions.getLocator(this.Elements.noMatchesFound.selector);
        await this.actions.waitForElementToBeVisible(noMatchesFoundLocator, this.Elements.noMatchesFound.name);
    }
}

export const deleteMaintenanceRecordsPage = new DeleteMaintenanceRecordsPage();
