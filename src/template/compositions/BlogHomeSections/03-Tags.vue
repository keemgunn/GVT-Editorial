<script setup lang="ts">
import { useLocalContents } from '@/template/contents_local';
const { articles } = useLocalContents();
const tagsObject = articles.getTagsObject();
</script>

<template>
<section id="tags-list">
  <div class="wrapper">
    <Title_PageSection 
      text="Tags" 
      :size="20" 
      :divider="'none'" 
      :dividerWidth="3"/>
    <ul class="tags">
      <template v-for="tag in Object.keys(tagsObject)" :id="`tag-list-${tag}`">
        <li class="tag">
          <RouterLink :to="articles.getUriFromTag(tag)">
            <Chip
              :size="14" 
              chipStyle="outlined"
              accentColor="var(--Secondary)"
              textColor="var(--Ink)"
              :text="tag"
              :roundness="1"
            />
          </RouterLink>
        </li>
      </template>
    </ul>
  </div>
</section>
</template>


<style lang="scss">
/** @/pages/Home/Sections/03-Tags.vue */

.home #tags-list {
  --wrapper-background-color: var(--SecondaryContainer);
}

:is(.scale--XXL, .scale--XL, .scale--L) 
.home #tags-list {
  --container-padding-vertical: 40rem;
  --container-padding-sides: var(--contents-side-padding);
  --wrapper-padding: 28rem;
  --wrapper-gap: 22rem;
}
:is(.scale--M) 
.home #tags-list {
  --container-padding-vertical: 36rem;
  --container-padding-sides: var(--contents-side-padding);
  --wrapper-padding: 28rem;
  --wrapper-gap: 22rem;
}
:is(.scale--S) 
.home #tags-list {
  --container-padding-vertical: 30rem;
  --container-padding-sides: var(--contents-side-padding);
  --wrapper-padding: 24rem;
  --wrapper-gap: 20rem;
}
:is(.scale--XS, .scale--XXS) 
.home #tags-list {
  --container-padding-vertical: 0rem;
  --container-padding-sides: 0;
  --wrapper-padding: 28rem 20rem;
  --wrapper-gap: 18rem;
}



.home #tags-list {
  width: 100%;
  padding: 
    var(--container-padding-vertical)
    var(--container-padding-sides);
  background-color: var(--Surface);

  display: flex;
  justify-content: center;

  .wrapper {
    width: var(--contents-container-width);
    height: fit-content;
    padding: var(--wrapper-padding);
    gap: var(--wrapper-gap);
    display: flex;
    flex-direction: column;
    background-color: var(--wrapper-background-color);
  }
}

.home #tags-list .wrapper ul.tags {
  width: 100%;
  height: fit-content;
  gap: 8rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>