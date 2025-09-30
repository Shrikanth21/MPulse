import { Then, When } from "@cucumber/cucumber";
import logger from "../../../../helper/logger";
import { timeouts } from "../../../../helper/timeouts-config";
import { WebActions } from "../../../../base/web.action.util";
import { wkoSearchUpdatePageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.search.update.page.action";
import { wkoDeletePageAction } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.delete.page.action";

let currentRecord: string;
let actions: WebActions;

When(/^the user click on delete current Record$/, async () => {
    currentRecord = await wkoDeletePageAction.getCurrentWorkOrderIdText();
    await wkoDeletePageAction.deleteCurrentWO();
});

Then(/^the Work Order record should be deleted successfully$/, async () => {
    await wkoDeletePageAction.verifyDeletedWOId(currentRecord);
    logger.info("Current Work Order deleted Successfully");
});

Then(/^the user should not see the Work Order in the search results$/, async function () {
    actions = new WebActions(this.page);
    await actions.waitForCustomDelay(timeouts.medium);
    await wkoSearchUpdatePageActions.searchWorkOrder(currentRecord);
    await wkoDeletePageAction.verifyNoMatchesFoundMessage();
});
