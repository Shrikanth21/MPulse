export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoOmitLookupPageLocators: Readonly<{
    readonly recordCount: LocatorDefinition;
}> = {
    recordCount: { selector: '//div[@class="right ng-binding ng-scope"]', name: 'record count' },
};
