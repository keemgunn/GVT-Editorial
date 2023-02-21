<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';
import brandLogo from '@/assets/svg/logo-brand-main.svg';
import templateConfigs from '@/configs/template/templateConfigs';
import defaultConfigs from './index';
import { useScrollPosition } from '@/template/composables/useScrollPosition';

const COMPONENT_NAME = 'NavBar_HorizonLinks';

const frameStore = useFrameStore();
const router = useRouter();
const { navigationSetting } = useConfigs();
const navRecords: NavRecords = navigationSetting;

const isOnline = templateConfigs.navBar.name === COMPONENT_NAME;
const compConfig = isOnline ?
  templateConfigs.navBar : defaultConfigs()

const showActions = computed(() => 
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

const { scrollPosition } = useScrollPosition();
const CL_showBackgroundColor = computed(() => {
  if (scrollPosition.value)
    return "--scrolled"
  else
    return ""
});

function searchHook(inputText:string) {
  router.push(`/search?keyword=${inputText}`);
}
</script>



<template>
<!-- @NavBar_HorizonLinks -->
<div id="navigation" class="nav-bar-horizon-links" :class="CL_showBackgroundColor">

  <!-- topBannerInjection -->
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

    <div v-show="showSearchbox" class="search-box-wrapper">
      <Searchbox_Mini
      :onSubmit="searchHook"/>
    </div>
  </header>

  <Plate :roundness="0"/>
  
</div>
</template>