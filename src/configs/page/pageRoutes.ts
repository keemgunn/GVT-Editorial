
const AUTO_PAGE_ROUTES = false;

let PAGE_ROUTE_SETTINGS: PageRouteSettings = [
  {
    allowAccess: 'public',
    displayOnNav: true,
    dirName: 'Home',
    displayName: 'Home',
    uri: '/home',
    icon: 'home',
    beforeEnter: () => {
      console.log('HOME');
    }
  },
  {
    allowAccess: 'public',
    displayOnNav: true,
    dirName: 'Typography',
    displayName: 'Typography',
    uri: '/typography',
    icon: 'format_size',
    beforeEnter: () => {
      console.log('TYPO');
    }
  },
]

export {
  AUTO_PAGE_ROUTES,
  PAGE_ROUTE_SETTINGS
}