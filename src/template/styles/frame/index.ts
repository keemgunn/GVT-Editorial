
import { watch, onBeforeMount, onMounted } from 'vue';
import type { ComputedRef } from 'vue';
import { useFrameStore } from './_store';
import { injectMetaName } from '@/template/hooks/headInjection';


export function useFrame() {

  const store = useFrameStore();

  function handleResize() {
    store.viewWidth = window.innerWidth
    store.isVertical = window.innerHeight > window.innerWidth
  }

  function checkDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase()
    
    store.userAgent = userAgent;

    const searchDevice = ['mac', 'iphone']
    const searchBrowser = [
      // MUST BE IN THIS ORDER
      'safari',
      'firefox',
      'chrome',
      'edg'
    ]

    for (const value of Object.values(searchDevice)) {
      if (userAgent.includes(value)) {
        store.userDevice = value;
      }
    }
    if (store.userDevice === "") store.userDevice = "other";

    for (const value of Object.values(searchBrowser)) {
      if (userAgent.includes(value)) {
        store.userBrowser = value;
      }
    }
    if (store.userBrowser === "") store.userBrowser = "other";


    // if (store.userDevice === 'iphone') {
    //   injectMetaName("apple-mobile-web-app-status-bar-style", "black-translucent");
    //   injectMetaName("theme-color", "#000000");
    // }


    store.isMobile = /(android|iphone|ipad|mobile)/i.test(userAgent)
    document.body.classList.add(store.appDevice);
  }




  watch(() => store.appScale, (newScale, oldScale) => {
    document.body.classList.remove(oldScale);
    document.body.classList.add(newScale);
  })

  watch(() => store.appRotation, (newRotation, oldRotation) => {
    document.body.classList.remove(oldRotation);
    document.body.classList.add(newRotation);
  })


  onBeforeMount(() => {

    checkDeviceType();
  })

  onMounted(() => {

    // For Mobile device safe areas
    injectMetaName("viewport", "width=device-width, initial-scale=1.0, viewport-fit=cover");

    document.body.classList.add('scale--XXS');
    document.body.classList.add('rotation--horizontal');
    window.addEventListener('resize', handleResize);
    handleResize();

    window.scrollTo(0, 100);
  })
}