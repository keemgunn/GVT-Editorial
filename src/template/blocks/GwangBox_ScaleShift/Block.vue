<script setup lang="ts">
import { defineProps, onBeforeUpdate, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
const frameStore = useFrameStore();

const props = defineProps<{
  gwangSizes: GwangSizeByScale
}>();

const scale = computed(() => frameStore.appScale.split('--')[1] as ScaleCode)
</script>

<template>
<!-- GwangBox_ScaleShift -->

<template v-if="gwangSizes['XXS']">
  <GwangBox v-show="scale === 'XXS'" 
  class="gwang-XXS" 
  :width="gwangSizes['XXS'].width" 
  :height="gwangSizes['XXS'].height"/>
</template>

<template v-if="gwangSizes['XS']">
  <GwangBox v-show="scale === 'XS'" 
  class="gwang-XS" 
  :width="gwangSizes['XS'].width" 
  :height="gwangSizes['XS'].height"/>
</template>

<template v-if="gwangSizes['S']">
  <GwangBox v-show="scale === 'S'" 
  class="gwang-S" 
  :width="gwangSizes['S'].width" 
  :height="gwangSizes['S'].height"/>
</template>

<template v-if="gwangSizes['M']">
  <GwangBox v-show="scale === 'M'" 
  class="gwang-M" 
  :width="gwangSizes['M'].width" 
  :height="gwangSizes['M'].height"/>
</template>

<template v-if="gwangSizes['L']">
  <GwangBox v-show="scale === 'L'" 
  class="gwang-L" 
  :width="gwangSizes['L'].width" 
  :height="gwangSizes['L'].height"/>
</template>

<template v-if="gwangSizes['XL']">
  <GwangBox v-show="scale === 'XL'" 
  class="gwang-XL" 
  :width="gwangSizes['XL'].width" 
  :height="gwangSizes['XL'].height"/>
</template>

<template v-if="gwangSizes['XXL']">
  <GwangBox v-show="scale === 'XXL'" 
  class="gwang-XXL" 
  :width="gwangSizes['XXL'].width" 
  :height="gwangSizes['XXL'].height"/>
</template>

</template>