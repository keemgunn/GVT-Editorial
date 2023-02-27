<script setup lang="ts">
import { defineProps, computed, onBeforeMount, onBeforeUpdate } from 'vue';

const props = defineProps<{
  name: string;
  cardName: string;
  articles: Array<ArticleRecord>;
    // articles are recommended to be ref()ed object.
  showGwangs: 0 | 1 | 2 | 3;
  gwangSizes: GwangSizeByScale
}>();

function addGwangs(arr:Array<ArticleRecord>, num: number) {
  const middleIndex = Math.floor(arr.length / 2);
  const adRecord: ArticleRecord = {
    title: "ad", uri: "ad", date: "ad", description: "ad", tags: [], category: "ad", coverImage: "ad", filename: "ad", highlighted: "normal", readTime: "ad", raw: ""
  }
  switch (num) {
    case 1:
      // insert item in the middle of the array
      arr.splice(middleIndex, 0, adRecord);
      break;
    case 2:
      // insert item in the middle and at the end of the array
      arr.splice(middleIndex, 0, adRecord);
      arr.push(adRecord);
      break;
    case 3:
      // insert item at first, middle and last of the array
      arr.unshift(adRecord);
      arr.splice(middleIndex, 0, adRecord);
      arr.push(adRecord);
      break;
    default:
      break;
  }
}

const articlesWithGwangs = computed(() => {
  // console.warn("COMPUTED INVOKED");
  const arr = [...props.articles];
  addGwangs(arr, props.showGwangs);[]
  return arr
})
</script>

<template>
<!-- List_ArticleCards -->
<ul class="list-articlecards">
  <template v-for="article in articlesWithGwangs" :id="`list-${name}-${article.uri}`">
    <li :class="`${article.uri === 'ad'? 'ad' : 'article'}`">
      <template v-if="article.uri === 'ad'">
        <GwangBox_ScaleShift :gwangSizes="gwangSizes"/>
      </template>
      <template v-else>
        <component :is="cardName" :article="article"/>
      </template>
    </li>
  </template>
</ul>
</template>