<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { navRecords } from '@/template/router/_pageRecords'
import { useFrameStore } from '@/template/styles/frame/_store';
import { useContentsStore } from '@/template/stores/contents';
import { useConfigs } from '@/template/configs';

const frameStore = useFrameStore();
const contentsStore = useContentsStore();
const { uiSettings } = useConfigs();

const showActions = computed(() => {
  return /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
})

const majorLinkSize = computed(() => {
  if (/--M|--L|--XL|--XXL/.test(frameStore.appScale))
    return 16
  else
    return 14
})
const subLinkSize = 13;

const expandDropdown = computed(() => {
  return /--L|--XL|--XXL/.test(frameStore.appScale)
});

function showLink(navType: NavType) {
  if (navType == "none") {
    return false
  } else if (navType == "dropdown" && expandDropdown.value) {
    return false
  } else {
    return true
  }
}

function showIcon(navIcon: String) {
  if (uiSettings.navBar.showIcons)
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
          <li v-for="navRecord in navRecords" 
          :key="'page--'+navRecord.uri" 
          v-show="showLink(navRecord.navType)">
            <NavBarLink 
            :navTitle="navRecord.navTitle" 
            :navLink="navRecord.navLink" 
            :navType="navRecord.navType" 
            :navIcon="showIcon(navRecord.navIcon)" 
            :size="majorLinkSize" 
            hierarchy="major"/>
          </li>

          <ul id="nav-categories" 
          v-if="expandDropdown">
            <li v-for="catRecord 
            in contentsStore.categories" 
            :key="'cat--'+catRecord.name.toLowerCase()" >
              <NavBarLink 
              :navTitle="catRecord.name" 
              :navLink="`/articles/${catRecord.name.toLowerCase().replace(' ', '-')}`" navType="link" 
              navIcon="" 
              :size="subLinkSize" 
              hierarchy="sub" 
              style="padding-top: 3rem;"/>
            </li>
          </ul>
        </ul>

      </nav>

      <div v-show="showActions" class="search-box">
        search-box-here
      </div>
    </header>

    <Plate/>
  </div>
</template>
