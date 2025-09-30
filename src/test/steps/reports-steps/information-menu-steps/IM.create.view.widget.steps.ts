import { Then, When } from "@cucumber/cucumber";
import testData from '../../../../data/testData.json';
import filterOptinData from "../../../../data/custom.filter.data.json";
import { generatedIMDescription, generatedReportTitle } from "../../../../helper/get.different.description";
import { commonPageActions } from "../../../../pages/actions/common.page.actions";
import { workOrderFilterPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.filter.page.action";
import { wkoSearchUpdatePageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.search.update.page.action";
import { requisitionRecordsPageActions } from "../../../../pages/actions/Inventory.pages.action/por-requisition-page-action/requisition.records.page.action";
import { reportInformationMenuPageActions } from "../../../../pages/actions/reports-pages-action/information-menu-page-action/report.information.menu.page,action";

let createdIMId: string;
let wkoRecordCount: string;

When(/^the user navigates to the report widget page$/, async () => {
    await requisitionRecordsPageActions.navigateToRequisitionRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.reportsMenuTitle,
        testData.reportWidgetsTitle,
        testData.informationMenuItemsPageURL
    );
});

When(/^the user creates a new Information Menu with unique description and mandatory fields$/, async () => {
    await reportInformationMenuPageActions.createNewInformationMenu(
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
    createdIMId = await reportInformationMenuPageActions.getReportId(generatedReportTitle);
    await reportInformationMenuPageActions.verifyChartVisibility();
});

When(/^the user searches for the new Information Menu in the report widget$/, async () => {
    await wkoSearchUpdatePageActions.searchWorkOrder(createdIMId);
});

Then(/^the user should see the search results for the new Information Menu$/, async () => {
    await reportInformationMenuPageActions.verifySearchedIMRecords(createdIMId);
});

When(/^the user creates a new Information Menu with default widget for Maintenance Advisor$/, async () => {
    await reportInformationMenuPageActions.createNewInformationMenuWithDefaultWidget(
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
    await commonPageActions.clickLinkByText(testData.reportWidgetsTitle);
});

Then(/^the user should see the default widget displayed in the Maintenance Advisor$/, async () => {
    await reportInformationMenuPageActions.verifyDefaultWidgetDisplayed(generatedReportTitle);
});

When(/^the user clicks on the searched Information Menu$/, async () => {
    await commonPageActions.clickLinkByText(createdIMId);
});

Then(/^the user unchecks the default widget option$/, async () => {
    await reportInformationMenuPageActions.uncheckDefaultWidgetOption();
});

Then(/^the user creates a filter using provided criteria with conditions$/, async () => {
    await reportInformationMenuPageActions.applyCustomFilterWithDate(
        filterOptinData.layOutFilterOptions.dateOpened,
        filterOptinData.customFilterOperatorItemContent.equal,
        filterOptinData.customFilterValueItem.statusValue.today,
        filterOptinData.customFilterValueItem.customFilterConditionItem.and
    );
    await workOrderFilterPageActions.clickOnApplyButton();
});

Then(/^the user gets the records count from the list view$/, async () => {
    wkoRecordCount = (await reportInformationMenuPageActions.getWorkOrderRecordCount()).toString();
});

When(/^the user navigates to the report Widget page$/, async () => {
    await reportInformationMenuPageActions.navigateToReportWidgetPage(
        testData.reportsMenuTitle,
        testData.reportWidgetsTitle,
        testData.informationMenuItemsPageURL
    );
});

Then(/^the user creates a new information menu records$/, async () => {
    await reportInformationMenuPageActions.createNewInformationMenuRecords(
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
    await reportInformationMenuPageActions.verifyAssetCount(wkoRecordCount);
});
