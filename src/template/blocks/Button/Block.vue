<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, computed } from 'vue';

const props = defineProps<{

  size: 14 | 16 | 18 | 20 | 22;
  buttonStyle?: 'filled' | 'toned' | 'outlined' | 'outlined-backdrop' | 'minimal';
  accentColor?: string;
  textColor?: string;
  toolTip?: string;
  roundness?: 0 | 1 | 2;

  icon?: string;
  iconType?: 'material' | 'svg';
  text?: string;
  caps?: boolean;
  disabled?: boolean;

  onBeforeMountHook?: () => void;
  onMountedHook?: () => void;
  onMouseClickHook?: (event: MouseEvent) => void;
  onMouseEnterHook?: (event: MouseEvent) => void;
  onMouseLeaveHook?: (event: MouseEvent) => void;
}>();

const state = computed(() => {
  if (props.disabled)
    return '--disabled'
  else 
    return '--enabled'
})

const CL_buttonContainer = computed(() => {
  return [
    'button',
    `${props.buttonStyle || 'filled'}`,
    `${state.value}`,
    `--${props.size}`,
    `${props.caps ? '--caps' : ''}`,
    `--roundness-${String(props.roundness || 0)}`
  ]
})

const ST_buttonContainer = computed(() => {
  return {
    '--button-accent-color':
      `${props.accentColor || 'var(--Primary)'}`,
    '--button-text-color': 
      `${props.textColor || 'var(--OnPrimary)'}`
  }
})

onBeforeMount(() => {
  if (props.onBeforeMountHook) props.onBeforeMountHook();
})
onMounted(() => {
  if (props.onMountedHook) props.onMountedHook();
})


</script>
<template>
<button 
:class="CL_buttonContainer" :style="ST_buttonContainer" 
:title="toolTip"
:disabled="disabled"
@click="props.onMouseClickHook"
@mouseenter="props.onMouseEnterHook"
@mouseleave="props.onMouseLeaveHook"
>

  <div class="wrapper">
    <Icon :iconType="props.iconType" :name="props.icon"/>
    <p class="text" v-show="props.text?.length">{{ props.text }}</p>
  </div>
  
  <Plate/>

  <div class="bg"></div>

</button>
</template>