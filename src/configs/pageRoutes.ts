
const AUTO_PAGE_ROUTES = true;

let PAGE_ROUTE_SETTINGS: PageRouteSettings = {
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

export {
  AUTO_PAGE_ROUTES,
  PAGE_ROUTE_SETTINGS
}