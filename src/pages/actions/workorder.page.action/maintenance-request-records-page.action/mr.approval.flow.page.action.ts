import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { commonPageActions } from "../../common.page.actions";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { MrApprovalFlowPageLocators } from "../../../locators/workorder.page.locators/maintenance-request-records-page.locator/mr.approval.flow.page.locator";

class MrApprovalFlowPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Sends an email to the requester with the provided details.
     * @param replyToRequesterMail The email address to reply to the requester.
     * @param ccReplyToRequesterMail The email address to CC in the reply.
     * @param sendButton The text of the send button to click.
     */
    public async sendEmailToRequester(replyToRequesterMail: string, ccReplyToRequesterMail: string, sendButton: string): Promise<void> {
        await this.actions.performKeyboardAction('Enter')
        const toMail = this.actions.getLocator(MrApprovalFlowPageLocators.toRequesterEmail.selector);
        await this.actions.waitForElementToBeVisible(toMail, MrApprovalFlowPageLocators.toRequesterEmail.name);
        await this.actions.click(toMail, MrApprovalFlowPageLocators.toRequesterEmail.name);
        await this.actions.typeText(toMail, replyToRequesterMail, MrApprovalFlowPageLocators.toRequesterEmail.name);

        const ccMail = this.actions.getLocator(MrApprovalFlowPageLocators.ccRequesterEmail.selector);
        await this.actions.waitForElementToBeVisible(ccMail, MrApprovalFlowPageLocators.ccRequesterEmail.name);
        await this.actions.click(ccMail, MrApprovalFlowPageLocators.ccRequesterEmail.name);
        await this.actions.typeText(ccMail, ccReplyToRequesterMail, MrApprovalFlowPageLocators.ccRequesterEmail.name);

        await commonPageActions.clickSpanByText(sendButton);
    }

    /**
     * Clicks on the close button to close the dialog.
     */
    public async clickOnCloseButton(): Promise<void> {
        const closeBtn = this.actions.getLocator(MrApprovalFlowPageLocators.closeButton.selector);
        await this.actions.waitForElementToBeVisible(closeBtn, MrApprovalFlowPageLocators.closeButton.name);
        await this.actions.click(closeBtn, MrApprovalFlowPageLocators.closeButton.name);
    }

    /**
     * Verifies if the Quit Waiting button is enabled or disabled.
     * @param shouldBeEnabled Whether the button should be enabled (true) or disabled (false).
     */
    public async verifyQuitWaitingButtonState(shouldBeEnabled: boolean): Promise<void> {
        const quitWaitingBtn = this.actions.getLocator(MrApprovalFlowPageLocators.quitWaitingButton.selector);
        if (shouldBeEnabled) {
            await this.actions.waitForElementToBeEnabled(quitWaitingBtn, MrApprovalFlowPageLocators.quitWaitingButton.name);
        } else {
            await this.actions.waitForElementToBeDisabled(quitWaitingBtn, MrApprovalFlowPageLocators.quitWaitingButton.name);
        }
    }

    /**
     * Verify the sent successfully message.
     * @param sentSuccessfullyMsg The message to verify.
     */
    public async verifySentSuccessfullyMsg(sentSuccessfullyMsg: string): Promise<void> {
        const sentSuccessfullyMsgLocator = this.actions.getLocator(CommonPageLocators.getSpanByText(sentSuccessfullyMsg));
        const text = await this.actions.getText(sentSuccessfullyMsgLocator, `Text: ${sentSuccessfullyMsg}`);
        await this.actions.assertEqual(text, sentSuccessfullyMsg, `Text: ${sentSuccessfullyMsg} should be displayed`);
    }

    /**
     * Confirms the cancellation of a request by entering a reason and clicking OK.
     * @param reasonText The reason for cancellation.
     */
    public async confirmCancellation(reasonText: string): Promise<void> {
        const cancelConfirmationLocator = this.actions.getLocatorInsideIframe(MrApprovalFlowPageLocators.cancelConfirmation.selector);
        await this.actions.waitForElementToBeVisible(cancelConfirmationLocator, MrApprovalFlowPageLocators.cancelConfirmation.name);
        await this.actions.typeText(cancelConfirmationLocator, reasonText, MrApprovalFlowPageLocators.cancelConfirmation.name);
        await this.actions.click(cancelConfirmationLocator, MrApprovalFlowPageLocators.cancelConfirmation.name);
        const okButtonLocator = this.actions.getVisibleLocator(MrApprovalFlowPageLocators.okButton.selector);
        await this.actions.waitForElementToBeVisible(okButtonLocator, MrApprovalFlowPageLocators.okButton.name);
        await this.actions.mouseHoverAndClick(okButtonLocator, MrApprovalFlowPageLocators.okButton.name);
    }
}

export const mrApprovalFlowPageActions = new MrApprovalFlowPageActions();
