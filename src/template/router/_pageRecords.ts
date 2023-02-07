import type { RouteRecordRaw } from "vue-router";
import { createRouterHook } from "./_helpers";
import websiteSettings from '@/configs/websiteSettings.yml';
const pageRecords: PageRecords = (websiteSettings.Pages as PageRecords);


function createRouterRecord (pageRecord: PageRecord): RouteRecordRaw {
  return {
    name: pageRecord.name,
    path: pageRecord.uri,
    alias: pageRecord.alias || [],
    component: () => import(`../../pages/${pageRecord.name}-Page.vue`), // Why I wrote like this? See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    beforeEnter: createRouterHook(pageRecord.allowAccess)
  }
}

function createRouterRecordArray (pageRecords: PageRecords): Array<RouteRecordRaw> {
  const routeRecords: Array<RouteRecordRaw> = [];

  pageRecords.forEach((pageRecord) => {
    const routerRecord = createRouterRecord(pageRecord);
    routeRecords.push(routerRecord);
    console.log(` - CREATED ROUTE RECORD [${routerRecord.name as string}] for '${routerRecord.path as string}'`);
  })

  return routeRecords
}


export const pageRouterRecords = createRouterRecordArray(pageRecords);