import { When, Then } from '@cucumber/cucumber';
import testData from '../../../../data/cancel.wko.json';
import { WebActions } from '../../../../base/web.action.util';
import { getFutureDateFormatted, getFutureDay } from '../../../../helper/date/get.future.date';
import { timeouts } from '../../../../helper/timeouts-config';
import { workOrderRecordPageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action';

let actions: WebActions;

When('the user cancel the created Work Order record', async function () {
    actions = new WebActions(this.page);
    await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
    await actions.performKeyboardShortcutWithRobot();
    await workOrderRecordPageActions.changeWkoStatus(
        testData.element_text.status_text,
        testData.element_text.status_text,
        testData.element_text.cancel_text,);
    await actions.waitForCustomDelay(timeouts.medium);
    await workOrderRecordPageActions.setCancelReason(
        testData.cancel_reason,
        getFutureDateFormatted(2),
        testData.element_text.input_ok_button,
    );
});

Then('the Work Order record should be canceled successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData.element_text.cancel_text);
});
