import { Then, When } from "@cucumber/cucumber";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import { deleteMaintenanceRecordsPage } from "../../../../pages/work-order-page/maintenance-request-records-pages/delete.maintenance.records.page";
import { searchUpdateWorkOrderPage } from "../../../../pages/work-order-page/search.update.wko.page";
import mrtestData from '../../../../data/maintenance.records.json';

let currentRecord: string;
let actions: WebActions;

When(/^the user click on delete current maintenance Record$/, async () => {
    currentRecord = await deleteMaintenanceRecordsPage.getCurrentMRRecordIdText();
    await deleteMaintenanceRecordsPage.deleteCurrentMR(mrtestData.element_text.quite_waiting);
});

Then(/^the  Maintenance Request Records should be deleted successfully$/, async () => {
    await deleteMaintenanceRecordsPage.verifyDeletedMRId(currentRecord);
});

Then(/^the user should not see the  Maintenance Request Records in the search results$/, async function () {
    actions = new WebActions(this.page);
    await actions.waitForCustomDelay(timeouts.medium);
    await searchUpdateWorkOrderPage.searchWorkOrder(currentRecord);
    await deleteMaintenanceRecordsPage.verifyNoMatchesFoundMessage();
});


When(/^the user verifies the maintenance record status$/, async () => {
	await deleteMaintenanceRecordsPage.verifyMRStatus();
});
