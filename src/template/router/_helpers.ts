import { useFrameStore } from "../styles/frame/_store";

/**
 * @param callBefore A hook function that would be called before enter
 * @param accessType This argument decides whether the authorization process evoked. If the argument is `admin` and the authorization fails, Router will route user to the last page.
 * @returns A hook for `RouteRecordRaw`
 */
export function createRouterHook(accessType: PageAccessType): (to: any, from: any, next: any) => void {
  return (to: any, from: any, next: any) => {

    // DO SOME AUTH with stores
    // const frame = useFrameStore();
    // console.log(frame);
    
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
      // ls.set('currentPage', to.href.split('/')[1]);

      next();
    }
    else {
      console.error(" -- ROUTER : NOT AUTHORIZED :" + alertMessage);
      window.alert(alertMessage);
      next(from)
    }
  }
}