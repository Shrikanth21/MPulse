import { APIRequestContext, Page, request } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { WkoRowSearchFiltersPageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/wko.row.searchfilters.page.locator";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";
import { ApiHelper } from "../../../../helper/api-helper/authentication-login";


let apiRequestContext: APIRequestContext;

class WkoRowSearchFiltersPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Clicks on the search input for a specific column.
     * @param columnName The name of the column to click on.
     */
    public async clickSearchInput(columnName: string): Promise<void> {
        let searchInput;
        switch (columnName) {
            case "ID":
                searchInput = this.actions.getLocator(WkoRowSearchFiltersPageLocators.searchInput.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(WkoRowSearchFiltersPageLocators.searchInput.selector).nth(1);
                break;
            default:
                throw new Error(`Unknown column name: ${columnName}`);
        }
        await this.actions.waitForElementToBeVisible(searchInput, `${columnName} Search Input`);
        await this.actions.hoverOverElement(searchInput, `${columnName} Search Input`);
    }

    /**
     * Selects a search option by its title.
     * @param title The title of the search option to select.
     */
    public async selectSearchOption(title: string): Promise<void> {
        const searchOption = this.actions.getLocator(CommonPageLocators.getSpanByText(title)).nth(0);
        await this.actions.waitForElementToBeVisible(searchOption, `Search option "${title}"`);
        await this.actions.click(searchOption, `Search option "${title}"`);
    }

    /**
     * Enters a search value for a specific column.
     * @param columnName The name of the column to enter the search value for.
     * @param value The value to enter in the search input.
     * @throws Error if the column name is unknown.
     */
    public async enterSearchValueForColumn(columnName: string, value: string): Promise<void> {
        let searchInput;
        switch (columnName) {
            case "ID":
                searchInput = this.actions.getLocator(WkoRowSearchFiltersPageLocators.searchTextBox.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(WkoRowSearchFiltersPageLocators.searchTextBox.selector).nth(1);
                break;
            default:
                throw new Error(`Unknown column name: ${columnName}`);
        }
        await this.actions.waitForElementToBeVisible(searchInput, WkoRowSearchFiltersPageLocators.searchTextBox.name);
        await this.actions.typeText(searchInput, value, WkoRowSearchFiltersPageLocators.searchTextBox.name);
        const headerTitle = this.actions.getLocator(WkoRowSearchFiltersPageLocators.headerTitle.selector);
        await this.actions.click(headerTitle, WkoRowSearchFiltersPageLocators.headerTitle.name);
        await this.actions.waitForCustomDelay(timeouts.largest);
    }

    /**
     * Clicks on the reset option in the search filters.
     * @param columnName The name of the column to reset.
     */
    public async clickResetOption(columnName: string): Promise<void> {
        await this.clickSearchInput(columnName);
        const resetOption = this.actions.getLocator(WkoRowSearchFiltersPageLocators.reset.selector);
        await this.actions.waitForElementToBeVisible(resetOption, WkoRowSearchFiltersPageLocators.reset.name);
        await this.actions.click(resetOption, WkoRowSearchFiltersPageLocators.reset.name);
    }

    /**
     * Verifies that the search input is visible for a specific column.
     * @param columnName The name of the column to check.
     * @returns A boolean indicating whether the search input is visible.
     */
    public async getFirstIdText(columnName: string): Promise<string> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        let columnIndex: number;
        switch (columnName) {
            case "ID":
                columnIndex = 2;
                break;
            case "Description":
                columnIndex = 3;
                break;
            default:
                throw new Error(`Unknown column name: ${columnName}`);
        }
        const firstCell = this.actions.getLocator(CommonPageLocators.getRowCellByIndex(columnIndex)).nth(0);
        await this.actions.waitForElementToBeVisible(firstCell, `First ${columnName} cell`);
        return await this.actions.getText(firstCell, `First ${columnName} cell`);
    }

    /**
     * Gets the locator for a column header by its name.
     * @param columnName The name of the column.
     * @returns The XPath locator for the column header.
     */
    public async getColumnCellTextsByIndex(index: number): Promise<string[]> {
        const columnCellSelector = CommonPageLocators.getRowCellByIndex(index);
        const columnCells = this.actions.getLocator(columnCellSelector);
        await this.actions.waitForElementToBeVisible(columnCells.first(), `Column cell at index ${index}`);
        return await columnCells.allInnerTexts();
    }

    /**
     * gets stored row cell texts after a search.
     * @param columnName The name of the column.
     * @returns The XPath locator for the column header.
     */
    public async getAndStoreAllRowCellTextsAfterSearch(columnName: string): Promise<string[]> {
        let columnIndex: number;
        switch (columnName) {
            case "ID":
                columnIndex = 2;
                break;
            case "Description":
                columnIndex = 3;
                break;
            default:
                throw new Error(`Unknown column name: ${columnName}`);
        }
        const rowCellTexts = await this.getColumnCellTextsByIndex(columnIndex);
        return rowCellTexts;
    }

    /**
     * Verifies the filtered results in the grid.
     * @param expectedText The text expected to be found in the filtered results.
     * @param option The filter option selected (e.g., "Contains", "Does not contain").
     * @param columnName The name of the column being filtered.
     */
    public async verifyFilteredResults(expectedText: string, option: string): Promise<void> {
        switch (option) {
            case "Contains":
                apiRequestContext = await request.newContext();
                const contain = new ApiHelper(apiRequestContext);
                const containsData = await contain.getRecordDetails("contains", expectedText);
                containsData.forEach(async element => {
                    await this.actions.assertContains(element, expectedText);
                });
                break;
            case "Does not contain":
                apiRequestContext = await request.newContext();
                const doesNotContain = new ApiHelper(apiRequestContext);
                const alldoesNotContainData = await doesNotContain.getRecordDetails("notcontains", expectedText);
                alldoesNotContainData.forEach(async element => {
                    await this.actions.assertNotContain(element, expectedText);
                });
                break;
            case "Starts with":
                apiRequestContext = await request.newContext();
                const startsWith = new ApiHelper(apiRequestContext);
                const allStartsWithData = await startsWith.getRecordDetails("startswith", expectedText);
                allStartsWithData.forEach(async element => {
                    await this.actions.assertStartsWith(element, expectedText, `Verifying that "${element}" starts with "${expectedText}"`);
                });
                break;
            case "Ends with":
                apiRequestContext = await request.newContext();
                const endsWith = new ApiHelper(apiRequestContext);
                const allEndsWithData = await endsWith.getRecordDetails("endswith", expectedText);
                allEndsWithData.forEach(async element => {
                    await this.actions.assertEndsWith(element, expectedText, `Verifying that "${element}" ends with "${expectedText}"`);
                });
                break;
            case "Equals":
                apiRequestContext = await request.newContext();
                const equal = new ApiHelper(apiRequestContext);
                const allEqualData = await equal.getRecordDetails("=", expectedText);
                allEqualData.forEach(async element => {
                    await this.actions.assertEqual(element, expectedText, `Verifying that "${element}" equals "${expectedText}"`);
                });
                break;
            case "Does not equal":
                apiRequestContext = await request.newContext();
                const doesNotEqual = new ApiHelper(apiRequestContext);
                const allDoesNotEqualData = await doesNotEqual.getRecordDetails("<>", expectedText);
                allDoesNotEqualData.forEach(async element => {
                    await this.actions.assertNotEqual(element, expectedText, `Verifying that "${element}" does not equal "${expectedText}"`);
                });
                break;
            default:
                throw new Error(`Unknown search option: ${option}`);
        }
    }
}

export const wkoRowSearchFiltersPageActions = new WkoRowSearchFiltersPageActions();
