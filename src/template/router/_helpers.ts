import type { RouteRecordRaw } from "vue-router";


function createPageRouteSettingsAuto(): PageRouteSettings {
  const pageRouteSettings: any = {};

  // Get array of filepaths inside of `@/pages/{PAGE}/`
  const pageFiles = import.meta.glob('../../pages/**/Page.vue')
  
  // Make route objects from page array.
  for (const key of Object.keys(pageFiles)) {
    const name = key.split('/').slice(-2)[0];
    const path = "/" + name.toLowerCase();
    
    pageRouteSettings[name] = {
      allowAccess: 'public',
      displayOnNav: true,
      path,
      displayName: name,
      icon: 'home',
      beforeEnter: () => {}
    }
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
function createRouteRecord(pageSetting: PageSetting, name: string): RouteRecordRaw | undefined {

  if (pageSetting.allowAccess !== 'none') return {
    name,
    path: pageSetting.path,
    component: () => import(`../../pages/${name}/Page.vue`), // Why I wrote like this? See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    beforeEnter: createRouterHook(
      pageSetting.beforeEnter,
      pageSetting.allowAccess
    )
  }
}

function createRoutesArray(pageRouteSettings: PageRouteSettings): Array<RouteRecordRaw> {
  const routeRecords: Array<RouteRecordRaw> = [];
  
  for (const key of Object.keys(pageRouteSettings)) {

    const record = createRouteRecord(pageRouteSettings[key], key);
    
    if (record) {
      routeRecords.push(record);
      console.log(` - CREATED ROUTE RECORD [${record.name as string}] for '${record.path as string}'`);
    }
  }

  return routeRecords
}

function createNavList(pageRouteSettings: PageRouteSettings): Array<NavRecord> {
  const navList: Array<NavRecord> = [];
  
  for (const key of Object.keys(pageRouteSettings)) {

    if (pageRouteSettings[key].allowAccess !== 'none') {
      navList.push({
        displayName: pageRouteSettings[key].displayName,
        url: pageRouteSettings[key].path,
        icon: pageRouteSettings[key].icon
      })
    }
  }

  return navList
}

export {
  createPageRouteSettingsAuto,
  createRoutesArray,
  createNavList
}