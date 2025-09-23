import { expect, Page } from "@playwright/test";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { getPage } from "../../../base/base";
import { WebActions } from "../../../base/web.action.util";
import logger from "../../../helper/logger";
import { getFormattedDate } from "../../../helper/date/get.future.date";
import { CommonPageLocators } from "../../locators/common.page.locator";

class ReportPrintPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private elementSelectors = {
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

    /**
     * Gets the title of the work order record.
     * @returns The title of the work order record.
     */
    public async getRecordTitle(): Promise<string> {
        const wkoDiv = this.actions.getLocator(this.elementSelectors.wkoDiv.selector);
        await this.actions.waitForElementToBeVisible(wkoDiv, this.elementSelectors.wkoDiv.name);
        return this.actions.getText(wkoDiv, this.elementSelectors.wkoDiv.name);
    }

    /**
     * Clicks the print button on the report print page.
     */
    public async clickPrintButton(): Promise<void> {
        const printButton = this.actions.getLocator(this.elementSelectors.printButton.selector);
        await this.actions.waitForClickable(printButton, this.elementSelectors.printButton.name);
        await this.actions.click(printButton, this.elementSelectors.printButton.selector);
    }

    /**
     * Clicks the list view print button on the report print page.
     */
    public async clickListViewPrintButton(): Promise<void> {
        const listViewPrintButton = this.actions.getLocator(this.elementSelectors.listViewPrintButton.selector);
        await this.actions.waitForClickable(listViewPrintButton, this.elementSelectors.listViewPrintButton.name);
        await this.actions.click(listViewPrintButton, this.elementSelectors.listViewPrintButton.selector);
    }

    /**
     * Opens the report and validates the download.
     */
    public async openReportAndValidate() {
        const downloadsDir = path.join(os.homedir(), "Downloads");
        const browserContext = this.currentPage.context();
        logger.info("Waiting for new report page to open...");
        try {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
            ]);
            logger.info("New report page opened.");
            const frame = newPage.frameLocator('iframe');
            logger.info("Locating WKO nobr elements inside iframe...");
            const wkoNobrLocators = await newPage.locator(this.elementSelectors.wkoNobr.selector).all();
            const wkoNobrTexts: string[] = [];
            for (const nobrLocator of wkoNobrLocators) {
                const text = await nobrLocator.textContent();
                if (text) {
                    wkoNobrTexts.push(text.trim());
                    logger.info("Found WKO nobr text:", text.trim());
                    expect(text.trim()).toContain('WKO');
                } else {
                    logger.info("Found WKO nobr text: <empty>");
                }
            }
            logger.info("All WKO nobr texts: " + JSON.stringify(wkoNobrTexts));
            logger.info("Clicking Custom XLS Button...");
            const [download] = await Promise.all([
                newPage.waitForEvent('download'),
                newPage.click(this.elementSelectors.customXlsButton.selector)
            ]);
            logger.info("Custom XLS Button clicked. Waiting for download...");
            const suggestedFilename = download.suggestedFilename();
            const savePath = path.join(downloadsDir, suggestedFilename);
            await download.saveAs(savePath);
            logger.info(`File saved to: ${savePath}`);
            expect(fs.existsSync(savePath)).toBeTruthy();
            expect(suggestedFilename).toMatch(/\.pdf$/);
        } catch (error) {
            logger.error("Error in openReportAndValidate:", error);
            throw error;
        }
    }

    /**
     * Gets the current record information.
     * @returns The current record information as a string.
     */
    public async getCurrentRecordInformation(): Promise<string> {
        const currentRecordLocator = this.actions.getLocator(this.elementSelectors.currentRecord.selector);
        await this.actions.waitForElementToBeVisible(currentRecordLocator, this.elementSelectors.currentRecord.name);
        return this.actions.getText(currentRecordLocator, this.elementSelectors.currentRecord.name);
    }

    /**
     * Sets the filter for the report.
     * @param rbtlIncludeDataFrom The label for the "Include Data From" radio button.
     * @param filterName The name of the filter to apply.
     */
    public async setFilter(rbtlIncludeDataFrom: string, filterName: string, okButton: string): Promise<void> {
        const browserContext = this.currentPage.context();
        logger.info("Waiting for new report page to open...");
        try {
            const [newPage] = await Promise.all([
                browserContext.waitForEvent('page'),
            ]);
            logger.info("New report page opened.");
            await newPage.bringToFront();
            await newPage.waitForLoadState('domcontentloaded');
            await newPage.click(this.elementSelectors.printLayoutButtonWrap.selector);
            await newPage.click(await CommonPageLocators.getLabelByText(rbtlIncludeDataFrom));
            await newPage.click(await CommonPageLocators.getLabelByText(filterName));
            await newPage.click(await CommonPageLocators.getLinkByText(okButton));
        } catch (error) {
            logger.error("Error in switchToWindow:", error);
            throw error;
        }
    }

    /**
     * Verifies current record information on the new page.
     * @param expectedValue The expected record value to verify.
     */
    public async verifyCurrentRecordInformation(expectedValue: string): Promise<void> {
        try {
            const pages = this.currentPage.context().pages();
            const newPage = pages[pages.length - 1];
            logger.info("Switched to new page for verification.");
            await newPage.waitForSelector(this.elementSelectors.navigateToWkoLink.selector, { timeout: 15000 });
            const currentRecordText = await newPage.textContent(this.elementSelectors.navigateToWkoLink.selector);
            expect(currentRecordText?.trim()).toEqual(expectedValue);
            logger.info(`Verified record text: ${currentRecordText}`);
            await newPage.waitForSelector((this.elementSelectors.dateOpenedValue), { timeout: 15000 });
            const dateOpenedInfo = await newPage.textContent(this.elementSelectors.dateOpenedValue);
            expect(dateOpenedInfo).not.toBeNull();
            logger.info(`Date Opened value found: ${dateOpenedInfo}`);
        } catch (error) {
            logger.error("Error in verifyCurrentRecordInformation:", error);
            throw error;
        }
    }

    /**
     * Verifies all record information on the new page.
     * @param expectedValues The expected record values to verify.
     */
    public async verifyAllRecordInformation(expectedValues: string): Promise<void> {
        try {
            if (typeof expectedValues !== "string" || expectedValues.trim() === "") {
                logger.error(`Invalid expectedValues argument: ${expectedValues}`);
                throw new Error(`Expected value is undefined, null, or empty. Received: ${expectedValues}`);
            }
            const pages = this.currentPage.context().pages();
            const newPage = pages[pages.length - 1];
            logger.info("Switched to new page for verification.");
            await newPage.waitForSelector(this.elementSelectors.wkoSpan.selector, { timeout: 40000 });
            const allRecordLocators = await newPage.$$(this.elementSelectors.wkoSpan.selector);
            const actualValues: string[] = [];
            for (const locator of allRecordLocators) {
                const text = await locator.textContent();
                if (text) {
                    actualValues.push(text.trim());
                }
            }
            const expectedValueNum = Number(expectedValues) + 1; //Added one because element for title is included
            logger.info("expected value number: " + expectedValueNum);
            if (isNaN(expectedValueNum)) {
                logger.error(`Expected value is not a valid number: ${expectedValues}`);
                throw new Error(`Expected value is not a valid number: ${expectedValues}`);
            }
            if (expectedValueNum <= 1500) {
                expect(actualValues.length).toEqual(expectedValueNum);
                logger.info(`Verified record count: ${expectedValueNum} and ${actualValues.length}`);
            } else if (expectedValueNum >= 1501) {
                const expectedValue = 1501;
                expect(actualValues.length).toEqual(expectedValue);
                logger.info(`Verified record count: ${expectedValue} and ${actualValues.length}`);
            }
            logger.info(`Verified all record texts: ${JSON.stringify(actualValues)} and ${actualValues.length}`);
        } catch (error) {
            logger.error("Error in verifyAllRecordInformation:", error);
            throw error;
        }
    }

    /**
     * Verifies that the Print button is successfully clicked.
     */
    public async verifyDownloadReport(): Promise<void> {
        const pages = this.currentPage.context().pages();
        const newPage = pages[pages.length - 1];
        logger.info("Clicking Print Span...");
        await newPage.click(this.elementSelectors.printSpan.selector);
        logger.info("Print button clicked successfully.");
        const isVisible = await newPage.isVisible(this.elementSelectors.printSpan.selector);
        expect(isVisible).toBeTruthy();
    }
}

export const reportPrintPage = new ReportPrintPage();
