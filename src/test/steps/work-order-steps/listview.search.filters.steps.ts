import { Then, When } from "@cucumber/cucumber";
import { gridHeaderSearchFiltersPage } from "../../../pages/work-order-page/grid.header.searchfilters.page";

let beforeFilteredText: string;
let columnName: string = "ID";
//let columnName: string = "Description";

Then(/^the user get the first record from the Work Order Records list view$/, async () => {
    beforeFilteredText = await gridHeaderSearchFiltersPage.getFirstIdText(columnName);
});

When(/^the user hovers over the search icon and click on "([^"]*)" option$/, async (option: string) => {
    await gridHeaderSearchFiltersPage.clickSearchInput(columnName);
    await gridHeaderSearchFiltersPage.selectSearchOption(option);
});

When(/^the user enters a value in the search field in "([^"]*)" option edit box$/, async (option: string) => {
    switch (option) {
        case "Contains":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Does not contain":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Starts with":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText.slice(0, 3));
            break;
        case "Ends with":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText.slice(-3));
            break;
        case "Equals":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        case "Does not equal":
            await gridHeaderSearchFiltersPage.enterSearchValueForColumn(columnName, beforeFilteredText);
            break;
        default:
            throw new Error(`Unknown search option: ${option}`);
    }
    await gridHeaderSearchFiltersPage.getAndStoreAllRowCellTextsAfterSearch(columnName);
});

Then(/^the "([^"]*)" filtered results should be displayed$/, async (option: string) => {
    switch (option) {
        case "Contains":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText, option, columnName);
            break;
        case "Does not contain":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText, option, columnName);
            break;
        case "Starts with":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText.slice(0, 3), option, columnName);
            break;
        case "Ends with":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText.slice(-3), option, columnName);
            break;
        case "Equals":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText, option, columnName);
            break;
        case "Does not equal":
            await gridHeaderSearchFiltersPage.verifyFilteredResults(beforeFilteredText, option, columnName);
            break;
        default:
            throw new Error(`Unknown search option: ${option}`);
    }
});

Then(/^the user clicks the Reset option$/, async () => {
    await gridHeaderSearchFiltersPage.clickResetOption(columnName);
});
