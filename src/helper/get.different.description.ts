function generateDescription(entity: string, suffix: string): string {
    const now = new Date();
    const datePart = now.toLocaleDateString('en-CA').replace(/-/g, ''); // YYYYMMDD
    const timePart = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5 chars
    return `${entity} ${datePart}_${timePart}_${randomPart}${suffix}`;
}

export const generatedDescription = generateDescription('Work Order', '_wko_SK');
export const generatedBuildingTaskDescription = generateDescription('Building Task', '_Building_TASK_SK');
export const generatedEqTaskDescription = generateDescription('Equipment Task', '_Eq_task_SK');
export const generatedLayoutName = generateDescription('Layout', '_Layout_SK');
export const generatedMaintenanceRecordDescription = generateDescription('Maintenance Record', '_Maintenance_Record_SK');