<template>
  <div id="sample-container">
    <div class="comp-sample scale--XXS">
      <p>XXS</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--XS">
      <p>XS</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--S">
      <p>S</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--M">
      <p>M</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--L">
      <p>L</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--XL">
      <p>XL</p>
      <slot></slot>
    </div>
    <div class="comp-sample scale--XXL">
      <p>XXL</p>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
  #sample-container {
    display: flex;
    gap: 20rem;
    padding: 100rem 0;
  }
  .comp-sample {
    height: 200rem;
    p { padding: 20rem; }
  }
</style>