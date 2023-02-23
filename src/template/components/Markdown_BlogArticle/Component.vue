<script setup lang="ts">
import { defineProps, computed, ref, onBeforeMount, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useLocalContents } from '@/template/contents_local';
import { useRoute, useRouter } from 'vue-router';

const { reader } = useLocalContents();
const router = useRouter();

const props = defineProps<{
  markdownComponentName: string | null | undefined;
}>();

onBeforeMount(() => {
  if (props.markdownComponentName === null
  || props.markdownComponentName === undefined
  || props.markdownComponentName.length === 0) {
    console.warn("NO DOC");
    router.replace('/not-found')
  }
})

const frontmatter : Ref<any> = ref();
function handleFrontmatter(frontmatter: any) {
  frontmatter.value = frontmatter;
  // console.warn(frontmatter.value);
}


</script>


<template>
<!-- Markdown_BlogArticle -->
<section id="markdown-blogarticle">

  <div class="headspace">
    

  </div>

  <article>
    <component @markdownLoaded="handleFrontmatter" :is='markdownComponentName'/>
  </article>

  <aside></aside>

</section>
</template>