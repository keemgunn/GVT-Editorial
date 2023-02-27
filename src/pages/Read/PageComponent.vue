<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLocalContents } from '#/contents_local';
import Markdown_BlogArticle from '#/compositions/Markdown_BlogArticle/Markdown_BlogArticle.vue';

const { reader } = useLocalContents();
const docURI = useRoute().params.docuri.toString();
const fullURI = reader.getComponentName(docURI);
</script>

<template>
<!-- PAGE : READ -->
<div id="router-page" class="read">

  <main>
    <Markdown_BlogArticle :markdownComponentName="fullURI"/>
  </main>

</div>
</template>

<style lang="scss">
#router-page.read main {
  width: 100%;
}
</style>