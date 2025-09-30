export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const MrRecordsPageLoacators: Readonly<{
    readonly numbersInput: LocatorDefinition;
    readonly maximizeButton: LocatorDefinition;
    readonly plusIcon: LocatorDefinition;
    readonly checkIcon: LocatorDefinition;
    readonly mroInput: LocatorDefinition;
    readonly okInput: LocatorDefinition;
    readonly hideButton: LocatorDefinition;
    readonly okButton: LocatorDefinition;
    readonly dialogMessage: LocatorDefinition;
    readonly convertWorkOrderBtn: LocatorDefinition;
}> = {
    numbersInput: { selector: "//div[@id='Numbers']//input", name: "Numbers Input" },
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    plusIcon: { selector: "(//i[@class='fa fa-plus'])[1]", name: "Plus Icon" },
    checkIcon: { selector: '(//i[@class="fas fa-check"])[1]', name: "Check Icon" },
    mroInput: { selector: "//div[contains(@dx-text-box,'getTextBoxConfig')]//input", name: "WKO Input" },
    okInput: { selector: "[value='Ok']", name: "Ok Input" },
    hideButton: { selector: '[title="Hide"]', name: "Hide Button" },
    okButton: { selector: "//div[@aria-label='OK']", name: "OK Button" },
    dialogMessage: { selector: "//div[@class='dx-dialog-message']/following::span[@class='dx-button-text']", name: "Dialog Message" },
    convertWorkOrderBtn: { selector: "//button[@title='Convert to Work Order']", name: "Convert to Work Order Button" }
};