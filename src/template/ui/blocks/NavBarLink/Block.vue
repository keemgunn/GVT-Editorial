<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  navType: string
  navTitle: string
  navIcon: string
  navLink: string
}>();

</script>

<template>
  <RouterLink class="nav-app-button" :to="props.navLink">
    <div class="contents">
      <Icon :name="props.navIcon"/>
      <p class="typo-body-10 --bold">{{ navTitle }}</p>
    </div>
    <Plate/>
  </RouterLink>
</template>

