import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { commonPageActions } from "../../common.page.actions";
import { homePageActions } from "../../home-page-action/home.page.actions";
import { timeouts } from "../../../../helper/timeouts-config";
import { formattedYesterday } from "../../../../helper/date/get.future.date";
import { CycleCountRecordsPageLocators } from "../../../locators/Inventory.pages.locator/cycle.count-records-page-locator/cycle.count.records.pages.locator";
import { workOrderRecordPageActions } from "../../workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { smrAutoConvertAction } from "../../scheduled-maintenance-page-action/smr.auto.convert.action";

class CycleCountRecordsPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the created cycle count ID.
     * @returns The created cycle count ID.
     */
    public async getCreatedCycId(): Promise<string> {
        const cycIdLocator = this.actions.getLocator(CycleCountRecordsPageLocators.cycId.selector);
        await this.actions.waitForElementToBeVisible(cycIdLocator, CycleCountRecordsPageLocators.cycId.name);
        return await this.actions.getText(cycIdLocator, CycleCountRecordsPageLocators.cycId.name);
    }

    /**
     * Enters the last done date.
     * @param date The date to enter.
     */
    public async enterLastDoneDate(date: string): Promise<void> {
        const lastDoneDateInput = this.actions.getLocator(CycleCountRecordsPageLocators.floatStartDateInput.selector);
        await this.actions.waitForElementToBeVisible(lastDoneDateInput, CycleCountRecordsPageLocators.floatStartDateInput.name);
        await this.actions.typeText(lastDoneDateInput, date, CycleCountRecordsPageLocators.floatStartDateInput.name);
    }

    /**
     * Clicks on an option by its title.
     * @param title The title of the option to click.
     */
    public async clickOptionByTitle(title: string): Promise<void> {
        const optionLocator = this.actions.getLocator(CommonPageLocators.getDivByTitle(title));
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
                countLocator = this.actions.getLocator(CycleCountRecordsPageLocators.numberOfItem.selector);
                break;
            case "Random Sample":
                countLocator = this.actions.getLocator(CycleCountRecordsPageLocators.itemsToCount.selector);
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
        const countTypeEl = await this.actions.getLocator(CycleCountRecordsPageLocators.countTypeDropdown.selector);
        await this.actions.waitForClickable(countTypeEl, CycleCountRecordsPageLocators.countTypeDropdown.name);
        await this.actions.click(countTypeEl, CycleCountRecordsPageLocators.countTypeDropdown.name);
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
        commonPageActions.clickAddNewRecordButton();
        await commonPageActions.enterDescription(description);
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
    }

    /**
     * Fills in the mandatory fields for creating a cycle count record.
     * @param dropdownSelections The dropdown selections to make.
     * @param divTitle The title of the div containing the fields.
     */
    public async fillInMandatoryFields(dropdownSelections: { ddType: string[] }, divTitle: string): Promise<void> {
        await workOrderRecordPageActions.selectMultipleDropdownValues(dropdownSelections.ddType, divTitle);
    }

    /**
     * Clicks on the "Convert to Work Order" button.
     * @param convertText The text of the button to click.
     * @param yesConvert The text of the confirmation button to click.
     */
    public async clickOnConvertWorkOrderButton(
        convertText: string,
        yesConvert: string,
        yesButton: string,
    ): Promise<void> {
        await commonPageActions.clickButtonByTitle(convertText);
        await commonPageActions.clickSpanByText(yesConvert);
        await commonPageActions.clickSpanByText(yesButton);
    }

    /**
     * Verifies the filtered population label is displayed.
     * @param labelText The text of the label to verify.
     */
    public async verifyFilteredPopulationLabel(labelText: string): Promise<void> {
        const labelLocator = this.actions.getLocator(CommonPageLocators.getLabelByText(labelText));
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
        const fieldFilterInput = this.actions.getLocator(CycleCountRecordsPageLocators.filterInput.selector).nth(0);
        await this.actions.waitForElementToBeVisible(fieldFilterInput, CycleCountRecordsPageLocators.filterInput.name);
        await this.actions.typeText(fieldFilterInput, field, CycleCountRecordsPageLocators.filterInput.name);
        await commonPageActions.clickDivByTitle(field);

        const operatorFilterInput = this.actions.getLocator(CycleCountRecordsPageLocators.filterInput.selector).nth(1);
        await this.actions.waitForElementToBeVisible(operatorFilterInput, CycleCountRecordsPageLocators.filterInput.name);
        await this.actions.typeText(operatorFilterInput, operator, CycleCountRecordsPageLocators.filterInput.name);
        await commonPageActions.clickDivByTitle(operator);

        const valueFilterInput = this.actions.getLocator(CycleCountRecordsPageLocators.filterInput.selector).nth(2);
        await this.actions.waitForElementToBeVisible(valueFilterInput, CycleCountRecordsPageLocators.filterInput.name);
        await this.actions.typeText(valueFilterInput, value, CycleCountRecordsPageLocators.filterInput.name);
        await commonPageActions.clickDivByTitle(value);

        const conditionFilterInput = this.actions.getLocator(CycleCountRecordsPageLocators.filterInput.selector).nth(3);
        await this.actions.waitForElementToBeVisible(conditionFilterInput, CycleCountRecordsPageLocators.filterInput.name);
        await this.actions.typeText(conditionFilterInput, condition, CycleCountRecordsPageLocators.filterInput.name);
        await commonPageActions.clickDivByTitle(condition);

        await commonPageActions.clickSaveButton();
    }

    /**
     * Verifies that a Cycle Count Record has been created.
     * @param description The description of the Cycle Count Record.
     * @returns
     */
    public async verifyCycleCountRecordCreated(description: string): Promise<void> {
        const descriptionLocator = this.actions.getLocator(CycleCountRecordsPageLocators.cycDesc.selector);
        await this.actions.waitForElementToBeVisible(descriptionLocator, CycleCountRecordsPageLocators.cycDesc.name);
        const descText = await this.actions.getText(descriptionLocator, CycleCountRecordsPageLocators.cycDesc.name);
        return this.actions.assertEqual(description, descText, CycleCountRecordsPageLocators.cycDesc.name);
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
        await homePageActions.clickSideMenuIcon();
        await commonPageActions.clickSpanByTitle(menuItemTitle);
        await commonPageActions.clickLinkByTitle(subMenuItemTitle);
        await this.actions.validateCurrentUrl(expectedUrl);
    }

    /**
     *  Selects a date range from the date picker.
     * @param date  The date to select.
     * @param spanText The text of the span element to click.
     */
    public async selectDateRange(date: string, spanText: string): Promise<void> {
        const dateRangeInputLocator = this.actions.getLocator(CycleCountRecordsPageLocators.dateRangeInput.selector);
        await this.actions.waitForElementToBeVisible(dateRangeInputLocator, CycleCountRecordsPageLocators.dateRangeInput.name);
        await this.actions.click(dateRangeInputLocator, CycleCountRecordsPageLocators.dateRangeInput.name);
        await commonPageActions.clickDivByTitle(date);
        await commonPageActions.clickSpanByText(spanText);
    }

    /**
     * Searches for a Cycle Count Record by ID within specified date ranges.
     * @param id The ID of the Cycle Count Record to search for.
     * @param dateRange The initial date range to use for the search. 
     * @param spanText The text of the span element to click.
     */
    public async searchCycleCountRecord(id: string, dateRange: string, spanText: string): Promise<void> {
        const searchInputLocator = this.actions.getLocator(CycleCountRecordsPageLocators.searchTextBox.selector).nth(0);
        await this.actions.waitForElementToBeVisible(searchInputLocator, CycleCountRecordsPageLocators.searchTextBox.name);
        const performSearch = async (range: string): Promise<boolean> => {
            await this.selectDateRange(range, spanText);
            await this.actions.typeText(searchInputLocator, id, CycleCountRecordsPageLocators.searchTextBox.name);
            await this.actions.performKeyboardAction("Enter");
            await this.actions.waitForCustomDelay(timeouts.medium);
            const searchIdLocator = this.actions.getLocator(CommonPageLocators.getLinkByText(id));
            const isVisible = await searchIdLocator.isVisible().catch(() => false);
            if (isVisible) {
                return true;
            }
            return false;
        };
        const dateRangesToCheck = [dateRange, "Next Week", "This Week"];
        let found = false;
        for (const range of dateRangesToCheck) {
            found = await performSearch(range);
            if (found) break;
        }
        if (!found) {
            console.warn(`ID ${id} not found in any date range.`);
        }
        await this.actions.waitForCustomDelay(timeouts.large);
    }


    /**
     * Verifies that a Cycle Count Record is present in the search results.
     * @param id The ID of the Cycle Count Record to verify.
     */
    public async verifyCycleCountRecordInSearchResults(id: string): Promise<void> {
        const searchResultsLocator = this.actions.getLocator(CycleCountRecordsPageLocators.searchedId.selector).nth(0);
        await this.actions.waitForElementToBeVisible(searchResultsLocator, CycleCountRecordsPageLocators.searchedId.name);
        const resultText = await this.actions.getText(searchResultsLocator, CycleCountRecordsPageLocators.searchedId.name);
        await this.actions.assertEqual(resultText, id, CycleCountRecordsPageLocators.searchedId.name);
    }

    /**
     * Verifies that the inventory selected for counting is visible.
     * @param tabName The name of the tab to click.
     */
    public async verifyInventorySelectedForCounting(tabName: string): Promise<void> {
        await commonPageActions.clickTabByText(tabName);
        const inventoryLocator = this.actions.getLocator(CycleCountRecordsPageLocators.inventorySelectedForCounting.selector);
        await this.actions.assertTrue(await inventoryLocator.isVisible(), CycleCountRecordsPageLocators.inventorySelectedForCounting.name);
    }

    /**
     * Verifies the number of inventory items.
     * @param count The expected number of inventory items.
     */
    public async verifyInventoryCount(expectedCount: string): Promise<void> {
        const selector = CycleCountRecordsPageLocators.cycleCountLinks.selector;
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
     * Selects the population for cycle count.
     * @param countType The type of count to select (e.g., "Constant", "Diminished", "Filtered").
     * @param randomSampleOption The random sample option to select.
     * @param counts The number of items to count.
     */
    public async selectPopulation(countType: string, randomSampleOption: string, counts: string): Promise<void> {
        await this.selectCountType(countType);
        switch (randomSampleOption) {
            case "Constant Population":
            case "Diminished Population":
                await commonPageActions.clickDivById("CCOUNTRANDOMTYPE");
                await commonPageActions.clickDivByTitle(randomSampleOption);
                break;
            default:
                throw new Error(`Unsupported count type: ${randomSampleOption}`);
        }
        const textEl = await this.actions.getLocator(CycleCountRecordsPageLocators.itemsToCountInput.selector);
        await this.actions.waitForElementToBeVisible(textEl, CycleCountRecordsPageLocators.itemsToCountInput.name);
        await this.actions.typeText(textEl, counts, CycleCountRecordsPageLocators.itemsToCountInput.name);
        await this.enterLastDoneDate(formattedYesterday);
        await commonPageActions.clickSaveButton();
    }

    /**
     * Verifies the constant population settings.
     * @param randomSampleOptions The random sample options to verify.
     * @param howManyItemsToCount The number of items to count to verify.
     */
    public async verifyPopulation(randomSampleOptions: string, howManyItemsToCount: string): Promise<void> {
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(CommonPageLocators.getSpanByText(randomSampleOptions)),
            `Random Sample Options: ${randomSampleOptions}`);
        await this.actions.waitForElementToBeVisible(
            this.actions.getLocator(CommonPageLocators.getSpanByText(howManyItemsToCount)),
            `Cycle Count Items To Count: ${howManyItemsToCount}`);
    }

    /**
     * Updates the stock quantity of the linked inventory item.
     * @param populationType The type of population to update.
     * @param cycleCountTabText The text of the cycle count tab.
     * @param newQuantity The new stock quantity to set.
     */
    public async updateInventoryStockQty(populationType: string, cycleCountTabText: string, newQuantity: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        await commonPageActions.clickTabByText(cycleCountTabText);
        const moreBtn = this.actions.getLocator(CycleCountRecordsPageLocators.moreButton.selector);
        await this.actions.waitForElementToBeVisible(moreBtn, CycleCountRecordsPageLocators.moreButton.name);
        await this.actions.click(moreBtn, CycleCountRecordsPageLocators.moreButton.name);
        const editRecordButton = this.actions.getLocator(CycleCountRecordsPageLocators.editLink.selector);
        await this.actions.waitForElementToBeVisible(editRecordButton, CycleCountRecordsPageLocators.editLink.name);
        await this.actions.click(editRecordButton, CycleCountRecordsPageLocators.editLink.name);
        const stockInputEl = this.actions.getLocator(CycleCountRecordsPageLocators.cycleCountTab.selector);
        await this.actions.waitForElementToBeVisible(stockInputEl, CycleCountRecordsPageLocators.cycleCountTab.name);
        await this.actions.click(stockInputEl, CycleCountRecordsPageLocators.cycleCountTab.name);
        const stockInput = this.actions.getLocator(CycleCountRecordsPageLocators.stockInput.selector).nth(1);
        await this.actions.waitForElementToBeVisible(stockInput, CycleCountRecordsPageLocators.stockInput.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        const input = Number(newQuantity);
        switch (populationType) {
            case "Constant":
                await this.actions.typeText(stockInput, (input + 1).toString(), CycleCountRecordsPageLocators.stockInput.name);
                break;
            case "Diminished":
                await this.actions.typeText(stockInput, (input + 1).toString(), CycleCountRecordsPageLocators.stockInput.name);
                break;
            case "Filtered":
                await this.actions.typeText(stockInput, (input + 2).toString(), CycleCountRecordsPageLocators.stockInput.name);
                break;
            default:
                throw new Error(`Unsupported population type: ${populationType}`);
        }
        const saveButton = this.actions.getLocator(CycleCountRecordsPageLocators.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButton, CycleCountRecordsPageLocators.saveButton.name);
        await this.actions.click(saveButton, CycleCountRecordsPageLocators.saveButton.name);
    }

    /**
     * Gets the inventory stock quantity for a specific tab.
     * @param tabText The text of the tab to get the stock quantity from.
     * @returns The stock quantity as a string.
     */
    public async getInventoryStockQty(tabText: string): Promise<string> {
        const inventoryListItem = this.actions.getLocator(CycleCountRecordsPageLocators.dxLink.selector).nth(1);
        await this.actions.waitForElementToBeVisible(inventoryListItem, CycleCountRecordsPageLocators.dxLink.name);
        await this.actions.click(inventoryListItem, CycleCountRecordsPageLocators.dxLink.name);
        await commonPageActions.clickTabByText(tabText);
        const quantityLocator = this.actions.getLocator(CycleCountRecordsPageLocators.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, CycleCountRecordsPageLocators.stockAreaListRows.name);
        const beforeClosingQuantity = await this.actions.getText(quantityLocator, CycleCountRecordsPageLocators.stockAreaListRows.name);
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
        await commonPageActions.clickTabByText(tabText1);
        const inventoryListItem = this.actions.getLocator(CycleCountRecordsPageLocators.dxLink.selector).nth(1);
        await this.actions.waitForElementToBeVisible(inventoryListItem, CycleCountRecordsPageLocators.dxLink.name);
        await this.actions.click(inventoryListItem, CycleCountRecordsPageLocators.dxLink.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await commonPageActions.clickTabByText(tabText2);
        const quantityLocator = this.actions.getLocator(CycleCountRecordsPageLocators.stockAreaListRows.selector).nth(2);
        await this.actions.waitForElementToBeVisible(quantityLocator, CycleCountRecordsPageLocators.stockAreaListRows.name);
        const afterCloseStockQtyText = await this.actions.getText(quantityLocator, CycleCountRecordsPageLocators.stockAreaListRows.name);
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
        const sideBarExpanderLocator = this.actions.getLocator(CommonPageLocators.sideBarExpander.selector);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const maximizeButton = this.actions.getLocator(CycleCountRecordsPageLocators.maximizeButton.selector);
        await this.actions.click(maximizeButton, CycleCountRecordsPageLocators.maximizeButton.name);
        await this.actions.click(this.actions.getLocator(CycleCountRecordsPageLocators.plusIcon.selector), CycleCountRecordsPageLocators.plusIcon.name);
        const saveBtn = this.actions.getLocator(CycleCountRecordsPageLocators.checkIcon.selector);
        await this.actions.waitForElementToBeVisible(saveBtn, CycleCountRecordsPageLocators.checkIcon.name);
        await this.actions.click(saveBtn, CycleCountRecordsPageLocators.checkIcon.name);
        await this.actions.waitForCustomDelay(timeouts.medium);
        await this.actions.typeText(this.actions.getLocator(CycleCountRecordsPageLocators.wkoInput.selector).nth(0), description, `WKO Description: ${description}`);
        await this.actions.click(this.actions.getLocator(CycleCountRecordsPageLocators.okInput.selector), CycleCountRecordsPageLocators.okInput.name);
        await this.actions.click(sideBarExpanderLocator, CommonPageLocators.sideBarExpander.name);
        const minimizeButton = this.actions.getLocator(CycleCountRecordsPageLocators.hideButton.selector);
        await this.actions.click(minimizeButton, CycleCountRecordsPageLocators.hideButton.name);
        await commonPageActions.clickEditButton();
    }

    /**
     * Waits for the cyc auto conversion to occur.
     */
    public async waitForCycAutoConversion(): Promise<void> {
        await this.currentPage.reload();
        await this.actions.waitForCustomDelay(timeouts.huge);
        await this.currentPage.reload();
        await commonPageActions.clickLinkByText('Scheduled Maintenance Options');
        await commonPageActions.clickLinkByText('Cycle Count Records');
    }

    /**
     * Enables the cyc automatic request conversion with on due date.
     */
    public async enableCycAutoRequestConversion(): Promise<void> {
        await smrAutoConvertAction.clickEditScheduledMaintenance();
        const onDueDateRadioBtnEl = await this.actions.getLocator(CycleCountRecordsPageLocators.onDueDateRadioBtn.selector);
        await this.actions.waitForClickable(onDueDateRadioBtnEl, CycleCountRecordsPageLocators.onDueDateRadioBtn.name);
        await this.actions.click(onDueDateRadioBtnEl, CycleCountRecordsPageLocators.onDueDateRadioBtn.name);
        await smrAutoConvertAction.clickSaveScheduledMaintenance();
    }

    /**
     * Disables the cyc automatic request conversion.
     */
    public async changeCycAutoRequestConversion(): Promise<void> {
        await smrAutoConvertAction.clickEditScheduledMaintenance();
        const doNotConvertRadioBtnEl = await this.actions.getLocator(CycleCountRecordsPageLocators.doNotConvertRadioBtn.selector);
        await this.actions.waitForClickable(doNotConvertRadioBtnEl, CycleCountRecordsPageLocators.doNotConvertRadioBtn.name);
        await this.actions.click(doNotConvertRadioBtnEl, CycleCountRecordsPageLocators.doNotConvertRadioBtn.name);
        await smrAutoConvertAction.clickSaveScheduledMaintenance();
    }
}

export const cycleCountRecordsPageActions = new CycleCountRecordsPageActions();
