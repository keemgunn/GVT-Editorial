<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  GwangSizes: GwangSizeByScale;
  AdCount: number;
}>();

const gwangLoop = Array.from({length: props.AdCount}, (_, i) => i)
</script>


<template>
<!-- GwangTower -->
<aside class="gwang-tower">
  <ul class="wrapper">
    <li v-for="i in gwangLoop" :id="`gwang-tower-gwang-${String(i)}`">
      <div class="gwangbox-container">
        <GwangBox_ScaleShift 
        :gwangSizes="GwangSizes"/>
      </div>
    </li>
  </ul>
</aside>
</template>