<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

const inputTextBind = ref("");
const inputEl: Ref<HTMLElement | null> = ref(null);
const inputElementId = crypto.randomUUID();


const route = useRoute();
const router = useRouter();

function searchSubmit(event: Event) {
  event.preventDefault();
  router.push(`/search?keyword=${inputTextBind.value}`);
  inputTextBind.value = "";
  if (inputEl.value)
    inputEl.value.blur();
}

onMounted(() => {
  inputEl.value = document.getElementById(inputElementId);
})

</script>

<template>
  <!-- Searchbox_Mini -->
  <form v-show="!route.path.includes('search')"
  class="searchbox-mini" 
  v-on:submit="searchSubmit">
    <Icon name="search" :size="20"/>
    <input :id="inputElementId" type="text" v-model="inputTextBind" name="searchKeyword" placeholder="Search...">
  </form>
</template>