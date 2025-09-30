import { Then, When } from "@cucumber/cucumber";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import mrtestData from '../../../../data/maintenance.records.json';
import { wkoSearchUpdatePageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.search.update.page.action";
import { wkoDeletePageAction } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.delete.page.action";
import { mrDeleteRecordsPageAction } from "../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.delete.records.page.action";

let currentRecord: string;
let actions: WebActions;

When(/^the user click on delete current maintenance Record$/, async () => {
    currentRecord = await mrDeleteRecordsPageAction.getCurrentMRRecordIdText();
    await mrDeleteRecordsPageAction.deleteCurrentMR(mrtestData.element_text.quite_waiting);
});

Then(/^the  Maintenance Request Records should be deleted successfully$/, async () => {
    await mrDeleteRecordsPageAction.verifyDeletedMRId(currentRecord);
});

Then(/^the user should not see the Maintenance Request Records in the search results$/, async function () {
    actions = new WebActions(this.page);
    await actions.waitForCustomDelay(timeouts.medium);
    await wkoSearchUpdatePageActions.searchWorkOrder(currentRecord);
    await wkoDeletePageAction.verifyNoMatchesFoundMessage();
});

When(/^the user verifies the maintenance record status$/, async () => {
    await mrDeleteRecordsPageAction.verifyMRStatus();
});
