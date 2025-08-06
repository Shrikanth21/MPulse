import { Then, When } from "@cucumber/cucumber";
import { createFilterPage } from "../../../pages/work-order-page/create.filter.page";
import { generateDescription } from "../../../helper/get.different.description";
import filterOptinData from "../../../data/custom.filter.data.json";
import logger from "../../../helper/loggs/logger";
import { withGroupFilterPage } from "../../../pages/work-order-page/create.filter.withGroup.page";
import { maintenanceAdvisorPage } from "../../../pages/work-order-page/maintenance.advisor.page";

const layoutName = generateDescription('Layout', '_Automation');

When(/^the user clicks on the Settings icon$/, async () => {
    await createFilterPage.clickOnCustomizeButton();
});

Then(/^the user should see the Settings menu$/, async () => {
    await createFilterPage.verifyCustomizeModalHeader();
});

When(/^the user clicks on the add Layout button$/, async () => {
    await createFilterPage.clickOnAddLayoutButton();
});

When(/^the user enters a unique name for the layout$/, async () => {
    await createFilterPage.enterLayoutName(layoutName);
});

// When(/^the user selected the required columns: Asset Type, dateDue, createdBy, Othercost, Status$/, async () => {
//     await createFilterPage.selectFilterOption([
//         filterOptinData.layOutFilterOptions.assetType,
//         filterOptinData.layOutFilterOptions.dateDue,
//         filterOptinData.layOutFilterOptions.createdBy,
//         filterOptinData.layOutFilterOptions.otherCost,
//         filterOptinData.layOutFilterOptions.status
//     ]);
//     await createFilterPage.clickOnSaveButton();
//     await createFilterPage.clickOnApplyButton();
// });

When(/^the user selects the required columns$/, async () => {
    await createFilterPage.selectFilterOption([
        filterOptinData.layOutFilterOptions.assetType,
        filterOptinData.layOutFilterOptions.dateDue,
        filterOptinData.layOutFilterOptions.createdBy,
        filterOptinData.layOutFilterOptions.otherCost,
        filterOptinData.layOutFilterOptions.status
    ]);
    await createFilterPage.clickOnSaveButton();
    await createFilterPage.clickOnApplyButton();
});

Then(/^the layout should be visible in dropdown list$/, async () => {
    await createFilterPage.verifyLayoutCreatedSuccessfully(layoutName);
});

Then(/^the layout should be applied and required columns should be visible$/, async () => {
    await createFilterPage.verifyLayoutAppliedAndColumnsVisible([
        filterOptinData.layOutFilterOptions.assetType,
        filterOptinData.layOutFilterOptions.dateDue,
        filterOptinData.layOutFilterOptions.createdBy,
        filterOptinData.layOutFilterOptions.otherCost,
        filterOptinData.layOutFilterOptions.status,
    ]);
});

When(/^the user clicks on the Settings icon again$/, async () => {
    await createFilterPage.clickOnCustomizeButtonAgain();
});

When(/^the user navigate to the custom filter Layouts tab$/, async () => {
    await createFilterPage.clickOnTab(filterOptinData.filterTabOptions.customFiltersTab);
});

// When(/^the user create filter with the status "([^"]*)" and createdBy "([^"]*)" with conditions And$/, async (status: string, createdBy: string) => {
//     await createFilterPage.applyCustomFilter(
//         filterOptinData.layOutFilterOptions.status,
//         filterOptinData.customFilterOperatorItemContent.equal,
//         status,
//         filterOptinData.customFilterValueItem.customFilterConditionItem.and
//     );
//     await createFilterPage.applyMoreCustomFilter(
//         filterOptinData.layOutFilterOptions.createdBy,
//         filterOptinData.customFilterOperatorItemContent.equal,
//         createdBy,
//         filterOptinData.customFilterValueItem.customFilterConditionItem.and
//     );
//     await createFilterPage.clickOnApplyButton();
// });


When(/^the user creates a filter using provided criteria with And conditions$/, async () => {
    await createFilterPage.applyCustomFilter(
        filterOptinData.layOutFilterOptions.status,
        filterOptinData.customFilterOperatorItemContent.equal,
        filterOptinData.customFilterValueItem.statusValue.closed,
        filterOptinData.customFilterValueItem.customFilterConditionItem.and
    );
    await createFilterPage.applyMoreCustomFilter(
        filterOptinData.layOutFilterOptions.createdBy,
        filterOptinData.customFilterOperatorItemContent.equal,
        filterOptinData.customFilterValueItem.createdByValue.created_by,
        filterOptinData.customFilterValueItem.customFilterConditionItem.and
    );
    await createFilterPage.clickOnApplyButton();
});


// Then(/^the user should see only the Work Orders with status "([^"]*)" and createdBy "([^"]*)"$/, async (status: string, createdBy: string) => {
//     await createFilterPage.verifyOnlyWorkOrdersFilter(status, createdBy);
// });

Then(/^the user should see only the Work Orders matching the provided filter criteria$/, async () => {
    await createFilterPage.verifyOnlyWorkOrdersFilter(
        filterOptinData.customFilterValueItem.statusValue.closed,
        filterOptinData.customFilterValueItem.createdByValue.created_by
    );
});


When(/^the user navigates to the Color Code Layouts tab$/, async () => {
    await createFilterPage.clickOnTab(filterOptinData.filterTabOptions.colorCodeTab);
});

When(/^the user creates a color code for the status "([^"]*)" with a specific color$/, async (status: string) => {
    await createFilterPage.applyColorCodeFilter(filterOptinData.layOutFilterOptions.status, filterOptinData.customFilterOperatorItemContent.equal, status, filterOptinData.customColorItem.Yellow);
});

Then(/^the Work Orders with status "([^"]*)" should be highlighted with the specified color$/, async (status: string) => {
    await createFilterPage.verifyColorCodeApplied(filterOptinData.customColorItem.Yellow);
    logger.info(`Verified that Work Orders with status "${status}" are highlighted with the ${filterOptinData.customColorItem.Yellow} color.`);
});

Then(/^the user deletes the created layout$/, async () => {
    await createFilterPage.clickOnDeleteCurrentRecord();
    await createFilterPage.verifyLayoutDeleted(layoutName);
});

When(/^the user clicks on the Group checkbox$/, async () => {
    await withGroupFilterPage.clickGroupCheckbox();
});

When(/^the user drags the "([^"]*)" and "([^"]*)" to the group by area$/, async (status: string, createdBy: string) => {
    await withGroupFilterPage.dragColumnToGroupPanel(status);
    await withGroupFilterPage.dragColumnToGroupPanel(createdBy);
});


Then(/^the grouped column header for "([^"]*)" should be visible$/, async (columnName: string) => {
    await withGroupFilterPage.verifyGroupedColumnHeadersVisible(columnName);
});

When(/^the user expands the last customized group to view its Work Orders$/, async () => {
    await withGroupFilterPage.expandCreatedByGroup();
});

When(/^the user navigates to the Maintenance Advisor module$/, async () => {
    await maintenanceAdvisorPage.navigateToPages(filterOptinData.maintenanceAdvisor.maintenance_advisor_title);
});

Then(/^the user should see the Maintenance Advisor dashboard$/, async () => {
    await maintenanceAdvisorPage.verifyPageTitle(filterOptinData.maintenanceAdvisor.maintenance_advisor_title);
});

When(/^the user sets the desired layout in Maintenance Advisor$/, async () => {
    await maintenanceAdvisorPage.selectSavedLayout(layoutName);
});

When(/^the user navigates to the dashboard view$/, async () => {
    await maintenanceAdvisorPage.navigateToPages(filterOptinData.maintenanceAdvisor.dashboard_title);
});


Then(/^the color code for each record should be displayed correctly$/, async () => {
    await maintenanceAdvisorPage.verifyMaintenanceAdvisorColorCodeApplied(filterOptinData.customColorItem.Yellow);
});

Then(/^the records appearing should match the expected criteria for the layout$/, async () => {
    await maintenanceAdvisorPage.verifyDraggableBlockHeadExists(layoutName);
});

Then(/^the user remove the Maintenance Advisor layout$/, async () => {
    await maintenanceAdvisorPage.removeLayout();
});
