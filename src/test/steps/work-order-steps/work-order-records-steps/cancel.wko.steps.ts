import { When, Then } from '@cucumber/cucumber';
import testData1 from '../../../../data/testData.json';
import { WebActions } from '../../../../base/web.action.util';
import { getFutureDateFormatted, getFutureDay } from '../../../../helper/date/get.future.date';
import { timeouts } from '../../../../helper/timeouts-config';
import { workOrderRecordPageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action';

let actions: WebActions;

When('the user cancel the created Work Order record', async function () {
    actions = new WebActions(this.page);
    await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
    await actions.performKeyboardShortcutWithRobot();
    await workOrderRecordPageActions.changeWkoStatus(
        testData1.customization.languageDropdownValues.status,
        testData1.customization.languageDropdownValues.status,
        testData1.element_text.canceled_status_text,);
    await actions.waitForCustomDelay(timeouts.medium);
    await workOrderRecordPageActions.setCancelReason(
        testData1.cancel_reason,
        getFutureDateFormatted(2),
        testData1.element_text.input_ok_button,
    );
});

Then('the Work Order record should be canceled successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData1.element_text.canceled_status_text);
});
