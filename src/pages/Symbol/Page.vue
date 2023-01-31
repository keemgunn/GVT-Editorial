<script setup lang="ts">
</script>

<template>
<div id="view" class="material-symbol">

  <header id="main-actions"> Material Symbol </header>

  <main>
    <Icon name="home" :size='32'/>
  </main>

  <footer id="other-actions"></footer>

</div>
</template>

<style lang="scss">
  .material-symbol main {
    overflow-y: scroll;

    p {
      background-color: #ffffff71;
    }
  }
</style>