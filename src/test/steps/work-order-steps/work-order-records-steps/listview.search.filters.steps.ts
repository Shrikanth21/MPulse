import { Then, When } from "@cucumber/cucumber";
import { wkoRowSearchFiltersPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.row.searchfilters.page.action";

let beforeFilteredText: string;
let columnName: string = "ID";
//let columnName: string = "Description";

Then(/^the user get the first record from the Work Order Records list view$/, async () => {
    beforeFilteredText = await wkoRowSearchFiltersPageActions.getFirstIdText(columnName);
});

When(/^the user hovers over the search icon and click on "([^"]*)" option$/, async (option: string) => {
    await wkoRowSearchFiltersPageActions.clickSearchInput(columnName);
    await wkoRowSearchFiltersPageActions.selectSearchOption(option);
});

When(/^the user enters a value in the search field in "([^"]*)" option edit box$/, async (option: string) => {
    switch (option) {
        case "Contains":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Does not contain":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Starts with":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText.slice(0, 3));
            break;
        case "Ends with":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText.slice(-3));
            break;
        case "Equals":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Does not equal":
            await wkoRowSearchFiltersPageActions.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        default:
            throw new Error(`Unknown search option: ${option}`);
    }
    await wkoRowSearchFiltersPageActions.getAndStoreAllRowCellTextsAfterSearch(columnName);
});

Then(/^the "([^"]*)" filtered results should be displayed$/, async (option: string) => {
    switch (option) {
        case "Contains":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText, option);
            break;
        case "Does not contain":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText, option);
            break;
        case "Starts with":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText.slice(0, 3), option);
            break;
        case "Ends with":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText.slice(-3), option);
            break;
        case "Equals":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText, option);
            break;
        case "Does not equal":
            await wkoRowSearchFiltersPageActions.verifyFilteredResults(beforeFilteredText, option);
            break;
        default:
            throw new Error(`Unknown search option: ${option}`);
    }
});

Then(/^the user clicks the Reset option$/, async () => {
    await wkoRowSearchFiltersPageActions.clickResetOption(columnName);
});
