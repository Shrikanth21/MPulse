import { Then, When } from "@cucumber/cucumber";
import { wkoOmitLookupPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.omit.lookup.page.action";
import { wkoRowSearchFiltersPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.row.searchfilters.page.action";

let beforeFilteredText: string;
let coulmnName: string = "ID";
let beforeOmitCount: number;

Then(/^the user get the first record from the Work order records list view$/, async () => {
    beforeFilteredText = await wkoRowSearchFiltersPageActions.getFirstIdText(coulmnName);
    beforeOmitCount = await wkoOmitLookupPageActions.getTotalRecordCount();
});

When(/^the user clicks on the "([^"]*)" button$/, async (button: string) => {
    await wkoOmitLookupPageActions.clickFirstWorkOrderRecord();
    await wkoOmitLookupPageActions.clickOnButton(button);
});

Then(/^the omitted Work Order should not appear in the Omitted Records section$/, async () => {
    await wkoOmitLookupPageActions.verifyOmitRecord(beforeFilteredText);
    await wkoOmitLookupPageActions.verifyCountAfterOmitRecord(beforeOmitCount.toString());
});

Then(/^only the selected Work Order should be visible in the list$/, async () => {
    await wkoOmitLookupPageActions.verifyOnlyWorkOrderVisible(beforeFilteredText);
});
