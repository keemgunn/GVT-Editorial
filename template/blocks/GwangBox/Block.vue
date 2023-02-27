<script setup lang="ts">
import { defineProps, onBeforeUpdate, computed, inject } from 'vue';

const props = defineProps<{
  width: number;
  height: number;
}>();

const node_env = inject('process_env') as string;
const clickPrevent = computed(() => {
  if (node_env.includes('DEV')) {
    return '--prevent-interaction'
  } else {
    return ''
  }
})

const boxStyle = computed(() => { return {
  width: `${props.width}rem`,
  height: `${props.height}rem`,
}})

onBeforeUpdate(() => {
  // console.warn("COMM UPDATEEEEEEEEE");
})
</script>

<template>
<!-- GwangBox -->
<div class="gwang-box" :class="clickPrevent" :style="boxStyle">
  <div class="gwang-wrapper">
    <!-- GOOGLE COMM HERE -->
  </div>
  <div class="gwang-background typo-header-20">Advertisement</div>
</div>
</template>

<style lang="scss">
.gwang-box {
  overflow: hidden;
  z-index: 10;
  pointer-events: all;
  .gwang-wrapper {
    position: relative;
    width: 100%; height: 100%;
    z-index: 10;
  }
  .gwang-background {
    width: 100%; height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    word-break: break-all;
    text-align: center;
    color: var(--Background);
    background-color: var(--OnBackground);
    opacity: 0.18;
  }
}
.gwang-box.--prevent-interaction {
  pointer-events: none !important;
}
</style>