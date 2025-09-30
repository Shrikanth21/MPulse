import { getFormattedDate } from "../../../../helper/date/get.future.date";

export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const ReportPrintPageLocators: Readonly<{
    readonly listViewPrintButton: LocatorDefinition;
    readonly printButton: LocatorDefinition;
    readonly wkoDiv: LocatorDefinition;
    readonly wkoNobr: LocatorDefinition;
    readonly customXlsButton: LocatorDefinition;
    readonly reportToolBar: LocatorDefinition;
    readonly printLayoutButtonWrap: LocatorDefinition;
    readonly navigateToWkoLink: LocatorDefinition;
    readonly currentRecord: LocatorDefinition;
    readonly dateOpenedValue: string;
    readonly wkoSpan: LocatorDefinition;
    readonly printSpan: LocatorDefinition;
}> = {
    listViewPrintButton: { selector: "//a[@title='Click here to print this record to printer']/child::i", name: "List view Print Button" },
    printButton: { selector: "//a[@title='Click here to print this record to printer']", name: "Print Button" },
    wkoDiv: { selector: "//div[contains(@title,'WKO-')]", name: "WKO Div" },
    wkoNobr: { selector: "//nobr[contains(text(),'WKO-')]", name: "WKO Nobr" },
    customXlsButton: { selector: "//input[@id='btnCustomXLS']", name: "Custom XLS Button" },
    reportToolBar: { selector: "//table[@id='tblReportToolBar']", name: "Report Tool Bar" },
    printLayoutButtonWrap: { selector: "//div[@class='printlayout-button-wrap']", name: "Print Layout Button Wrap" },
    navigateToWkoLink: { selector: "//a[contains(@title,'Navigate to WKO-')]", name: "Navigate to WKO Link" },
    currentRecord: { selector: "//span[@id='ID']", name: "Current Record" },
    dateOpenedValue: `(//div[text()='Date Opened']/following::div[text()='${getFormattedDate()}'])[1]`,
    wkoSpan: { selector: "//span[contains(text(),'WKO-')]", name: "WKO Span" },
    printSpan: { selector: "//span[@title='Print']", name: "Print Span" },
};