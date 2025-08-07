import { When, Then } from '@cucumber/cucumber';
import { homePage } from '../../../../pages/home-page/Home.page';
import mrtestData from '../../../../data/maintenance.records.json';
import testData from "../../../../data/testData.json";
import { generatedDescription, generatedMaintenanceRecordDescription } from '../../../../helper/get.different.description';
import { maintenanceRequestRecordsPage } from '../../../../pages/work-order-page/maintenance-request-records-pages/maintenanceRequestRecords.page';
import { getRandomString } from '../../../../helper/get-random-string';
import { labelChangePage } from '../../../../pages/work-order-page/label.change.page';
import { mrAutoConvertPage } from '../../../../pages/work-order-page/maintenance-request-records-pages/mr.auto.convert.page';
import { workOrderPage } from '../../../../pages/work-order-page/WorkOrderPage.page';
import * as path from 'path';
import { commonActionPage } from '../../../../pages/common.action.page';

const filePath = path.resolve(__dirname, '../../../../data/docs/MPulse.docx');

When('the user navigates to the Maintenance Request Records page', async function () {
    await homePage.navigateToCapitalAssetsRecordsPage(
        mrtestData.homePageURL,
        mrtestData.element_text.got_it_btn,
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL);
});

When('the user creates a new Maintenance Request with a unique description', async function () {
    await maintenanceRequestRecordsPage.createMaintenanceRecord(generatedMaintenanceRecordDescription);
    await maintenanceRequestRecordsPage.setMrGeneralFields(
        mrtestData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: mrtestData.mrrequestdropdownSelections.map((item: any) => item.ddType) },
        mrtestData.maintenanceRequestSubMenuItemTitle
    );
});

Then(/^the Maintenance Order status should be (.+)$/, async (status: string) => {
    await maintenanceRequestRecordsPage.validateElementText(status);
});

When('the user convert a Maintenance Request into new work order', async function () {
    await maintenanceRequestRecordsPage.clickOnConvertWorkOrderButton(
        mrtestData.element_text.convert_wko_order,
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button,
    );
    await commonActionPage.clickEditButton();
});


When(/^the user navigates to the workflow page and selects work order options$/, async () => {
    await labelChangePage.navigateToManagementToolCustomizationPage(
        testData.element_text.got_it_btn,
        testData.managementToolsMenue,
        testData.workflowSubMenuItemTitle,
        testData.workOrderTitle,
        testData.workflowWorkOrderUrl
    );
});

When(/^the user enables the checkbox for automatic request conversion$/, async () => {
    await mrAutoConvertPage.clickOnToAutomaticRequestConversionCheckbox();
});

When(/^the user navigates to the Maintenance Request record page after clicking the checkbox$/, async () => {
    await mrAutoConvertPage.navigateToMaintenanceRecordsPageFromOtherMenu(
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL
    );
});

When(/^the user link inventory to the Maintenance Request$/, async () => {
    await mrAutoConvertPage.linkInventoryToMaintenanceRequest(
        mrtestData.element_text.inventory_tab_text,
        mrtestData.icons.media_link_icon,
        testData.element_text.link_button
    );
});

Then(/^the user navigate to the work order page automatically$/, async () => {
    await mrAutoConvertPage.verifyAutoConvert(
        mrtestData.element_text.auto_convert_text);
});


When(/^the user navigates to the Maintenance Request record page after creation$/, async () => {
    await mrAutoConvertPage.navigateToMaintenanceRecordsPageFromOtherMenu(
        mrtestData.wkoMenuItemTitle,
        mrtestData.maintenanceRequestSubMenuItemTitle,
        mrtestData.maintenanceRequestPageRecordsURL
    );
});

Then(/^uncheck the checkbox for automatic request conversion$/, async () => {
    await mrAutoConvertPage.navigateToManagementWorkFlowPageFromOtherMenu(
        testData.managementToolsMenue,
        mrtestData.workFLow,
        mrtestData.workOrderTitle,
        testData.workflowWorkOrderUrl
    );
    await mrAutoConvertPage.clickOnToAutomaticRequestConversionCheckbox();
});

When(/^the user creates a new Maintenance Request with a unique description in the list view$/, async () => {
    await maintenanceRequestRecordsPage.listViewMRO(generatedMaintenanceRecordDescription);
});


When("the user upload media file on Maintenance Request page", async function () {
    await workOrderPage.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, mrtestData.element_text.upload_text);
    await commonActionPage.clickLinkByTitle(testData.icons.editIcon);
    await maintenanceRequestRecordsPage.setMrGeneralFields(
        mrtestData.element_text.general_tab_text,
        getRandomString('digits', 10),
        { ddType: mrtestData.mrrequestdropdownSelections.map((item: any) => item.ddType) },
        mrtestData.maintenanceRequestSubMenuItemTitle
    );
});

When("the user upload media file on maintenance request page", async function () {
    await workOrderPage.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, mrtestData.element_text.upload_text);
});

Then(/^the user convert a Maintenance Request into new work order in the list view$/, async () => {
    await maintenanceRequestRecordsPage.clickOnListViewConvertWorkOrderBtn(
        mrtestData.element_text.yes_convert,
        mrtestData.element_text.yes_button
    );
});

Then('the converted Work Order record from List view should be delete successfully', async function () {
    await workOrderPage.clickButtonByText(testData.element_text.general_tab_text);
    await workOrderPage.deleteRecord(testData.icons.crossIcon, testData.element_text.continue_button_text);
});
