import { Then, When } from "@cucumber/cucumber";
import testData from "../../../../data/testData.json";
import { wkoLabelChangePageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/wko.label.change.page.action";

When(/^the user navigates to the customization page and selects language options$/, async () => {
    await wkoLabelChangePageActions.navigateToManagementToolCustomizationPage(
        testData.element_text.got_it_btn,
        testData.managementToolsMenu,
        testData.customizationSubMenuItemTitle,
        testData.languageMenuItem,
        testData.customizationLanguageUrl
    );
});

When(/^the user selects dropdown values on the customization language page$/, async () => {
    await wkoLabelChangePageActions.selectDropdownValue(testData.customization.recordAreaDropdownValues.work_Order_Records,
        testData.customization.languageDropdownValues.status);
});

When(/^the user navigates to the workorder record page after changing the label$/, async () => {
    await wkoLabelChangePageActions.changeLabel(testData.customization.status_label_change);
    await wkoLabelChangePageActions.navigateToWorkOrderRecordsPageFromOtherMenu(
        testData.menuItemWorkTitle,
        testData.menuItemWorkTitle,
        testData.subMenuItemWorkTitle,
        testData.workOrderRecordsPageURL
    );
});

Then(/^the record text should reflect the updated label$/, async () => {
    await wkoLabelChangePageActions.validateLabelChange(testData.customization.status_label_change);
});

When(/^the user navigates back to the customization page and selects language options after changing the label$/, async () => {
    await wkoLabelChangePageActions.navigateToCustomizationPageFromOtherMenu(
        testData.managementToolsMenu,
        testData.managementToolsMenu,
        testData.customizationSubMenuItemTitle,
        testData.languageMenuItem,
        testData.customizationLanguageUrl
    );
});

Then(/^the user selects the same record type from the Record Area dropdown$/, async () => {
    await wkoLabelChangePageActions.selectDropdownValue(testData.customization.recordAreaDropdownValues.work_Order_Records,
        testData.customization.status_label_change);
    await wkoLabelChangePageActions.changeLabel(testData.customization.languageDropdownValues.status);
});
