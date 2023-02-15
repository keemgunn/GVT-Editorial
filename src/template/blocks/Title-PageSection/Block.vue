<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  text: string;
  size: number;
  divider: 'none' | 'bottom' | 'side';
  dividerWidth: number;
}>();

const dividerLayout = computed(() => {
  switch (props.divider) {
    case "bottom":
      return "divider-bottom"
      break;
    case "side":
      return "divider-side"
      break;
    default:
      return "divider-none"
      break;
  }
})

const dividerStyle = computed(() => {

  return {
    "height": `${props.dividerWidth}rem`
  }
})


</script>



<template>
  <div class="title-pagesection" 
  :class="[dividerLayout]" 
  :style="{gap: `${props.size/2}rem`}">

    <h1 :class="`typo-header-${props.size}`">{{text}}</h1>
    <div class="divider" :style="dividerStyle" v-show="props.divider !== 'none'"></div>

    <Plate :roundness="0"/>
  </div>
</template>