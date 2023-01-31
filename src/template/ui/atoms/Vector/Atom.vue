<template>
  <div class="vector" v-html="svgData"></div>
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, ref } from 'vue';
const props = defineProps<{
  src: string
}>();

// --- FOR V-HTML
const svgData = ref("");

onBeforeMount(() => {

  // 1. Get corrected path
  let url = props.src.replace("@", "/src");

  if (props.src[0] === "@") {
    url = props.src.replace("@", "/src");
  }
  else {
    url = props.src;
  }

  // 2. Fetch and put into Ref.
  fetch(url)
    .then(response => response.text())
    .then(str => {
      svgData.value = str
    })
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