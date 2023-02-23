<script setup lang="ts">
import { defineProps, computed, ref, onBeforeMount, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useRoute, useRouter } from 'vue-router';
import configs from '@/template/configs';
import { toRealArray } from '@/template/contents_local/_helpers';
import { imageSourceFromUrl } from '@/template/helpers/strings';
import { copyText } from '@/template/helpers/userActions';
const frameStore = useFrameStore();
const router = useRouter();
const { CATEGORIES } = configs.article;

const AD_TOWER_AD_COUNT = 2;

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

const imageSource = computed(() => {
  const url = getFrontmatter('coverImage');
  return imageSourceFromUrl(url);
})

const categoryUri = computed(() => {
  const categoryRecord = (CATEGORIES as any)[getFrontmatter('category')]
  if (categoryRecord) {
    return categoryRecord.uri
  } else {
    return ""
  }
})

const accentColor = computed(() => {
  if (frontmatter.value) {
    const category = frontmatter.value.category as string;
    console.log(category);
    if (Object.keys(CATEGORIES).includes(category)) {
      return (CATEGORIES as any)[category].accentColor as string
    } else {
      console.warn(`NO CATEGORY: ${category} ...Markdown_BlogArticle`);
      return "var(--Primary)"
    }
  } else {
    return "var(--OnPrimary)"
  }
})

const ST_container = computed(() => {
  return {
    "--accent-color" : accentColor.value,
}})


const headSpaceAdSizes = {
  XXS: { width: 300, height: 100 },
  XS: { width: 300, height: 100 },
  S: { width: 728, height: 90 },
  M: { width: 970, height: 90 },
  L: { width: 970, height: 90 },
  XL: { width: 970, height: 90 },
  XXL: { width: 970, height: 90 },
} satisfies AdSizeByScale

const showAdTower = computed(() => /--M|--L|--XL|--XXL/.test(frameStore.appScale))
const adTowerAdSizes = {
  XXS: undefined,
  XS: undefined,
  S: undefined,
  M: { width: 160, height: 600 },
  L: { width: 300, height: 600 },
  XL: { width: 300, height: 600 },
  XXL: { width: 300, height: 600 },
} satisfies AdSizeByScale

function copyUrlAction(event: MouseEvent) {
  copyText(window.location.href);
}
</script>


<template>
<!-- Markdown_BlogArticle -->
<section id="markdown-blogarticle" :style="ST_container">
  <article>

    <section id="article-fronthead">
      <Adbox_ScaleShift
      :adSizes="headSpaceAdSizes"/>

      <div class="container">
        <div class="wrapper-category">
          <RouterLink class="category-name" :to="categoryUri">{{ getFrontmatter('category') }}</RouterLink>
          <RouterLink class="arrow" :to="categoryUri" style="display: none">↖︎</RouterLink>
        </div>
  
        <div class="wrapper-title">
          <h1 class="title">{{ getFrontmatter('title') }}</h1>
        </div>
        
        <div class="wrapper-image">
          <img :src="getFrontmatter('coverImage')" alt="">
          <p v-show="imageSource.length > 0" class="imagesource">IMAGE: {{ imageSource }}</p>
        </div>
        
        <div class="wrapper-information">
          <p class="description">{{ getFrontmatter('description') }}</p>

          <ul class="tags"><li v-for="tag in getFrontmatter('tags')" :id="`tag-${tag}`">{{ tag }}</li></ul>
          
          <div class="divider"/>

          <p class="date">{{ getFrontmatter('date') }}</p>

          <div class="actions">
            <Button id="article-link"
            :size="14" buttonStyle="filled"
            accentColor="var(--accent-color)"
            textColor="var(--Base)"
            toolTip="Copy Link"
            :roundness="1"
            icon="link"
            :onMouseClickHook="copyUrlAction"
            />
          </div>
        </div>
      </div>

      <Plate/>
    </section>


    <section id="article-body">
      <component @markdownLoaded="handleFrontmatter" 
      :is='props.markdownComponentName'/>

      <AdTower
      :AdSizes="adTowerAdSizes" 
      :AdCount="AD_TOWER_AD_COUNT"/>
    </section>

  </article>
</section>
</template>