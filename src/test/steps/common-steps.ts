// import * as path from 'path';
// import { Given, Then, When } from "@cucumber/cucumber";
// import { loginPage } from "../../pages/login-page/Login.page";
// import testData from '../../data/close.wko.json';
// import { equipmentRecordsPage } from "../../pages/capital-assets-page/Equipment.records.page";
// import { generatedEqTaskDescription } from "../../helper/get.different.description";
// import { workOrderPage } from "../../pages/work-order/WorkOrderPage.page";
// import { getFutureDay } from '../../helper/date/get.future.date';
// import { homePage } from '../../pages/home-page/Home.page';

// const filePath = path.resolve(__dirname, "../../../src/data/docs/MPulse.docx");

// Given('the user log into the application', async function () {
//     const credentials = await loginPage.loadExcelCredentials();
//     await loginPage.login(credentials.username);
// });

// When('the user navigates to the Work Order Records page', async function () {
//     await homePage.navigateToCapitalAssetsRecordsPage(
//         testData.homePageURL,
//         testData.element_text.got_it_btn,
//         testData.menuItemTitle,
//         testData.subMenuItemTitle,
//         testData.workOrderRecordsPageURL
//     );
// });

// When('the user creates a new asset with a unique description and uploads media', async function () {
//   await equipmentRecordsPage.createTaskWithMediaUpload(
//     testData.icons.plusIcon,
//     generatedEqTaskDescription,
//     testData.element_text.media_text,
//     testData.icons.media_link_icon,
//     filePath
//   );
// });

// Then("the newly created Work Order status should be Open status", async function () {
//   await workOrderPage.validateElementText(testData.element_text.open_status_text);
// });

// When('the user assigns a future due date to the Work Order', async function () {
//   await workOrderPage.performCalendarActions(
//     testData.icons.calendarIcon,
//     testData.icons.calendarIcon,
//     getFutureDay(2),
//     testData.element_text.ok_button_text
//   );
// });

