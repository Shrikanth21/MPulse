export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const MrAutoConvertPageLocators: Readonly<{
    readonly editButton: LocatorDefinition;
    readonly configAutoConvertMRtoWOCheckBox: LocatorDefinition;
    readonly moreButton: LocatorDefinition;
    readonly savebutton: LocatorDefinition;
    readonly dialogMessage: LocatorDefinition;
}> = {
    editButton: { selector: "li[ng-show='!EditMode && !SingleEditFlag'] i[class='fa fa-pencil-alt']", name: "Edit Button" },
    configAutoConvertMRtoWOCheckBox: { selector: "//div[@dx-check-box='configAutoConvertMRtoWOCheckBox']//span[@class='dx-checkbox-icon']", name: "check box Button" },
    moreButton: { selector: "//div[@class='row panelHeader']/descendant::div[@class='moreBtn']", name: "More Button" },
    savebutton: { selector: "//li[@title='Save']", name: "Save Button" },
    dialogMessage: { selector: "//div[@class='dx-dialog-message']", name: "Dialog Message" },
};
