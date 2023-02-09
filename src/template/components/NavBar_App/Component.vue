<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';
import brandLogo from '@/assets/svg/logo-brand-main.svg';

const { componentSettings, navigationSetting } = useConfigs();
const navRecords: NavRecords = navigationSetting;

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

    <Vector v-if="showLogo" class="nav-logo" :src="brandLogo"/>

    <div class="nav-wrapper">
      <NavAppButton v-for="navRecord in navRecords" :key="'view--' + navRecord.uri" :navTitle="navRecord.title" :uri="navRecord.uri" :navIcon="navRecord.icon"/>

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
