import type { RouteRecordRaw } from "vue-router";
import { createRouterHook, createNavList } from "./_helpers";
import { CREATE_PAGE_SETTINGS_AUTO, PAGE_SETTINGS } from "@/configs/page/pageSettings";


function createPageSettingsAuto(): PageSettings {
  const pageRouteSettings: Array<PageSetting> = [];

  // Get array of filepaths inside of `@/pages/{PAGE}/`
  const pageFiles = import.meta.glob('../../pages/**/Page.vue')
  
  // Make route objects from page array.
  for (const key of Object.keys(pageFiles)) {
    const name = key.split('/').slice(-2)[0];
    const uri = "/" + name.toLowerCase();
    
    pageRouteSettings.push({
      allowAccess: 'public',
      navType: 'link',
      dirName: name,
      navTitle: name,
      uri,
      alias: [],
      navIcon: 'home',
      navLink: uri,
      beforeEnter: () => {}
    })
  }

  return pageRouteSettings as PageSettings
}


/**
 * 
 * @param pageSetting `public` | `admin` | `none`. If this argument is `none`, returns `undefined`
 * @param name Name of the view directory. (e.g. `Home` - uppercased!)
 * @returns `RouteRecordRaw` | undefined
 */
function PageRecord(pageSetting: PageSetting): RouteRecordRaw {
  return {
    name: pageSetting.navTitle,
    path: pageSetting.uri,
    alias: pageSetting.alias,
    component: () => import(`../../pages/${pageSetting.dirName}/Page.vue`), // Why I wrote like this? See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    beforeEnter: createRouterHook(
      pageSetting.beforeEnter,
      pageSetting.allowAccess
    )
  }
}


function createPageRecords(pageRouteSettings: PageSettings): Array<RouteRecordRaw> {
  const routeRecords: Array<RouteRecordRaw> = [];

  pageRouteSettings.forEach((pageSetting) => {
    const record = PageRecord(pageSetting);

    if (record) {
      routeRecords.push(record);
      console.log(` - CREATED ROUTE RECORD [${record.name as string}] for '${record.path as string}'`);
    }
  })

  return routeRecords
}





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