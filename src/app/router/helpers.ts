import type { RouteRecordRaw } from "vue-router";

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
 * @param viewSetting `public` | `admin` | `none`. If this argument is `none`, returns `undefined`
 * @param name Name of the view directory. (e.g. `Home` - uppercased!)
 * @returns `RouteRecordRaw` | undefined
 */
function createRouteRecord(viewSetting: ViewSetting, name: string): RouteRecordRaw | undefined {

  if (viewSetting.allowAccess !== 'none') return {
    name,
    path: viewSetting.path,
    component: () => import(`../views/${name}/View.vue`), // Why I wrote like this? See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    beforeEnter: createRouterHook(
      viewSetting.beforeEnter,
      viewSetting.allowAccess
    )
  }
}

function createRoutesArray(viewRouteSettings: ViewRouteSettings): Array<RouteRecordRaw> {
  const routeRecords: Array<RouteRecordRaw> = [];
  
  for (const key of Object.keys(viewRouteSettings)) {

    const record = createRouteRecord(viewRouteSettings[key], key);
    
    if (record) {
      routeRecords.push(record);
      console.log(` - CREATED ROUTE RECORD [${record.name as string}] for '${record.path as string}'`);
    }
  }

  return routeRecords
}

export {
  createRoutesArray
}