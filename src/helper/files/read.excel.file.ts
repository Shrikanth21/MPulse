export const readExcelFile = (path: string, sheetName: string): Promise<any[]> => {
    const xlsx = require("xlsx");
    const workbook = xlsx.readFile(path);
    const workSheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(workSheet);
    return Promise.resolve(data);
}