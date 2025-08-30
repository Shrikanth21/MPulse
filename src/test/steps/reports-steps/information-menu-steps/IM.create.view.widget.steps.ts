import { Then, When } from "@cucumber/cucumber";
import testData from '../../../../data/testData.json';
import filterOptinData from "../../../../data/custom.filter.data.json";
import { requisitionRecordsPage } from "../../../../pages/Inventory-pages/por-requisition-page/requisition.records.page";
import { reportInformationMenuPage } from "../../../../pages/reports-pages/information-menu-page/report.information.menu.page";
import { searchUpdateWorkOrderPage } from "../../../../pages/work-order-page/search.update.wko.page";
import { generatedIMDescription, generatedReportTitle } from "../../../../helper/get.different.description";
import { commonActionPage } from "../../../../pages/common.action.page";
import { createFilterPage } from "../../../../pages/work-order-page/create.filter.page";

let createdIMId: string;
let wkoRecordCount: string;

When(/^the user navigates to the report widget page$/, async () => {
    await requisitionRecordsPage.navigateToRequisitionRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.reportsMenuTitle,
        testData.reportWidgetsTitle,
        testData.informationMenuItemsPageURL
    );
});

When(/^the user creates a new Information Menu with unique description and mandatory fields$/, async () => {
    await reportInformationMenuPage.createNewInformationMenu(
        generatedReportTitle,
        generatedIMDescription,
        {
            x: testData.displayRecord.x,
            y: testData.displayRecord.y,
            fieldX: testData.displayRecord.fieldX,
            fieldY: testData.displayRecord.fieldY,
            summary: testData.displayRecord.summary
        });
});

Then(/^the user should see the new Information Menu in the report widget$/, async () => {
    createdIMId = await reportInformationMenuPage.getReportId(generatedReportTitle);
    await reportInformationMenuPage.verifyChartVisibility();
});

When(/^the user searches for the new Information Menu in the report widget$/, async () => {
    await searchUpdateWorkOrderPage.searchWorkOrder(createdIMId);
});

Then(/^the user should see the search results for the new Information Menu$/, async () => {
    await reportInformationMenuPage.verifySearchedIMRecords(createdIMId);
});

When(/^the user creates a new Information Menu with default widget for Maintenance Advisor$/, async () => {
    await reportInformationMenuPage.createNewInformationMenuWithDefaultWidget(
        generatedReportTitle,
        generatedIMDescription,
        {
            x: testData.displayRecord.x,
            y: testData.displayRecord.y,
            fieldX: testData.displayRecord.fieldX,
            fieldY: testData.displayRecord.fieldY,
            summary: testData.displayRecord.summary
        });
});

Then(/^the user navigates back to the report widget page$/, async () => {
    await commonActionPage.clickByLinkText(testData.reportWidgetsTitle);
});

Then(/^the user should see the default widget displayed in the Maintenance Advisor$/, async () => {
    await reportInformationMenuPage.verifyDefaultWidgetDisplayed(generatedReportTitle);
});

When(/^the user clicks on the searched Information Menu$/, async () => {
    await commonActionPage.clickByLinkText(createdIMId);
});

Then(/^the user unchecks the default widget option$/, async () => {
    await reportInformationMenuPage.uncheckDefaultWidgetOption();
});

Then(/^the user creates a filter using provided criteria with conditions$/, async () => {
    await createFilterPage.applyCustomFilter(
        filterOptinData.layOutFilterOptions.dateOpened,
        filterOptinData.customFilterOperatorItemContent.equal,
        filterOptinData.customFilterValueItem.statusValue.today,
        filterOptinData.customFilterValueItem.customFilterConditionItem.and
    );
    await createFilterPage.clickOnApplyButton();
});

Then(/^the user gets the records count from the list view$/, async () => {
    wkoRecordCount = (await reportInformationMenuPage.getWorkOrderRecordCount()).toString();
});

When(/^the user navigates to the report Widget page$/, async () => {
    await reportInformationMenuPage.navigateToReportWidgetPage(
        testData.reportsMenuTitle,
        testData.reportWidgetsTitle,
        testData.informationMenuItemsPageURL
    );
});

Then(/^the user creates a new information menu records$/, async () => {
    await reportInformationMenuPage.createNewInformationMenuRecords(
        generatedReportTitle,
        generatedIMDescription,
        {
            x: testData.displayRecord.x,
            y: testData.displayRecord.y,
            fieldX: testData.displayRecord.fieldX,
            fieldY: testData.displayRecord.fieldY,
            summary: testData.displayRecord.summary
        },
        filterOptinData.layOutFilterOptions.workOrderRecords,
        filterOptinData.layOutFilterOptions.dateOpened,
        filterOptinData.customFilterOperatorItemContent.equal,
        filterOptinData.customFilterValueItem.statusValue.today
    );
});

Then(/^the user should see the correct data count displayed in the preview$/, async () => {
    await reportInformationMenuPage.verifyAssetCount(wkoRecordCount);
});
