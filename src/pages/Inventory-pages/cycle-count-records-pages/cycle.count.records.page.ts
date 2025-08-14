import { Page, selectors } from "@playwright/test";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import { commonActionPage } from "../../common.action.page";
import { workOrderPage } from "../../work-order-page/WorkOrderPage.page";
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
        itemsToCount: { selector: "//span[@id='CCOUNTITEMSTOCOUNT']", name: "Items To Count Span" },
        cycleCountLinks: { selector: "//datagrid[@id='CycleCount']/descendant::tr/descendant::a", name: "Cycle Count Links" },
        itemsToCountInput: { selector: "//div[@id='CCOUNTITEMSTOCOUNT']/descendant::input", name: "Items To Count Input" },
        moreButton: { selector: "//datagrid[@id='CycleCount']//descendant::div[@class='moreBtn']", name: "More Button" },
        editLink: { selector: "//datagrid[@id='CycleCount']/descendant::a[@title='Edit']", name: "Edit Link" },
        cycleCountTab: { selector: "//div[@id='CycleCountTab']//table[contains(@class,'dx-datagrid-table dx-datagrid-table-fixed dx-select')]//tr[1]//td[last()]", name: "Cycle Count Tab" },
        cycleCountLink: { selector: '(//a[@class="dx-link ng-scope"])[2]', name: 'Cycle Count Tab' },
        dxLink: { selector: "//a[@class='dx-link ng-scope']", name: "DX Link" },
        stockAreaListRows: { selector: "//gridcontrol[@id='StockAreaList']/descendant::tr[contains(@class,'dx-row dx-data')]/descendant::td", name: "Stock Area List Rows" },
        stockInput: { selector: "//div[@id='CycleCountTab']//table[contains(@class,'dx-datagrid-table dx-datagrid-table-fixed dx-select')]//tr[1]//td[last()]//input", name: "Stock Input" },
        saveButton: { selector: "//div[@id='CycleCountTab']/descendant::a[@title='Save']", name: "Save Button" },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
        plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
        checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
        wkoInput: { selector: "//div[contains(@class,'modal-content popup-no')]//input", name: "WKO Input" },
        okInput: { selector: "[value='Ok']", name: "Ok Input" },
        hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
    }

    /**
     * Gets the created cycle count ID.
     * @returns The created cycle count ID.
     */
    public async getCreatedCycId(): Promise<string> {
        return await this.actions.getText(this.actions.getLocator(this.elements.cycId.selector), this.elements.cycId.name);
    }

    /**
     * Clicks on an option by its title.
     * @param title The title of the option to click.
     */
    public async clickOptionByTitle(title: string): Promise<void> {
        const optionLocator = this.actions.getLocator(commonActionPage.getCustomDivByTitle(title));
        await this.actions.waitForElementToBeVisible(optionLocator, title);
        await this.actions.click(optionLocator, title);
    }

    /**
     * Gets the count of items.
     * @returns The count of items.
     */
    public async getCount(countType: string): Promise<string> {
        let countLocator;
        switch (countType) {
            case "Filtered Set":
                countLocator = this.actions.getLocator(this.elements.numberOfItem.selector);
                break;
            case "Random Sample":
                countLocator = this.actions.getLocator(this.elements.itemsToCount.selector);
                break;
            default:
                throw new Error("Unsupported count type for getting count.");
        }
        await this.actions.waitForElementToBeVisible(countLocator, "Count Element");
        const countText = await this.actions.getText(countLocator, "Count Element");
        return countText;
    }

    /**
     * Clicks on the Count Type dropdown and selects the specified count type.
     * @param countType The type of count to select (e.g., "Filtered Set", "Random Sample").
     */
    public async selectCountType(countType: string): Promise<void> {
        const countTypeEl = await this.actions.getLocator(this.elements.countTypeDropdown.selector);
        await this.actions.waitForClickable(countTypeEl, this.elements.countTypeDropdown.name);
        await this.actions.click(countTypeEl, this.elements.countTypeDropdown.name);
        switch (countType) {
            case "Filtered Set":
            case "Random Sample":
                await this.clickOptionByTitle(countType);
                break;
            default:
                throw new Error(`Unsupported count type: ${countType}`);
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
        dropdownSelections: { ddType: string[] },
        divTitle: string
    ): Promise<void> {
        commonActionPage.clickAddNewRecordButton();
        await commonActionPage.enterDescription(description);
        await workOrderPage.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
    }

    /**
     * Fills in the mandatory fields for creating a cycle count record.
     * @param dropdownSelections The dropdown selections to make.
     * @param divTitle The title of the div containing the fields.
     */
    public async fillInMandatoryFields(dropdownSelections: { ddType: string[] }, divTitle: string): Promise<void> {
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
        await this.actions.waitForCustomDelay(timeouts.medium);
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
    public async selectPopulation(countType: string, randomSampleOption: string, counts: string): Promise<void> {
        await this.selectCountType(countType);
        switch (randomSampleOption) {
            case "Constant Population":
            case "Diminished Population":
                await commonActionPage.clickByDivId("CCOUNTRANDOMTYPE");
                await commonActionPage.clickByDivTitle(randomSampleOption);
                break;
            default:
                throw new Error(`Unsupported count type: ${randomSampleOption}`);
        }
        const textEl = await this.actions.getLocator(this.elements.itemsToCountInput.selector);
        await this.actions.waitForElementToBeVisible(textEl, this.elements.itemsToCountInput.name);
        await this.actions.typeText(textEl, counts, this.elements.itemsToCountInput.name);

        await commonActionPage.clickSaveButton();
    }

    /**
     * Verifies the constant population settings.
     * @param randomSampleOptions The random sample options to verify.
     * @param howManyItemsToCount The number of items to count to verify.
     */
    public async verifyPopulation(randomSampleOptions: string, howManyItemsToCount: string): Promise<void> {
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(commonActionPage.getElementByText(randomSampleOptions)),
            `Random Sample Options: ${randomSampleOptions}`);
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(commonActionPage.getElementByText(howManyItemsToCount)),
            `Cycle Count Items To Count: ${howManyItemsToCount}`);
    }

    /**
     * Updates the stock quantity of the linked inventory item.
     * @param populationType The type of population to update.
     * @param cycleCountTabText The text of the cycle count tab.
     * @param newQuantity The new stock quantity to set.
     */
    public async updateInventoryStockQty(populationType: string, cycleCountTabText: string, newQuantity: string): Promise<void> {
        await commonActionPage.clickTabByText(cycleCountTabText);
        const moreBtn = this.actions.getLocator(this.elements.moreButton.selector);
        await this.actions.waitForElementToBeVisible(moreBtn, this.elements.moreButton.name);
        await this.actions.click(moreBtn, this.elements.moreButton.name);
        const editRecordButton = this.actions.getLocator(this.elements.editLink.selector);
        await this.actions.waitForElementToBeVisible(editRecordButton, this.elements.editLink.name);
        await this.actions.click(editRecordButton, this.elements.editLink.name);
        const stockInputEl = this.actions.getLocator(this.elements.cycleCountTab.selector);
        await this.actions.waitForElementToBeVisible(stockInputEl, this.elements.cycleCountTab.name);
        await this.actions.click(stockInputEl, this.elements.cycleCountTab.name);
        const stockInput = this.actions.getLocator(this.elements.stockInput.selector).nth(1);
        await this.actions.waitForElementToBeVisible(stockInput, this.elements.stockInput.name);
        const input = Number(newQuantity);
        switch (populationType) {
            case "Constant":
                await this.actions.typeText(stockInput, (input + 1).toString(), this.elements.stockInput.name);
                break;
            case "Diminished":
                await this.actions.typeText(stockInput, (input + 1).toString(), this.elements.stockInput.name);
                break;
            case "Filtered":
                await this.actions.typeText(stockInput, (input + 2).toString(), this.elements.stockInput.name);
                break;
            default:
                throw new Error(`Unsupported population type: ${populationType}`);
        }
        const saveButton = this.actions.getLocator(this.elements.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, this.elements.saveButton.name);
        await this.actions.click(saveButton, this.elements.saveButton.name);
    }

    /**
     * Gets the inventory stock quantity for a specific tab.
     * @param tabText The text of the tab to get the stock quantity from.
     * @returns The stock quantity as a string.
     */
    public async getInventoryStockQty(tabText: string): Promise<string> {
        const inventoryListItem = this.actions.getLocator(this.elements.dxLink.selector).nth(1);
        await this.actions.waitForElementToBeVisible(inventoryListItem, this.elements.dxLink.name);
        await this.actions.click(inventoryListItem, this.elements.dxLink.name);
        await commonActionPage.clickTabByText(tabText);
        const quantityLocator = this.actions.getLocator(this.elements.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, this.elements.stockAreaListRows.name);
        const beforeClosingQuantity = await this.actions.getText(quantityLocator, this.elements.stockAreaListRows.name);
        console.log(`Before Closing Quantity: ${beforeClosingQuantity}`);
        return beforeClosingQuantity;
    }

    /**
     * Validates the linked inventory quantity after closing a record.
     * @param tabText The text of the tab to validate.
     * @param beforeCloseStockQty The stock quantity before closing the record.
     */
    public async validateLinkedInventoryQty(
        populationType: string,
        tabText1: string,
        tabText2: string,
        beforeCloseStockQty: string,
    ): Promise<void> {
        await commonActionPage.clickTabByText(tabText1);
        const inventoryListItem = this.actions.getLocator(this.elements.dxLink.selector).nth(1);
        await this.actions.waitForElementToBeVisible(inventoryListItem, this.elements.dxLink.name);
        await this.actions.click(inventoryListItem, this.elements.dxLink.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await commonActionPage.clickTabByText(tabText2);
        const quantityLocator = this.actions.getLocator(this.elements.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, this.elements.stockAreaListRows.name);
        const afterCloseStockQtyText = await this.actions.getText(quantityLocator, this.elements.stockAreaListRows.name);
        const afterCloseStockQty = Number(afterCloseStockQtyText);
        const expectedCount = Number(beforeCloseStockQty);
        let expectedAfterClose: number;
        switch (populationType) {
            case "Constant":
                expectedAfterClose = expectedCount + 1;
                break;
            case "Diminished":
                expectedAfterClose = expectedCount + 1;
                break;
            case "Filtered":
                expectedAfterClose = expectedCount + 2;
                break;
            default:
                throw new Error(`Unsupported population type: ${populationType}`);
        }
        await this.actions.assertEqual(
            afterCloseStockQty.toString(),
            expectedAfterClose.toString(),
            `Linked Inventory Quantity after closing is incorrect. Expected: ${expectedAfterClose}, Actual: ${afterCloseStockQty}`
        );
    }


    /**
     * Lists the cycle count details in a view.
     * @param description The description of the cycle count.
     */
    public async listViewCycleCount(description: string): Promise<void> {
        const sideBarExpanderLocator = this.actions.getLocator(commonActionPage.elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(this.elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.elements.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(this.elements.plusIcon.selector), this.elements.plusIcon.name);
        const saveBtn = this.actions.getLocator(this.elements.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, this.elements.checkIcon.name);
        await this.actions.click(saveBtn, this.elements.checkIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.typeText(this.actions.getLocator(this.elements.wkoInput.selector).nth(0), description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(this.elements.okInput.selector), this.elements.okInput.name);
        await this.actions.click(sideBarExpanderLocator, commonActionPage.elements.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(this.elements.hideButton.selector);
        await this.actions.click(minimizeButton, this.elements.hideButton.name);
        await commonActionPage.clickEditButton();
    }
}

export const cycleCountRecordsPage = new CycleCountRecordsPage();
