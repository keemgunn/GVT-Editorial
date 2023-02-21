<script setup lang="ts">
import { defineProps, onBeforeUpdate, computed, inject } from 'vue';
import { getRoundStyle } from '@/template/styles/shapes';

const props = defineProps<{
  width: number;
  height: number;
  roundness: number;
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

const borderRadius = getRoundStyle(props.roundness);

onBeforeUpdate(() => {
  // console.warn("UPDATEEEEEEEEE");
})
</script>

<template>
  <div class="ad-box" :class="clickPrevent" :style="boxStyle, borderRadius">
    <div class="ad-wrapper">
      <!-- GOOGLE AD HERE -->
    </div>
    <div class="ad-background typo-header-28">Advertisement</div>
  </div>
</template>

<style lang="scss">
.ad-box {
  overflow: hidden;
  z-index: 10;
  pointer-events: all;
  .ad-wrapper {
    position: relative;
    width: 100%; height: 100%;
    z-index: 10;
  }
  .ad-background {
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
    color: var(--OnPrimary);
    background-color: var(--Secondary);
    opacity: 0.64;
  }
}
.ad-box.--prevent-interaction {
  pointer-events: none !important;
}
</style>