<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, computed } from 'vue';

const props = defineProps<{

  size: 14 | 16 | 18 | 20 | 22;
  buttonStyle?: 'filled' | 'toned' | 'outlined' | 'outlined-backdrop' | 'minimal';
  accentColor?: string;
  roundness?: 0 | 1 | 2;

  icon?: string;
  text?: string;
  caps?: boolean;
  enabled?: boolean;

  onBeforeMountHook?: () => void;
  onMountedHook?: () => void;
  onMouseClickHook?: (event: MouseEvent) => void;
  onMouseEnterHook?: (event: MouseEvent) => void;
  onMouseLeaveHook?: (event: MouseEvent) => void;
}>();

const enabled = computed(() => {
  if (props.enabled === undefined)
    return '--enabled'
  else if (props.enabled)
    return '--enabled'
  else 
    return 'disabled'
})

const CL_buttonContainer = computed(() => {
  return [
    'button',
    `${props.buttonStyle || 'filled'}`,
    `${enabled.value}`,
    `--${props.size}`,
    `${props.caps ? '--caps' : ''}`,
    `--roundness-${String(props.roundness || 0)}`
  ]
})

const ST_buttonContainer = computed(() => {
  return {
    '--button-accent-color':
      `${props.accentColor || 'var(--Primary)'}`,
}})


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
@click="props.onMouseClickHook"
@mouseenter="props.onMouseEnterHook"
@mouseleave="props.onMouseLeaveHook"
>

  <div class="wrapper">
    <Icon class="icon" v-show="props.icon?.length" :name="props.icon"/>
    <p class="text" v-show="props.text?.length">{{ props.text }}</p>
  </div>
  
  <Plate/>

  <div class="bg"></div>

</button>
</template>