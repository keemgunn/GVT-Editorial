<script setup lang="ts">
/**
 * This component is for handing out frontmatter object to the parent component.
 */
import { defineProps, defineEmits, onBeforeMount } from 'vue';
const props = defineProps<{ frontmatter: any }>();

const emit = defineEmits<{
  (event: 'markdownLoaded', frontmatter: any): void
}>()

onBeforeMount(() => {
  emit('markdownLoaded', props.frontmatter);
})
</script>

<template>
  <slot> <!-- MARKDOWN RENDERS HERE --> </slot>
</template>