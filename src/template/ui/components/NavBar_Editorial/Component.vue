<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';

const frameStore = useFrameStore();
const { uiSettings, editorialSettings } = useConfigs();
const navRecords: NavBarLinkRecords = editorialSettings.NavBarLinkRecords;

const showActions = computed(() => {
  return /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
})

function showIcon(navIcon: String) {
  if (uiSettings.navBar.showIcons.majorLinks)
    return navIcon
  else
    return ""
}
</script>



<template>
  <div id="nav-bar-editorial">
      
    <header>
      <Vector class="nav-logo" src="@/assets/svg/logo-brand-main.svg"/>
      <h1 style="display: none;">Blog Name Here</h1>

      <nav v-show="showActions">

        <ul id="nav-links">
          <template v-for="nr in navRecords" 
          :key="'page--'+nr.title">
            <NavBarLink 
            :title="nr.title" 
            :uri="nr.uri" 
            :icon="showIcon(nr.icon)" 
            :subLinks="nr.nestedRecords"/>
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
