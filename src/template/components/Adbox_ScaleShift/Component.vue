<script setup lang="ts">
import { defineProps, onBeforeUpdate, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const props = defineProps<{
  adSizes: AdSizeByScale
  roundness: number
}>();

const scale = computed(() => frameStore.appScale.split('--')[1] as ScaleCode)
</script>

<template>
<Adbox v-show="scale === 'XXS'" class="ad-XXS" :width="adSizes['XXS'].width" :height="adSizes['XXS'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'XS'" class="ad-XS" :width="adSizes['XS'].width" :height="adSizes['XS'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'S'" class="ad-S" :width="adSizes['S'].width" :height="adSizes['S'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'M'" class="ad-M" :width="adSizes['M'].width" :height="adSizes['M'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'L'" class="ad-L" :width="adSizes['L'].width" :height="adSizes['L'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'XL'" class="ad-XL" :width="adSizes['XL'].width" :height="adSizes['XL'].height" :roundness="roundness"/>
<Adbox v-show="scale === 'XXL'" class="ad-XXL" :width="adSizes['XXL'].width" :height="adSizes['XXL'].height" :roundness="roundness"/>
</template>