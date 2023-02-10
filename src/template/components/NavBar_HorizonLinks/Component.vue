<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';
import brandLogo from '@/assets/svg/logo-brand-main.svg';

import templateConfigs from '@/configs/template/templateConfigs';
import defaultConfigs from './index';


const frameStore = useFrameStore();
const { navigationSetting } = useConfigs();
const navRecords: NavRecords = navigationSetting;


const COMPONENT_NAME = 'NavBar_HorizonLinks'

const isOnline = templateConfigs.navBar.name === COMPONENT_NAME;
const compConfig = isOnline ?
  templateConfigs.navBar : defaultConfigs()


const showActions = computed(() => {
  return /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
})

function showIcon(navIcon: String) {
  if (compConfig.showIcons.majorLinks)
    return navIcon
  else
    return ""
}
</script>



<template>
<div id="navigation" class="nav-bar-horizon-links">

  <component :is="compConfig.topBannerInjection"></component>
    
  <header>
    <Vector class="nav-logo" :src="brandLogo"/>
    <h1 style="display: none;">Blog Name Here</h1>

    <nav v-show="showActions">
      <ul class="nav-bar-horizon-links-list">
        <template v-for="nr in navRecords" 
        :key="'page--'+nr.title">
          <RouterLink_VstackNest 
          :title="nr.title" 
          :uri="nr.uri" 
          :majorIcon="showIcon(nr.icon)" 
          :showSubIcon="compConfig.showIcons.subLinks"
          :majorLinkSize="15"
          :subLinkSize="13"
          :subLinks="nr.nestedRecords"
          :showSublinks="nr.sublinks"/>
        </template>
      </ul>
    </nav>

    <div v-show="showActions" class="search-box">
      search-box-here
    </div>
  </header>

  <Plate/>
  
</div>
</template>

<style lang="scss"> // Those styles will only applied when this component has mounted to App.
/** @/template/components/NavBar_HorizonLinks/Component.vue */

#app {
  display: flex;
  flex-direction: column;
  height: fit-content;

  #navigation { 
    flex-shrink: unset;
    z-index: 100;
    position: sticky;
    top: 0;
  }
  #router-page { 
    flex-grow: 1;
    z-index: 0;
  }
}
</style>