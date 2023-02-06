<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { navRecords } from '@/template/router/_pageRecords'
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
      <NavAppButton v-for="navRecord in navRecords" :key="'view--' + navRecord.uri" :navTitle="navRecord.navTitle" :uri="navRecord.uri" :navIcon="navRecord.navIcon"/>

      <!-- ONLY <= S -->
      <NavAppButton v-if="showPrefOnSmall" navTitle="preference" uri="#" icon="account_circle"/>
    </div>

    <!-- ONLY >= M -->
    <div v-if="showPrefOnLarge" class="preference-wrapper">
      <NavAppButton navTitle="preference" uri="#" icon="account_circle"/>
    </div>

    <Plate/>
  </nav>
</template>
