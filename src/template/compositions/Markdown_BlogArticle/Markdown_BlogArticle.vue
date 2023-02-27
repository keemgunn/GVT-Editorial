<script setup lang="ts">
import { defineProps, computed, ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useRouter } from 'vue-router';
import BlogArticle_FrontHead from './Sections/BlogArticle_Fronthead.vue';

const AD_TOWER_AD_COUNT = 2;

const frameStore = useFrameStore();
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

const frontmatter : Ref<any> = ref(null);
function handleFrontmatter(data: any) {
  frontmatter.value = data;
}
function getFrontmatter(key: string) {
  if (frontmatter.value) {
    return frontmatter.value[key]
  }
  else {
    return ""
  }
}

const showGwangTower = computed(() => /--M|--L|--XL|--XXL/.test(frameStore.appScale))
const gwangTowerGwangSizes = {
  XXS: undefined,
  XS: undefined,
  S: undefined,
  M: { width: 160, height: 600 },
  L: { width: 300, height: 600 },
  XL: { width: 300, height: 600 },
  XXL: { width: 300, height: 600 },
} satisfies GwangSizeByScale
</script>


<template>
<!-- Markdown_BlogArticle -->
<section id="markdown-blogarticle">
  <article>

    <BlogArticle_FrontHead :frontmatter="frontmatter"/>

    <section id="article-body">
      <component @markdownLoaded="handleFrontmatter" 
      :is='props.markdownComponentName'/>

      <GwangTower
      v-show="showGwangTower"
      :GwangSizes="gwangTowerGwangSizes" 
      :AdCount="AD_TOWER_AD_COUNT"/>
    </section>

  </article>
</section>
</template>