import { Then, When } from "@cucumber/cucumber";
import mrtestData from '../../../../data/maintenance.records.json';
import { commonPageActions } from "../../../../pages/actions/common.page.actions";
import { mrApprovalFlowPageActions } from "../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.approval.flow.page.action";

When(/^the user Clicks on (.+) button$/, async (buttonName: string) => {
    await commonPageActions.clickTabByText(mrtestData.element_text.general_tab_text);
    await commonPageActions.clickSpanByText(buttonName);
});

When(/^the user fills in the Reply-To email and CC email, then sends the email$/, async () => {
    await mrApprovalFlowPageActions.sendEmailToRequester(
        mrtestData.wo_info.requester_email,
        mrtestData.wo_info.requester_email,
        mrtestData.element_text.send_button
    );
});

Then(/^the email should be sent successfully$/, async () => {
    await mrApprovalFlowPageActions.verifySentSuccessfullyMsg(mrtestData.element_text.email_sent_successfully);
});

Then(/^the user can see the Quit Waiting button is enabled$/, async () => {
    await mrApprovalFlowPageActions.clickOnCloseButton();
    await mrApprovalFlowPageActions.verifyQuitWaitingButtonState(true);
});

When(/^the user confirms the cancellation$/, async () => {
    await mrApprovalFlowPageActions.confirmCancellation(mrtestData.element_text.cancellation_reason);
});
