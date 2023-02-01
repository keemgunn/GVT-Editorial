<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { navList } from '@/template/router/_pageRoutes'
import { useFrameStore } from '@/template/styles/frame/_store';

const frameStore = useFrameStore();

const showLogo = computed(() => {
  return /M|L|XL|XXL/.test(frameStore.appScale)
});

const showPrefOnSmall = computed(() => {
  return /S|XS|XXS/.test(frameStore.appScale)
});

const showPrefOnLarge = computed(() => {
  return /M|L|XL|XXL/.test(frameStore.appScale)
});


</script>



<template>
  <nav id="nav-bar-app">

    <Vector v-if="showLogo" class="nav-logo" src="@/assets/svg/logo-brand-main.svg"/>

    <div class="nav-wrapper">
      <NavAppButton v-for="navRecord in navList" :key="'view--' + navRecord.url" :displayName="navRecord.displayName" :url="navRecord.url" :icon="navRecord.icon"/>

      <!-- ONLY <= S -->
      <NavAppButton v-if="showPrefOnSmall" displayName="preference" url="#" icon="account_circle"/>
    </div>

    <!-- ONLY >= M -->
    <div v-if="showPrefOnLarge" class="preference-wrapper">
      <NavAppButton displayName="preference" url="#" icon="account_circle"/>
    </div>

    <Plate/>
  </nav>
</template>
