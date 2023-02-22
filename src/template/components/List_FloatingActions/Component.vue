<script setup lang="ts">





function test(event: Event) {
  console.log('hello');
  console.log(event);
}

</script>


<template>
<div class="list-floating-actions">


  <Button
  :size="16" 
  buttonStyle="outlined" 
  icon="home" 
  text="home" 
  :roundness="1"
  />



</div>
</template>


<style lang="scss">

.list-floating-actions {
  position: fixed;
  right: 20rem;
  bottom: 40rem;
  padding: 60rem;

  display: flex;
  flex-direction: column;

  z-index: 50;

}

</style>