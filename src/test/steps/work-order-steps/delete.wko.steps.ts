import { Then, When } from "@cucumber/cucumber";
import logger from "../../../helper/loggs/logger";
import { searchUpdateWorkOrderPage } from "../../../pages/work-order-page/search.update.wko.page";
import { timeouts } from "../../../helper/timeouts-config";
import { WebActions } from "../../../base/web.action.util";
import { deleteWOPage } from "../../../pages/work-order-page/Delete.Wko.page";

let currentRecord: string;
let actions: WebActions;

When(/^the user click on delete current Record$/, async () => {
    currentRecord = await deleteWOPage.getCurrentWorkOrderIdText();
    await deleteWOPage.deleteCurrentWO();
});

Then(/^the Work Order record should be deleted successfully$/, async () => {
    await deleteWOPage.verifyDeletedWOId(currentRecord);
    logger.info("Current Work Order deleted Successfully");
});


Then(/^the user should not see the Work Order in the search results$/, async function () {
    actions = new WebActions(this.page);
    await actions.waitForCustomDelay(timeouts.medium);
    await searchUpdateWorkOrderPage.searchWorkOrder(currentRecord);
    await deleteWOPage.verifyNoMatchesFoundMessage();
});


