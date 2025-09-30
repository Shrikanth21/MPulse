import { Then, When } from "@cucumber/cucumber";
import { updatedDescription } from "../../../../helper/get.different.description";
import { WebActions } from "../../../../base/web.action.util";
import { timeouts } from "../../../../helper/timeouts-config";
import { wkoSearchUpdatePageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.search.update.page.action";

let workOrderId: string;
let workOrderDescription: string;
let actions: WebActions;

Then(/^the user search the Work Order Records by work order id$/, async function () {
    actions = new WebActions(this.page);
    workOrderId = await wkoSearchUpdatePageActions.getWorkOrderId();
    await actions.waitForCustomDelay(timeouts.medium);
    await wkoSearchUpdatePageActions.searchWorkOrder(workOrderId);
});

Then(/^the user should see the Work Order in the search results$/, async () => {
    await wkoSearchUpdatePageActions.verifySearchResult(workOrderId);
});

When(/^the user click on the search work order$/, async () => {
    await actions.waitForCustomDelay(timeouts.medium);
    await wkoSearchUpdatePageActions.clickOnSearchResult();
});

When(/^the user click on edit button$/, async () => {
    workOrderDescription = await wkoSearchUpdatePageActions.getDescription();
    await wkoSearchUpdatePageActions.clickOnEditIcon();
});

Then(/^the user change the description of the Work Order$/, async () => {
    await wkoSearchUpdatePageActions.enterNewDescription(updatedDescription);
});

Then(/^the changes should be saved successfully$/, async () => {
    await wkoSearchUpdatePageActions.clickOnSaveButton();
    await actions.waitForCustomDelay(timeouts.medium);
    await wkoSearchUpdatePageActions.verifyUpdatedDescription(workOrderDescription);
});
