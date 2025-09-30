import { When, Then } from '@cucumber/cucumber';
import testData from '../../../../data/close.wko.json';
import * as path from 'path';
import { homePageActions } from '../../../../pages/actions/home-page-action/home.page.actions';
import { generateDescription } from '../../../../helper/get.different.description';
import { getRandomString } from '../../../../helper/get-random-string';
import { getFutureDateFormatted, getFutureDay } from '../../../../helper/date/get.future.date';
import { commonPageActions } from '../../../../pages/actions/common.page.actions';
import { workOrderRecordPageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action';
import { workOrderFilterPageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.filter.page.action';

const filePath = path.resolve(__dirname, '../../../../data/docs/MPulse.docx');
const description = generateDescription('Work Order', '_Automation');

When('the user navigates to the Work Order Records page', async function () {
    await homePageActions.navigateToCapitalAssetsRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.menuItemTitle,
        testData.subMenuItemTitle,
        testData.workOrderRecordsPageURL);
});

When('the user creates a new Work Order with a unique description and uploads media', async function () {
    await workOrderRecordPageActions.createWorkOrder(testData.icons.plusIcon, description, testData.element_text.media_text,
        testData.icons.media_link_icon, filePath, testData.element_text.upload_text);
    await workOrderRecordPageActions.setGeneralFields(
        testData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: testData.dropdownSelections.map((item: any) => item.ddType) },
        testData.subMenuItemTitle
    );
});

Then('the Work Order status should be Open', async function () {
    await workOrderRecordPageActions.validateElementText(testData.element_text.open_status_text);
});

Then('the uploaded image should be visible', async function () {
    await workOrderRecordPageActions.verifyLinkedImageVisible();
});

When('the user assign a future due date to the Work Order', async function () {
    await workOrderRecordPageActions.performCalendarActions(
        testData.icons.calendarIcon,
        testData.icons.calendarIcon,
        getFutureDay(2),
        testData.element_text.ok_button_text
    );
    await this.clickSaveButton();
});

When('the user links assets, personnel, and inventory to the Work Order', async function () {
    await workOrderRecordPageActions.linkAssetToTask(
        testData.wo_info.assetAssignedToTask,
        testData.icons.asset_link_icon,
        testData.element_text.replace_button
    );

    await workOrderRecordPageActions.linkPersonnelToAsset(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_link_icon,
        testData.element_text.link_button
    );

    await workOrderRecordPageActions.linkInventoryToAsset(
        testData.wo_info.inventoryAssignedToAsset,
        testData.icons.inventory_link_icon,
        testData.element_text.link_button,
        testData.element_text.input_ok_button
    );

    await workOrderRecordPageActions.setEmployeeActualHours(
        testData.wo_info.personnelAssignedToAsset,
        testData.icons.personnel_eye_icon,
        testData.element_text.timeSheetDetails_text,
        testData.icons.plusIcon_title,
        testData.element_text.hoursField_text,
        testData.element_text.hours,
        testData.icons.crossIcon_title
    );
});

When('the user closes the created Work Order record', async function () {
    await commonPageActions.clickTabByText('Financial');
    await workOrderRecordPageActions.setFinancialFields(testData.costFields);
    await workOrderRecordPageActions.closeWorkOrder(
        testData.element_text.close_wko_text,
        testData.element_text.yes_button,
        testData.element_text.input_ok_button,
        getFutureDateFormatted(2)
    );
});

Then('the Work Order record should be closed successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData.element_text.closed_status_text);
});

Then('the user deletes the newly created Work Order record', async function () {
    await workOrderRecordPageActions.deleteRecord(testData.icons.crossIcon,
        testData.element_text.continue_button_text);
});


/**
 * List View Steps
 */

When('the user creates a new Work Order record from List view with a unique description', async function () {
    await workOrderRecordPageActions.listViewWKO(description);
});

When("the user uploads media file", async function () {
    await workOrderRecordPageActions.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, testData.element_text.upload_text);
    await workOrderRecordPageActions.setGeneralFields(testData.element_text.general_tab_text, getRandomString('digits', 10),
        { ddType: testData.dropdownSelections.map((item: any) => item.ddType) },
        testData.subMenuItemTitle
    );
});

Then('the Work Order record from List view should be close', async function () {
    await workOrderRecordPageActions.closeWorkOrderWithButton(getFutureDateFormatted(2), testData.element_text.input_ok_button);
});

Then('the Work Order record from List view should be delete successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData.element_text.closed_status_text);
    await workOrderRecordPageActions.deleteRecord(testData.icons.crossIcon, testData.element_text.continue_button_text);
});

When(/^the user choses the default layout from the dropdown$/, async function () {
    await workOrderFilterPageActions.chooseDefaultLayout();
});
