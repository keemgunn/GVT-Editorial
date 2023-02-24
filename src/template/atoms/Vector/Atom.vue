<template>
  <div class="vector" v-html="svgData"></div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, watch, ref } from 'vue';
const props = defineProps<{
  src: string
}>();

// --- FOR V-HTML
const svgData = ref("");

function fetchSvgData(source:string) {
  // console.warn(source);
  // Fetch and put into Ref.
  fetch(source)
    .then(response => response.text())
    .then(str => {
      svgData.value = str
    })
}

onBeforeMount(() => {
  fetchSvgData(props.src);
})

watch(() => props.src, (newVal, oldVal) => {
  fetchSvgData(newVal);
})

</script>

<!-- 

  STYLING EXAMPLE :

  <Vector v-if="showLogo" class="nav-logo" src="@/app/assets/svg/logo-gunn.svg"/>

  .scale--L #nav-bar-app .nav-logo, svg {
    width: 64rem; height: 64rem;
    path { fill: var(--OnBackground); }
  }

 -->