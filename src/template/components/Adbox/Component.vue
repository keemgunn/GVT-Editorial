<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  width: number
  height: number
}>();

const boxStyle = {
  width: `${props.width}rem`,
  height: `${props.height}rem`,
}

</script>

<template>
  <div class="ad-box" :style="boxStyle">
    GOOGLE AD HERE
    <Plate/>
  </div>
</template>