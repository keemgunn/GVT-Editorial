<script setup lang="ts">
import { onMounted } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore()

onMounted(() => {
  document.body.classList.forEach((value, key, parent) => {
    document.body.classList.remove(value)
  })
  document.body.classList.add('theme--default-light')
  document.body.classList.remove(frameStore.appLayout)
  document.body.classList.remove(frameStore.appScale)
  
})


</script>

<template>
  <div>
    DEVGROUND
  </div>

  <byScale style="
    flex-direction: column;
    position: relative;
  ">
    <NavBar_Editorial style="
    "/>
  </byScale>
</template>