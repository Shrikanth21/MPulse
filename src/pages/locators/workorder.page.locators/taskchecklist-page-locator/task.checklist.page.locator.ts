export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const TaskChecklistsPageLocators: Readonly<{
    readonly addNewRecordButton: LocatorDefinition;
    readonly descriptionInput: LocatorDefinition;
    readonly onCompletionSectionCheckbox: LocatorDefinition;
    readonly onCloseSectionCheckbox: LocatorDefinition;
    readonly moreButton: LocatorDefinition;
    readonly addEventButton: LocatorDefinition;
    readonly moreButtonTaskChecklist: LocatorDefinition;
    readonly addElementInput: LocatorDefinition;
    readonly saveToTabButton: LocatorDefinition;
    readonly taskChecklistId: LocatorDefinition;
    readonly saveButton: LocatorDefinition;
    readonly viewTaskDetailsLink: LocatorDefinition;
    readonly taskChecklistMoreButton: LocatorDefinition;
    readonly editTaskChecklistButton: LocatorDefinition;
    readonly taskChecklistCheckbox: LocatorDefinition;
    readonly saveEditTaskChecklistButton: LocatorDefinition;
    readonly closeTaskListPopUpButton: LocatorDefinition;
    readonly wkoCloseWarningDialogMessage: LocatorDefinition;

}> = {
    addNewRecordButton: { selector: '//li[@ng-click="addNewRecord()"]', name: "Add New Record Button" },
    descriptionInput: { selector: "//div[@id='Description']//input", name: "Description Input" },
    onCompletionSectionCheckbox: { selector: "//div[@id='OnCompletion']", name: "On Completion Section" },
    onCloseSectionCheckbox: { selector: "//div[@id='OnClose']", name: "On Close Section" },
    moreButton: { selector: '//div[@class="moreBtn"]', name: 'More Button' },
    addEventButton: { selector: '//li[@ng-click="addEvent()"]', name: 'Add Event Button' },
    moreButtonTaskChecklist: { selector: '//datagrid[@id="TaskChecklist"]/descendant::div[@class="moreBtn"]', name: 'More Button Task Checklist' },
    addElementInput: { selector: '//input[contains(@ng-model,"addElementPopupData.newControlData")]', name: 'Add Element Input' },
    saveToTabButton: { selector: '//button[@ng-click="savetoTab()"]', name: 'Save To Tab Button' },
    taskChecklistId: { selector: '//span[@id="ID"]', name: 'Task Checklist ID' },
    saveButton: { selector: '//ul[@class="itemDetailActionBtns"]/descendant::a[@title="Save"]', name: 'Save Button' },
    viewTaskDetailsLink: { selector: '//a[contains(@ng-click,"viewTaskDetails")]', name: 'View Task Details Link' },
    taskChecklistMoreButton: { selector: '//datagrid[@id="TaskChecklist0"]/descendant::div[@class="moreBtn"]', name: 'Task Checklist More Button' },
    editTaskChecklistButton: { selector: '//datagrid[@id="TaskChecklist0"]/descendant::li[@ng-click="showEditMode()"]', name: 'Edit Task Checklist Button' },
    taskChecklistCheckbox: { selector: '//datagrid[@id="TaskChecklist0"]/descendant::span[@class="dx-checkbox-icon"]', name: 'Task Checklist Checkbox' },
    saveEditTaskChecklistButton: { selector: '//datagrid[@id="TaskChecklist0"]/descendant::li[@ng-click="saveEditMode()"]', name: 'Save Edit Task Checklist Button' },
    closeTaskListPopUpButton: { selector: '//button[@title="Click here to close"]', name: 'Close Task List Pop Up Button' },
    wkoCloseWarningDialogMessage: { selector: "//div[@class='dx-dialog-message']", name: "Dialog Message" }
};