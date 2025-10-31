import { When, Then } from '@cucumber/cucumber';
import testData1 from '../../../../data/testData.json';
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
        testData1.homePageURL,
        testData1.element_text.got_it_btn,
        testData1.workOrderTitle,
        testData1.subMenuItemWorkTitle,
        testData1.workOrderRecordsPageURL);
});

When('the user creates a new Work Order with a unique description and uploads media', async function () {
    await workOrderRecordPageActions.createWorkOrder(testData1.icons.plusIcon, description, testData1.element_text.media_text,
        testData1.icons.media_link_icon, filePath, testData1.element_text.upload_text);
    await workOrderRecordPageActions.setGeneralFields(
        testData1.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: testData1.wkoDropdownSelections.map((item: any) => item.ddType) },
        testData1.subMenuItemWorkTitle
    );
});

Then('the Work Order status should be Open', async function () {
    await workOrderRecordPageActions.validateElementText(testData1.element_text.open_status_text);
});

Then('the uploaded image should be visible', async function () {
    await workOrderRecordPageActions.verifyLinkedImageVisible();
});

When('the user assign a future due date to the Work Order', async function () {
    await workOrderRecordPageActions.performCalendarActions(
        testData1.icons.calendarIcon,
        testData1.icons.calendarIcon,
        getFutureDay(2),
        testData1.element_text.ok_button_text
    );
    await this.clickSaveButton();
});

When('the user links assets, personnel, and inventory to the Work Order', async function () {
    await workOrderRecordPageActions.linkAssetToTask(
        testData1.wo_info.assetAssignedToTask,
        testData1.icons.asset_link_icon,
        testData1.element_text.replace_button
    );

    await workOrderRecordPageActions.linkPersonnelToAsset(
        testData1.wo_info.personnelAssignedToAsset,
        testData1.icons.personnel_link_icon,
        testData1.element_text.link_button
    );

    await workOrderRecordPageActions.linkInventoryToAsset(
        testData1.wo_info.inventoryAssignedToAsset,
        testData1.icons.inventory_link_icon,
        testData1.element_text.link_button,
        testData1.element_text.input_ok_button
    );

    await workOrderRecordPageActions.setEmployeeActualHours(
        testData1.wo_info.personnelAssignedToAsset,
        testData1.icons.personnel_eye_icon,
        testData1.element_text.timeSheetDetails_text,
        testData1.icons.plusIcon_title,
        testData1.element_text.hoursField_text,
        testData1.element_text.hours,
        testData1.icons.crossIcon_title
    );
});

When('the user closes the created Work Order record', async function () {
    await commonPageActions.clickTabByText('Financial');
    await workOrderRecordPageActions.setFinancialFields(testData1.costFields);
    await workOrderRecordPageActions.closeWorkOrder(
        testData1.element_text.close_wko_text,
        testData1.element_text.yes_button,
        testData1.element_text.input_ok_button,
        getFutureDateFormatted(2)
    );
});

Then('the Work Order record should be closed successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData1.element_text.closed_status_text);
});

Then('the user deletes the newly created Work Order record', async function () {
    await workOrderRecordPageActions.deleteRecord(testData1.icons.crossIcon,
        testData1.element_text.continue_button_text);
});


/**
 * List View Steps
 */

When('the user creates a new Work Order record from List view with a unique description', async function () {
    await workOrderRecordPageActions.listViewWKO(description);
});

When("the user uploads media file", async function () {
    await workOrderRecordPageActions.addMediaAndSelectRecord(testData1.element_text.media_text, testData1.icons.media_link_icon, filePath, testData1.element_text.upload_text);
    await workOrderRecordPageActions.setGeneralFields(testData1.element_text.general_tab_text, getRandomString('digits', 10),
        { ddType: testData1.wkoDropdownSelections.map((item: any) => item.ddType) },
        testData1.subMenuItemWorkTitle);
});

Then('the Work Order record from List view should be close', async function () {
    await workOrderRecordPageActions.closeWorkOrderWithButton(getFutureDateFormatted(2), testData1.element_text.input_ok_button);
});

Then('the Work Order record from List view should be delete successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData1.element_text.general_tab_text);
    await workOrderRecordPageActions.validateElementText(testData1.element_text.closed_status_text);
    await workOrderRecordPageActions.deleteRecord(testData1.icons.crossIcon, testData1.element_text.continue_button_text);
});

When(/^the user choses the default layout from the dropdown$/, async function () {
    await workOrderFilterPageActions.chooseDefaultLayout();
});
