import { Given, When, Then } from '@cucumber/cucumber';
import testData from '../../../data/cancel.wko.json';
import * as path from 'path';
import { WebActions } from '../../../base/web.action.util';
import { loginPage } from '../../../pages/login-page/Login.page';
import { homePage } from '../../../pages/home-page/Home.page';
import { workOrderPage } from '../../../pages/work-order-page/WorkOrderPage.page';
import { generatedDescription } from '../../../helper/get.different.description';
import { getRandomString } from '../../../helper/get-random-string';
import { getFutureDateFormatted, getFutureDay } from '../../../helper/date/get.future.date';
import { timeouts } from '../../../helper/timeouts-config';

let actions: WebActions;
const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');

Given('the user login to the application', async function () {
    const credentials = await loginPage.loadExcelCredentials();
    await loginPage.login(credentials.username);

});

When('the user navigate to the Work Order Records page', async function () {
    await homePage.navigateToCapitalAssetsRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.menuItemTitle,
        testData.subMenuItemTitle,
        testData.workOrderRecordsPageURL
    );
});

When('the user create a new Work Order with a unique description and upload media', async function () {
    await workOrderPage.createWorkOrder(testData.icons.plusIcon, generatedDescription, testData.element_text.media_text,
        testData.icons.media_link_icon,
        filePath, testData.element_text.upload_text, generatedDescription);
    await workOrderPage.setGeneralFields(
        testData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: testData.dropdownSelections.map((item: any) => item.ddType) }

    );
});

Then('the Work Order status should be Open status', async function () {
    await workOrderPage.validateElementText(testData.element_text.open_status_text);
});

When('the user assign future due date to the Work Order', async function () {
    return await workOrderPage.performCalendarActions(
        testData.icons.calendarIcon,
        testData.icons.calendarIcon,
        getFutureDay(2),
        testData.element_text.ok_button_text
    );

});

When('the user links asset, personnel, and inventory to the Work Order', async function () {
    await workOrderPage.linkAssetToTask(generatedDescription,
        testData.wo_info.assetAssignedToTask,
        testData.icons.asset_link_icon,
        testData.element_text.replace_button
    );

    await workOrderPage.linkPersonnelToAsset(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_link_icon,
        testData.element_text.link_button
    );

    await workOrderPage.linkInventoryToAsset(
        testData.wo_info.inventoryAssignedToAsset,
        testData.icons.inventory_link_icon,
        testData.element_text.link_button,
        testData.element_text.input_ok_button
    );

    await workOrderPage.setEmployeeActualHours(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_eye_icon,
        testData.element_text.timeSheetDetails_text,
        testData.icons.plusIcon_title,
        testData.element_text.hoursField_text,
        testData.element_text.hours,
        testData.icons.crossIcon_title
    );
    await workOrderPage.selectByElementText(generatedDescription);
    await workOrderPage.setFinancialFields(testData.costFields);

});

When('the user cancel the created Work Order record', async function () {
    actions = new WebActions(this.page);
    await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
    await actions.performKeyboardShortcutWithRobot();
    await workOrderPage.clickSaveButton();

    await workOrderPage.changeWKOstatus(
        testData.element_text.status_text,
        testData.element_text.status_text,
        testData.element_text.cancel_text,);
    await actions.waitForCustomDelay(timeouts.medium);
    await workOrderPage.setCancelReason(
        testData.cancel_reason,
        getFutureDateFormatted(2),
        testData.element_text.input_ok_button,
    );
    //await workOrderPage.clickSaveButton();
});

Then('the Work Order record should be canceled successfully', async function () {
    await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderPage.validateElementText(testData.element_text.cancel_text);
});

When('the user delete the newly created Work Order record', async function () {
    await workOrderPage.deleteRecord(testData.icons.crossIcon,
        testData.element_text.continue_button_text);
});
