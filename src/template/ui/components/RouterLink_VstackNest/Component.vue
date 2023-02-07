<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';

const frameStore = useFrameStore();
const { shape } = useConfigs().uiSettings;
const compConfig = useConfigs().componentSettings.RouterLink_VstackNest;


const props = defineProps<{
  title: string
  uri: string
  majorIcon: string
  showSubIcon: boolean
  majorLinkSize: number
  subLinkSize: number
  subLinks: Array<NavRecord> | null
}>();

const hasChild = computed(() => {
  if ((props.subLinks == null) || (props.subLinks.length == 0))
  return false
  else
  return true
})


const majorLinkClass = computed(() => [
  'router-link-vstack-nest',
  `--${compConfig.appearance}`,
  `--${props.majorLinkSize}`,
  `--${
    hasChild.value ?
      expandDropdown.value ?
        'expanded-major' : 'shrinked-major'
      : ''
  }`,
  `--major`,
])
const subLinkClass = computed(() => [
  'router-link-vstack-nest',
  `--sub`,
  `--${compConfig.appearance}`,
  `--${props.subLinkSize}`,
])


const majorIconSize = computed(() => props.majorLinkSize + 2);
const subIconSize = computed(() => props.subLinkSize + 2);


const roundnessStyle = computed(() => {
  if (shape.roundness > 0) {
    const calced = shape.roundness * (props.majorLinkSize + 2)
    return {
      "border-radius": `${calced}rem`,
      "overflow": 'hidden'
    }
  } else {
    return ""
  }
});


const expandDropdown = computed(() => {
  if (hasChild.value)
    return (compConfig.subLinkShrinkThreshold < frameStore.viewWidth)
  else
    return false
});

const isMouseOver = ref(false);
function mouseOver(bool: boolean) {
  isMouseOver.value = bool;
}

const showSubLinks = computed(() => {
  return expandDropdown.value || isMouseOver.value
})

const subLinksListClass = computed(() => {
  let option = '';
  if (expandDropdown.value) {
    option = '--expanded'
  }
  else if (isMouseOver.value) {
    option = '--shrinked --open'
  }
  else {
    option = '--shrinked --closed'
  }
  return [
    'rlvn-nested-links-list',
    option
  ]
})

function showIcon(navIcon: String) {
  if (props.showSubIcon)
    return navIcon
  else
    return ""
}
</script>

<template>
<li @mouseover="mouseOver(true)" @mouseleave="mouseOver(false)">

  <RouterLink :class="majorLinkClass" 
  v-show="!expandDropdown"
  :to="props.uri" :style="roundnessStyle">
    {{ props.title }}
    <div class="contents">

      <Icon :name="props.majorIcon" :size="majorIconSize"/>

      <p>{{ title }}</p>

      <Icon v-if="hasChild" class="nav-handle" name="expand_more" :size="majorIconSize"/>
    </div>

    <Plate/>
  </RouterLink>

  <Transition name="rlvn-nested-links">
  <ul :class="subLinksListClass" 
  v-show="showSubLinks"
  >
    <li v-for="nr in props.subLinks" :key="nr.title">
      <RouterLink :class="subLinkClass" 
      :to="nr.uri">
        {{ nr.title }}

        <div class="contents">
          <Icon :name="showIcon(nr.icon)" :size="subIconSize"/>
          <p> {{ nr.title }}</p>
        </div>

        <Plate/>
      </RouterLink>
    </li>
    
    <Plate/>
  </ul>
  </Transition>

</li>
</template>

