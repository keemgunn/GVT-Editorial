<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import type { Ref } from 'vue';

const inputTextBind = ref("");
const inputEl: Ref<HTMLElement | null> = ref(null);
const inputElementId = crypto.randomUUID();

const props = defineProps<{
  onSubmit: (inputText:string) => void;
}>();

function searchSubmit(event: Event) {
  event.preventDefault();
  props.onSubmit(inputTextBind.value);
  inputTextBind.value = "";
  if (inputEl.value)
    inputEl.value.blur();
}

onMounted(() => {
  inputEl.value = document.getElementById(inputElementId);
})

</script>

<template>
  <form class="searchbox-mini" v-on:submit="searchSubmit">
    <Icon name="search" :size="20"/>
    <input :id="inputElementId" type="text" v-model="inputTextBind" name="searchKeyword" placeholder="Search...">
  </form>
</template>