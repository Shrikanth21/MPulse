import { Then, When } from "@cucumber/cucumber";
import { wkoGridHeaderSortingActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.grid.header.sorting.action";

let beforeSortedText: string;

When(/^the user maximizes the Work Order Records list view display$/, async () => {
    await wkoGridHeaderSortingActions.clickOnSideBarExpander();
    await wkoGridHeaderSortingActions.clickOnMaximizeButton();
});

When(/^the user click on workorderID$/, async function () {
    beforeSortedText = await wkoGridHeaderSortingActions.getCurrentWorkOrderIdText();
    await wkoGridHeaderSortingActions.clickColumnHeader();
});

Then(/^the Work Order record should be sorted successfully$/, async function () {
    await wkoGridHeaderSortingActions.verifySortedWorkOrderId(beforeSortedText);
});

Then(/^the user minimizes the list view display$/, async () => {
    await wkoGridHeaderSortingActions.clickOnSideBarExpander();
    await wkoGridHeaderSortingActions.clickOnSideBarCollapse();
});
