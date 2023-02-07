<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';

const frameStore = useFrameStore();
const { navBar, shape } = useConfigs().uiSettings

const props = defineProps<{
  title: string
  uri: string
  icon: string
  subLinks: Array<NavBarLinkRecord> | null
}>();


const hasChild = computed(() => {
  if ((props.subLinks == null) || (props.subLinks.length == 0))
  return false
  else
  return true
})


const majorLinkSize = computed(() => {
  if (/--M|--L|--XL|--XXL/.test(frameStore.appScale))
    return 16
  else
    return 14
})
const majorLinkClass = computed(() => [
  'nav-bar-link',
  `--${navBar.navBarLinkType}`,
  `--${majorLinkSize.value}`,
  `--major`,
])
const majorIconSize = computed(() => majorLinkSize.value + 2);

const subLinkSize = 13;
const subLinkClass = computed(() => [
  'nav-bar-link',
  `--sub`,
  `--${navBar.navBarLinkType}`,
  `--${subLinkSize}`,
])
const subIconSize = computed(() => subLinkSize + 2);


const roundnessStyle = computed(() => {
  if (shape.roundness > 0) {
    const calced = shape.roundness * (majorLinkSize.value + 2)
    return {
      "border-radius": `${calced}rem`,
      "overflow": 'hidden'
    }
  } else {
    return ""
  }
});

const expandDropdown = computed(() => {
  if (hasChild.value) {

    return (navBar.subLinkShrinkThreshold < frameStore.viewWidth)
    // frameStore.viewWidth
    // return /--L|--XL|--XXL/.test(frameStore.appScale)
  } else {
    return false
  }
});

const hover = ref(false);
function mouseOver(bool: boolean) {
  hover.value = bool;
}

const showSubLinks = computed(() => {
  return expandDropdown.value || hover.value
})

const subLinksListClass = computed(() => {
  let option = '';
  if (expandDropdown.value) {
    option = '--expanded'
  }
  else if (hover.value) {
    option = '--shrinked --open'
  }
  else {
    option = '--shrinked --closed'
  }
  return [
    'nav-sub-links-list',
    option
  ]
})

function showIcon(navIcon: String) {
  if (navBar.showIcons.subLinks)
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

      <Icon class="nav-icon" :name="props.icon" :size="majorIconSize"/>

      <p>{{ title }}</p>

      <Icon v-if="hasChild" class="nav-handle" name="expand_more" :size="majorIconSize"/>
    </div>

    <Plate/>
  </RouterLink>

  <Transition name="nav-sub-links">
  <ul :class="subLinksListClass" 
  v-show="showSubLinks"
  >
    <li v-for="nr in props.subLinks" :key="nr.title">
      <RouterLink :class="subLinkClass" 
      :to="nr.uri">
        {{ nr.title }}

        <div class="contents">
          <Icon class="nav-icon" :name="showIcon(nr.icon)" :size="subIconSize"/>
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

