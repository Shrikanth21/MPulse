export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const MrApprovalFlowPageLocators: Readonly<{
    readonly toRequesterEmail: LocatorDefinition;
    readonly ccRequesterEmail: LocatorDefinition;
    readonly closeButton: LocatorDefinition;
    readonly quitWaitingButton: LocatorDefinition;
    readonly cancelConfirmation: LocatorDefinition;
    readonly okButton: LocatorDefinition;
    readonly cancelRequestReasonHeader: LocatorDefinition;
}> = {
    toRequesterEmail: { selector: "//div[@id='ReplyToRequester']/descendant::div[@id='ToControl']//input", name: "To Requester Email" },
    ccRequesterEmail: { selector: "//div[@id='ReplyToRequester']/descendant::div[@id='CCControl']//input", name: "CC Requester Email" },
    closeButton: { selector: "//button[@title='Click here to close']", name: "Close Button" },
    quitWaitingButton: { selector: "//div[@aria-label='Quit Waiting']", name: "Quit Waiting Button" },
    cancelConfirmation: { selector: "//body[@class='cke_editable cke_editable_themed cke_contents_ltr cke_show_borders']", name: "Cancel Confirmation" },
    okButton: { selector: "//div[@class='modal-dialog modal-md ui-draggable']//div[@aria-label='Ok']", name: "OK Button" },
    cancelRequestReasonHeader: { selector: "//div[@id='CancelRequestReason-header']", name: "Cancel Request Reason Header" }
};
