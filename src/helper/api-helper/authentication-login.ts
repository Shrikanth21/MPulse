import { APIRequestContext, expect } from "@playwright/test";
import testData from '../../data/testData.json';
import zlib from "zlib";
import fs from "fs";

export class ApiHelper {
    private token: string | null = null;
    private templateKey: number | null = null;
    constructor(private request: APIRequestContext) { }

    /**
     * Logs in to the API and retrieves a token
     * @returns The authentication token
     */
    public async login(): Promise<string> {
        const response = await this.request.post(`${process.env.BASEURL}/Authentication/Login`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "identity",
                Language: "en-GB",
                "User-Agent": process.env.USERAGENT!,
                Connection: "keep-alive",
                Origin: process.env.ORIGIN!,
                Referer: process.env.REFERER!,
                Q1NSRlRPS0VO: process.env.Q1NSRlRPS0VO!,
                SubModuleKey: "0",
                ClientTimeZoneOffSet: "-5.5",
            },
            data: {
                username: "shrikant@inapp.com",
                password: "",
                DBName: testData.db_name,
                IsMobileDevice: false,
                DefaultDatabase: false,
                StuffKey: "42867",
                CurrentTime: new Date().toISOString(),
                ClientTimeZoneOffSet: "-5.5",
                Recall: false,
                CurrentClientDateTime: new Date().toISOString(),
                SubModuleKey: 0,
                Language: "en-GB",
            },
        });
        expect(response.ok(), `Login API failed with status ${response.status()}`).toBeTruthy();
        expect(response.status()).toBe(200);
        const rawBuffer = await response.body();
        const encoding = response.headers()["content-encoding"];
        let parsed: any;

        try {
            if (encoding === "deflate") {
                parsed = JSON.parse(zlib.inflateSync(rawBuffer).toString("utf-8"));
            } else if (encoding === "gzip") {
                parsed = JSON.parse(zlib.gunzipSync(rawBuffer).toString("utf-8"));
            } else {
                const text = rawBuffer.toString("utf-8");
                parsed = text ? JSON.parse(text) : {};
            }
        } catch (e) {
            console.error("Failed to parse JSON:", e, "Raw response:", rawBuffer.toString());
            throw e;
        }
        this.token = parsed?.Token || parsed?.LoginResponse?.Token;
        if (!this.token) {
            throw new Error("Token not found in login response");
        }
        console.log("🔑 Extracted Token:", this.token);
        return this.token;
    }

    /**
     * Load data from the API
     * @returns The loaded data
     */
    public async loadData(filterOption: string, filterValue: string): Promise<any> {
        const response = await this.request.post(`${process.env.BASEURL}/ListView/Load`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "identity",
                Language: "en-GB",
                Token: this.token!,
                "User-Agent": process.env.USERAGENT!,
                Connection: "keep-alive",
                Origin: process.env.ORIGIN!,
                Referer: process.env.REFERER!,
                Q1NSRlRPS0VO: process.env.Q1NSRlRPS0VO!,
                SubModuleKey: "4",
                ClientTimeZoneOffSet: process.env.ClientTimeZoneOffSet!,
                ModuleHierarchy: JSON.stringify({ "ModuleKey": 2, "SubModuleKey": 4, "SubSectionKey": 0 }),
                SubModuleName: process.env.SubModuleName!,
            },
            data: {
                "RequestType": "Filter",
                "SubModuleName": process.env.SubModuleName!,
                "SubModuleKey": 4,
                "Token": this.token,
                "Language": "en-GB",
                "ClientTimeZoneOffSet": process.env.ClientTimeZoneOffSet!,
                "CurrentClientDateTime": new Date().toISOString(),
                "Fields": [
                    {
                        "Key": 139,
                        "Desc": "Date Due",
                        "Name": "Due",
                        "Type": "DATE",
                        "GroupColumn": "WKODDUE",
                        "QueryColumn": "[WKODDUE]",
                        "ListViewFieldName": "WKODDUE",
                        "Label": "Date Due",
                        "Tag": "WKODDUE",
                        "TableName": "",
                        "ControlType": "DateTime",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKODDUE",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": true,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 4,
                        "ColumnName": "Due",
                        "IsEditable": true,
                        "ReportColumnWidth": 100,
                        "ShowDefaultCommentText": false,
                        "FieldName": "DateDue",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Date Due",
                        "ToolTip": "Date Due",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 129,
                        "Desc": "Description",
                        "Name": "Description",
                        "Type": "String",
                        "GroupColumn": "DESCRIPTION",
                        "QueryColumn": "[DESCRIPTION]",
                        "ListViewFieldName": "DESCRIPTION",
                        "Label": "Description",
                        "Tag": "",
                        "TableName": "",
                        "ControlType": "TextBox",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKODESC",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": false,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 1,
                        "ColumnName": "RecordDescription",
                        "IsEditable": true,
                        "ReportColumnWidth": 154,
                        "ShowDefaultCommentText": false,
                        "FieldName": "RecordDescription",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Description",
                        "ToolTip": "Describe the work that is to be",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 128,
                        "Desc": "ID#",
                        "Name": "ID",
                        "Type": "String",
                        "GroupColumn": "CODE",
                        "QueryColumn": "[CODE]",
                        "ListViewFieldName": "CODE",
                        "Label": "ID#",
                        "Tag": "",
                        "TableName": "",
                        "ControlType": "TextBox",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKOCODE",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": false,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": true,
                        "VisibleIndex": 0,
                        "ColumnName": "RecordId",
                        "IsEditable": true,
                        "ReportColumnWidth": 100,
                        "ShowDefaultCommentText": false,
                        "FieldName": "RecordId",
                        "IsSorted": true,
                        "SortOrder": "ASC",
                        "SortIndex": 0,
                        "ColumnHeader": "ID#",
                        "ToolTip": "ID#",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 157,
                        "Desc": "Planning",
                        "Name": "Planning",
                        "Type": "DropDown",
                        "GroupColumn": "WKOPLAN, WKOPLANDESC",
                        "QueryColumn": "[WKOPLAN], [WKOPLANDESC]",
                        "ListViewFieldName": "WKOPLAN",
                        "Label": "Planning",
                        "Tag": "WKOPLAN",
                        "TableName": "WKOPLAN",
                        "ControlType": "DropDown",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKOPLAN",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": true,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": true,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 2,
                        "ColumnName": "Planning",
                        "IsEditable": true,
                        "ReportColumnWidth": 100,
                        "ShowDefaultCommentText": false,
                        "FieldName": "WkoPlan",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Planning",
                        "ToolTip": "Planning",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": true,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 165,
                        "Desc": "Status",
                        "Name": "StatusDesc",
                        "Type": "String",
                        "GroupColumn": "WKOSTATUS, WKOSTATUSDESC",
                        "QueryColumn": "[WKOSTATUS], [WKOSTATUSDESC]",
                        "ListViewFieldName": "WKOSTATUsdesc",
                        "Label": "Status",
                        "Tag": "",
                        "TableName": "WKOSTATUS",
                        "ControlType": "DropDown",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKOSTATUS",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": true,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 3,
                        "ColumnName": "StatusDesc",
                        "IsEditable": false,
                        "ReportColumnWidth": 100,
                        "ShowDefaultCommentText": false,
                        "FieldName": "WkoStatus",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Status",
                        "ToolTip": "Status",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 174,
                        "Desc": "Work Order Group",
                        "Name": "WorkOrderGroup",
                        "Type": "DropDown",
                        "GroupColumn": "WKOGROUPDESC, LK_WKOGROUP",
                        "QueryColumn": "[WKOGROUPDESC], [LK_WKOGROUP]",
                        "ListViewFieldName": "WKOGROUPDESC",
                        "Label": "Work Order Group",
                        "Tag": "",
                        "TableName": "WKOGROUP",
                        "ControlType": "DropDown",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "LK_WKOGROUP",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": true,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": true,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 5,
                        "ColumnName": "WorkOrderGroup",
                        "IsEditable": true,
                        "ReportColumnWidth": 100,
                        "ShowDefaultCommentText": false,
                        "FieldName": "WorkOrderGroup",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Work Order Group",
                        "ToolTip": "Used to group work orders for projects",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    }
                ],
                "GroupByColumns": process.env.GroupByColumns!,
                "GroupByEnabled": true,
                "TemplateKey": this.templateKey,
                "loadOptions": {
                    "filter": [
                        "RecordId",
                        filterOption,
                        filterValue
                    ],
                    "searchOperation": "contains",
                    "searchValue": null,
                    "sort": [
                        {
                            "selector": "RecordId",
                            "desc": false
                        }
                    ],
                    "userData": {}
                },
                "skiploading": false
            }
        });
        expect(response.ok(), `LoadData API failed with status ${response.status()}`).toBeTruthy();
        expect(response.status()).toBe(200);
        const rawBuffer = await response.body();
        const encoding = response.headers()["content-encoding"];
        let parsed: any;
        try {
            if (encoding === "deflate") {
                parsed = JSON.parse(zlib.inflateRawSync(rawBuffer).toString("utf-8"));
            } else if (encoding === "gzip") {
                parsed = JSON.parse(zlib.gunzipSync(rawBuffer).toString("utf-8"));
            } else {
                const text = rawBuffer.toString("utf-8");
                parsed = text ? JSON.parse(text) : {};
            }
        } catch (e) {
            console.error("Failed to parse JSON:", e, "Raw response:", rawBuffer.toString());
            throw e;
        }
        if (!response.ok()) {
            throw new Error(`LoadData API failed with status ${response.status()} - ${JSON.stringify(parsed)}`);
        }
        fs.writeFileSync("LoadDataResponse.json", JSON.stringify(parsed, null, 2));
        console.log("Response written to LoadDataResponse.json");
        return parsed;
    }

    /**
     * Get layout from the API
     * @returns The layout data
     */
    public async getLayout(): Promise<number> {
        const response = await this.request.post(`${process.env.BASEURL}/ListView/Layouts`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "identity",
                Language: "en-GB",
                Token: this.token!,
                "User-Agent": process.env.USERAGENT!,
                Connection: "keep-alive",
                Origin: process.env.ORIGIN!,
                Referer: process.env.REFERER!,
                Q1NSRlRPS0VO: process.env.Q1NSRlRPS0VO!,
                SubModuleKey: "4",
                ClientTimeZoneOffSet: process.env.ClientTimeZoneOffSet!,
                ModuleHierarchy: JSON.stringify({ "ModuleKey": 2, "SubModuleKey": 4, "SubSectionKey": 0 }),
                SubModuleName: process.env.SubModuleName!,
            },
            data: {
                "SubModuleName": process.env.SubModuleName!,
                "SubModuleKey": "4",
                "Token": this.token!,
                "Language": "en-GB",
                "ClientTimeZoneOffSet": process.env.ClientTimeZoneOffSet!,
                "CurrentClientDateTime": new Date().toISOString()
            }
        });

        expect(response.ok(), `GetLayout API failed with status ${response.status()}`).toBeTruthy();
        expect(response.status()).toBe(200);
        const rawBuffer = await response.body();
        const encoding = response.headers()["content-encoding"];
        let templateKey: any;
        try {
            if (encoding === "deflate") {
                templateKey = JSON.parse(zlib.inflateRawSync(rawBuffer).toString("utf-8"));
            } else if (encoding === "gzip") {
                templateKey = JSON.parse(zlib.gunzipSync(rawBuffer).toString("utf-8"));
            } else {
                const text = rawBuffer.toString("utf-8");
                templateKey = text ? JSON.parse(text) : {};
            }
        } catch (e) {
            console.error("Failed to parse JSON:", e, "Raw response:", rawBuffer.toString());
            throw e;
        }
        if (!response.ok()) {
            throw new Error(`GetLayout API failed with status ${response.status()} - ${JSON.stringify(templateKey)}`);
        }
        console.log("First Key from GetLayout response:", Array.isArray(templateKey) && templateKey.length > 0 ? templateKey[0].Key : "Key not found");
        if (Array.isArray(templateKey) && templateKey.length > 0 && typeof templateKey[0].Key === "number") {
            this.templateKey = templateKey[0].Key;
            if (this.templateKey === null) {
                throw new Error("templateKey is null");
            }
            return this.templateKey;
        } else {
            throw new Error("Key not found in GetLayout response");
        }
    }

    /**
     * Gets the records after omitting a record
     * @returns The records after omitting
     */
    public async getAfterOmitRecords(): Promise<void> {
        const response = await this.request.post(`${process.env.BASEURL}/ListView/Load`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "identity",
                Language: "en-GB",
                Token: this.token!,
                "User-Agent": process.env.USERAGENT!,
                Connection: "keep-alive",
                Origin: process.env.ORIGIN!,
                Referer: process.env.REFERER!,
                Q1NSRlRPS0VO: process.env.Q1NSRlRPS0VO!,
                SubModuleKey: "4",
                ClientTimeZoneOffSet: process.env.ClientTimeZoneOffSet!,
                ModuleHierarchy: JSON.stringify({ "ModuleKey": 2, "SubModuleKey": 4, "SubSectionKey": 0 }),
                SubModuleName: process.env.SubModuleName!,
            },
            data:
            {
                "RequestType": "Customize",
                "Fields": [
                    {
                        "Key": 129,
                        "Desc": "Description",
                        "Name": "Description",
                        "Type": "String",
                        "GroupColumn": "DESCRIPTION",
                        "QueryColumn": "[DESCRIPTION]",
                        "ListViewFieldName": "DESCRIPTION",
                        "Label": "Description",
                        "Tag": "",
                        "TableName": "",
                        "ControlType": "TextBox",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKODESC",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": false,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": false,
                        "VisibleIndex": 1,
                        "ColumnName": "RecordDescription",
                        "IsEditable": true,
                        "ReportColumnWidth": 154,
                        "ShowDefaultCommentText": false,
                        "FieldName": "RecordDescription",
                        "IsSorted": false,
                        "SortOrder": null,
                        "SortIndex": 0,
                        "ColumnHeader": "Description",
                        "ToolTip": "Describe the work that is to be",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    },
                    {
                        "Key": 128,
                        "Desc": "ID#",
                        "Name": "ID",
                        "Type": "String",
                        "GroupColumn": "CODE",
                        "QueryColumn": "[CODE]",
                        "ListViewFieldName": "CODE",
                        "Label": "ID#",
                        "Tag": "",
                        "TableName": "",
                        "ControlType": "TextBox",
                        "Customizable": true,
                        "Summarize": false,
                        "LanguageTag": "WKOCODE",
                        "Aggregrates": null,
                        "IsCustSelected": true,
                        "ApplySecurity": false,
                        "IgnoreTimeZone": false,
                        "IsCustom": false,
                        "IsDropDown": false,
                        "IsSumSelected": false,
                        "HasJump": true,
                        "VisibleIndex": 0,
                        "ColumnName": "RecordId",
                        "IsEditable": true,
                        "ReportColumnWidth": 66,
                        "ShowDefaultCommentText": false,
                        "FieldName": "RecordId",
                        "IsSorted": true,
                        "SortOrder": "ASC",
                        "SortIndex": 0,
                        "ColumnHeader": "ID#",
                        "ToolTip": "ID#",
                        "IsFormLayoutVisible": true,
                        "IsRadioButton": false,
                        "CommaSeperatedValues": false,
                        "SetTimeToTwelvePm": false,
                        "TagValue": null
                    }
                ],
                "InvType": null,
                "PageSize": 20,
                "CurrentTime": "2025-09-18T12:36:45.259Z",
                "loadOptions": "",
                "TemplateKey": this.templateKey,
                "GroupByEnabled": false,
                "ColorFilterData": null,
                "CustomFilterData": null,
                "AdditionalRecord": {},
                "OmitLookUp": "Omit",
                "Selections": [
                    {
                        "SelectedKey": 28,
                        "SelectedFlag": "WKO"
                    }
                ],
                "skiploading": false,
                "lastRequest": 1758199005258,
                "SelectedRecordKey": 28,
                "SelectedRecordFlag": "WKO",
                "GroupByColumns": "",
                "SubModuleName": "WorkOrderRecords",
                "SubModuleKey": 4,
                "Token": this.token,
                "Language": "en-GB",
                "ClientTimeZoneOffSet": -5.5,
                "CurrentClientDateTime": new Date().toISOString()
            }
        });

        expect(response.ok(), `GetOmitRecordDetails API failed with status ${response.status()}`).toBeTruthy();
        expect(response.status()).toBe(200);
        const rawBuffer = await response.body();
        const encoding = response.headers()["content-encoding"];
        let omitRecords: any;
        try {
            if (encoding === "deflate") {
                omitRecords = JSON.parse(zlib.inflateRawSync(rawBuffer).toString("utf-8"));
            } else if (encoding === "gzip") {
                omitRecords = JSON.parse(zlib.gunzipSync(rawBuffer).toString("utf-8"));
            } else {
                const text = rawBuffer.toString("utf-8");
                omitRecords = text ? JSON.parse(text) : {};
            }
        } catch (e) {
            console.error("Failed to parse JSON:", e, "Raw response:", rawBuffer.toString());
            throw e;
        }
        if (!response.ok()) {
            throw new Error(`GetOmitRecordDetails API failed with status ${response.status()} - ${JSON.stringify(omitRecords)}`);
        }
        console.log("Omit Records from GetOmitRecordDetails response:", omitRecords);
    }

    /**
     * Get record details based on filter options
     * @param filterOption The filter option to apply
     * @param filterValue The value to filter by
     * @returns An array of record details
     */
    public async getRecordDetails(filterOption: string, filterValue: string): Promise<string[]> {
        await this.login();
        await this.getLayout();
        const loadDataResponse = await this.loadData(filterOption, filterValue);
        if (!loadDataResponse || !Array.isArray(loadDataResponse.ListViewData)) {
            throw new Error("ListViewData not found in loadData response");
        }
        const recordIds = loadDataResponse.ListViewData
            .filter((item: any) => item.RecordId)
            .map((item: any) => item.RecordId);
        fs.writeFileSync("AllRecordIds.json", JSON.stringify(recordIds, null, 2));
        console.log("All RecordIds written to AllRecordIds.json");
        return recordIds;
    }
}
