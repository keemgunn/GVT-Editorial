<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, computed } from 'vue';

const props = defineProps<{

  icon: string;
  size: number;
  fill?: boolean;
  color?: string;
  toolTip?: string;

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
    'iconbutton',
    `${state.value}`,
  ]
})

const ST_buttonContainer = computed(() => {
  return {
    '--iconbutton-color':
      `${props.color || 'var(--Primary)'}`,
    'font-size': `${props.size}rem`
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
:title="toolTip"
:disabled="props.disabled"
@click="props.onMouseClickHook"
@mouseenter="props.onMouseEnterHook"
@mouseleave="props.onMouseLeaveHook"
>
  <Icon class="icon" :name="props.icon" :fill="props.fill" :size="props.size"/>
</button>
</template>