<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  size: 12 | 14 | 16 | 18 ;
  chipStyle?: 'toned' | 'outlined' | 'filled'
  accentColor?: string;
  textColor?: string;
  headIcon?: string;
  headIconFill?: boolean;
  text?: string;
  handleIcon?: string;
  roundness?: 0 | 1 | 2;
  disabled?: boolean;
}>();

const state = computed(() => {
  if (props.disabled)
    return '--disabled'
  else 
    return '--enabled'
})

const CL_chipContainer = computed(() => {
  return [
    'chip',
    `${props.chipStyle || 'toned'}`,
    `${state.value}`,
    `--${props.size}`,
    `--roundness-${String(props.roundness || 0)}`,
  ]
})
const ST_chipContainer = computed(() => {
  return {
    '--chip-accent-color':
      `${props.accentColor || 'var(--Primary)'}`,
    '--chip-text-color': 
      `${props.textColor || 'var(--Ink)'}`
  }
})
</script>

<template>
<div class="chip" 
:class="CL_chipContainer" :style="ST_chipContainer">

  <Icon class="object icon-head" 
  v-show="props.headIcon?.length" 
  :name="props.headIcon" :fill="props.headIconFill"/>

  <p class="object text" 
  v-show="props.text?.length">{{ props.text }}</p>

  <Icon class="object icon-handle" 
  v-show="props.handleIcon?.length" 
  :name="props.handleIcon"/>

  <Plate/>

</div>
</template>