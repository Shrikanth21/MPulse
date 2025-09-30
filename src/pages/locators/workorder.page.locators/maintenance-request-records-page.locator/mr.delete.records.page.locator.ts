export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const MrDeleteRecordsPageLocators: Readonly<{
    readonly deleteWOPage: LocatorDefinition;
    readonly continueButton: LocatorDefinition;
    readonly getMRId: LocatorDefinition;
    readonly noMatchesFound: LocatorDefinition;
    readonly requestStatus: LocatorDefinition;
    readonly wkoCode: LocatorDefinition;
    readonly deleteWorkOrderListItem: LocatorDefinition;
    readonly deleteContinueButton: LocatorDefinition;
    readonly maintenanceRequestRecordsLink: LocatorDefinition;
}> = {
    deleteWOPage: { selector: "//i[@class='far fa-times-circle']", name: 'Delete work order page cross button' },
    continueButton: { selector: "//span[normalize-space()='Continue']", name: 'Continue button on Alert window' },
    getMRId: { selector: "//span[@id='ID']", name: 'Maintenance Request ID' },
    noMatchesFound: { selector: "//div[contains(text(),'No matches found.')]", name: 'No matches found message' },
    requestStatus: { selector: "//div[@id='tabSection']/descendant::span[@id='RequestStatusDesc']", name: 'Request Status' },
    wkoCode: { selector: "//span[@fieldname='WkoCode']", name: 'Work Order Code' },
    deleteWorkOrderListItem: { selector: "//li[@id='delete-work-order']", name: 'Delete Work Order list item' },
    deleteContinueButton: { selector: '//div[@aria-label="Continue"]', name: 'Continue button with aria-label' },
    maintenanceRequestRecordsLink: { selector: '//a[@title="Maintenance Request Records"]', name: 'Maintenance Request Records link' },
};
