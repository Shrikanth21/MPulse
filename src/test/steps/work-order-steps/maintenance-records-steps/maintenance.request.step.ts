import { When, Then } from '@cucumber/cucumber';
import * as path from 'path';
import mrtestData from '../../../../data/maintenance.records.json';
import testData from "../../../../data/testData.json";
import { generatedMaintenanceRecordDescription } from '../../../../helper/get.different.description';
import { getRandomString } from '../../../../helper/get-random-string';
import { homePageActions } from '../../../../pages/actions/home-page-action/home.page.actions';
import { commonPageActions } from '../../../../pages/actions/common.page.actions';
import { workOrderRecordPageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action';
import { wkoLabelChangePageActions } from '../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.label.change.page.action';
import { mrRecordsPageAction } from '../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.records.page.action';
import { mrAutoConvertPageActions } from '../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.auto.convert.page.action';

const filePath = path.resolve(__dirname, '../../../../data/docs/MPulse.docx');

When('the user navigates to the Maintenance Request Records page', async function () {
    await homePageActions.navigateToCapitalAssetsRecordsPage(
        mrtestData.homePageURL,
        mrtestData.element_text.got_it_btn,
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL);
});

When('the user creates a new Maintenance Request with a unique description', async function () {
    await mrRecordsPageAction.createMaintenanceRecord(generatedMaintenanceRecordDescription);
    await mrRecordsPageAction.setMrGeneralFields(
        mrtestData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: mrtestData.mrrequestdropdownSelections.map((item: any) => item.ddType) },
        mrtestData.maintenanceRequestSubMenuItemTitle
    );
});

Then(/^the Maintenance Order status should be (.+)$/, async (status: string) => {
    await mrRecordsPageAction.validateElementText(status);
});

When('the user convert a Maintenance Request into new work order', async function () {
    await mrRecordsPageAction.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
    await commonPageActions.clickEditButton();
});


When(/^the user navigates to the workflow page and selects work order options$/, async () => {
    await wkoLabelChangePageActions.navigateToManagementToolCustomizationPage(
        testData.element_text.got_it_btn,
        testData.managementToolsMenu,
        testData.workflowSubMenuItemTitle,
        testData.workOrderTitle,
        testData.workflowWorkOrderUrl
    );
});

When(/^the user enables the checkbox for automatic request conversion$/, async () => {
    await mrAutoConvertPageActions.clickOnToAutomaticRequestConversionCheckbox();
});

When(/^the user navigates to the Maintenance Request record page after clicking the checkbox$/, async () => {
    await mrAutoConvertPageActions.navigateToMaintenanceRecordsPageFromOtherMenu(
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL
    );
});

When(/^the user link inventory to the Maintenance Request$/, async () => {
    await mrAutoConvertPageActions.linkInventoryToMaintenanceRequest(
        mrtestData.element_text.inventory_tab_text,
        mrtestData.icons.media_link_icon,
        testData.element_text.link_button
    );
});

Then(/^the user navigate to the work order page automatically$/, async () => {
    await mrAutoConvertPageActions.verifyAutoConvert(
        mrtestData.element_text.auto_convert_text);
});


When(/^the user navigates to the Maintenance Request record page after creation$/, async () => {
    await mrAutoConvertPageActions.navigateToMaintenanceRecordsPageFromOtherMenu(
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL
    );
});

Then(/^uncheck the checkbox for automatic request conversion$/, async () => {
    await mrAutoConvertPageActions.navigateToManagementWorkFlowPageFromOtherMenu(
        testData.managementToolsMenu,
        mrtestData.workFLow,
        mrtestData.workOrderTitle,
        testData.workflowWorkOrderUrl
    );
    await mrAutoConvertPageActions.clickOnToAutomaticRequestConversionCheckbox();
});

When(/^the user creates a new Maintenance Request with a unique description in the list view$/, async () => {
    await mrRecordsPageAction.listViewMRO(generatedMaintenanceRecordDescription);
});


When("the user upload media file on Maintenance Request page", async function () {
    await workOrderRecordPageActions.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, mrtestData.element_text.upload_text);
    await commonPageActions.clickLinkByTitle(testData.icons.editIcon);
    await mrRecordsPageAction.setMrGeneralFields(
        mrtestData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: mrtestData.mrrequestdropdownSelections.map((item: any) => item.ddType) },
        mrtestData.maintenanceRequestSubMenuItemTitle
    );
});

When("the user upload media file on maintenance request page", async function () {
    await workOrderRecordPageActions.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, mrtestData.element_text.upload_text);
});

Then(/^the user convert a Maintenance Request into new work order in the list view$/, async () => {
    await mrRecordsPageAction.clickOnListViewConvertWorkOrderBtn(
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button
    );
});

Then('the converted Work Order record from List view should be delete successfully', async function () {
    await workOrderRecordPageActions.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderRecordPageActions.deleteRecord(testData.icons.crossIcon, testData.element_text.continue_button_text);
});
