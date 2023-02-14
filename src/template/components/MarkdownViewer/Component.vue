<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useConfigs } from '@/template/stores/userConfigs';

const props = defineProps<{ frontmatter: any }>();

</script>


<template>
  <article>
    <slot>
      <!-- Markdown Renders Here -->
    </slot>
  </article>
</template>