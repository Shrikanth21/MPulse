import { Then, When } from "@cucumber/cucumber";
import { omitAndLookupPage } from "../../../../pages/work-order-page/omit.lookup.page";
import { gridHeaderSearchFiltersPage } from "../../../../pages/work-order-page/grid.header.searchfilters.page";

let beforeFilteredText: string;
let coulmnName: string = "ID";
let beforeOmitCount: number;

Then(/^the user get the first record from the Work order records list view$/, async () => {
    beforeFilteredText = await gridHeaderSearchFiltersPage.getFirstIdText(coulmnName);
    beforeOmitCount = await omitAndLookupPage.getTotalRecordCount();
});

When(/^the user clicks on the "([^"]*)" button$/, async (button: string) => {
    await omitAndLookupPage.clickFirstWorkOrderRecord();
    await omitAndLookupPage.clickOnButton(button);
});

Then(/^the omitted Work Order should not appear in the Omitted Records section$/, async () => {
    await omitAndLookupPage.verifyOmitRecord(beforeFilteredText);
    await omitAndLookupPage.verifyCountAfterOmitRecord(beforeOmitCount.toString());
});

Then(/^only the selected Work Order should be visible in the list$/, async () => {
    await omitAndLookupPage.verifyOnlyWorkOrderVisible(beforeFilteredText);
});
