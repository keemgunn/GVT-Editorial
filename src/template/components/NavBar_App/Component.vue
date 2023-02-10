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


<style lang="scss"> // Those styles will only applied when this component has mounted to App.
/** @/template/components/NavBar_App/Component.vue */


body, #app {
  width: 100%; height: 100%;
}


// #app ----------------------
//    + #nav-bar-app ------------------
//    + #router-page ----------------
//    + #status-bar  ----------------

#app {
  display: grid;
  #nav-bar-app { grid-area: 🎈; }
  #router-page { grid-area: 💎; }
  #status-bar { grid-area: 🎾; }
}

.scale--XXL #app,
.scale--XL #app,
.scale--L #app,
.scale--M #app {
  grid-template-areas: 
  "🎈 💎"
  "🎈 💎"
  "🎾 🎾";
  grid-template-columns: 
    0fr 10fr;
  grid-template-rows: 
    10fr
    10fr
    0fr;
}

.scale--S #app, 
.scale--XS #app,
.scale--XXS #app{
  grid-template-areas: 
  "🎾 🎾"
  "💎 💎"
  "🎈 🎈";
  grid-template-columns: 
    1fr 1fr;
  grid-template-rows: 
    0fr
    10fr
    0fr;
}
.scale--S #app, 
.scale--XS #app,
.scale--XXS #app{
  flex-direction: column-reverse;
}



// ==== THIS #router-page layout can be different by views
// ==== this is just a sample.
// #router-page -----------------------
//    + header -----------------
//    + main -------------------
//    + footer -----------------

 #router-page {
  display: flex;
  header { // #main-actions
    flex-shrink: 0;
  }
  main { // #{{viewname}}-main
    flex-grow: 1;
    width: 100%; height: 100%;
  }
  footer { // #other-actions
    flex-shrink: 0;
  }
}

.scale--XXL #router-page,
.scale--XL #router-page,
.scale--L #router-page,
.scale--M #router-page,
.scale--S #router-page {
  flex-direction: column;
}

.scale--XS #router-page,
.scale--XXS #router-page {
  flex-direction: column-reverse;
}






</style>