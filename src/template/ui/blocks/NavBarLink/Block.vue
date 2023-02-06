<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const expandDropdown = computed(() => {
  return /--L|--XL|--XXL/.test(frameStore.appScale)
});

const props = defineProps<{
  navType: NavType
  navTitle: string
  navIcon: string
  navLink: string
}>();

</script>

<template>

  <RouterLink v-if="props.navType == 'link'" class="nav-app-button" :to="props.navLink">
    {{ props.navTitle }}
    <div class="contents">
      <Icon :name="props.navIcon"/>
      <p class="typo-body-10 --bold">{{ navTitle }}</p>
    </div>
    <Plate/>
  </RouterLink>



</template>

