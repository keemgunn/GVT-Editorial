import type { RouteRecordRaw } from "vue-router";


function createPageRouteSettingsAuto(): PageRouteSettings {
  const pageRouteSettings: Array<PageSetting> = [];

  // Get array of filepaths inside of `@/pages/{PAGE}/`
  const pageFiles = import.meta.glob('../../pages/**/Page.vue')
  
  // Make route objects from page array.
  for (const key of Object.keys(pageFiles)) {
    const name = key.split('/').slice(-2)[0];
    const uri = "/" + name.toLowerCase();
    
    pageRouteSettings.push({
      allowAccess: 'public',
      displayOnNav: true,
      dirName: name,
      displayName: name,
      uri,
      icon: 'home',
      beforeEnter: () => {}
    })
  }

  return pageRouteSettings as PageRouteSettings
}



/**
 * @param callBefore A hook function that would be called before enter
 * @param allowAccess This argument decides whether the authorization process evoked. If the argument is `admin` and the authorization fails, Router will route user to the last page.
 * @returns A hook for `RouteRecordRaw`
 */
function createRouterHook(callBefore: () => void, allowAccess: string): (to: any, from: any, next: any) => void {
  return (to: any, from: any, next: any) => {
    
    // DO SOME AUTH
    const authorized = true;
    
    if (authorized) {
      console.warn(` -- ROUTING TO /${to.href.split('/')[1]}`)
      callBefore();
      localStorage.setItem('currentView', to.href.split('/')[1]);
      next();
    }
    else {
      console.error(" -- ROUTER : NOT AUTHORIZED");
      next(false)
    }
  }
}



/**
 * 
 * @param pageSetting `public` | `admin` | `none`. If this argument is `none`, returns `undefined`
 * @param name Name of the view directory. (e.g. `Home` - uppercased!)
 * @returns `RouteRecordRaw` | undefined
 */
function createRouteRecord(pageSetting: PageSetting): RouteRecordRaw | undefined {

  if (pageSetting.allowAccess !== 'none') return {
    name: pageSetting.displayName,
    path: pageSetting.uri,
    component: () => import(`../../pages/${pageSetting.dirName}/Page.vue`), // Why I wrote like this? See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    beforeEnter: createRouterHook(
      pageSetting.beforeEnter,
      pageSetting.allowAccess
    )
  }
}



function createRoutesArray(pageRouteSettings: PageRouteSettings): Array<RouteRecordRaw> {
  const routeRecords: Array<RouteRecordRaw> = [];

  pageRouteSettings.forEach((pageSetting) => {
    const record = createRouteRecord(pageSetting);

    if (record) {
      routeRecords.push(record);
      console.log(` - CREATED ROUTE RECORD [${record.name as string}] for '${record.path as string}'`);
    }
  })

  return routeRecords
}



function createNavList(pageRouteSettings: PageRouteSettings): Array<NavRecord> {
  const navList: Array<NavRecord> = [];

  pageRouteSettings.forEach((pageSetting) => {

    if (pageSetting.allowAccess !== 'none') {
      navList.push({
        displayName: pageSetting.displayName,
        uri: pageSetting.uri,
        icon: pageSetting.icon
      })
    }
  })

  return navList
}

export {
  createPageRouteSettingsAuto,
  createRoutesArray,
  createNavList
}