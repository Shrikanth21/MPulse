import { Page, selectors } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";

class ApprovalFlowPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        requesterEmail: { selector: "//div[@id='ReplyToRequester']//input[@class='dx-texteditor-input']", name: "Requester Email" },
        closeButton: { selector: "//button[@title='Click here to close']", name: "Close Button" },
        quitWaitingButton: { selector: "//div[@aria-label='Quit Waiting']", name: "Quit Waiting Button" },
        cancelConfirmation: { selector: "//body[@class='cke_editable cke_editable_themed cke_contents_ltr cke_show_borders']", name: "Cancel Confirmation" },
        okButton: { selector: "//div[@id='OkButton']", name: "OK Button" },
        cancelRequestReasonHeader: { selector: "//div[@id='CancelRequestReason-header']", name: "Cancel Request Reason Header" },
    };

    private getElementByText = (text: string): string => `//span[text()='${text}']`;
    private getTabByText = (text: string): string => `//span[@class='dFlex']//span[text()='${text}']`;

    public async clickElementByText(text: string): Promise<void> {
        const fieldLocator = this.actions.getLocator(this.getElementByText(text));
        await this.actions.waitForElementToBeVisible(fieldLocator, `Field: ${text}`);
        await this.actions.click(fieldLocator, `Field: ${text}`);
    }

    public async clickTabByText(text: string): Promise<void> {
        const tabLocator = this.actions.getLocator(this.getTabByText(text));
        await this.actions.waitForElementToBeVisible(tabLocator, `Tab: ${text}`);
        await this.actions.click(tabLocator, `Tab: ${text}`);
    }

    public async sendEmailToRequester(replyToRequesterMail: string, ccReplyToRequesterMail: string, sendButton: string): Promise<void> {
        const toMail = this.actions.getLocator(this.elements.requesterEmail.selector).nth(3);
        await this.actions.waitForElementToBeVisible(toMail, this.elements.requesterEmail.name);
        await this.actions.click(toMail, this.elements.requesterEmail.name);
        await this.actions.typeText(toMail, replyToRequesterMail, this.elements.requesterEmail.name);

        const ccMail = this.actions.getLocator(this.elements.requesterEmail.selector).nth(4);
        await this.actions.waitForElementToBeVisible(ccMail, this.elements.requesterEmail.name);
        await this.actions.click(ccMail, this.elements.requesterEmail.name);
        await this.actions.typeText(ccMail, ccReplyToRequesterMail, this.elements.requesterEmail.name);

        await this.clickElementByText(sendButton);
    }

    public async clickOnCloseButton(): Promise<void> {
        const closeBtn = this.actions.getLocator(this.elements.closeButton.selector);
        await this.actions.click(closeBtn, this.elements.closeButton.name);
    }

    public async verifyQuitWaitingButtonIsEnabled(): Promise<void> {
        const quitWaitingBtn = this.actions.getLocator(this.elements.quitWaitingButton.selector);
        await this.actions.waitForElementToBeEnabled(quitWaitingBtn, this.elements.quitWaitingButton.name);
    }

    public async verifyQuitWaitingButtonIsDisabled(): Promise<void> {
        const quitWaitingBtn = this.actions.getLocator(this.elements.quitWaitingButton.selector);
        await this.actions.waitForElementToBeDisabled(quitWaitingBtn, this.elements.quitWaitingButton.name);
    }

    public async verifySentSuccessfullyMsg(sentSuccessfullyMsg: string): Promise<void> {
        const sentSuccessfullyMsgLocator = this.actions.getLocator(this.getElementByText(sentSuccessfullyMsg));
        const text = await this.actions.getText(sentSuccessfullyMsgLocator, `Text: ${sentSuccessfullyMsg}`);
        await this.actions.assertEqual(text, sentSuccessfullyMsg, `Text: ${sentSuccessfullyMsg} should be displayed`);
    }

    public async confirmCancellation(reasonText: string): Promise<void> {
        // const cancelConfirmationLocator = this.actions.getLocatorInsideIframe(this.elements.cancelConfirmation.selector);
        // await this.actions.waitForElementToBeVisible(cancelConfirmationLocator, this.elements.cancelConfirmation.name);
        // await this.actions.typeText(cancelConfirmationLocator, reasonText, this.elements.cancelConfirmation.name);

        const cancelRequestReasonHeaderLocator = this.actions.getLocator(this.elements.cancelRequestReasonHeader.selector);
        await this.actions.waitForElementToBeVisible(cancelRequestReasonHeaderLocator, this.elements.cancelRequestReasonHeader.name);
        await this.actions.click(cancelRequestReasonHeaderLocator, this.elements.cancelRequestReasonHeader.name);

        const okButtonLocator = this.actions.getLocator(this.elements.okButton.selector);
        await this.actions.waitForElementToBeVisible(okButtonLocator, this.elements.okButton.name);
        await this.actions.click(okButtonLocator, this.elements.okButton.name);
    }
}

export const approvalFlowPage = new ApprovalFlowPage();
