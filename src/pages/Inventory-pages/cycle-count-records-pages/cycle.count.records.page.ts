import { Page } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { commonActionPage } from "../../common.action.page";
import { workOrderPage } from "../../work-order-page/WorkOrderPage.page";
import { fi } from "@faker-js/faker/.";
import { homePage } from "../../home-page/Home.page";
import { timeouts } from "../../../helper/timeouts-config";

class CycleCountRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        countTypeDropdown: { selector: "//div[@id='CCOUNTCOUNTTYPE']", name: "Count Type Dropdown" },
        filterInput: { selector: "//tr[@ng-if='showFilters']/descendant::div[@class='dx-texteditor-container']//input", name: "Filter Input" },
        cycId: { selector: "//span[@id='Code']", name: "Code Span" },
        cycDesc: { selector: "//span[@id='Desc']", name: "Description Span" },
        dateRangeInput: { selector: "//div[@title='Date Range']/descendant::div[@class='dx-texteditor-container']", name: "Date Range Input" },
        searchTextBox: { selector: "//tr[@class='dx-row dx-column-lines dx-datagrid-filter-row']//input[@role='textbox']", name: "Search Text Box" },
        searchedId: { selector: "//a[@class='dx-link ng-scope']", name: "Searched ID" },
        inventorySelectedForCounting: { selector: "//span[@title='Inventory selected for counting']", name: "Inventory Selected For Counting Span" },
        numberOfItem: { selector: "//div[@class='form-group-control-wrap-inner']/child::span[@class='form-editor ng-binding']", name: "Number Of Item" },
        cycleCountLinks: { selector: "//datagrid[@id='CycleCount']/descendant::tr/descendant::a", name: "Cycle Count Links" },
        itemsToCountInput: { selector: "//div[@id='CCOUNTITEMSTOCOUNT']/descendant::input", name: "Items To Count Input" },
    }

    /**
     * Gets the created cycle count ID.
     * @returns The created cycle count ID.
     */
    public async getCreatedCycId(): Promise<string> {
        return await this.actions.getText(this.actions.getLocator(this.elements.cycId.selector), this.elements.cycId.name);
    }

    /**
     * Gets the count of items.
     * @returns The count of items.
     */
    public async getCount(): Promise<string> {
        const countLocator = this.actions.getLocator(this.elements.numberOfItem.selector);
        await this.actions.waitForElementToBeVisible(countLocator, this.elements.numberOfItem.name);
        const countText = await this.actions.getText(countLocator, this.elements.numberOfItem.name);
        return countText;
    }

    /**
     * Clicks on the Count Type dropdown and selects the specified count type.
     * @param countType The type of count to select (e.g., "Filtered Set", "Random Sample").
     */
    public async selectCountType(countType: string): Promise<void> {
        const countTypeEl = await this.actions.getLocator(this.elements.countTypeDropdown.selector);
        await this.actions.waitForElementToBeVisible(countTypeEl, this.elements.countTypeDropdown.name);
        await this.actions.click(countTypeEl, this.elements.countTypeDropdown.name);
        if (countType === "Filtered Set") {
            await commonActionPage.clickByDivTitle(countType);
        } else if (countType === "Random Sample") {
            await commonActionPage.clickByDivTitle(countType);
        }
    }

    /**
     * Creates a new cycle count record.
     * @param description The description of the cycle count.
     * @param countType The type of count to select (e.g., "Filtered Set", "Random Sample").
     * @param dropdownSelections The dropdown selections to make.
     */
    public async createCycleCountRecord(
        description: string,
        countType: string,
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        commonActionPage.clickAddNewRecordButton();
        await commonActionPage.enterDescription(description);
        await this.selectCountType(countType);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
    }

    /**
     * Clicks on the "Convert to Work Order" button.
     * @param convertText The text of the button to click.
     * @param yesConvert The text of the confirmation button to click.
     */
    public async clickOnConvertWorkOrderButton(
        convertText: string,
        yesConvert: string,
        yesButton: string
    ): Promise<void> {
        await commonActionPage.clickButtonByTitle(convertText);
        await commonActionPage.clickElementByText(yesConvert);
        await commonActionPage.clickElementByText(yesButton);
    }

    /**
     * Verifies the filtered population label is displayed.
     * @param labelText The text of the label to verify.
     */
    public async verifyFilteredPopulationLabel(labelText: string): Promise<void> {
        const labelLocator = this.actions.getLocator(commonActionPage.getElementByLabelText(labelText));
        await this.actions.waitForElementToBeVisible(labelLocator, `Label: ${labelText}`);
        const labelTextContent = await this.actions.getText(labelLocator, `Label: ${labelText}`);
        await this.actions.assertContains(labelTextContent, labelText);
    }

    /**
     * Applies a filter to the cycle count records.
     * @param field The field to filter by.
     * @param operator The operator to use for the filter.
     * @param value The value to filter by.
     * @param condition The condition to apply to the filter.
     */
    public async applyCycFilter(field: string, operator: string, value: string, condition: string): Promise<void> {
        const fieldFilterInput = this.actions.getLocator(this.elements.filterInput.selector).nth(0);
        await this.actions.waitForElementToBeVisible(fieldFilterInput, this.elements.filterInput.name);
        await this.actions.typeText(fieldFilterInput, field, this.elements.filterInput.name);
        await commonActionPage.clickByDivTitle(field);

        const operatorFilterInput = this.actions.getLocator(this.elements.filterInput.selector).nth(1);
        await this.actions.waitForElementToBeVisible(operatorFilterInput, this.elements.filterInput.name);
        await this.actions.typeText(operatorFilterInput, operator, this.elements.filterInput.name);
        await commonActionPage.clickByDivTitle(operator);

        const valueFilterInput = this.actions.getLocator(this.elements.filterInput.selector).nth(2);
        await this.actions.waitForElementToBeVisible(valueFilterInput, this.elements.filterInput.name);
        await this.actions.typeText(valueFilterInput, value, this.elements.filterInput.name);
        await commonActionPage.clickByDivTitle(value);

        const conditionFilterInput = this.actions.getLocator(this.elements.filterInput.selector).nth(3);
        await this.actions.waitForElementToBeVisible(conditionFilterInput, this.elements.filterInput.name);
        await this.actions.typeText(conditionFilterInput, condition, this.elements.filterInput.name);
        await commonActionPage.clickByDivTitle(condition);

        await commonActionPage.clickSaveButton();
    }

    /**
     * Verifies that a Cycle Count Record has been created.
     * @param description The description of the Cycle Count Record.
     * @returns 
     */
    public async verifyCycleCountRecordCreated(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(this.elements.cycDesc.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, this.elements.cycDesc.name);
        const descText = await this.actions.getText(descriptionLocator, this.elements.cycDesc.name);
        return this.actions.assertEqual(description, descText, this.elements.cycDesc.name);
    }

    /**
     * Navigates to the Open Scheduled Maintenance page.
     * @param menuItemTitle The title of the menu item.
     * @param subMenuItemTitle The title of the sub-menu item.
     * @param expectedUrl The expected URL of the page.
     */
    public async navigateToOpenScheduledMaintenancePage(
        menuItemTitle: string,
        subMenuItemTitle: string,
        expectedUrl: string
    ): Promise<void> {
        await homePage.clickSideMenuIcon();
        await commonActionPage.clickBySpanTitle(menuItemTitle);
        await homePage.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     * Selects a date range for the cycle count record.
     * @param date
     */
    public async selectDateRange(date: string, spanText: string): Promise<void> {
        const dateRangeInputLocator = this.actions.getLocator(this.elements.dateRangeInput.selector);
        await this.actions.waitForElementToBeVisible(dateRangeInputLocator, this.elements.dateRangeInput.name);
        await this.actions.click(dateRangeInputLocator, this.elements.dateRangeInput.name);
        await commonActionPage.clickByDivTitle(date);
        await commonActionPage.clickBySpanText(spanText);
    }

    /**
     * Searches for a Cycle Count Record by ID.
     * @param id The ID of the Cycle Count Record to search for.
     */
    public async searchCycleCountRecord(id: string): Promise<void> {
        const searchInputLocator = this.actions.getLocator(this.elements.searchTextBox.selector).nth(0);
        await this.actions.waitForElementToBeVisible(searchInputLocator, this.elements.searchTextBox.name);
        await this.actions.typeText(searchInputLocator, id, this.elements.searchTextBox.name);
        await this.actions.waitForCustomDelay(timeouts.large);
    }

    /**
     * Verifies that a Cycle Count Record is present in the search results.
     * @param id The ID of the Cycle Count Record to verify.
     */
    public async verifyCycleCountRecordInSearchResults(id: string): Promise<void> {
        const searchResultsLocator = this.actions.getLocator(this.elements.searchedId.selector).nth(0);
        await this.actions.waitForElementToBeVisible(searchResultsLocator, this.elements.searchedId.name);
        const resultText = await this.actions.getText(searchResultsLocator, this.elements.searchedId.name);
        await this.actions.assertEqual(resultText, id, this.elements.searchedId.name);
    }

    /**
     * Verifies that the inventory selected for counting is visible.
     * @param tabName The name of the tab to click.
     */
    public async verifyInventorySelectedForCounting(tabName: string): Promise<void> {
        await commonActionPage.clickTabByText(tabName);
        const inventoryLocator = this.actions.getLocator(this.elements.inventorySelectedForCounting.selector);
        await this.actions.assertTrue(await inventoryLocator.isVisible(), this.elements.inventorySelectedForCounting.name);
    }

    /**
     * Verifies the number of inventory items.
     * @param count The expected number of inventory items.
     */
    public async verifyInventoryCount(expectedCount: string): Promise<void> {
        const selector = this.elements.cycleCountLinks.selector;
        await this.currentPage.waitForSelector(selector, { state: 'visible' });
        const countLocator = this.currentPage.locator(selector);
        const actualCount = await countLocator.count();
        await this.actions.assertEqual(
            actualCount.toString().trim(),
            expectedCount.trim(),
            `Inventory Count Mismatch: Expected ${expectedCount.trim()}, Actual ${actualCount}`
        );
    }

    /**
     * Selects the constant population for cycle count.
     * @param countType 
     * @param randomSampleOption 
     * @param ccountItemsToCount 
     * @param counts
     */
    public async selectConstantPopulation(countType: string, randomSampleOption: string, counts: string): Promise<void> {
        await this.selectCountType(countType);
        await commonActionPage.clickByDivId("CCOUNTRANDOMTYPE");
        await commonActionPage.clickByDivTitle(randomSampleOption);
        const textEl = await this.actions.getLocator(this.elements.itemsToCountInput.selector);
        await this.actions.waitForElementToBeVisible(textEl, this.elements.itemsToCountInput.name);
        await this.actions.typeText(textEl, counts, this.elements.itemsToCountInput.name);
    }

    /**
     * Verifies the constant population settings.
     * @param randomSampleOptions The random sample options to verify.
     * @param howManyItemsToCount The number of items to count to verify.
     */
    public async verifyConstantPopulation(randomSampleOptions: string, howManyItemsToCount: string): Promise<void> {
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(commonActionPage.getElementByText(randomSampleOptions)),
            `Random Sample Options: ${randomSampleOptions}`);
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(commonActionPage.getElementByText(howManyItemsToCount)),
            `Cycle Count Items To Count: ${howManyItemsToCount}`);
    }
}

export const cycleCountRecordsPage = new CycleCountRecordsPage();
