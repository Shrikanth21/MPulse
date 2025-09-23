import { Page, selectors } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { commonPageActions } from "../../actions/common.page.actions";
import { CommonPageLocators } from "../../locators/common.page.locator";

class ApprovalFlowPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        toRequesterEmail: { selector: "//div[@id='ReplyToRequester']/descendant::div[@id='ToControl']//input", name: "To Requester Email" },
        ccRequesterEmail: { selector: "//div[@id='ReplyToRequester']/descendant::div[@id='CCControl']//input", name: "CC Requester Email" },
        closeButton: { selector: "//button[@title='Click here to close']", name: "Close Button" },
        quitWaitingButton: { selector: "//div[@aria-label='Quit Waiting']", name: "Quit Waiting Button" },
        cancelConfirmation: { selector: "//body[@class='cke_editable cke_editable_themed cke_contents_ltr cke_show_borders']", name: "Cancel Confirmation" },
        okButton: { selector: "//div[@class='modal-dialog modal-md ui-draggable']//div[@aria-label='Ok']", name: "OK Button" },
        cancelRequestReasonHeader: { selector: "//div[@id='CancelRequestReason-header']", name: "Cancel Request Reason Header" },
    };

    /**
     * Sends an email to the requester with the provided details.
     * @param replyToRequesterMail The email address to reply to the requester.
     * @param ccReplyToRequesterMail The email address to CC in the reply.
     * @param sendButton The text of the send button to click.
     */
    public async sendEmailToRequester(replyToRequesterMail: string, ccReplyToRequesterMail: string, sendButton: string): Promise<void> {
        await this.actions.performKeyboardAction('Enter')
        const toMail = this.actions.getLocator(this.elements.toRequesterEmail.selector);
        await this.actions.waitForElementToBeVisible(toMail, this.elements.toRequesterEmail.name);
        await this.actions.click(toMail, this.elements.toRequesterEmail.name);
        await this.actions.typeText(toMail, replyToRequesterMail, this.elements.toRequesterEmail.name);

        const ccMail = this.actions.getLocator(this.elements.ccRequesterEmail.selector);
        await this.actions.waitForElementToBeVisible(ccMail, this.elements.ccRequesterEmail.name);
        await this.actions.click(ccMail, this.elements.ccRequesterEmail.name);
        await this.actions.typeText(ccMail, ccReplyToRequesterMail, this.elements.ccRequesterEmail.name);

        await commonPageActions.clickSpanByText(sendButton);
    }

    /**
     * Clicks on the close button to close the dialog.
     */
    public async clickOnCloseButton(): Promise<void> {
        const closeBtn = this.actions.getLocator(this.elements.closeButton.selector);
        await this.actions.click(closeBtn, this.elements.closeButton.name);
    }

    /**
     * Verifies if the Quit Waiting button is enabled or disabled.
     * @param shouldBeEnabled Whether the button should be enabled (true) or disabled (false).
     */
    public async verifyQuitWaitingButtonState(shouldBeEnabled: boolean): Promise<void> {
        const quitWaitingBtn = this.actions.getLocator(this.elements.quitWaitingButton.selector);
        if (shouldBeEnabled) {
            await this.actions.waitForElementToBeEnabled(quitWaitingBtn, this.elements.quitWaitingButton.name);
        } else {
            await this.actions.waitForElementToBeDisabled(quitWaitingBtn, this.elements.quitWaitingButton.name);
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
        const cancelConfirmationLocator = this.actions.getLocatorInsideIframe(this.elements.cancelConfirmation.selector);
        await this.actions.waitForElementToBeVisible(cancelConfirmationLocator, this.elements.cancelConfirmation.name);
        await this.actions.typeText(cancelConfirmationLocator, reasonText, this.elements.cancelConfirmation.name);

        await this.actions.click(cancelConfirmationLocator, this.elements.cancelConfirmation.name);
        const okButtonLocator = this.actions.getVisibleLocator(this.elements.okButton.selector);
        await this.actions.waitForElementToBeVisible(okButtonLocator, this.elements.okButton.name);
        await this.actions.mouseHoverAndClick(okButtonLocator, this.elements.okButton.name);
    }
}

export const approvalFlowPage = new ApprovalFlowPage();
