<script setup lang=ts>
import { arrayFromNum } from '#/helpers/array';
import { ref, defineProps, computed } from 'vue';
import Color from 'color';
import Slider from '@vueform/slider'
import { useToaster } from '#/components/Toaster/useToaster';
import { copyText } from '#/helpers/userActions';
import { useDevColorSchemeStore } from './store';

const store = useDevColorSchemeStore();
const props = defineProps<{
  categoryName: string;
}>();

const pivotHex = ref("");

const pivotColor = computed(() => store.pivotColors[props.categoryName]);
const grades = computed(() => store.colorGrades[props.categoryName]);

const toaster = useToaster();
function copyHex(hex:string) {
  copyText(hex);
  store.selectedHex = hex;
  toaster.toast(`COPIED: ${hex}`);
}

const sliderValues: Array<'hue' | 'saturation'>
  = ['hue', 'saturation'];

const MAX_VALUES = {
  hue: 359,
  saturation: 100
}

function changeValue(type: 'hue' | 'saturation', direction: 'plus' | 'minus') {
  if (type === 'hue') {
    if ((pivotColor.value.hue >= MAX_VALUES.hue) && (direction === 'plus'))
      return
    if ((pivotColor.value.hue <= 0) && (direction === 'minus'))
      return
    if (direction === 'plus') {
      store.pivotColors[props.categoryName].hue = pivotColor.value.hue + 1;
    } else {
      store.pivotColors[props.categoryName].hue = pivotColor.value.hue - 1;
    }
  }
  else {
    if ((pivotColor.value.saturation >= MAX_VALUES.saturation) && (direction === 'plus'))
      return
    if ((pivotColor.value.saturation <= 0) && (direction === 'minus'))
      return
    if (direction === 'plus') {
      store.pivotColors[props.categoryName].saturation = pivotColor.value.saturation + 1;
    } else {
      store.pivotColors[props.categoryName].saturation = pivotColor.value.saturation - 1;
    }
  }
}

</script>


<template>
<div class="dev-colorgrade-header">
  <h2 class="category-title typo-header-20">
    {{ categoryName }}
  </h2>
</div>

<div class="dev-colorgrade">

  <div class="slider-wrapper">
    <div class="slider-item"
    v-for="valueName in sliderValues" :id="`colorgrade-slider-item-${valueName}`">

      <div class="actions">
        <IconButton class="close-button"
          icon="do_not_disturb_on" 
          :size="20" :fill="true"
          color="var(--text-color)"
          tootip="Increase Level"
          @click="changeValue(valueName, 'minus')"
        />
        <span class="typo-caption-14--bold">{{ valueName }} {{ pivotColor[valueName] }}</span>
        <IconButton class="close-button"
          icon="add_circle" 
          :size="20" :fill="true"
          color="var(--text-color)"
          tootip="Increase Level"
          @click="changeValue(valueName, 'plus')"
        />
      </div>

      <Slider :class="`slider-${valueName}`"
      :lazy="false"
      v-model="pivotColor[valueName]" :min="0" :max="MAX_VALUES[valueName]"
      showTooltip="drag"/>
    </div>
  </div>

  <ol class="grades">
    <li class="grade" 
    v-for="grade in store.GRADE_ARR" 
    @click="copyHex(grades[grade].hex())"
    :id="`grade-${props.categoryName}-${grade}`"
    :style="{
      'background-color' : `${grades[grade].hex()}`,
      'color': `${grades[grade].isDark() ? '#ffffff' : '#000000'}`
    }">
      <span class="info-level 
      typo-caption-16--bold"> 
        {{ grade }} 
      </span>
      <span class="info-hex
      typo-caption-16"> 
        {{ grades[grade].hex() }} 
      </span>
      <span class="info-h
      typo-caption-14"> 
        H:{{ grades[grade].hsl().array()[0] }} 
      </span>
      <span class="info-s
      typo-caption-14"> 
        S:{{ grades[grade].hsl().array()[1] }} 
      </span>
      <span class="info-l
      typo-caption-14"> 
        L:{{ Math.floor(grades[grade].hsl().array()[2]) }} 
      </span>
    </li>
  </ol>

</div>
</template>


<style lang="scss">
.dev-colorgrade-header {
  display: flex;
  flex-direction: row;
  gap: 12rem;
  height: fit-content;
  margin-bottom: 4rem;
}

.dev-colorgrade {
  --box-size: 112rem;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 24rem;

  .slider-wrapper {
    width: calc(var(--box-size) * 2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16rem;
    padding: 4rem 0 24rem 0;
    --slider-bg: #000000;
    --slider-connect-bg: #ffffff;
    --slider-tooltip-bg: #1eea13;
    --slider-handle-ring-color: #2fff0030;
    --slider-tooltip-color: #000;

    .slider-item {
      display: flex;
      flex-direction: column;
      gap: 8rem;
      .actions {
        display: flex;
        flex-direction: row;
        align-content: center;
        gap: 4rem;
      }
    }
  }

  ol.grades {
    display: flex;
    flex-direction: row;
    gap: 4rem;
    li.grade {
      width: var(--box-size);
      height: var(--box-size);
      display: flex;
      flex-direction: column;
      padding: 8rem;
      user-select: none;
      transition: 40ms;
    }
    li.grade:hover {
      cursor: pointer;
      transform: scale(1.08);
    }
  }

}
</style>