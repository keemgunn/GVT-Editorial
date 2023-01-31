<script setup lang="ts">

const scaleClasses = [
  "item scale--XXS",
  "item scale--XS",
  "item scale--S",
  "item scale--M",
  "item scale--L",
  "item scale--XL",
  "item scale--XXL",
]

</script>

<template>
<div id="view" class="elements">
  
  <header id="main-actions"> Elements </header>

  <main id="elements-main">

    <div class="example-wrapper">
      <div v-for="scale in scaleClasses" id="'elementList'+scale" :class="scale">
        {{ scale.split(" ")[1] }}
        <NavAppButton displayName="home" url="/home" icon="settings"/>
      </div>
    </div>

    <Vector src="@/assets/svg/logo-brand-main.svg"/>

  </main>

  <footer id="other-actions"></footer>

</div>
</template>

<style lang="scss">
  .elements main {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .example-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 12rem;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6rem;
        padding: 10rem;
        border: solid 1rem black;
      }
    }
  }

  #elements-main .vector svg {
    width: 160rem;
    height: 160rem;
    path { fill: var(--Primary); }
  }
  
</style>