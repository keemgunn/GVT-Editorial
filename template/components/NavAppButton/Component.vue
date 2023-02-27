<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  navTitle: string
  uri: string
  navIcon: string
}>();

</script>

<template>
<!-- NavAppButton -->
<RouterLink class="nav-app-button" :to="props.uri">
  <div class="contents">
    <Icon :name="props.navIcon"/>
    <p class="typo-body-10 --bold">{{ navTitle }}</p>
  </div>
  <Plate/>
</RouterLink>
</template>

