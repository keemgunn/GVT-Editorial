<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFrameStore } from '@/template/styles/frame/_store';

const frameStore = useFrameStore();
const props = defineProps<{
  featuredIndex: number;
  article: ArticleRecord;
}>();

const cardType = (() => {
  if (props.featuredIndex === 0) 
    return 'primary'
  else
    return 'secondary'
})();

const CL_container = computed(() => {
  return [
    `${cardType}`,
  ]
})

const showImageCover = computed(() => /--XXS|--XS|--S/.test(frameStore.appScale))

const showHeadCategory = computed(() => {
  if (cardType === 'primary') {
    return false
  } else {
    return /--XXS|--XS|--S|--M/.test(frameStore.appScale)
  }
})
const showTailCategory = computed(() => {
  if (cardType === 'primary') {
    return /--XXL|--XL|--L|--M/.test(frameStore.appScale)
  } else {
    return /--XXL|--XL|--L/.test(frameStore.appScale)
  }
})


</script>

<template>
<!-- ArticleCard_Featured_A -->
<RouterLink 
class="articlecard-featured-a" 
:class="CL_container"
:to="props.article.uri">

  <div class="imagebox">
    <img :src="props.article.coverImage" alt="">
    <div class="gradient-cover" v-show="showImageCover"/>
  </div>

  <div class="textbox">
    <span class="sectiontitle"
    v-show="cardType === 'primary'">
      Featured Article
    </span>
    
    <Article_InfoPack class="info-head" 
    :article="props.article" :size="12" 
    :showCategory="showHeadCategory"/>

    <h1 class="title">
      <span>
        {{ props.article.title }}
      </span>
    </h1>
    <p class="description">{{ props.article.description }}</p>

    <Article_InfoPack class="info-tail" 
    :article="props.article" :size="12" 
    :showCategory="showTailCategory"
    :showReadingTime="true" 
    :showDate="true"/>
  </div>

  <Plate/>
</RouterLink>
</template>