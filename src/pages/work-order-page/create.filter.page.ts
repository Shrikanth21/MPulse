import { Page } from "@playwright/test";
import { getPage } from "../../base/base";
import { WebActions } from "../../base/web.action.util";
import { timeouts } from "../../helper/timeouts-config";
import { CommonPageLocators } from "../locators/common.page.locator";

class CreateFilterPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elements = {
        navbarBrand: { selector: "//a[@class='navbar-brand']", name: "Navbar Brand" },
        customizeButton: { selector: "//i[@class='fas fa-cog']", name: "Customize Button" },
        customizeModalHeader: { selector: "//div[@class='modal-header ng-binding ui-draggable-handle' and contains(text(),'Customize')]", name: "Customize Modal Header" },
        addLayoutButton: { selector: "//li[@title='Add']//i[@class='fa fa-plus']", name: "Add Layout Button" },
        layoutEntryInput: { selector: "//input[@id='layoutEntry']", name: "Layout Entry Input" },
        applyButton: { selector: "//button[@title='Apply']", name: "Apply Button" },
        saveButton: { selector: "//li[@title='Save']//i[@class='fas fa-check']", name: "Save Button" },
        expandGridDropdownIcon: { selector: "//div[@class='expand-grid-left']//div[@class='dx-dropdowneditor-icon']", name: "Expand Grid Dropdown Icon" },
        deleteCurrentRecord: { selector: "//li[@ng-hide='hideLayoutSelector']//i[@class='far fa-times-circle']", name: "Delete Current Layout Record" },
        confirmYesButton: { selector: "//div[@aria-label='Yes']", name: "Confirm Yes Button" },
        confirmNoButton: { selector: "//div[@aria-label='No']", name: "Confirm No Button" },
        listItems: { selector: "//div[@class='dx-item dx-list-item']", name: "List Items" },
        customFilterDropdown: (field: string) => `//filterpopup[@ng-if='selectedLayoutData.CustomFilter']/descendant::div[contains(@dx-select-box,'${field}')]`,
        customFilterDropdowns: { selector: "//div[@ng-switch-when='customfilter']/descendant::input[@class='dx-texteditor-input']", name: "Custom Filter Input" },
        colorCodeDropdown: (field: string) => `//filterpopup[@ng-if='selectedLayoutData.ColorFilter']/descendant::div[contains(@dx-select-box,'${field}')]/descendant::input[@class='dx-texteditor-input']`,
        colorInput: { selector: "//input[contains(@class, 'default-color-asb')]", name: "Color Input" },
        dataRows: { selector: "//tr[contains(@class, 'dx-row dx-data-row dx-column')]", name: "Data Rows" },
        addMoreFilterButton: { selector: "//a[@title='Add']", name: "Add More Filter Button" },
        expandGridDropdownInput: { selector: "//div[contains(@class,'expand-grid-left')]//input[@class='dx-texteditor-input']", name: "Expand Grid Dropdown Input" },
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
        const navbarBrandLocator = this.actions.getLocator(this.elements.navbarBrand.selector);
        await this.actions.waitForElementToBeVisible(navbarBrandLocator, this.elements.navbarBrand.name);
        await this.actions.click(navbarBrandLocator, this.elements.navbarBrand.name);
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
        const clearDropdownEditor = this.actions.getLocator(this.elements.expandGridDropdownInput.selector);
        await this.actions.waitForElementToBeVisible(clearDropdownEditor, this.elements.expandGridDropdownInput.name);
        await this.actions.clearAndTypeText(clearDropdownEditor, 'ID and Description Only', this.elements.expandGridDropdownInput.name);
        await this.actions.waitForElementToBeVisible(clearDropdownEditor, this.elements.expandGridDropdownInput.name);
        await this.actions.click(this.actions.getLocator(CommonPageLocators.getDivByText('ID and Description Only')), 'ID and Description Only');
    }

    /**
     * Clicks on the customize button to open the customization modal.
     */
    public async clickOnCustomizeButton(): Promise<void> {
        await this.chooseDefaultLayout();
        const customizeButtonLocator = this.actions.getLocator(this.elements.customizeButton.selector);
        await this.actions.waitForElementToBeVisible(customizeButtonLocator, this.elements.customizeButton.name);
        await this.actions.click(customizeButtonLocator, this.elements.customizeButton.name);
    }

    /**
     * Clicks on the customize button again to open the customization modal.
     */
    public async clickOnCustomizeButtonAgain(): Promise<void> {
        const customizeButtonLocator = this.actions.getLocator(this.elements.customizeButton.selector);
        await this.actions.waitForElementToBeVisible(customizeButtonLocator, this.elements.customizeButton.name);
        await this.actions.click(customizeButtonLocator, this.elements.customizeButton.name);
    }

    /**
     * Verifies that the customize modal header is visible.
     */
    public async verifyCustomizeModalHeader(): Promise<void> {
        const customizeModalHeaderLocator = this.actions.getLocator(this.elements.customizeModalHeader.selector);
        await this.actions.waitForElementToBeVisible(customizeModalHeaderLocator, this.elements.customizeModalHeader.name);
    }

    /**
     * Clicks on the add layout button to create a new layout.
     */
    public async clickOnAddLayoutButton(): Promise<void> {
        const addLayoutButtonLocator = this.actions.getLocator(this.elements.addLayoutButton.selector);
        await this.actions.click(addLayoutButtonLocator, this.elements.addLayoutButton.name);
    }

    /**
     * Enters the layout name in the input field.
     * @param layoutName The name of the layout to enter.
     */
    public async enterLayoutName(layoutName: string): Promise<void> {
        const layoutEntryInputLocator = this.actions.getLocator(this.elements.layoutEntryInput.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, this.elements.layoutEntryInput.name);
        await this.actions.typeText(layoutEntryInputLocator, layoutName, this.elements.layoutEntryInput.name);
    }

    /**
     * Clicks on the apply button to apply the changes.
     */
    public async clickOnApplyButton(): Promise<void> {
        const applyButtonLocator = this.actions.getLocator(this.elements.applyButton.selector);
        await this.actions.waitForElementToBeVisible(applyButtonLocator, this.elements.applyButton.name);
        await this.actions.click(applyButtonLocator, this.elements.applyButton.name);
    }

    /**
     * Clicks on the save button to save the current layout.
     */
    public async clickOnSaveButton(): Promise<void> {
        const saveButtonLocator = this.actions.getLocator(this.elements.saveButton.selector);
        await this.actions.waitForElementToBeVisible(saveButtonLocator, this.elements.saveButton.name);
        await this.actions.click(saveButtonLocator, this.elements.saveButton.name);
    }

    /**
     * Verifies that the layout is created successfully.
     * @param layoutName The name of the layout to verify.
     */
    public async verifyLayoutCreatedSuccessfully(layoutName: string): Promise<void> {
        const layoutEntryInputLocator = this.actions.getLocator(this.elements.expandGridDropdownIcon.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
        await this.actions.click(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
        const layoutOptionLocator = this.actions.getLocator(CommonPageLocators.getDivByText(layoutName));
        await this.actions.waitForElementToBeVisible(layoutOptionLocator, `Element is visible`)
        const layoutTitle = await this.actions.getText(layoutOptionLocator, this.elements.expandGridDropdownIcon.name);
        await this.actions.assertEqual(layoutTitle, layoutName, `${layoutName} is not present in the dropdown`);
        await this.actions.click(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
        await this.clickOnOutside();
    }

    /**
     * Clicks on the delete current record button to delete the current layout.
     */
    public async clickOnDeleteCurrentRecord(): Promise<void> {
        await this.clickOnCustomizeButtonAgain();
        const deleteCurrentRecordLocator = this.actions.getLocator(this.elements.deleteCurrentRecord.selector);
        await this.actions.click(deleteCurrentRecordLocator, this.elements.deleteCurrentRecord.name);
        await this.clickOnConfirmYesButton();
    }

    /**
     * Clicks on the confirm yes button to confirm the deletion.
     */
    public async clickOnConfirmYesButton(): Promise<void> {
        const confirmYesButtonLocator = this.actions.getLocator(this.elements.confirmYesButton.selector);
        await this.actions.click(confirmYesButtonLocator, this.elements.confirmYesButton.name);
    }

    /**
     * Clicks on the confirm no button to cancel the deletion.
     */
    public async verifyTextNotPresentInListItems(text: string): Promise<void> {
        const listItemsLocator = this.actions.getLocator(this.elements.listItems.selector);
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
        const layoutEntryInputLocator = this.actions.getLocator(this.elements.expandGridDropdownIcon.selector);
        await this.actions.waitForElementToBeVisible(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
        await this.actions.click(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
        await this.verifyTextNotPresentInListItems(layoutName);
        await this.actions.click(layoutEntryInputLocator, this.elements.expandGridDropdownIcon.name);
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
        const customFilterFieldInput = this.actions.getLocator(this.elements.customFilterDropdown('fieldDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterFieldInput, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterFieldInput, this.elements.customFilterDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName));
        await this.actions.waitForElementToBeVisible(customFilterFieldInputLocator, `Custom filter field with title ${filterName} is present`);
        await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${filterName}`);

        const customFilterOperatorInputLocator = this.actions.getLocator(this.elements.customFilterDropdown('operatorDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterOperatorInputLocator, this.elements.customFilterDropdown.name);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator));
        await this.actions.waitForElementToBeVisible(customFilterOperatorItemLocator, `Custom filter operator item with title ${operator} is present`);
        await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${operator}`);

        const customFilterValueInputLocator = this.actions.getLocator(this.elements.customFilterDropdown('valueDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterValueInputLocator, this.elements.customFilterDropdown.name);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${value} is present`);
        await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${value}`);

        const customFilterConditionInputLocator = this.actions.getLocator(this.elements.customFilterDropdown('conditionDropDown'));
        await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterConditionInputLocator, this.elements.customFilterDropdown.name);

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
        const addMoreFilterButtonLocators = this.actions.getLocator(this.elements.addMoreFilterButton.selector);
        const count = await addMoreFilterButtonLocators.count?.() ?? 1;
        let addMoreFilterButtonLocator;
        if (count > 1) {
            addMoreFilterButtonLocator = addMoreFilterButtonLocators.nth(count - 1);
        } else {
            addMoreFilterButtonLocator = addMoreFilterButtonLocators;
        }
        await this.actions.waitForElementToBeVisible(addMoreFilterButtonLocator, this.elements.addMoreFilterButton.name);
        const isEnabled = await addMoreFilterButtonLocator.isEnabled?.() ?? true;
        if (isEnabled) {
            await this.actions.click(addMoreFilterButtonLocator, this.elements.addMoreFilterButton.name);
        }

        const customFilterFieldInput = this.actions.getLocator(this.elements.customFilterDropdowns.selector).nth(4);
        await this.actions.waitForElementToBeVisible(customFilterFieldInput, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterFieldInput, this.elements.customFilterDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName)).nth(1);
        await this.actions.waitForElementToBeVisible(customFilterFieldInputLocator, `Custom filter field with title ${filterName} is present`);
        await this.actions.click(customFilterFieldInputLocator, `Clicked on custom filter field: ${filterName}`);

        const customFilterOperatorInputLocator = this.actions.getLocator(this.elements.customFilterDropdowns.selector).nth(5);
        await this.actions.waitForElementToBeVisible(customFilterOperatorInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterOperatorInputLocator, this.elements.customFilterDropdown.name);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator)).nth(1);
        await this.actions.click(customFilterOperatorItemLocator, `Clicked on custom filter operator: ${operator}`);

        const customFilterValueInputLocator = this.actions.getLocator(this.elements.customFilterDropdowns.selector).nth(6);
        await this.actions.waitForElementToBeVisible(customFilterValueInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterValueInputLocator, this.elements.customFilterDropdown.name);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Custom filter value input with title ${value} is not present`);
        await this.actions.click(customFilterValueInput, `Clicked on custom filter value: ${value}`);

        const customFilterConditionInputLocator = this.actions.getLocator(this.elements.customFilterDropdowns.selector).nth(7);
        await this.actions.waitForElementToBeVisible(customFilterConditionInputLocator, this.elements.customFilterDropdown.name);
        await this.actions.click(customFilterConditionInputLocator, this.elements.customFilterDropdown.name);

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
        const colorCodeFilterInput = this.actions.getLocator(this.elements.colorCodeDropdown('fieldDropDown'));
        await this.actions.click(colorCodeFilterInput, this.elements.colorCodeDropdown.name);

        const customFilterFieldInputLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(filterName));
        await this.actions.click(customFilterFieldInputLocator, `Select color code filter field: ${filterName}`);

        const colorCodeOperatorInput = this.actions.getLocator(this.elements.colorCodeDropdown('operatorDropDown'));
        await this.actions.click(colorCodeOperatorInput, `Select color code operator: ${operator}`);

        const customFilterOperatorItemLocator = this.actions.getLocator(CommonPageLocators.getColumnCellByTitle(operator));
        await this.actions.click(customFilterOperatorItemLocator, `Select color code operator: ${operator}`);

        const colorCodeValueInput = this.actions.getLocator(this.elements.colorCodeDropdown('valueDropDown'));
        await this.actions.click(colorCodeValueInput, `Select color code value: ${value}`);

        const customFilterValueInput = this.actions.getLocator(CommonPageLocators.getValueDivByTitle(value));
        await this.actions.waitForElementToBeVisible(customFilterValueInput, `Color code value input with title ${value} is not present`);
        await this.actions.click(customFilterValueInput, `Select color code value: ${value}`);

        const colorInputLocator = this.actions.getLocator(this.elements.colorInput.selector);
        await this.actions.waitForElementToBeVisible(colorInputLocator, this.elements.colorInput.name);
        await this.actions.clearAndTypeText(colorInputLocator, color, this.elements.colorInput.name);

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
        const firstRow = this.actions.getLocator(this.elements.dataRows.selector).first();
        await this.actions.waitForElementToBeVisible(firstRow, this.elements.dataRows.name);
        const normalizedExpected = await this.normalizeColor(expectedColor);
        await this.actions.waitForCustomDelay(timeouts.small);
        await this.actions.waitFor(
            async () => {
                const color = await this.actions.getCSSProperty(firstRow, 'background-color', this.elements.dataRows.name);
                return await this.normalizeColor(color) === normalizedExpected;
            },
            {
                timeout: timeouts.large * 2,
                message: `Expected background color '${expectedColor}' was not applied in time.`,
            }
        );
        const appliedColor = await this.actions.getCSSProperty(firstRow, 'background-color', this.elements.dataRows.name);
        await this.actions.assertEqual(await this.normalizeColor(appliedColor), normalizedExpected, `Color code for '${expectedColor}' was not applied correctly`);
    }
}

export const createFilterPage = new CreateFilterPage();
