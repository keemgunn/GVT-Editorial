<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { getReasonPhrase } from 'http-status-codes';
const props = defineProps<{
  code: number
}>();
const reasonPhrase = computed(() => getReasonPhrase(props.code))
</script>

<template>
<!-- PAGE : ERROR -->
<div id="router-page" class="error">
  
  <main>
    <h1 class="typo-header-96 --bold">{{ code }}</h1>
    <h1 class="typo-header-96 --bold">{{ reasonPhrase }}</h1>
  </main>

</div>
</template>

<style lang="scss">
#router-page.error {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  * {
    text-align: center;
  }
  h1 {
    font-size: 10vw;
    color: var(--OnBackground);
    opacity: 0.36;
  }
}
</style>