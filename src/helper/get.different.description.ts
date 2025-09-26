export function generateDescription(entity: string, suffix: string = ''): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, '');
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${entity} ${datePart}_${timePart}_${randomPart}${suffix}`;
}


export const generatedDescription = generateDescription('Work Order', '_Automation');
export const generatedBuildingTaskDescription = generateDescription('Building Task', '_Automation');
export const generatedEqTaskDescription = generateDescription('Equipment Task', '_Automation');
export const generatedLayoutName = generateDescription('Layout', '_Automation');
export const generatedMaintenanceRecordDescription = generateDescription('Maintenance Record', '_Automation');
export const updatedDescription = generateDescription('Updated Description', '_Automation');
export const generatedCycleCountRecordDescription = generateDescription('Cycle Count Record', '_Automation');
export const generatedScheduledMaintenanceRecordDescription = generateDescription('Scheduled Maintenance Record', '_Automation');
export const generatedSMRAutoConversionDescription = generateDescription('SMR Auto Conversion', '_Automation');
export const generatedSMRFixedScheduleDescription = generateDescription('SMR Fixed Schedule', '_Automation');
export const generatedSMRFloatingScheduleDescription = generateDescription('SMR Floating Schedule', '_Automation');
export const generatedSMRMeterBasedDescription = generateDescription('SMR Meter Based', '_Automation');
export const generatedIMDescription = generateDescription('Information Menu', '_Automation');
export const generatedReportTitle = generateDescription('Report Title', '_Automation');
export const generatedWorkOrderCalendarTitle = generateDescription('Work Order Calendar', '_Automation');
export const generatedTaskChecklistName = generateDescription('Task Checklist', '_Automation');
export const generatedCheckBoxName = generateDescription('Check Box', '_Automation');
export const generatedMaintenanceTaskRecordDescription = generateDescription('Maintenance Task Record', '_Automation');
export const generateWorkOrderWithTaskDescription = generateDescription('WKO Task Checklist', '_Automation');