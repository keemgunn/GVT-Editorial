<script setup lang="ts">
import { useToaster } from './useToaster';
import Toast from './Toast.vue';
const toaster = useToaster();

</script>

<template>
<!-- Toaster -->
  <div id="toaster">
    <transition-group name="toaster" tag="ul" class="toasts">

      <li v-for="toast in toaster.items" :key="toast.id" :id="toast.id"><Toast :toastData="toast"/></li>
      
    </transition-group>
  </div>

</template>
