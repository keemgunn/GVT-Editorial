<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';
import brandLogo from '@/assets/svg/logo-brand-main.svg';

const frameStore = useFrameStore();
const { componentSettings, navigationSetting } = useConfigs();
const navRecords: NavRecords = navigationSetting;
const compConfig = componentSettings.NavBar_HorizonLinks

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

  <component :is="compConfig.customComponentInjection"></component>
    
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
