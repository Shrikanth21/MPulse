import { Page } from "@playwright/test";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { WorkOrderFilterPageLocators } from "../../../locators/workorder.page.locators/work-order-records-locator/work.order.filter.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";

class WorkOrderFilterPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {

    };

    /**
     * Clicks on a filter element by its title.
     * @param title The title of the filter to click on.
     */
    public async clickOnFilter(title: string): Promise<void> {
        const filterLocator = this.actions.getLocator(CommonPageLocators.getSpanByTitle(title));
        await this.actions.waitForElementToBeVisible(filterLocator, `Filter with title ${title} present on the page`);
        await this.actions.click(filterLocator, `Filter with title ${title}`);
    }

    /**
     * Selects multiple filter options by their titles.
     * @param titles An array of titles of the filters to select.
     */
    public async selectFilterOption(titles: string[]): Promise<void> {
        for (const title of titles) {
            const filterLocator = this.actions.getLocator(CommonPageLocators.getSpanByTitle(title));
            const isChecked = await filterLocator.isChecked?.() ?? false;
            if (!isChecked) {
                await this.actions.waitForElementToBeVisible(filterLocator, `Filter with title ${title} is present on the page`);
                await this.actions.click(filterLocator, `Filter with title ${title}`);
            }
        }
    }

    /**
     * Clicks on the navbar brand element.
     */
    public async clickOnOutside(): Promise<void> {
        const navbarBrandLocator = this.actions.getLocator(WorkOrderFilterPageLocators.navbarBrand.selector);
        await this.actions.waitForElementToBeVisible(navbarBrandLocator, WorkOrderFilterPageLocators.navbarBrand.name);
        await this.actions.click(navbarBrandLocator, WorkOrderFilterPageLocators.navbarBrand.name);
    }

    /**
     * Clicks on the customize button to open the customization modal.
     */
    public async verifyLayoutAppliedAndColumnsVisible(columnTitles: string[]): Promise<void> {
        for (const title of columnTitles) {
            const columnLocator = this.actions.getLocator(CommonPageLocators.getDivByText(title));
            await this.actions.waitForElementToBeVisible(columnLocator, `Column with title ${title} is present on the page`);
            const columnTitle = await this.actions.getText(columnLocator, `Column with title ${title}`);
            await this.actions.assertEqual(columnTitle, title, `Column with title ${title} is not visible`);
        }
    }

    /**
     * Chooses the default layout from the dropdown.
     */
    public async chooseDefaultLayout(): Promise<void> {
        const clearDropdownEditor = this.actions.getLocator(WorkOrderFilterPageLocators.expandGridDropdownInput.selector);
        await this.actions.waitForElementToBeVisible(clearDropdownEditor, WorkOrderFilterPageLocators.expandGridDropdownInput.name);
        await this.actions.clearAndTypeText(clearDropdownEditor, 'ID and Description Only', WorkOrderFilterPageLocators.expandGridDropdownInput.name);
        await this.actions.waitForElementToBeVisible(clearDropdownEditor, WorkOrderFilterPageLocators.expandGridDropdownInput.name);
        await this.actions.click(this.actions.getLocator(CommonPageLocators.getDivByText('ID and Description Only')), 'ID and Description Only');
    }

    /**
     * Clicks on the customize button to open the customization modal.
     */
    public async clickOnCustomizeButton(): Promise<void> {
        await this.chooseDefaultLayout();
        const customizeButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customizeButton.selector);
        await this.actions.waitForElementToBeVisible(customizeButtonLocator, WorkOrderFilterPageLocators.customizeButton.name);
        await this.actions.click(customizeButtonLocator, WorkOrderFilterPageLocators.customizeButton.name);
    }

    /**
     * Clicks on the customize button again to open the customization modal.
     */
    public async clickOnCustomizeButtonAgain(): Promise<void> {
        const customizeButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customizeButton.selector);
        await this.actions.waitForElementToBeVisible(customizeButtonLocator, WorkOrderFilterPageLocators.customizeButton.name);
        await this.actions.click(customizeButtonLocator, WorkOrderFilterPageLocators.customizeButton.name);
    }

    /**
     * Verifies that the customize modal header is visible.
     */
    public async verifyCustomizeModalHeader(): Promise<void> {
        const customizeModalHeaderLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customizeModalHeader.selector);
        await this.actions.waitForElementToBeVisible(customizeModalHeaderLocator, WorkOrderFilterPageLocators.customizeModalHeader.name);
    }

    /**
     * Clicks on the add layout button to create a new layout.
     */
    public async clickOnAddLayoutButton(): Promise<void> {
        const addLayoutButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.addLayoutButton.selector);
        await this.actions.waitForElementToBeVisible(addLayoutButtonLocator, WorkOrderFilterPageLocators.addLayoutButton.name);
        await this.actions.click(addLayoutButtonLocator, WorkOrderFilterPageLocators.addLayoutButton.name);
    }

    /**
     * Enters the layout name in the input field.
     * @param layoutName The name of the layout to enter.
     */
    public async enterLayoutName(layoutName: string): Promise<void> {
        const layoutEntryInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.layoutEntryInput.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, WorkOrderFilterPageLocators.layoutEntryInput.name);
        await this.actions.typeText(layoutEntryInputLocator, layoutName, WorkOrderFilterPageLocators.layoutEntryInput.name);
    }

    /**
     * Clicks on the apply button to apply the changes.
     */
    public async clickOnApplyButton(): Promise<void> {
        const applyButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.applyButton.selector);
        await this.actions.waitForElementToBeVisible(applyButtonLocator, WorkOrderFilterPageLocators.applyButton.name);
        await this.actions.click(applyButtonLocator, WorkOrderFilterPageLocators.applyButton.name);
    }

    /**
     * Clicks on the save button to save the current layout.
     */
    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, WorkOrderFilterPageLocators.saveButton.name);
        await this.actions.click(saveButtonLocator, WorkOrderFilterPageLocators.saveButton.name);
    }

    /**
     * Verifies that the layout is created successfully.
     * @param layoutName The name of the layout to verify.
     */
    public async verifyLayoutCreatedSuccessfully(layoutName: string): Promise<void> {
        const layoutEntryInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.expandGridDropdownIcon.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        await this.actions.click(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        const layoutOptionLocator = this.actions.getLocator(CommonPageLocators.getDivByText(layoutName));
        await this.actions.waitForElementToBeVisible(layoutOptionLocator, `Element is visible`)
        const layoutTitle = await this.actions.getText(layoutOptionLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        await this.actions.assertEqual(layoutTitle, layoutName, `${layoutName} is not present in the dropdown`);
        await this.actions.click(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        await this.clickOnOutside();
    }

    /**
     * Clicks on the delete current record button to delete the current layout.
     */
    public async clickOnDeleteCurrentRecord(): Promise<void> {
        await this.clickOnCustomizeButtonAgain();
        const deleteCurrentRecordLocator = this.actions.getLocator(WorkOrderFilterPageLocators.deleteCurrentRecord.selector);
        await this.actions.waitForElementToBeVisible(deleteCurrentRecordLocator, WorkOrderFilterPageLocators.deleteCurrentRecord.name);
        await this.actions.click(deleteCurrentRecordLocator, WorkOrderFilterPageLocators.deleteCurrentRecord.name);
        await this.clickOnConfirmYesButton();
    }

    /**
     * Clicks on the confirm yes button to confirm the deletion.
     */
    public async clickOnConfirmYesButton(): Promise<void> {
        const confirmYesButtonLocator = this.actions.getLocator(WorkOrderFilterPageLocators.confirmYesButton.selector);
        await this.actions.waitForElementToBeVisible(confirmYesButtonLocator, WorkOrderFilterPageLocators.confirmYesButton.name);
        await this.actions.click(confirmYesButtonLocator, WorkOrderFilterPageLocators.confirmYesButton.name);
    }

    /**
     * Clicks on the confirm no button to cancel the deletion.
     */
    public async verifyTextNotPresentInListItems(text: string): Promise<void> {
        const listItemsLocator = this.actions.getLocator(WorkOrderFilterPageLocators.listItems.selector);
        const items = await listItemsLocator.allTextContents();
        const isPresent = items.some(item => item.trim() === text);
        if (isPresent) {
            throw new Error(`Text "${text}" is present in the list items, but it should not be.`);
        }
    }

    /**
     * Verifies that the layout is deleted successfully.
     * @param layoutName The name of the layout to verify.
     */
    public async verifyLayoutDeleted(layoutName: string): Promise<void> {
        const layoutEntryInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.expandGridDropdownIcon.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        await this.actions.click(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
        await this.verifyTextNotPresentInListItems(layoutName);
        await this.actions.click(layoutEntryInputLocator, WorkOrderFilterPageLocators.expandGridDropdownIcon.name);
    }

    /**
     * Clicks on a tab element by its title.
     */
    public async clickOnTab(tabName: string): Promise<void> {
        const customFiltersTabLocator = this.actions.getLocator(CommonPageLocators.getTabByTitle(tabName));
        await this.actions.waitForElementToBeVisible(customFiltersTabLocator, `Custom Filters Tab with title ${tabName} is present`);
        await this.actions.click(customFiltersTabLocator, `${tabName} Tab`);
    }

    /**
     * Applies a custom filter with the specified parameters.
     * @param filterName The name of the filter to apply.
     * @param operator The operator to use for the filter.
     * @param value The value to filter by.
     * @param condition The condition to apply to the filter.
     */
    public async applyCustomFilter(filterName: string, operator: string, value: string, condition: string): Promise<void> {
        await this.actions.waitForCustomDelay(timeouts.medium);
        const customFilterFieldInput = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdown('fieldDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterFieldInput, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterFieldInput, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName));
        await this.actions.waitForElementToBeVisible(customFilterFieldInputLocator, `Custom filter field with title ${filterName} is present`);
        await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${filterName}`);

        const customFilterOperatorInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdown('operatorDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterOperatorInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator));
        await this.actions.waitForElementToBeVisible(customFilterOperatorItemLocator, `Custom filter operator item with title ${operator} is present`);
        await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${operator}`);

        const customFilterValueInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdown('valueDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterValueInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${value} is present`);
        await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${value}`);

        const customFilterConditionInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdown('conditionDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterConditionInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterConditionItemLocator = this.actions.getLocator(CommonPageLocators.getDivByText(condition));
        await this.actions.waitForElementToBeVisible(customFilterConditionItemLocator, `Custom filter condition item with title ${condition} is present`);
        await this.actions.click(customFilterConditionItemLocator, `Clicked on custom filter condition: ${condition}`);
    }

    /**
     * Applies a custom filter with the specified parameters.
     * @param filterName The name of the filter to apply.
     * @param operator The operator to use for the filter.
     * @param value The value to filter by.
     * @param condition The condition to apply to the filter.
     */
    public async applyMoreCustomFilter(filterName: string, operator: string, value: string, condition: string): Promise<void> {
        const addMoreFilterButtonLocators = this.actions.getLocator(WorkOrderFilterPageLocators.addMoreFilterButton.selector);
        const count = await addMoreFilterButtonLocators.count?.() ?? 1;
        let addMoreFilterButtonLocator;
        if (count > 1) {
            addMoreFilterButtonLocator = addMoreFilterButtonLocators.nth(count - 1);
        } else {
            addMoreFilterButtonLocator = addMoreFilterButtonLocators;
        }
        await this.actions.waitForElementToBeVisible(addMoreFilterButtonLocator, WorkOrderFilterPageLocators.addMoreFilterButton.name);
        const isEnabled = await addMoreFilterButtonLocator.isEnabled?.() ?? true;
        if (isEnabled) {
            await this.actions.click(addMoreFilterButtonLocator, WorkOrderFilterPageLocators.addMoreFilterButton.name);
        }

        const customFilterFieldInput = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdowns.selector).nth(4);
        await this.actions.waitForElementToBeVisible(customFilterFieldInput, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterFieldInput, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName)).nth(1);
        await this.actions.waitForElementToBeVisible(customFilterFieldInputLocator, `Custom filter field with title ${filterName} is present`);
        await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${filterName}`);

        const customFilterOperatorInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdowns.selector).nth(5);
        await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterOperatorInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator)).nth(1);
        await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${operator}`);

        const customFilterValueInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdowns.selector).nth(6);
        await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterValueInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${value} is not present`);
        await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${value}`);

        const customFilterConditionInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.customFilterDropdowns.selector).nth(7);
        await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);
        await this.actions.click(customFilterConditionInputLocator, WorkOrderFilterPageLocators.customFilterDropdown.name);

        const customFilterConditionItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(condition)).nth(1);
        await this.actions.waitForElementToBeVisible(customFilterConditionItemLocator, `Custom filter condition item with title ${condition} is not present`);
        await this.actions.click(customFilterConditionItemLocator, `Clicked on custom filter condition: ${condition}`);
    }

    /**
     * Clicks on the apply button to apply the custom filter.
     */
    public async verifyOnlyWorkOrdersFilter(status: string, createdBy: string): Promise<void> {
        const statusListItemsLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(status));
        const statusItems = await statusListItemsLocator.allTextContents();
        for (const item of statusItems) {
            await this.actions.assertEqual(item.trim(), status, `Work Order with status ${status} is not present in the list`);
        }
        const createdByListItemsLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(createdBy));
        const createdByItems = await createdByListItemsLocator.allTextContents();
        for (const item of createdByItems) {
            await this.actions.assertEqual(item.trim(), createdBy, `Work Order with createdBy ${createdBy} is not present in the list`);
        }
    }

    /**
     * Applies a color code filter with the specified parameters.
     * @param filterName The name of the filter to apply.
     * @param operator The operator to use for the filter.
     * @param value The value to filter by.
     * @param color The color code to apply.
     */
    public async applyColorCodeFilter(filterName: string, operator: string, value: string, color: string): Promise<void> {
        const colorCodeFilterInput = this.actions.getLocator(WorkOrderFilterPageLocators.colorCodeDropdown('fieldDropDown'));
        await this.actions.click(colorCodeFilterInput, WorkOrderFilterPageLocators.colorCodeDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName));
        await this.actions.click(customFilterFieldInputLocator, `Select color code filter field: ${filterName}`);

        const colorCodeOperatorInput = this.actions.getLocator(WorkOrderFilterPageLocators.colorCodeDropdown('operatorDropDown'));
        await this.actions.click(colorCodeOperatorInput, `Select color code operator: ${operator}`);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator));
        await this.actions.click(customFilterOperatorItemLocator, `Select color code operator: ${operator}`);

        const colorCodeValueInput = this.actions.getLocator(WorkOrderFilterPageLocators.colorCodeDropdown('valueDropDown'));
        await this.actions.click(colorCodeValueInput, `Select color code value: ${value}`);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Color code value input with title ${value} is not present`);
        await this.actions.click(customFilterValueInput, `Select color code value: ${value}`);

        const colorInputLocator = this.actions.getLocator(WorkOrderFilterPageLocators.colorInput.selector);
        await this.actions.waitForElementToBeVisible(colorInputLocator, WorkOrderFilterPageLocators.colorInput.name);
        await this.actions.clearAndTypeText(colorInputLocator, color, WorkOrderFilterPageLocators.colorInput.name);

        await this.clickOnApplyButton();
    }

    /**
     * Normalizes a color string by removing spaces and converting to lowercase.
     * @param color The color string to normalize.
     * @returns The normalized color string.
     */
    public async normalizeColor(color: string): Promise<string> {
        if (!color) return '';
        return color
            .replace(/\s+/g, '')
            .replace(/,1\)$/, ')')
            .toLowerCase();
    }

    /**
     * Verifies that the expected color code is applied to the first row.
     * @param expectedColor The expected color code.
     */
    public async verifyColorCodeApplied(expectedColor: string): Promise<void> {
        const firstRow = this.actions.getLocator(WorkOrderFilterPageLocators.dataRows.selector).first();
        await this.actions.waitForElementToBeVisible(firstRow, WorkOrderFilterPageLocators.dataRows.name);
        const normalizedExpected = await this.normalizeColor(expectedColor);
        await this.actions.waitForCustomDelay(timeouts.small);
        await this.actions.waitFor(
            async () => {
                const color = await this.actions.getCSSProperty(firstRow, 'background-color', WorkOrderFilterPageLocators.dataRows.name);
                return await this.normalizeColor(color) === normalizedExpected;
            },
            {
                timeout: timeouts.large * 2,
                message: `Expected background color '${expectedColor}' was not applied in time.`,
            }
        );
        const appliedColor = await this.actions.getCSSProperty(firstRow, 'background-color', WorkOrderFilterPageLocators.dataRows.name);
        await this.actions.assertEqual(await this.normalizeColor(appliedColor), normalizedExpected, `Color code for '${expectedColor}' was not applied correctly`);
    }
}

export const workOrderFilterPageActions = new WorkOrderFilterPageActions();
