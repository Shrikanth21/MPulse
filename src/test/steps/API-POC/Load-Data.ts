import { Given } from "@cucumber/cucumber";
import { ApiHelper } from "../../../helper/api-helper/authentication-login";
import { request, APIRequestContext } from "@playwright/test";

let apiRequestContext: APIRequestContext;

Given(/^the user is on the login page$/, async function () {
    apiRequestContext = await request.newContext();
    const apiHelper = new ApiHelper(apiRequestContext);
    await apiHelper.getRecordDetails("notcontains", "WKO-00023");
});
