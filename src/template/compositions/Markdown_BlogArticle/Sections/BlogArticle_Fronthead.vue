<script setup lang="ts">
import { defineProps, computed, ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';
import { useRouter } from 'vue-router';
import configs from '@/template/configs';
import { imageSourceFromUrl } from '@/template/helpers/strings';
import { copyText } from '@/template/helpers/userActions';
import { useToaster } from '@/template/components/Toaster/useToaster';
import { shareOnFacebook, shareOnTwitter } from '@/template/helpers/snsShareActions';
import { useLocalContents } from '@/template/contents_local';
import { formatDate } from '@/template/helpers/time';

const { CATEGORIES } = configs.article;

const { articles } = useLocalContents();
const props = defineProps<{
  frontmatter: any;
}>();

function getFrontmatter(key: string) {
  if (props.frontmatter) {
    return props.frontmatter[key]
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

const articleDate = computed(() => {
  if (props.frontmatter) {
    return formatDate(getFrontmatter('date'));
  } else {
    return "DATE"
  }
})

const accentColor = computed(() => {
  if (props.frontmatter) {
    const category = props.frontmatter.category as string;
    // console.log(category);
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


const headSpaceGwangSizes = {
  XXS: { width: 300, height: 100 },
  XS: { width: 300, height: 100 },
  S: { width: 728, height: 90 },
  M: { width: 970, height: 90 },
  L: { width: 970, height: 90 },
  XL: { width: 970, height: 90 },
  XXL: { width: 970, height: 90 },
} satisfies GwangSizeByScale


const toaster = useToaster();
function copyUrlAction(event: MouseEvent) {
  const url = window.location.href;
  toaster.toast('URL Copied!');
    // TODO: crypto.randomUUID() doesn't work in iOS Safari.
  copyText(url);
}
</script>


<template>
<section id="article-fronthead"
:style="ST_container">
  <GwangBox_ScaleShift
  :gwangSizes="headSpaceGwangSizes"/>

  <div class="container">
    <div class="wrapper-category">
      <RouterLink class="category-name" :to="categoryUri">{{ getFrontmatter('category') }}</RouterLink>
      <RouterLink class="arrow" :to="categoryUri" style="display: none">↖︎</RouterLink>
    </div>

    <div class="wrapper-title">
      <h1 class="title">{{ getFrontmatter('title') }}</h1>
    </div>
    
    <div class="wrapper-image">
      <img :src="getFrontmatter('coverImage')" alt="unsplash">
      <figcaption><cite v-show="imageSource.length > 0" class="imagesource">IMAGE: {{ imageSource }}</cite></figcaption>
    </div>
    
    <div class="wrapper-information">
      <h2 class="description">{{ getFrontmatter('description') }}</h2>

      <div class="divider"/>

      <time :datetime="formatDate(getFrontmatter('date'))" class="date">{{ articleDate }}</time>


      <ul class="tags">
        <li v-for="tag in getFrontmatter('tags')" 
        :id="`tag-${tag}`">
          <RouterLink 
          class="tag-link"
          :to="articles.getUriFromTag(tag)" >
            <Chip
              :size="14" 
              chipStyle="outlined"
              accentColor="var(--accent-color)"
              textColor="var(--Ink)"
              :text="tag"
              :roundness="1"
            />
          </RouterLink>
        </li>
      </ul>
      
      <div class="actions">

        <Button class="action facebook"
        toolTip="Share on Facebook"
        icon="facebook"
        iconType="svg"
        :size="14"
        accentColor="var(--accent-color)"
        textColor="var(--Base)"
        :roundness="1"
        :onMouseClickHook="shareOnFacebook"
        />

        <Button class="action twitter"
        toolTip="Share on Twitter"
        icon="twitter"
        iconType="svg"
        :size="14"
        accentColor="var(--accent-color)"
        textColor="var(--Base)"
        :roundness="1"
        :onMouseClickHook="shareOnTwitter"
        />

        <Button class="action linkcopy"
        toolTip="Copy Link"
        icon="link"
        :size="14"
        accentColor="var(--accent-color)"
        textColor="var(--Base)"
        :roundness="1"
        :onMouseClickHook="copyUrlAction"
        />

      </div>
    </div>
  </div>

  <Plate/>
</section>
</template>