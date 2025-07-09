import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";

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

    private getSearchOptionByTitle = (title: string): string => `//span[text()='${title}']`;
    public getRowCellSelector = (index: number): string => `//td[contains(@aria-describedby,'dx-col') and @aria-colindex='${index}']`;


    public async clickSearchInput(coulmnName: string): Promise<void> {
        let searchInput;
        switch (coulmnName) {
            case "ID":
                searchInput = this.actions.getLocator(this.elements.searchInput.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(this.elements.searchInput.selector).nth(1);
                break;
            default:
                throw new Error(`Unknown column name: ${coulmnName}`);
        }
        await this.actions.waitForElementToBeVisible(searchInput, `${coulmnName} Search Input`);
        await this.actions.hoverOverElement(searchInput, `${coulmnName} Search Input`);
    }

    public async selectSearchOption(title: string): Promise<void> {
        const searchOption = this.actions.getLocator(this.getSearchOptionByTitle(title)).nth(0);
        await this.actions.waitForElementToBeVisible(searchOption, `Search option "${title}"`);
        await this.actions.click(searchOption, `Search option "${title}"`);
    }

    public async enterSearchValueForColumn(coulmnName: string, value: string): Promise<void> {
        let searchInput;
        switch (coulmnName) {
            case "ID":
                searchInput = this.actions.getLocator(this.elements.searchTextBox.selector).nth(0);
                break;
            case "Description":
                searchInput = this.actions.getLocator(this.elements.searchTextBox.selector).nth(1);
                break;
            default:
                throw new Error(`Unknown column name: ${coulmnName}`);
        }
        await this.actions.waitForElementToBeVisible(searchInput, this.elements.searchTextBox.name);
        await this.actions.typeText(searchInput, value, this.elements.searchTextBox.name);
        const headerTitle = this.actions.getLocator(this.elements.headerTitle.selector);
        await this.actions.click(headerTitle, this.elements.headerTitle.name);
        await this.actions.waitForCustomDelay(timeouts.largest);
    }

    public async clickResetOption(coulmnName: string): Promise<void> {
        await this.clickSearchInput(coulmnName);
        const resetOption = this.actions.getLocator(this.elements.reset.selector);
        await this.actions.waitForElementToBeVisible(resetOption, this.elements.reset.name);
        await this.actions.click(resetOption, this.elements.reset.name);
    }

    public async getFirstIdText(coulmnName: string): Promise<string> {
        let columnIndex: number;
        switch (coulmnName) {
            case "ID":
                columnIndex = 2;
                break;
            case "Description":
                columnIndex = 3;
                break;
            default:
                throw new Error(`Unknown column name: ${coulmnName}`);
        }
        const firstCell = this.actions.getLocator(this.getRowCellSelector(columnIndex)).nth(0);
        await this.actions.waitForElementToBeVisible(firstCell, `First ${coulmnName} cell`);
        return await this.actions.getText(firstCell, `First ${coulmnName} cell`);
    }

    public async getColumnCellTextsByIndex(index: number): Promise<string[]> {
        const columnCellSelector = this.getRowCellSelector(index);
        const columnCells = this.actions.getLocator(columnCellSelector);
        await this.actions.waitForElementToBeVisible(columnCells.first(), `Column cell at index ${index}`);
        return await columnCells.allInnerTexts();
    }

    public async getAndStoreAllRowCellTextsAfterSearch(coulmnName: string): Promise<string[]> {
        let columnIndex: number;
        switch (coulmnName) {
            case "ID":
                columnIndex = 2;
                break;
            case "Description":
                columnIndex = 3;
                break;
            default:
                throw new Error(`Unknown column name: ${coulmnName}`);
        }
        const rowCellTexts = await this.getColumnCellTextsByIndex(columnIndex);
        return rowCellTexts;
    }

    public async verifyFilteredResults(expectedText: string, option: string, coulmnName: string): Promise<void> {
        const rowCellTexts: string[] = await this.getAndStoreAllRowCellTextsAfterSearch(coulmnName);
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
                const firstCell = await this.actions.getLocator(this.getRowCellSelector(2)).nth(0);
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
