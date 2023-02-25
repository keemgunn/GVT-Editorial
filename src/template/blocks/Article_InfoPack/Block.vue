<script lang="ts" setup>
import { formatDate } from '@/template/helpers/time';
import { computed, defineProps } from 'vue';

const props = defineProps<{
  article: ArticleRecord;
  size: 10 | 12 | 14;
  showReadingTime?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
}>();

const infoClass = computed(() => {
  return [
    `--${props.size}`,
    `--${props.showCategory?'show-category':''}`,
    `--${props.showDate?'show-date':''}`,
    `--${props.showReadingTime?'show-readingtime':''}`,
  ]
})

const hideAll = (!props.showCategory && !props.showDate && !props.showReadingTime)
</script>

<template>
<!-- Article_InfoPack -->
<ul v-if="!hideAll" class="article-infopack" :class="infoClass">
  <li v-if="showCategory" class="info-category">{{ article.category }}</li>
  <li v-if="showReadingTime" class="info-readingtime">{{ article.readTime }}</li>
  <li v-if="showDate" class="info-date" role="time">{{ formatDate(props.article.date) }}</li>
</ul>
</template>