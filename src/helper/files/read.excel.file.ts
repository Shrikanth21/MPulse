const { resolve } = require("path");

/**
 * Read the data from an Excel file.
 * @param path The path to the Excel file.
 * @param sheetName The name of the sheet to read.
 * @returns A promise that resolves to an array of data from the specified sheet.
 */
export const readExcelFile = (path: string, sheetName: string): Promise<any[]> => {
    const xlsx = require("xlsx");
    const workbook = xlsx.readFile(path);
    const workSheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(workSheet);
    return Promise.resolve(data);
}

export const docxFilePath = resolve(__dirname, "../../data/docs/MPulse.docx");
export const imgFilePath = resolve(__dirname, "../../../reports/assets/mpulse-logo.png");
