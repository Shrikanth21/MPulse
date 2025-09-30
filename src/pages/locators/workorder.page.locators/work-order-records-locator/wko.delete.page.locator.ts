export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoDeletePageLocators: Readonly<{
    readonly deleteWOPage: LocatorDefinition;
    readonly continueButton: LocatorDefinition;
    readonly getWorkOrderId: LocatorDefinition;
    readonly noMatchesFound: LocatorDefinition;
}> = {
    deleteWOPage: { selector: "//div[@class='action-menu-items']/descendant::i[@class='far fa-times-circle']", name: 'Delete work order page cross button' },
    continueButton: { selector: "//span[normalize-space()='Continue']", name: 'Continue button on Alert window' },
    getWorkOrderId: { selector: "//div[contains(@class,'textTruncate')]//span[@id='ID']", name: 'Work Order ID' },
    noMatchesFound: { selector: "//div[@class='dx-scrollview-content']", name: 'No matches found message' },
};
