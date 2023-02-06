<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { navRecords } from '@/template/router/_pageRecords'
import { useFrameStore } from '@/template/styles/frame/_store';

const frameStore = useFrameStore();

const showLogo = computed(() => {
  return /--S|--M|--L|--XL|--XXL/.test(frameStore.appScale)
});

const showPrefOnSmall = computed(() => {
  return /--S|--XS|--XXS/.test(frameStore.appScale)
});

const showPrefOnLarge = computed(() => {
  return /--M|--L|--XL|--XXL/.test(frameStore.appScale)
});


</script>



<template>
  <div id="nav-bar-editorial">

    
    <!-- <div class="nav-wrapper">
      <NavAppButton v-for="navRecord in navRecords" :key="'view--' + navRecord.url" :navTitle="navRecord.navTitle" :url="navRecord.url" :icon="navRecord.icon"/> -->
      
      <!-- ONLY <= S -->
      <!-- <NavAppButton v-if="showPrefOnSmall" navTitle="preference" url="#" icon="account_circle"/>
      </div> -->
      
      <!-- ONLY >= M -->
      <!-- <div v-if="showPrefOnLarge" class="preference-wrapper">
        <NavAppButton navTitle="preference" url="#" icon="account_circle"/>
      </div> -->
      
    <header>
      <Vector v-if="showLogo" class="nav-logo" src="@/assets/svg/logo-brand-main.svg"/>
      <h1 style="display: none;">Blog Name Here</h1>

      <nav>
        <ul id="nav-links">
          <li v-for="navRecord in navRecords" :key="'page--'+navRecord.uri" >
            <NavBarLink :navTitle="navRecord.navTitle" :navLink="navRecord.navLink" :navType="navRecord.navType" :navIcon="navRecord.navIcon"/>
          </li>

        </ul>
      </nav>
    </header>


    

    <Plate/>
  </div>
</template>
