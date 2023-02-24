<script setup lang="ts">
import { defineProps } from 'vue';
import IconSvg from './IconSvg.vue';
import IconMaterial from './IconMaterial.vue';

const props = defineProps<{
  name: string,
  iconType?: 'material' | 'svg';
  size?: number,
  fill?: boolean,
  class?:string
}>();

const iconComponent = (() => {
  if (props.iconType)  
    return props.iconType
  else
    return 'material'
})();

</script>


<template>

<IconMaterial v-if="iconComponent === 'material'" 
v-show="props.name?.length" 
  :name="props.name"
  :size="props.size"
  :fill="props.fill"
  :class="props.class"
/>

<IconSvg v-if="iconComponent === 'svg'" 
v-show="props.name?.length" 
  :name="props.name"
  :size="props.size"
  :class="props.class"
/>

</template>