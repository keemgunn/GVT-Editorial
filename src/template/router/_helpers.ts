import type { RouteRecordRaw } from "vue-router";


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
      displayOnNav: true,
      dirName: name,
      displayName: name,
      uri,
      icon: 'home',
      beforeEnter: () => {}
    })
  }

  return pageRouteSettings as PageSettings
}



/**
 * @param callBefore A hook function that would be called before enter
 * @param accessType This argument decides whether the authorization process evoked. If the argument is `admin` and the authorization fails, Router will route user to the last page.
 * @returns A hook for `RouteRecordRaw`
 */
function createRouterHook(callBefore: () => void, accessType: pageAccessType): (to: any, from: any, next: any) => void {
  return (to: any, from: any, next: any) => {
    
    // DO SOME AUTH
    let authorized: boolean;
    let alertMessage: string;

    if (accessType == 'none') {
      authorized = false;
      alertMessage = 'Bad Request';

    }
    
    else if (accessType == 'admin') {
      // Admin Auth Logic
      authorized = false;
      alertMessage = 'Admin Only Page';

    }
      
    else if (accessType == 'user') {
      // User Auth Logic
      authorized = false;
      alertMessage = 'Not Authenticated';

    }
    
    else {
      authorized = true;
      alertMessage = "";
    }


    if (authorized) {
      console.warn(` -- ROUTING TO /${to.href.split('/')[1]}`)
      callBefore();
      localStorage.setItem('currentPage', to.href.split('/')[1]);
      next();
    }
    else {
      console.error(" -- ROUTER : NOT AUTHORIZED :" + alertMessage);
      window.alert(alertMessage);
      next(from)
    }
  }
}



/**
 * 
 * @param pageSetting `public` | `admin` | `none`. If this argument is `none`, returns `undefined`
 * @param name Name of the view directory. (e.g. `Home` - uppercased!)
 * @returns `RouteRecordRaw` | undefined
 */
function PageRecord(pageSetting: PageSetting): RouteRecordRaw | undefined {

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



function createNavList(pageRouteSettings: PageSettings): Array<NavRecord> {
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


// function routeParams(name, examples) {
//   // make router parameter strings like: '/:name('ex1'||'ex2')'
//   try {
//     const result = examples.length ? 
//       [':', String(name), '(', bundle.params(examples), ')'] :
//       [':', String(name)]
//     return result.join('')
//   } catch (err) {
//     console.error(err);
//   }
// }







export {
  createPageSettingsAuto,
  createPageRecords,
  createNavList
}