<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';

const props = defineProps<{
  name?: string,
  iconType?: 'material' | 'svg';
  size?: number,
  fill?: boolean,
  class?:string
}>();

const iconComponent = (() => {
  if (props.iconType)  
    return props.iconType
  else
    return 'material'
})();

const containerClass = computed(() => {
  switch (props.iconType) {
    case 'svg':
      return 'icon-svg'
      break;
    default:
      return 'icon'
      break;
  }
})

const containerStyle = computed(() => {
  return {
    width: `${props.size}rem`,
    height: `${props.size}rem`,
    "font-size": `${props.size}rem`,
  }
})

const spanStyle = computed(() => {
  return {
    "font-size": `${props.size}rem`,
    "font-variation-settings": `"opsz" ${props.size}, "FILL" ${props.fill ? 1 : 0}, "wght" 500, "GRAD" 0`
  }
})

const iconSrc = ref("");
function getSvgIconSource() {
  const svg = import(`../../assets/svgIcons/icon-${props.name}.svg`);
  svg.then((location) => {
    iconSrc.value = location.default;
  }).catch((err) => {
    console.error(err);
  })
}
if (iconComponent === 'svg') {
  getSvgIconSource();
}

</script>


<template>
<div v-if="props.name?.length"
:class="containerClass" 
:style="containerStyle">

  <span v-if="iconComponent === 'material'"
  class="material-symbols-rounded" 
  :style="spanStyle">
    {{ props.name }}
  </span>

  <Vector v-if="iconComponent === 'svg'"
  :src="iconSrc"/>

</div>
</template>


<style lang="scss">
.icon-svg {
  .vector, svg{
    width: 100% !important; height: 100% !important;
  }
}
</style>