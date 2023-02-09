/** Router Setting =====================
Corresponds to Vue Router 4.X
These pages mount into <RouterView>
inside of @/template/App.vue.

@ uri:string - Page Endpoints
@ alias:Array<string> - Alias Endpoints (Array)
@ allowAccess: Router Guarding
  :'public' - anyone allowed
  :'user' - user login needed
  :'admin' - admin auth needed
  :'none' - no route allowed
======================================= */
export default {

  uri: '/about',
  alias: [],
  allowAccess: 'public'

} as PageRouteSetting

