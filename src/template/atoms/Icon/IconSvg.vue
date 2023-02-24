<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

const props = defineProps<{
  name: string,
  size?: number,
}>();

const iconSrc = ref("");
const svg = import(`../../assets/svgIcons/icon-${props.name}.svg`);
svg.then((location) => {
  iconSrc.value = location.default;
}).catch((err) => {
  console.error(err);
})

const containerStyle = computed(() => {
  return {
    width: `${props.size}rem`,
    height: `${props.size}rem`,
    "font-size": `${props.size}rem`,
  }
})


</script>

<template>
  <div v-if="props.name.length > 0" class="icon-svg" :style="containerStyle">
    <Vector :src="iconSrc"/>
  </div>
</template>

<style lang="scss">
.icon-svg {
  .vector, svg{
    width: 100% !important; height: 100% !important;
  }
}
</style>