<script setup lang="ts">
import { defineProps } from 'vue';
import { getRoundStyle } from '@/template/styles/shapes';

const props = defineProps<{
  width: number;
  height: number;
  roundness: number;
}>();

const boxStyle = {
  width: `${props.width}rem`,
  height: `${props.height}rem`,
}

const borderRadius = getRoundStyle(props.roundness);
</script>

<template>
  <div class="ad-box" :style="boxStyle, borderRadius">
    GOOGLE AD HERE
    <Plate :roundness="0"/>
  </div>
</template>