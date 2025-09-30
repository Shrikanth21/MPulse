import { expect, Page } from "@playwright/test";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { getPage } from "../../../../base/base";
import { WebActions } from "../../../../base/web.action.util";
import logger from "../../../../helper/logger";
import { CommonPageLocators } from "../../../locators/common.page.locator";
import { ReportPrintPageLocators } from "../../../locators/reports-pages-locator/print-information-menu-page-locator/report.print.page.locator";
import { timeouts } from "../../../../helper/timeouts-config";

class ReportPrintPageActions {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Gets the title of the work order record.
     * @returns The title of the work order record.
     */
    public async getRecordTitle(): Promise<string> {
        const wkoDiv = this.actions.getLocator(ReportPrintPageLocators.wkoDiv.selector);
        await this.actions.waitForElementToBeVisible(wkoDiv, ReportPrintPageLocators.wkoDiv.name);
        return this.actions.getText(wkoDiv, ReportPrintPageLocators.wkoDiv.name);
    }

    /**
     * Clicks the print button on the report print page.
     */
    public async clickPrintButton(): Promise<void> {
        const printButton = this.actions.getLocator(ReportPrintPageLocators.printButton.selector);
        await this.actions.waitForClickable(printButton, ReportPrintPageLocators.printButton.name);
        await this.actions.click(printButton, ReportPrintPageLocators.printButton.selector);
    }

    /**
     * Clicks the list view print button on the report print page.
     */
    public async clickListViewPrintButton(): Promise<void> {
        const listViewPrintButton = this.actions.getLocator(ReportPrintPageLocators.listViewPrintButton.selector);
        await this.actions.waitForClickable(listViewPrintButton, ReportPrintPageLocators.listViewPrintButton.name);
        await this.actions.click(listViewPrintButton, ReportPrintPageLocators.listViewPrintButton.selector);
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
            // Wait for the iframe to be attached and loaded
            await newPage.waitForSelector('iframe', { state: 'attached', timeout: 15000 });
            const frame = newPage.frameLocator('iframe');
            logger.info("Locating WKO nobr elements inside iframe...");
            const wkoNobrLocators = await frame.locator(ReportPrintPageLocators.wkoNobr.selector).all();
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
                newPage.click(ReportPrintPageLocators.customXlsButton.selector)
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
        const currentRecordLocator = this.actions.getLocator(ReportPrintPageLocators.currentRecord.selector);
        await this.actions.waitForElementToBeVisible(currentRecordLocator, ReportPrintPageLocators.currentRecord.name);
        return this.actions.getText(currentRecordLocator, ReportPrintPageLocators.currentRecord.name);
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
            await newPage.click(ReportPrintPageLocators.printLayoutButtonWrap.selector);
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
            await newPage.waitForSelector(ReportPrintPageLocators.navigateToWkoLink.selector, { timeout: 15000 });
            const currentRecordText = await newPage.textContent(ReportPrintPageLocators.navigateToWkoLink.selector);
            expect(currentRecordText?.trim()).toEqual(expectedValue);
            logger.info(`Verified record text: ${currentRecordText}`);
            await newPage.waitForSelector((ReportPrintPageLocators.dateOpenedValue), { timeout: 15000 });
            const dateOpenedInfo = await newPage.textContent(ReportPrintPageLocators.dateOpenedValue);
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
            await newPage.waitForSelector(ReportPrintPageLocators.wkoSpan.selector, { timeout: 40000 });
            const allRecordLocators = await newPage.$$(ReportPrintPageLocators.wkoSpan.selector);
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
        await newPage.click(ReportPrintPageLocators.printSpan.selector);
        logger.info("Print button clicked successfully.");
        const isVisible = await newPage.isVisible(ReportPrintPageLocators.printSpan.selector);
        expect(isVisible).toBeTruthy();
    }
}

export const reportPrintPageActions = new ReportPrintPageActions();
