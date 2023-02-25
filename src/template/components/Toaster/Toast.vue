<script setup lang="ts">
import { defineProps } from 'vue';
import { useToaster } from './useToaster';
const toaster = useToaster();

const props = defineProps<{
  toastData: ToastData;
}>();

const icon = (() => {
  switch (props.toastData.type) {
    case 'alert':
      return 'notifications'
      break;
    case 'error':
      return 'error'
      break;
    case 'warning':
      return 'warning'
      break;
    case 'positive':
      return 'check_circle'
      break;
    default: // 'message'
      return 'sms'
      break;
  }
})();

const style = (() => {
  switch (props.toastData.type) {
    case 'alert':
      return {
        '--text-color': 'var(--Secondary)',
        '--bg-color': 'var(--OnSecondary)'
      }
      break;
    case 'error':
      return {
        '--text-color': 'var(--OnErrorContainer)',
        '--bg-color': 'var(--ErrorContainer)'
      }
      break;
    case 'warning':
      return {
        '--text-color': 'var(--OnWarningContainer)',
        '--bg-color': 'var(--WarningContainer)'
      }
      break;
    case 'positive':
      return {
        '--text-color': 'var(--OnPositiveContainer)',
        '--bg-color': 'var(--PositiveContainer)'
      }
      break;
    default: // 'message'
      return {
        '--text-color': 'var(--SurfaceVariant)',
        '--bg-color': 'var(--OnSurfaceVariant)'
      }
      break;
  }
})();

function closeToastAction(event: MouseEvent) {
  toaster.removeToast(props.toastData.id);
}

</script>

<template>
  <div class="toast" :style="style">

    <Icon :name="icon" :size="20" :fill="true"/>

    <p class="message typo-body-16"> {{ toastData.message }}</p>

    <IconButton class="close-button"
    v-if="!toastData.timer"
    icon="cancel" 
    :size="24" 
    :fill="false"
    color="var(--text-color)"
    tootip="Close Alert"
    :onMouseClickHook="closeToastAction"
    />

    <Plate/>

  </div>
</template>