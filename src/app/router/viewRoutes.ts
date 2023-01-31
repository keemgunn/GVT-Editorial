import type { RouteRecordRaw } from "vue-router";
import { createRoutesArray } from "./helpers";


// ============== VIEW ROUTE SETTINGS

const AUTO_VIEW_ROUTES = true;

let VIEW_ROUTE_SETTINGS: ViewRouteSettings = {
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
let viewRoutes: Array<RouteRecordRaw> = [];

/**
 * MAKE ROUTE RECORDS AUTOMATICALLY
 * BASED ON DIRECTORIES IN `@/app/views`
 */
if (AUTO_VIEW_ROUTES) {
  console.warn(' -- AUTO VIEW ROUTES');

  VIEW_ROUTE_SETTINGS = {};
  
  // Get array of filepaths inside of `@/views/{VIEW}/`
  const viewFiles = import.meta.glob('../views/**/View.vue')
  
  // Make route objects from view array.
  for (const key of Object.keys(viewFiles)) {
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
viewRoutes = createRoutesArray(VIEW_ROUTE_SETTINGS);




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
  viewRoutes,
  navList
}