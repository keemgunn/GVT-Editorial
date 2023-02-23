<script setup lang="ts">
import { defineProps, onBeforeUpdate, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const props = defineProps<{
  adSizes: AdSizeByScale
}>();

const scale = computed(() => frameStore.appScale.split('--')[1] as ScaleCode)
</script>

<template>
<!-- Adbox_ScaleShift -->

<template v-if="adSizes['XXS']">
  <Adbox v-show="scale === 'XXS'" 
  class="ad-XXS" 
  :width="adSizes['XXS'].width" 
  :height="adSizes['XXS'].height"/>
</template>

<template v-if="adSizes['XS']">
  <Adbox v-show="scale === 'XS'" 
  class="ad-XS" 
  :width="adSizes['XS'].width" 
  :height="adSizes['XS'].height"/>
</template>

<template v-if="adSizes['S']">
  <Adbox v-show="scale === 'S'" 
  class="ad-S" 
  :width="adSizes['S'].width" 
  :height="adSizes['S'].height"/>
</template>

<template v-if="adSizes['M']">
  <Adbox v-show="scale === 'M'" 
  class="ad-M" 
  :width="adSizes['M'].width" 
  :height="adSizes['M'].height"/>
</template>

<template v-if="adSizes['L']">
  <Adbox v-show="scale === 'L'" 
  class="ad-L" 
  :width="adSizes['L'].width" 
  :height="adSizes['L'].height"/>
</template>

<template v-if="adSizes['XL']">
  <Adbox v-show="scale === 'XL'" 
  class="ad-XL" 
  :width="adSizes['XL'].width" 
  :height="adSizes['XL'].height"/>
</template>

<template v-if="adSizes['XXL']">
  <Adbox v-show="scale === 'XXL'" 
  class="ad-XXL" 
  :width="adSizes['XXL'].width" 
  :height="adSizes['XXL'].height"/>
</template>

</template>