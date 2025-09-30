import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import { commonPageActions } from "../../common.page.actions";
import { MrDeleteRecordsPageLocators } from "../../../locators/workorder.page.locators/maintenance-request-records-page.locator/mr.delete.records.page.locator";
import { wkoDeletePageAction } from "../work-order-records-page-action/wko.delete.page.action";

class MrDeleteRecordsPageAction {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the text of the current Maintenance Request record ID.
     * @returns The text of the Maintenance Request record ID.
     */
    public async getCurrentMRRecordIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedWoID = this.actions.getLocator(MrDeleteRecordsPageLocators.getMRId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedWoID, MrDeleteRecordsPageLocators.getMRId.name);
        return await this.actions.getText(beforeSortedWoID, MrDeleteRecordsPageLocators.getMRId.name);
    }

    /**
     * Verifies the status of the Maintenance Request record.
     * @returns The status text of the Maintenance Request record.
     */
    public async verifyMRStatus(): Promise<string> {
        const requestStatusLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.requestStatus.selector);
        await this.actions.waitForElementToBeVisible(requestStatusLocator, MrDeleteRecordsPageLocators.requestStatus.name);
        return await this.actions.getText(requestStatusLocator, MrDeleteRecordsPageLocators.requestStatus.name);
    }

    /**
     * Deletes the current Maintenance Request record.
     * @param text The text to click on for deletion confirmation.
     */
    public async deleteCurrentMR(text: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const requestStatusText = await this.verifyMRStatus();
        if (requestStatusText === 'Converted') {
            const wkoCodeLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.wkoCode.selector);
            await this.actions.waitForElementToBeVisible(wkoCodeLocator, MrDeleteRecordsPageLocators.wkoCode.name);
            await this.actions.click(wkoCodeLocator, MrDeleteRecordsPageLocators.wkoCode.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
            await wkoDeletePageAction.deleteCurrentWO();
            const maintenanceRequestRecordsLink = this.actions.getLocator(MrDeleteRecordsPageLocators.maintenanceRequestRecordsLink.selector);
            await this.actions.waitForElementToBeVisible(maintenanceRequestRecordsLink, MrDeleteRecordsPageLocators.maintenanceRequestRecordsLink.name);
            await this.actions.click(maintenanceRequestRecordsLink, MrDeleteRecordsPageLocators.maintenanceRequestRecordsLink.name);
            await this.currentPage.waitForTimeout(timeouts.large);
            const deleteMrLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.deleteWOPage.selector);
            await this.actions.click(deleteMrLocator, MrDeleteRecordsPageLocators.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(MrDeleteRecordsPageLocators.continueButton.selector);
            await this.actions.click(continueButtonEL, MrDeleteRecordsPageLocators.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        } else if (requestStatusText === 'Pending' || requestStatusText === 'Cancel') {
            const deleteMrLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.deleteWOPage.selector);
            await this.actions.click(deleteMrLocator, MrDeleteRecordsPageLocators.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(MrDeleteRecordsPageLocators.continueButton.selector);
            await this.actions.click(continueButtonEL, MrDeleteRecordsPageLocators.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        } else if (requestStatusText === 'Waiting for Reply') {
            await commonPageActions.clickSpanByText(text)
            const deleteMrLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.deleteWOPage.selector);
            await this.actions.click(deleteMrLocator, MrDeleteRecordsPageLocators.deleteWOPage.name);
            const continueButtonEL = this.actions.getLocator(MrDeleteRecordsPageLocators.continueButton.selector);
            await this.actions.click(continueButtonEL, MrDeleteRecordsPageLocators.continueButton.name);
            await this.actions.waitForCustomDelay(timeouts.medium);
        }
    }

    /**
     * Verifies that the Maintenance Request ID is no longer present after deletion.
     * @param beforeDeleteMRId The Maintenance Request ID before deletion.
     */
    public async verifyDeletedMRId(beforeDeleteMRId: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const MRIdLocator = this.actions.getLocator(MrDeleteRecordsPageLocators.getMRId.selector);
        await this.actions.waitForElementToBeVisible(MRIdLocator, MrDeleteRecordsPageLocators.getMRId.name);
        const MRIdText = await this.actions.getText(MRIdLocator, MrDeleteRecordsPageLocators.getMRId.name);
        await this.actions.assertNotEqual(
            MRIdText,
            beforeDeleteMRId,
            `Maintenance Request ID "${beforeDeleteMRId}" should not be present after deletion, but found "${MRIdText}".`
        );
    }
}

export const mrDeleteRecordsPageAction = new MrDeleteRecordsPageAction();
