import type { RouteRecordRaw } from "vue-router";
import { createPageRouteSettingsAuto, createRoutesArray, createNavList } from "./_helpers";

import { AUTO_PAGE_ROUTES, PAGE_ROUTE_SETTINGS } from "@/configs/page/pageRoutes";

// ============== CREATE ROUTER RECORDS
let pageRoutes: Array<RouteRecordRaw> = [];
let navList: Array<NavRecord> = [];

/**
 * MAKE ROUTE RECORDS AUTOMATICALLY
 * BASED ON DIRECTORIES IN `@/app/views`
 */
if (AUTO_PAGE_ROUTES) {
  
  console.warn(' -- AUTO VIEW ROUTES');
  const pageRouteSettings = createPageRouteSettingsAuto();

  pageRoutes = createRoutesArray(pageRouteSettings);
  navList = createNavList(pageRouteSettings);
}
else {
  pageRoutes = createRoutesArray(PAGE_ROUTE_SETTINGS);
  navList = createNavList(PAGE_ROUTE_SETTINGS);
}




export {
  pageRoutes,
  navList
}