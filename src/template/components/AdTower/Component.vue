<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFrameStore } from '@/template/styles/frame/_store';
const props = defineProps<{
  AdSizes: AdSizeByScale;
  AdCount: number;
  roundness: number;
}>();

const adLoop = Array.from({length: props.AdCount}, (_, i) => i)


</script>


<template>

<aside class="ad-tower">

  <ul class="wrapper">
    <li v-for="i in adLoop" :id="`ad-tower-ad-${String(i)}`">
      <div class="container ad">
        <Adbox_ScaleShift 
        :adSizes="AdSizes"
        :roundness="roundness"/>
      </div>
    </li>
  </ul>





</aside>
</template>