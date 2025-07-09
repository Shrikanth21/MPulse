import { Then, When } from "@cucumber/cucumber";
import filterOptinData from "../../../data/custom.filter.data.json";
import { maintenanceAdvisorPage } from "../../../pages/work-order-page/maintenance.advisor.page";
import { createFilterPage } from "../../../pages/work-order-page/create.filter.page";
import { generatedLayoutName } from "../../../helper/get.different.description";

When(/^the user navigates to the Maintenance Advisor module$/, async () => {
    await maintenanceAdvisorPage.navigateToPages(filterOptinData.maintenanceAdvisor.maintenance_advisor_title);
});

Then(/^the user should see the Maintenance Advisor dashboard$/, async () => {
    await maintenanceAdvisorPage.verifyPageTitle(filterOptinData.maintenanceAdvisor.maintenance_advisor_title);
});

When(/^the user sets the desired layout in Maintenance Advisor$/, async () => {
    await maintenanceAdvisorPage.selectSavedLayout(generatedLayoutName);
});

When(/^the user navigates to the dashboard view$/, async () => {
    await maintenanceAdvisorPage.navigateToPages(filterOptinData.maintenanceAdvisor.dashboard_title);
});


Then(/^the color code for each record should be displayed correctly$/, async () => {
    await maintenanceAdvisorPage.verifyMaintenanceAdvisorColorCodeApplied(filterOptinData.customColorItem.Yellow);
});

Then(/^the records appearing should match the expected criteria for the layout$/, async () => {
    await maintenanceAdvisorPage.verifyDraggableBlockHeadExists(generatedLayoutName);
});

Then(/^the layout should be visible in dropdown lists$/, async () => {
    await createFilterPage.verifyLayoutCreatedSuccessfully(generatedLayoutName);
});

Then(/^the user remove the Maintenance Advisor layout$/, async () => {
    await maintenanceAdvisorPage.removeLayout(generatedLayoutName);
});
