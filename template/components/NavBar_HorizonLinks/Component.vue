<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '#/styles/frame/_store';
import configs from '#/configs';
import defaultConfigs from './index';
import { useInteractionStore } from '#/stores/interaction';

const NAV_RECORDS: NavRecords = configs.navigation;
const { BRAND_LOGO } = configs.template;

const COMPONENT_NAME = 'NavBar_HorizonLinks';
const { NAV_BAR } = configs.template;
const isOnline = NAV_BAR.name === COMPONENT_NAME;
const compConfig = isOnline ? NAV_BAR : defaultConfigs()

const frameStore = useFrameStore();
const showNavBar = computed(() => 
  /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
)
const showSearchbox = computed(() => 
  /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
)

function showIcon(navIcon: String) {
  if (compConfig.showIcons.majorLinks)
    return navIcon
  else
    return ""
}

const interactionStore = useInteractionStore();
const CL_showBackgroundColor = computed(() => {
  if (interactionStore.windowScroll)
    return "--scrolled"
  else
    return ""
});
</script>



<template>
<!-- @NavBar_HorizonLinks -->
<div id="navigation" class="nav-bar-horizon-links" :class="CL_showBackgroundColor" v-show="showNavBar">

  <!-- topBannerInjection -->
  <component :is="compConfig.topBannerInjection"></component>
    
  <header>
    <Vector class="nav-logo" :src="BRAND_LOGO"/>
    <h1 style="display: none;">Blog Name Here</h1>

    <nav>
      <ul class="nav-bar-horizon-links-list">
        <template v-for="nr in NAV_RECORDS" 
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

    <div v-show="showSearchbox" class="search-box-wrapper">
      <Searchbox_Mini/>
    </div>
  </header>

  <Plate/>
  
</div>
</template>