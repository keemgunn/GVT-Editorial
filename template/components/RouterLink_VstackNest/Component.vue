mm<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useFrameStore } from '#/styles/frame/_store';
import configs from '#/configs';


const frameStore = useFrameStore();
const compConfig = configs.component.RouterLink_VstackNest;

const props = defineProps<{
  title: string
  uri: string
  majorIcon: string
  majorLinkSize: number
  subLinkSize?: number
  showSubIcon?: boolean
  subLinks?: Array<NavRecord> | null
  showSublinks?: HowToShowSublinks
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
const subIconSize = computed(() => (props.subLinkSize || 0) + 2);


const expandDropdown = computed(() => {
  if (hasChild.value) {
    const policy = props.showSublinks;

    if (policy == 'show-on-wide') {
      return (compConfig.subLinkShrinkThreshold < frameStore.viewWidth)
    } else if (policy == 'always-show') {
      return true
    } else {
      return false
    }
  }
  else { return false }
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
<!-- RouterLink_VstackNest -->
<li 
class="routerlink-vstacknest"
@mouseover="mouseOver(true)" 
@mouseleave="mouseOver(false)">

  <RouterLink :class="majorLinkClass" 
  v-show="!expandDropdown"
  :to="props.uri">
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

