import type { RouteRecordRaw } from "vue-router";
import { createRoutesArray } from "./helpers";


// ============== VIEW ROUTE SETTINGS

const AUTO_VIEW_ROUTES = true;

let VIEW_ROUTE_SETTINGS: PageRouteSettings = {
  Home: {
    allowAccess: 'public',
    displayOnNav: true,
    path: '/home',
    displayName: 'Home',
    icon: 'home',
    beforeEnter: () => { console.log('HOME'); }
  },
  Typography: {
    allowAccess: 'public',
    displayOnNav: true,
    path: '/typography',
    displayName: 'Typography',
    icon: 'format_size',
    beforeEnter: () => { console.log('TYPO'); }
  },
}



// ============== CREATE ROUTER RECORDS
let pageRoutes: Array<RouteRecordRaw> = [];

/**
 * MAKE ROUTE RECORDS AUTOMATICALLY
 * BASED ON DIRECTORIES IN `@/app/views`
 */
if (AUTO_VIEW_ROUTES) {
  console.warn(' -- AUTO VIEW ROUTES');

  VIEW_ROUTE_SETTINGS = {};
  
  // Get array of filepaths inside of `@/pages/{VIEW}/`
  const viewFiles = import.meta.glob('../../pages/**/Page.vue')
  
  // Make route objects from view array.
  for (const key of Object.keys(viewFiles)) {
    console.log(key);
    const name = key.split('/').slice(-2)[0];
    const path = "/" + name.toLowerCase();
    
    VIEW_ROUTE_SETTINGS[name] = {
      allowAccess: 'public',
      displayOnNav: true,
      path,
      displayName: name,
      icon: 'home',
      beforeEnter: () => {}
    }
  }
}
pageRoutes = createRoutesArray(VIEW_ROUTE_SETTINGS);




// ============== CREATE NavList FOR Navigation UI
const navList: Array<NavRecord> = [];

for (const key of Object.keys(VIEW_ROUTE_SETTINGS)) {
  if (VIEW_ROUTE_SETTINGS[key].allowAccess !== 'none') {
    navList.push({
      displayName: VIEW_ROUTE_SETTINGS[key].displayName,
      url: VIEW_ROUTE_SETTINGS[key].path,
      icon: VIEW_ROUTE_SETTINGS[key].icon
    })
  }
}


export {
  pageRoutes,
  navList
}