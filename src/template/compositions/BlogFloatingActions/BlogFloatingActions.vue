<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useInteractionStore } from '@/template/stores/interaction';
import { toggleDarkmode } from '@/template/styles/theme';

const frameStore = useFrameStore();
const interactionStore = useInteractionStore();

const mobileDimmer = computed(() => {
  if (interactionStore.scrollSensor) {
    return ''
  } else {
    return '--dim'
  }
})
const mobileHider = computed(() => {
  if (interactionStore.windowScroll < 400) 
    return ''
  if (interactionStore.lastScrollDirection > 0) {
    return '--hide'
  } else {
    return ''
  }
})

const desktopHover = ref(false);
function desktopHoverAction(event: MouseEvent) {
  if (event.type === 'mouseenter')
    desktopHover.value = true;
  if (event.type === 'mouseleave')
    desktopHover.value = false;
}
const desktopDimmer = computed(() => {
  if (desktopHover.value)
    return ''
  if (interactionStore.scrollSensor)
    return ''
  else
    return '--dim'
})

const mobileView = computed(() => /--XXS|--XS/.test(frameStore.appScale));

function darkModeClick(event: MouseEvent) {
  toggleDarkmode();
}


</script>


<template>
<div id="blog-floating-actions">

  <div class="actions desktop" 
  :class="[desktopDimmer]"
  v-show="!mobileView">

    <Button id="action-darkmode-desktop"
    :size="14" buttonStyle="filled" 
    accentColor="var(--OnSurface)"
    :roundness="1"
    icon="brightness_medium" 
    text="darkmode" 
    :onMouseEnterHook="desktopHoverAction"
    :onMouseLeaveHook="desktopHoverAction"
    :onMouseClickHook="darkModeClick"
    />
  </div>

  <div class="actions mobile"
  :class="[mobileDimmer, mobileHider]" 
  v-show="mobileView">

    <Button id="action-darkmode-mobile"
    :size="20" buttonStyle="filled" 
    accentColor="var(--OnSurface)"
    :roundness="1"
    icon="brightness_medium" 
    :onMouseClickHook="darkModeClick"
    />
  
    <Button id="action-menu-mobile"
    :size="20" buttonStyle="filled" 
    accentColor="var(--OnSurface)"
    :roundness="1"
    icon="menu" 
    />
  </div>


  <!-- <p style="display"></p> -->
</div>
</template>
