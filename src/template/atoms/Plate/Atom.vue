<script setup lang="ts">
import { getRoundStyle } from '@/template/styles/shapes';
const props = defineProps<{
  roundness: number
}>();
const borderRadius = getRoundStyle(props.roundness);
</script>


<template>
  <div class="plate" :style="borderRadius">
    <div class="plane" :style="borderRadius"></div>
    <div class="border" :style="borderRadius"></div>
  </div>
</template>

