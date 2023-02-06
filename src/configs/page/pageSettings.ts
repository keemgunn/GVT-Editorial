
const CREATE_PAGE_SETTINGS_AUTO = false;

let PAGE_SETTINGS: PageSettings = [

  { dirName: 'Home',
    displayName: 'Home',

    uri: '/:pagenum(\\d+)?',
    alias: ['/home/:pagenum(\\d+)?'],

    allowAccess: 'public',
    displayOnNav: true,
    icon: 'home',

    beforeEnter: () => {
      console.log('HOME');
    }
  },

  { dirName: 'About',
    displayName: 'About',

    uri: '/about',
    alias: [],

    allowAccess: 'public',
    displayOnNav: true,
    icon: 'home',

    beforeEnter: () => {
      console.log('ABOUT');
    }
  },


  { dirName: 'Typography',
    displayName: 'Typography',

    uri: '/typography',
    alias: [],
    
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