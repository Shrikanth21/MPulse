import { Then, When } from "@cucumber/cucumber";
import path from "path";
import testData from '../../../../data/testData.json';
import { commonPageActions } from "../../../../pages/actions/common.page.actions";
import { workOrderRecordPageActions } from "../../../../pages/actions/workorder.page.action/work-order-records-page-action/work.order.records.page.action";
import { mrAutoConvertPageActions } from "../../../../pages/actions/workorder.page.action/maintenance-request-records-page.action/mr.auto.convert.page.action";
import { requisitionRecordsPageActions } from "../../../../pages/actions/Inventory.pages.action/por-requisition-page-action/requisition.records.page.action";

const filePath = path.resolve(__dirname, '../../../../data/docs/MPulse.docx');
let beforeCloseStockQty: string;

When(/^the user navigates to the Requisition Records page$/, async () => {
	await requisitionRecordsPageActions.navigateToRequisitionRecordsPage(
		testData.homePageURL,
		testData.element_text.got_it_btn,
		testData.inventoryMenuTitle,
		testData.requisitionMenuTitle,
		testData.requisitionRecordsPageURL
	);
});

When(/^the user creates a new Purchase Order Requisition with a mandatory fields$/, async () => {
	await requisitionRecordsPageActions.createRequisitionWithMandatoryFields(
		{ ddType: testData.dropdownSelections.map((item: any) => item.ddType) },
		testData.requisitionMenuTitle
	);
});

Then(/^the Purchase Order Requisition status should be Open$/, async () => {
	await workOrderRecordPageActions.validateElementText(testData.element_text.open_status_text);
});


When(/^the user uploads a media file in the Purchase Order Requisition$/, async () => {
	await workOrderRecordPageActions.addMediaAndSelectRecord(testData.element_text.media_text, testData.icons.media_link_icon, filePath, testData.element_text.upload_text);
});

When(/^the user links inventory to the Purchase Order Requisition$/, async () => {
	await mrAutoConvertPageActions.linkInventoryToMaintenanceRequest(
		testData.element_text.financial_tab_text,
		testData.icons.media_link_icon,
		testData.element_text.link_button
	);
});

When(/^the user closes the created Purchase Order Requisition record$/, async () => {
	await requisitionRecordsPageActions.closeRequisitionRecord(
		testData.element_text.supplier_tab_text,
		testData.element_text.close_requisition_text,
		testData.element_text.yes_button
	);
});

Then(/^the Purchase Order Requisition record should be closed successfully$/, async () => {
	await commonPageActions.clickTabByText(testData.element_text.supplier_tab_text);
	await workOrderRecordPageActions.validateElementText(testData.element_text.closed_status_text);
});

Then(/^the Purchase Order Requisition status should be Back Order$/, async () => {
	await workOrderRecordPageActions.validateElementText(testData.element_text.backorder_status_text);
});

When(/^the user sets the Requisition Status to Back Order and updates the Quantity Received$/, async () => {
	await commonPageActions.clickTabByText(testData.element_text.supplier_tab_text);
	await workOrderRecordPageActions.changeWkoStatus(
		testData.element_text.requisition_status_text,
		testData.element_text.requisition_status_text,
		testData.element_text.back_order_text,);
	await requisitionRecordsPageActions.updateReceivedQuantity(testData.element_text.quantity_received_text);
});

When(/^the user creates a new Purchase Order Requisition record from List view$/, async () => {
	await requisitionRecordsPageActions.listViewPOR();
});

When(/^the user closes the created Purchase Order Requisition record from List view$/, async () => {
	await requisitionRecordsPageActions.closeRequisitionRecordFromListView(testData.element_text.close_requisition_text, testData.element_text.yes_button);
});

When(/^the user fill the mandatory fields$/, async () => {
	await requisitionRecordsPageActions.fillMandatoryFields(
		testData.element_text.supplier_tab_text,
		{ ddType: testData.dropdownSelections.map((item: any) => item.ddType) },
		testData.requisitionMenuTitle
	);
});

Then(/^the user goes to the grid and verifies the Quantity Received is updated successfully$/, async () => {
	await requisitionRecordsPageActions.validateReceivedQuantity(
		testData.element_text.financial_tab_text,
		testData.element_text.quantity_received_text);
});

Then(/^the user verifies the quantity in the stock in the linked inventory$/, async () => {
	beforeCloseStockQty = await requisitionRecordsPageActions.getInventoryStockQty(
		testData.element_text.stock_area_tab_text
	);
});

When(/^the user updates the quantity received in the Purchase Order Requisition$/, async () => {
	await requisitionRecordsPageActions.updateOrderQuantity(
		testData.element_text.financial_tab_text,
		testData.element_text.quantity_ordered_text
	);
});

Then(/^the user should verify the updated quantity in stock after closing the record$/, async () => {
	await requisitionRecordsPageActions.validateLinkedInventoryQuantity(
		testData.element_text.stock_area_tab_text,
		beforeCloseStockQty,
		testData.element_text.quantity_ordered_text
	);
});

Then(/^the user should verify the updated quantity in stock after back ordering the record$/, async () => {
	await requisitionRecordsPageActions.validateLinkedInventoryQuantity(
		testData.element_text.stock_area_tab_text,
		beforeCloseStockQty,
		testData.element_text.quantity_received_text
	);
	await commonPageActions.clickLinkByText(testData.requisitionMenuTitle);
});
