
const CREATE_PAGE_SETTINGS_AUTO = false;

let PAGE_SETTINGS: PageSettings = [
  {
    dirName: 'Home',
    displayName: 'Home',
    uri: '/home/:pagenum(\\d+)?',

    allowAccess: 'public',
    displayOnNav: true,
    icon: 'home',
    beforeEnter: () => {
      console.log('HOME');
    }
  },
  {
    dirName: 'Typography',
    displayName: 'Typography',
    uri: '/typography',
    
    allowAccess: 'user',
    displayOnNav: true,
    icon: 'format_size',
    beforeEnter: () => {
      console.log('TYPO');
    }
  },
]

export {
  CREATE_PAGE_SETTINGS_AUTO,
  PAGE_SETTINGS
}