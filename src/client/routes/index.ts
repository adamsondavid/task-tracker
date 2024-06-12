import { Routes } from "@angular/router";
import { LandingPage } from "./landing-page";

export const routes: Routes = [
  {
    path: "",
    component: LandingPage,
  },
  {
    path: "boards/:id",
    loadComponent: () => import("./board-page").then((module) => module.BoardPage),
  },
  {
    path: "boards/:id/table",
    loadComponent: () => import("./board-table-page").then((module) => module.BoardTablePage),
  },
];
