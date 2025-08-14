import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";

class DeleteWOPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private Elements = {
        deleteWOPage: { selector: "//div[@class='action-menu-items']/descendant::i[@class='far fa-times-circle']", name: 'Delete work order page cross button' },
        continueButton: { selector: "//span[normalize-space()='Continue']", name: 'Continue button on Alert window' },
        getWorkOrderId: { selector: "//div[contains(@class,'textTruncate')]//span[@id='ID']", name: 'Work Order ID' },
        noMatchesFound: { selector: "//div[@class='dx-scrollview-content']", name: 'No matches found message' },
    };

    /**
     * Gets the text of the current Work Order ID.
     * @returns The text of the Work Order ID.
     */
    public async getCurrentWorkOrderIdText(): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const beforeSortedWoID = this.actions.getLocator(this.Elements.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(beforeSortedWoID, this.Elements.getWorkOrderId.name);
        return await this.actions.getText(beforeSortedWoID, this.Elements.getWorkOrderId.name);
    }

    /**
     * Deletes the current Work Order.
     */
    public async deleteCurrentWO(): Promise<void> {
        const deleteWoLocator = this.actions.getLocator(this.Elements.deleteWOPage.selector);
        await this.actions.waitForElementToBeVisible(deleteWoLocator, this.Elements.deleteWOPage.name);
        await this.actions.click(deleteWoLocator, this.Elements.deleteWOPage.name);
        const continueButtonEL = this.actions.getLocator(this.Elements.continueButton.selector);
        await this.actions.click(continueButtonEL, this.Elements.continueButton.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    /**
     * Verifies that the Work Order ID is no longer present after deletion.
     * @param beforeDeleteWorkOrderId The Work Order ID before deletion.
     */
    public async verifyDeletedWOId(beforeDeleteWorkOrderId: string): Promise<void> {
        const workOrderIdLocator = this.actions.getLocator(this.Elements.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        const workOrderIdText = await this.actions.getText(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        await this.actions.assertNotEqual(
            workOrderIdText,
            beforeDeleteWorkOrderId,
            `Work Order ID "${workOrderIdText}" should not be equal to the deleted Work Order ID "${beforeDeleteWorkOrderId}"`
        );
    }

    /**
     * Verifies that the Work Order ID is not present in the search results after deletion.
     * @param beforeDeleteWorkOrderId The Work Order ID before deletion.
     */
    public async verifyDeletedWOIdInSearchResults(beforeDeleteWorkOrderId: string): Promise<void> {
        const workOrderIdLocator = this.actions.getLocator(this.Elements.getWorkOrderId.selector);
        await this.actions.waitForElementToBeVisible(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        const workOrderIdText = await this.actions.getText(workOrderIdLocator, this.Elements.getWorkOrderId.name);
        await this.actions.assertNotEqual(
            workOrderIdText,
            beforeDeleteWorkOrderId,
            `Work Order ID "${workOrderIdText}" should not be equal to the deleted Work Order ID "${beforeDeleteWorkOrderId}"`
        );
    }

    /**
     * Verifies that the "No matches found" message is displayed.
     */
    public async verifyNoMatchesFoundMessage(): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const noMatchesFoundLocator = this.actions.getLocator(this.Elements.noMatchesFound.selector);
        await this.actions.waitForElementToBeVisible(noMatchesFoundLocator, this.Elements.noMatchesFound.name);
        const noMatchesFoundText = await this.actions.getText(noMatchesFoundLocator, this.Elements.noMatchesFound.name);
        await this.actions.assertEqual(
            noMatchesFoundText.trim(),
            "No matches found.",
            `Expected "No matches found." but got "${noMatchesFoundText}"`
        );
    }
}

export const deleteWOPage = new DeleteWOPage();
