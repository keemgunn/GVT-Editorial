
const CREATE_PAGE_SETTINGS_AUTO = false;

let PAGE_SETTINGS: PageSettings = [

  { dirName: 'Home',
    uri: '/:pagenum(\\d+)?',
    alias: ['/home/:pagenum(\\d+)?'],
    allowAccess: 'public',

    navType: 'link',
    navTitle: 'Home',
    navIcon: 'home',
    navLink: '/',

    beforeEnter: () => {
      console.log('HOME');
    }
  },

  { dirName: 'About',
    uri: '/about',
    alias: [],
    allowAccess: 'public',

    navType: 'link',
    navTitle: 'About',
    navIcon: 'home',
    navLink: '/about',

    beforeEnter: () => {
      console.log('ABOUT');
    }
  },

  { dirName: 'Articles',
    uri: '/articles/:filter?',
    alias: [],
    allowAccess: 'public',

    navType: 'dropdown',
    navTitle: 'Articles',
    navIcon: 'category',
    navLink: '/articles',

    beforeEnter: () => {
      console.log('ARTICLES');
    }
  },


  { dirName: 'Typography',
    uri: '/typography',
    alias: [],
    allowAccess: 'user',

    navType: 'none',
    navTitle: 'Typography',
    navIcon: 'format_size',
    navLink: '/typography',

    beforeEnter: () => {
      console.log('TYPO');
    }
  },
]

export {
  CREATE_PAGE_SETTINGS_AUTO,
  PAGE_SETTINGS
}