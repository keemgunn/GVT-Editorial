import type { RouteRecordRaw } from "vue-router";
import { createPageSettingsAuto, createPageRecords, createNavList } from "./_helpers";

import { CREATE_PAGE_SETTINGS_AUTO, PAGE_SETTINGS } from "@/configs/page/pageSettings";

// ============== CREATE ROUTER RECORDS
let pageRecords: Array<RouteRecordRaw> = [];
let navRecords: Array<NavRecord> = [];

/**
 * MAKE ROUTE RECORDS AUTOMATICALLY
 * BASED ON DIRECTORIES IN `@/app/views`
 */
if (CREATE_PAGE_SETTINGS_AUTO) {
  console.warn(' -- AUTO VIEW ROUTES');
  const generatedPageSettings = createPageSettingsAuto();

  pageRecords = createPageRecords(generatedPageSettings);
  navRecords = createNavList(generatedPageSettings);
}
else {
  pageRecords = createPageRecords(PAGE_SETTINGS);
  navRecords = createNavList(PAGE_SETTINGS);
}




export {
  pageRecords,
  navRecords
}