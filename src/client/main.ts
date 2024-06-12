import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { App } from "./app";
import { API, api } from "./api";
import { routes } from "./routes";

bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), { provide: API, useValue: api }],
}).catch((err) => console.error(err));
