function generateDescription(entity: string, suffix: string): string {
    const now = new Date();
    const datePart = now.toLocaleDateString('en-CA').replace(/-/g, '');
    const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${entity} ${datePart}_${timePart}_${randomPart}${suffix}`;
}

export const generatedDescription = generateDescription('Work Order', '_wko');
export const generatedBuildingTaskDescription = generateDescription('Building Task', '_Building_TASK');
export const generatedEqTaskDescription = generateDescription('Equipment Task', '_Eq_task');
export const generatedLayoutName = generateDescription('Layout', '_Layout');
export const generatedMaintenanceRecordDescription = generateDescription('Maintenance Record', '_Maintenance_Record');
export const updatedDescription = generateDescription('Updated Description', '_Updated');