import { Then, When } from "@cucumber/cucumber";
import testData from '../../../data/testData.json';
import filterOptinData from "../../../data/custom.filter.data.json";
import { generatedWorkOrderCalendarTitle } from "../../../helper/get.different.description";
import { calendarPageActions } from "../../../pages/actions/calendar-page-action/calendar.page.action";
import { reportPrintPageActions } from "../../../pages/actions/reports-pages-action/print-information-menu-page-action/report.print.page.action";

let currentEventTitle: string;

When(/^the user navigates to the Calendar tab$/, async () => {
    await calendarPageActions.navigateToCalendarTab(
        filterOptinData.maintenanceAdvisor.maintenance_advisor_title,
        testData.calendar.calendar_tab_name,
        testData.calendarPageURL
    );
});

Then(/^the user should see the current month calendar view$/, async () => {
    await calendarPageActions.verifyCurrentMonthCalendarView();
});

Then(/^the user get created work order id$/, async () => {
    currentEventTitle = await reportPrintPageActions.getCurrentRecordInformation();
});

When(/^the user clicks on the create calendar filter$/, async () => {
    await calendarPageActions.createCalendarFilter(
        generatedWorkOrderCalendarTitle,
        testData.subMenuItemWorkTitle,
        testData.general_field,
        testData.general_field,
        filterOptinData.customColorItem.Red
    );
});

When(/^the user navigates back to the calendar view$/, async () => {
    await calendarPageActions.navigateToCalendarView(
        testData.calendar.calendar_tab_name,
        generatedWorkOrderCalendarTitle
    );
});

Then(/^the user should see the calendar record details displayed correctly$/, async () => {
    await calendarPageActions.verifyCalendarRecordDetails(currentEventTitle);
});

Then(/^the user deletes the created calendar record$/, async () => {
    await calendarPageActions.deleteCalendarRecord(testData.element_text.yes_button, filterOptinData.maintenanceAdvisor.dashboard_title);
});
