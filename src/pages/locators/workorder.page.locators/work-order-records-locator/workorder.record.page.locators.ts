import { CommonPageLocators } from "../../common.page.locator";

export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WorkOrderRecordPageLocators: Readonly<{
    readonly editButton: LocatorDefinition;
    readonly mediaMoreButton: LocatorDefinition;
    readonly taskLinkRow: LocatorDefinition;
    readonly popupCalendarIcon: LocatorDefinition;
    readonly fileInput: LocatorDefinition;
    readonly cancelReasonInput: LocatorDefinition;
    readonly cancelReasonFormGroup: LocatorDefinition;
    readonly cancelReasonEditIcon: LocatorDefinition;
    readonly numbersInput: LocatorDefinition;
    readonly callBackRedoDiv: LocatorDefinition;
    readonly timeSheetSaveButton: LocatorDefinition;
    readonly hoursInputField: LocatorDefinition;
    readonly holdCalendarIcon: LocatorDefinition;
    readonly getLinkByTitle: LocatorDefinition;
    readonly maximizeButton: LocatorDefinition;
    readonly plusIcon: LocatorDefinition;
    readonly checkIcon: LocatorDefinition;
    readonly wkoInput: LocatorDefinition;
    readonly okInput: LocatorDefinition;
    readonly hideButton: LocatorDefinition;
    readonly closeWorkOrderButton: LocatorDefinition;
    readonly yesSpan: LocatorDefinition;
    readonly docxFormatIcon: LocatorDefinition;
    readonly okButton: LocatorDefinition;
    readonly cancelReasonSave: LocatorDefinition;
    readonly reasonForCancellationLabel: LocatorDefinition;
    readonly popupOverlay: LocatorDefinition;
    readonly selectRowInLinkAssetPopup: LocatorDefinition;
    readonly popupTextInput: LocatorDefinition;
    readonly modalTitle: LocatorDefinition;
    readonly closeRequestButton: LocatorDefinition;
    readonly cancelPopupTextInputModal: LocatorDefinition;
    readonly getInputButton: (text: string) => string;
    readonly getOkButton: (text: string) => string;
    readonly getCalendarDate: (day: string) => string;
    readonly getPopupCalendarDate: (day: string) => string;
    readonly getMoreButton: (text: string) => string;
    readonly getEditIcon: (text: string) => string;
    readonly getLinkByTitleText: (title: string) => string;
    readonly getCostInputField: (fieldName: string) => string;
    readonly getTaskMoreIcon: (text: string) => string;
    readonly getButtonByTitle: (btnText: string) => string;
    readonly getEditIconByLabel: (label: string) => string;
    readonly getPopupGridRowByText: (text: string) => string;
}> = {
    editButton: { selector: '#edit-work-order', name: "Edit Button" },
    mediaMoreButton: { selector: "//div[contains(@class,'media')]//div[@class='moreBtn']", name: "Media More Button" },
    taskLinkRow: { selector: "(//div[@class='dx-datagrid-content']//table)[2]//tr[2]", name: "Task Link Row" },
    popupCalendarIcon: { selector: "//div[contains(@class,'modal-content')]/descendant::div[@class='dx-dropdowneditor-icon']", name: "Popup Calendar Icon" },
    fileInput: { selector: "//input[@title='Choose Files'][1]", name: "File Input" },
    cancelReasonInput: { selector: "//div[@title='Cancel Reason']/following-sibling::div//div[@id='Reasonforcancelation']//input", name: "Cancel Reason Input" },
    cancelReasonFormGroup: { selector: "(//div[@title='Cancel Reason']/following-sibling::div//div[@class='form-group'])[2]", name: "Cancel Reason Form Group" },
    cancelReasonEditIcon: { selector: "//div[@title='Cancel Reason']/following::span[@title='Edit Field']", name: "Cancel Reason Edit Icon" },
    numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
    callBackRedoDiv: { selector: "(//div[@id='CallBackRedo'])[2]", name: "Call Back Redo Div" },
    timeSheetSaveButton: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//a[@title='Save']", name: "Time Sheet Save Button" },
    hoursInputField: { selector: "//div[@id='TimeSheetDetails-header']/parent::div//input[@inputmode='decimal']", name: "Hours Input Field" },
    holdCalendarIcon: { selector: "//div[@title='Hold Reason']/parent::div//div[contains(@class, 'dx-dropdowneditor-icon')]", name: "Hold Reason Dropdown Icon" },
    getLinkByTitle: { selector: "//li[@ng-click='openMediaUploadBox()']", name: "Link By Title" },
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
    checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
    wkoInput: { selector: "//div[contains(@class,'modal-content popup')]/descendant::div[contains(@dx-text-box,'getTextBoxConfig')]/descendant::input", name: "WKO Input" },
    okInput: { selector: "[value='Ok']", name: "Ok Input" },
    hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
    closeWorkOrderButton: { selector: "//button[text()='Close Work Order']", name: "Close Work Order Button" },
    yesSpan: { selector: "//span[text()='Yes']", name: "Yes Span" },
    docxFormatIcon: { selector: 'img[alt="DOCX Format"][src*="docx.svg"]', name: "DOCX Format Icon" },
    okButton: { selector: "//input[@ng-click='clickedOkButton()']", name: "Ok Button" },
    cancelReasonSave: { selector: "//div[@id='Save']", name: "Cancel Reason Save" },
    reasonForCancellationLabel: { selector: "//label[@title='Reason for Cancellation']", name: "Reason for Cancellation Label" },
    popupOverlay: { selector: "//div[@class='dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable dx-dropdowneditor-overlay-flipped']", name: "Popup Overlay" },
    selectRowInLinkAssetPopup: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']//td[@aria-label='Select row']", name: "Select Row in link asset Popup" },
    popupTextInput: { selector: "//div[@class='modal-content popup-no-resize ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Popup Text Input" },
    modalTitle: { selector: "//div[@class='modal-body']/descendant::div[contains(text(),'The date selected is in the future, please confirm.')]", name: "Modal Title" },
    closeRequestButton: { selector: "//div[@class='modal-header ui-draggable-handle']//button[@title='Click here to close']", name: "Click here to close" },
    cancelPopupTextInputModal: { selector: "//div[@class='modal-content ui-resizable']/descendant::input[@class='dx-texteditor-input']", name: "Cancel Popup Text Input Modal" },
    getInputButton: (text: string): string => `//input[@value='${text}']`,
    getOkButton: (text: string): string => `//input[@title='${text}']`,
    getCalendarDate: (day: string): string => `(//div[contains(@class, 'dx-calendar-body')]//span[text()='${day}'])[1]`,
    getPopupCalendarDate: (day: string): string => `((//div[contains(@class, 'dx-calendar-body')])[2]//span[text()='${day}'])[1]`,
    getMoreButton: (text: string): string => `${CommonPageLocators.getSpanByText(text)}/parent::div/following-sibling::div//div[@class='moreBtn']`,
    getEditIcon: (text: string): string => `${CommonPageLocators.getSpanByText(text)}/ancestor::div[contains(@class, 'activeEditor')]//span[contains(@class, 'editor') and @title='Edit Field']`,
    getLinkByTitleText: (title: string): string => `//div[@id='linkPopupGridContainer']//table//tbody//tr//td//div[@title='${title}']`,
    getCostInputField: (fieldName: string): string => `//div[@id='${fieldName}']//div//input`,
    getTaskMoreIcon: (text: string): string => `${CommonPageLocators.getSpanByText(text)}/ancestor::div[@class='row panelHeader']//i[contains(@class,'ellipsis')]`,
    getButtonByTitle: (btnText: string): string => `//button[@title='${btnText}']`,
    getEditIconByLabel: (label: string): string => `${CommonPageLocators.getLabelByText(label)}/ancestor::div[contains(@class, 'activeEditor')]//span[contains(@class, 'editor') and @title='Edit Field']//i`,
    getPopupGridRowByText: (text: string): string =>
        `//div[@id='popupgrid']//tr[contains(@class,'dx-row dx-data-row dx-column-lines dx-selection')]//div[text()='${text}']`,
};

