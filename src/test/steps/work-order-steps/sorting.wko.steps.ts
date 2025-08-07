import { Then, When } from "@cucumber/cucumber";
import { gridPage } from "../../../pages/work-order-page/Grid.header.sorting.page";

let beforesortedText: string;

When(/^the user maximizes the Work Order Records list view display$/, async () => {
    await gridPage.clickOnSideBarExpander();
    await gridPage.clickOnMaximizeButton();
});

When('the user click on workorderID', async function () {
    beforesortedText = await gridPage.getCurrentWorkOrderIdText();
    await gridPage.clickColumnHeader();
});

Then('the Work Order record should be sorted successfully', async function () {
    await gridPage.verifySortedWorkOrderId(beforesortedText);
});

Then(/^the user minimizes the list view display$/, async () => {
    await gridPage.clickOnSideBarExpander();
    await gridPage.clickOnSideBarCollapse();
});
