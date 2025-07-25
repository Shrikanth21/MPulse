const { resolve } = require("path");

export const readExcelFile = (path: string, sheetName: string): Promise<any[]> => {
    const xlsx = require("xlsx");
    const workbook = xlsx.readFile(path);
    const workSheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(workSheet);
    return Promise.resolve(data);
}

export const docxFilePath = resolve(__dirname, "../../data/docs/MPulse.docx");
export const imgFilePath = resolve(__dirname, "../../../reports/assets/mpulse-logo.png");
