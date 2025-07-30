import { Then, When } from "@cucumber/cucumber";
import { searchUpdateWorkOrderPage } from "../../../pages/work-order-page/search.update.wko.page";
import { updatedDescription } from "../../../helper/get.different.description";
import { WebActions } from "../../../base/web.action.util";
import { timeouts } from "../../../helper/timeouts-config";

let workOrderId: string;
let workOrderDescription: string;
let actions: WebActions;

Then(/^the user search the Work Order Records by work order id$/, async function () {
    actions = new WebActions(this.page);
    workOrderId = await searchUpdateWorkOrderPage.getWorkOrderId();
    await actions.waitForCustomDelay(timeouts.medium);
    await searchUpdateWorkOrderPage.searchWorkOrder(workOrderId);
});

Then(/^the user should see the Work Order in the search results$/, async () => {
    await searchUpdateWorkOrderPage.verifySearchResult(workOrderId);
});

When(/^the user click on the search work order$/, async () => {
    await actions.waitForCustomDelay(timeouts.medium);
    await searchUpdateWorkOrderPage.clickOnSearchResult();
});

When(/^the user click on edit button$/, async () => {
    workOrderDescription = await searchUpdateWorkOrderPage.getDescription();
    await searchUpdateWorkOrderPage.clickOnEditIcon();
});

Then(/^the user change the description of the Work Order$/, async () => {
    await searchUpdateWorkOrderPage.enterNewDescription(updatedDescription);
});

Then(/^the changes should be saved successfully$/, async () => {
    await searchUpdateWorkOrderPage.clickOnSaveButton();
    await actions.waitForCustomDelay(timeouts.medium);
    await searchUpdateWorkOrderPage.verifyUpdatedDescription(workOrderDescription);
});
