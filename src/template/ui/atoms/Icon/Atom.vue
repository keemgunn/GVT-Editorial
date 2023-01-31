<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  name: string
}>();

</script>

<template>
  <div class="icon">
    <span class="material-symbols-rounded">
      {{ props.name }}
    </span>
  </div>
</template>