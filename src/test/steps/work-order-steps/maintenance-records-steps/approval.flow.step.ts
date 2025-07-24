import { Then, When } from "@cucumber/cucumber";
import { approvalFlowPage } from "../../../../pages/work-order-page/maintenance-request-records-pages/approval.flow.page";
import mrtestData from '../../../../data/maintenance.records.json';
import { commonActionPage } from "../../../../pages/common.action.page";

When(/^the user Clicks on (.+) button$/, async (buttonName: string) => {
    await commonActionPage.clickTabByText(mrtestData.element_text.general_tab_text);
	await commonActionPage.clickElementByText(buttonName);
});

When(/^the user fills in the Reply-To email and CC email, then sends the email$/, async () => {
	await approvalFlowPage.sendEmailToRequester(
        mrtestData.wo_info.requester_email,
        mrtestData.wo_info.requester_email,
        mrtestData.element_text.send_button
    );
});

Then(/^the email should be sent successfully$/, async () => {
	await approvalFlowPage.verifySentSuccessfullyMsg(mrtestData.element_text.email_sent_successfully);
});

Then(/^the user can see the Quit Waiting button is enabled$/, async () => {
    await approvalFlowPage.clickOnCloseButton();
	await approvalFlowPage.verifyQuitWaitingButtonState(true);
});

When(/^the user confirms the cancellation$/, async () => {
	await approvalFlowPage.confirmCancellation(mrtestData.element_text.cancellation_reason);
});
