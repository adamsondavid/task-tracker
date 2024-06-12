import { InjectionToken } from "@angular/core";
import { initClient } from "@ts-rest/core";
import { contract } from "../common/contract";

export const api = initClient(contract, {
  baseUrl: "",
  baseHeaders: {},
  throwOnUnknownStatus: true,
  jsonQuery: true,
  validateResponse: true,
});

export type Api = typeof api;

export const API = new InjectionToken<Api>("api");
