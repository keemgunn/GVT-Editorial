<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  name: string,
  size: number
}>();

const containerStyle = computed(() => {
  return {
    width: `${props.size}rem`,
    height: `${props.size}rem`,
  }
})

const spanStyle = computed(() => {
  return {
    "font-size": `${props.size}rem`,
    "font-variation-settings": `"opsz" ${props.size}, "FILL" 0, "wght" 500, "GRAD" 0`
  }
})

</script>

<template>
  <div v-if="props.name.length > 0" class="icon" :style="containerStyle">
    <span class="material-symbols-rounded" :style="spanStyle">
      {{ props.name }}
    </span>
  </div>
</template>