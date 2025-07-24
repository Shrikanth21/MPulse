import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { commonActionPage } from "../common.action.page";

class GridHeaderSearchFiltersPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        headerTitle: { selector: "//h4[@class='left ng-binding ng-scope']", name: "Header Title" },
        searchInput: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//div[@class='dx-menu-horizontal']", name: "Search Input" },
        reset: { selector: "//li[@class='dx-menu-item-wrapper']//span[normalize-space()='Reset']", name: 'Reset option' },
        searchTextBox: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//input[@role='textbox']", name: "Search Text Box" },
    };

    /**
     * Clicks on the search input for a specific column.
     * @param columnName The name of the column to click on.
     */
    public async clickSearchInput(columnName: string): Promise<void> {
        let searchInput;
        switch (columnName) {
            case "ID":
                searchInput = this.actions.getLocator(this.elements.searchInput.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(this.elements.searchInput.selector).nth(1);
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
        const searchOption = this.actions.getLocator(commonActionPage.getElementByText(title)).nth(0);
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
                searchInput = this.actions.getLocator(this.elements.searchTextBox.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(this.elements.searchTextBox.selector).nth(1);
                break;
            default:
                throw new Error(`Unknown column name: ${columnName}`);
        }
        await this.actions.waitForElementToBeVisible(searchInput, this.elements.searchTextBox.name);
        await this.actions.typeText(searchInput, value, this.elements.searchTextBox.name);
        const headerTitle = this.actions.getLocator(this.elements.headerTitle.selector);
        await this.actions.click(headerTitle, this.elements.headerTitle.name);
        await this.actions.waitForCustomDelay(timeouts.largest);
    }

    /**
     * Clicks on the reset option in the search filters.
     * @param columnName The name of the column to reset.
     */
    public async clickResetOption(columnName: string): Promise<void> {
        await this.clickSearchInput(columnName);
        const resetOption = this.actions.getLocator(this.elements.reset.selector);
        await this.actions.waitForElementToBeVisible(resetOption, this.elements.reset.name);
        await this.actions.click(resetOption, this.elements.reset.name);
    }

    /**
     * Verifies that the search input is visible for a specific column.
     * @param columnName The name of the column to check.
     * @returns A boolean indicating whether the search input is visible.
     */
    public async getFirstIdText(columnName: string): Promise<string> {
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
        const firstCell = this.actions.getLocator(commonActionPage.getRowCellSelector(columnIndex)).nth(0);
        await this.actions.waitForElementToBeVisible(firstCell, `First ${columnName} cell`);
        return await this.actions.getText(firstCell, `First ${columnName} cell`);
    }

    /**
     * Gets the locator for a column header by its name.
     * @param columnName The name of the column.
     * @returns The XPath locator for the column header.
     */
    public async getColumnCellTextsByIndex(index: number): Promise<string[]> {
        const columnCellSelector = commonActionPage.getRowCellSelector(index);
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
     * Verifies that the search input is visible for a specific column.
     * @param columnName The name of the column to check.
     * @return A boolean indicating whether the search input is visible.
     * @returns A boolean indicating whether the search input is visible.
     */
    public async verifyFilteredResults(expectedText: string, option: string, columnName: string): Promise<void> {
        const rowCellTexts: string[] = await this.getAndStoreAllRowCellTextsAfterSearch(columnName);
        switch (option) {
            case "Contains":
                rowCellTexts.includes(expectedText)
                    ? await this.actions.assertTrue(
                        rowCellTexts.some(text => text.includes(expectedText)),
                        `Expected at least one cell text to contain "${expectedText}"`)
                    : await this.actions.assertFalse(
                        rowCellTexts.some(text => text.includes(expectedText)),
                        `Expected no cell text to contain "${expectedText}"`);
                break;
            case "Does not contain":
                for (const text of rowCellTexts) {
                    await this.actions.assertNotContain(text, expectedText);
                }
                break;
            case "Starts with": {
                let found = false;
                for (let i = 0; i < rowCellTexts.length; i++) {
                    const text = rowCellTexts[i];
                    if (!text) continue;
                    const trimmedText = text.trim();
                    if (trimmedText.startsWith(expectedText)) {
                        await this.actions.assertForStartWithTrue(true, `at index ${i}: "${trimmedText}" starts with "${expectedText}"`);
                        found = true;
                    }
                }
                if (!found) {
                    await this.actions.assertForStartWithTrue(false, `No cell text starts with "${expectedText}"`);
                }
            }
                break;
            case "Ends with":
                let found = false;
                for (let i = 0; i < rowCellTexts.length; i++) {
                    const text = rowCellTexts[i];
                    if (!text) continue;
                    const trimmedText = text.trim();
                    const doesEndWith = trimmedText.endsWith(expectedText);
                    if (doesEndWith) {
                        await this.actions.assertTrue(true, `at index ${i}: "${trimmedText}" ends with "${expectedText}"`);
                        found = true;
                    }
                }
                if (!found) {
                    await this.actions.assertTrue(false, `No cell text ends with "${expectedText}"`);
                }
                break;
            case "Equals":
                const firstCell = await this.actions.getLocator(commonActionPage.getRowCellSelector(2)).nth(0);
                await this.actions.waitForElementToBeVisible(firstCell, `First cell after search`);
                const text = await this.actions.getText(firstCell, `First cell text after search`);
                await this.actions.assertEqual(text, expectedText, `Expected "${text}" to equal "${expectedText}"`);
                break;
            case "Does not equal":
                for (const text of rowCellTexts) {
                    await this.actions.assertNotEqual(text, expectedText, `Expected "${text}" to not equal "${expectedText}"`);
                }
                break;
            default:
                throw new Error(`Unknown search option: ${option}`);
        }
    }
}

export const gridHeaderSearchFiltersPage = new GridHeaderSearchFiltersPage();
