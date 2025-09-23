import { When, Then } from '@cucumber/cucumber';
import testData from '../../../data/cancel.wko.json';
import { WebActions } from '../../../base/web.action.util';
import { workOrderPage } from '../../../pages/work-order-page/WorkOrderPage.page';
import { getFutureDateFormatted, getFutureDay } from '../../../helper/date/get.future.date';
import { timeouts } from '../../../helper/timeouts-config';

let actions: WebActions;

When('the user cancel the created Work Order record', async function () {
    actions = new WebActions(this.page);
    await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
    await actions.performKeyboardShortcutWithRobot();
    await workOrderPage.changeWkoStatus(
        testData.element_text.status_text,
        testData.element_text.status_text,
        testData.element_text.cancel_text,);
    await actions.waitForCustomDelay(timeouts.medium);
    await workOrderPage.setCancelReason(
        testData.cancel_reason,
        getFutureDateFormatted(2),
        testData.element_text.input_ok_button,
    );
});

Then('the Work Order record should be canceled successfully', async function () {
    await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderPage.validateElementText(testData.element_text.cancel_text);
});
