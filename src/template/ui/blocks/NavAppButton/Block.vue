<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  displayName: string
  url: string
  icon: string
}>();

</script>

<template>
  <RouterLink class="nav-app-button" :to="props.url">
    <div class="contents">
      <Icon :name="props.icon"/>
      <p class="typo-body-10 --bold">{{ displayName }}</p>
    </div>
    <Plate/>
  </RouterLink>
</template>

