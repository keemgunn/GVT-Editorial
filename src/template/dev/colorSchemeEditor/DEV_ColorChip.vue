<script setup lang=ts>
import { removeSpace } from '@/template/helpers/strings';
import { defineProps, computed } from 'vue'; 
import { useDevColorSchemeStore } from '../colorSchemeEditor/store';

const store = useDevColorSchemeStore();
const props = defineProps<{
  scheme: 'light' | 'dark';
  roleType: string; // Primary | Surface
  roleIndex: number // 0 1 2 3
}>();

const roleName = computed(() => store.COLOR_ROLES[props.roleType][props.roleIndex] as string);
// Primary | OnPrimary | ...

const colorCategory = computed(() => store.ROLE_MATCH[props.roleType][props.roleIndex]);
  // Primary | Neutral | ...
const colorLevel = computed(() => store.colorSelection[props.scheme][props.roleType][props.roleIndex]);
  // 0 | 10 | 20 | 30 | 40 .....

const colorObject = computed(() => {
  return store.colorGrades[colorCategory.value][colorLevel.value]
});
const hexCode = computed(() => colorObject.value.hex());

const ST_chip = computed(() => {
  const thisColor = removeSpace(roleName.value);
  if (roleName.value.includes('On')) {
    const otherColor = thisColor.replace('On', '');
    return {
      'background-color': `var(--${thisColor})`,
      'color': `var(--${otherColor})`,
    }
  } else {
    const otherColor = 'On' + thisColor;
    return {
      'background-color': `var(--${thisColor})`,
      'color': `var(--${otherColor})`,
    }
  }
})

const maxLevel = (store.GRADE_LEVELS - 1) * 10;
const minLevel = 0;
function changeLevel(direction: 'plus' | 'minus') {
  if ((colorLevel.value >= maxLevel) && (direction === 'plus'))
    return
  if ((colorLevel.value <= minLevel) && (direction === 'minus'))
    return

  if (direction === 'plus') {
    store.colorSelection[props.scheme][props.roleType][props.roleIndex] = colorLevel.value + 10;
  } else {
    store.colorSelection[props.scheme][props.roleType][props.roleIndex] = colorLevel.value - 10;
  }
}

</script>

<template>
<div class="dev-colorchip" :style="ST_chip">
  <h1 class="role-name typo-header-20">
    {{ roleName }}
  </h1>
  
  <div class="info">
    <p class="color-grade typo-caption-16">
      {{ colorCategory }}
    </p>

    <div class="action">
      <IconButton class="close-button"
        icon="do_not_disturb_on" 
        :size="20" 
        :fill="true"
        color="var(--text-color)"
        tootip="Decrease Level"
        @click="changeLevel('minus')"
      />
      <span class="color-grade typo-caption-16">
      {{ colorLevel }}
      </span>
      <IconButton class="close-button"
        icon="add_circle" 
        :size="20" 
        :fill="true"
        color="var(--text-color)"
        tootip="Increase Level"
        @click="changeLevel('plus')"
      />
    </div>

    <p class="color-hexcode typo-caption-16">
      {{ hexCode }}
    </p>
  </div>
</div>
</template>

<style lang="scss">
.dev-colorchip {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: space;
  justify-content: space-between;
  padding: 12rem;
  .info {
    display: flex;
    flex-direction: column;
    gap: 6rem;

    .action {
      display: flex;
      flex-direction: row;
      align-content: center;
      gap: 4rem;
    }
  }
  
}
</style>