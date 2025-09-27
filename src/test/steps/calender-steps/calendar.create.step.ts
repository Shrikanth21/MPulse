import { Then, When } from "@cucumber/cucumber";
import testData from '../../../data/testData.json';
import filterOptinData from "../../../data/custom.filter.data.json";
import { calendarPage } from "../../../pages/calendar-page/calendar.page";
import { reportPrintPage } from "../../../pages/reports-pages/print-information-menu-page/report.print.page";
import { generatedWorkOrderCalendarTitle } from "../../../helper/get.different.description";

let currentEventTitle: string;

When(/^the user navigates to the Calendar tab$/, async () => {
    await calendarPage.navigateToCalendarTab(
        filterOptinData.maintenanceAdvisor.maintenance_advisor_title,
        testData.calendar.calendar_tab_name,
        testData.calendarPageURL
    );
});

Then(/^the user should see the current month calendar view$/, async () => {
    await calendarPage.verifyCurrentMonthCalendarView();
});

Then(/^the user get created work order id$/, async () => {
    currentEventTitle = await reportPrintPage.getCurrentRecordInformation();
});

When(/^the user clicks on the create calendar filter$/, async () => {
    await calendarPage.createCalendarFilter(
        generatedWorkOrderCalendarTitle,
        testData.subMenuItemWorkTitle,
        testData.general_field,
        testData.general_field,
        filterOptinData.customColorItem.Red
    );
});

When(/^the user navigates back to the calendar view$/, async () => {
    await calendarPage.navigateToCalendarView(
        testData.calendar.calendar_tab_name,
        generatedWorkOrderCalendarTitle
    );
});

Then(/^the user should see the calendar record details displayed correctly$/, async () => {
    await calendarPage.verifyCalendarRecordDetails(currentEventTitle);
});

Then(/^the user deletes the created calendar record$/, async () => {
    await calendarPage.deleteCalendarRecord(testData.element_text.yes_button, filterOptinData.maintenanceAdvisor.dashboard_title);
});
