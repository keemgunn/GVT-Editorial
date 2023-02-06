<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/configs';

const frameStore = useFrameStore();
const { navBar, shape } = useConfigs().uiSettings

const props = defineProps<{
  navType: NavType
  navTitle: string
  navIcon: string
  navLink: string
  size: number
}>();

const containerClass = computed(() => [
  'nav-bar-link',
  `--${navBar.navBarLinkType}`,
  `--${props.size}`
])
const typoClass = computed(() => {
  if (props.size > 12)
    return `typo-body-${props.size} --bold`
  else 
    return `typo-body-${props.size}`
})

const navIconSize = computed(() => props.size + 2);

const roundnessStyle = computed(() => {
  if (shape.roundness > 0) {
    const calced = shape.roundness * (props.size + 2)
    return {
      "border-radius": `${calced}rem`,
      "overflow": 'hidden'
    }
  } else {
    return ""
  }
});

const expandDropdown = computed(() => {
  return /--L|--XL|--XXL/.test(frameStore.appScale)
});

const showLink = computed(() => {
  return props.navType == "link"
  || (
    props.navType == "dropdown"
    && !expandDropdown.value
  );
})
</script>

<template>

  <RouterLink v-if="showLink" :class="containerClass" :to="props.navLink" :style="roundnessStyle">
    {{ props.navTitle }}
    <div class="contents">
      <Icon class="nav-icon" :name="props.navIcon" :size="navIconSize"/>
      <p :class="typoClass">{{ navTitle }}</p>
      <Icon v-if="props.navType == 'dropdown'" class="nav-handle" name="expand_more" :size="props.size + 2"/>
    </div>
    <Plate/>
  </RouterLink>

</template>

