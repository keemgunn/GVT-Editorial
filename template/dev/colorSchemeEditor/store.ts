import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue';
import Color from 'color';
import { arrayFromNum } from '#/helpers/array';
import { removeSpace } from '#/helpers/strings';


// LOAD SAVED DATA ========================

const savedData = import.meta.glob('@/styles/editedColorScheme.json', { eager: true, import: 'default' })

const editedColorScheme =
  savedData['/src/styles/editedColorScheme.json'] ?
    savedData['/src/styles/editedColorScheme.json'] as any :
    undefined;


// DEFAULTS ===============================

const GRADE_LEVELS = 15;
const PIVOT_LUMINOSITY = 50;

const COLOR_CATEGORIES = [
  'Primary',
  'Secondary',
  'Tertiary',
  'Neutral',
  'NeutralVariant',
]

const ROLE_TYPES = [
  'Primary', 'Secondary', 'Tertiary',
  'Surface', 'SurfaceVariant', 'Background'
]

const ROLE_MATCH:any = {
  Primary:
    ['Primary', 'Primary', 'Primary', 'Primary'],
  Secondary:
    ['Secondary', 'Secondary', 'Secondary', 'Secondary'],
  Tertiary:
    ['Tertiary', 'Tertiary', 'Tertiary', 'Tertiary'],
  Surface:
    ['Neutral', 'Primary'],
  SurfaceVariant:
    ['NeutralVariant', 'NeutralVariant'],
  Background: 
    ['Neutral', 'Neutral'],
}

const COLOR_ROLES: any = {
  Primary: [
    'Primary',
    'On Primary',
    'Primary Container',
    'On Primary Container'
  ],
  Secondary: [
    'Secondary',
    'On Secondary',
    'Secondary Container',
    'On Secondary Container'
  ],
  Tertiary: [
    'Tertiary',
    'On Tertiary',
    'Tertiary Container',
    'On Tertiary Container'
  ],
  Surface: [
    'Surface',
    'On Surface',
  ],
  SurfaceVariant: [
    'Surface Variant',
    'On Surface Variant',
  ],
  Background: [
    'Background',
    'On Background',
  ],
}

const DEFAULT_SELECTIONS:any = {
  light: {
    Primary: [60, 130, 120, 30],
    Secondary: [60, 130, 120, 30],
    Tertiary: [60, 130, 120, 30],
    Surface: [140, 10],
    SurfaceVariant: [130, 10],
    Background: [130, 10],
  },
  dark: {
    Primary: [70, 20, 30, 120],
    Secondary: [70, 20, 30, 120],
    Tertiary: [70, 20, 30, 120],
    Surface: [10, 130],
    SurfaceVariant: [10, 130],
    Background: [0, 120],
  },
}


const GRADE_ARR =
  arrayFromNum(GRADE_LEVELS)
    .map((value) => value * 10);
const level_center = Math.floor(GRADE_LEVELS / 2);

function getColorGrades(pivotHue: number, pivotSat: number) {
  const result: Record<number, Color> = {};

  const gradeArrBefore =
    GRADE_ARR.slice(0, level_center).reverse();
  const beforeLumShift = 100 - PIVOT_LUMINOSITY;
  const berforeCount = gradeArrBefore.length;
  for (let i = 0; i < berforeCount; i++) {
    result[gradeArrBefore[i]] = Color([
      pivotHue,
      pivotSat,
      PIVOT_LUMINOSITY - (beforeLumShift * (i + 1) / berforeCount)
    ], 'hsl')
  }

  const gradeArrAfter =
    GRADE_ARR.slice(level_center);
  const afterLumShift = 100 - PIVOT_LUMINOSITY;
  const afterCount = gradeArrAfter.length;
  for (let i = 0; i < afterCount; i++) {
    result[gradeArrAfter[i]] = Color([
      pivotHue,
      pivotSat,
      PIVOT_LUMINOSITY + (afterLumShift * (i) / (afterCount - 1))
    ], 'hsl')
  }

  return result
}



export const useDevColorSchemeStore = defineStore('dev_colorscheme', () => {

  // ============= CORE ===================

  const pivotColors = ref((() => {
    const result: any = {};
    COLOR_CATEGORIES.forEach((name) => {
      result[name] = {
        hue: Math.floor(Math.random() * 359),
        saturation: 88
      };
    })
    return result as Record<string, PivotColor>
  })())

  const colorSelection:Ref<any> = ref(DEFAULT_SELECTIONS);


  // ============= COMPUTED ===================

  const colorGrades = computed(() => {
    const result: any = {};
    COLOR_CATEGORIES.forEach((colorCategory) => {
      const hue = pivotColors.value[colorCategory].hue;
      const saturation = pivotColors.value[colorCategory].saturation;
      result[colorCategory] = getColorGrades(hue, saturation);
    })
    return result as Record<string, Record<number, Color>>
  })

  const selectedHex = ref("");

  const schemeStyles = computed(() => {
    const result: any = {};
    result['light'] = {};
    result['dark'] = {};

    ROLE_TYPES.forEach((roleType) => {
      let index = 0;
      (COLOR_ROLES[roleType] as Array<string>).forEach((role) => {
        const colorCategory = ROLE_MATCH[roleType][index];

        let level = colorSelection.value['light'][roleType][index];
        result['light'][`--${removeSpace(role)}`] = colorGrades.value[colorCategory][level].hex();

        level = colorSelection.value['dark'][roleType][index];
        result['dark'][`--${removeSpace(role)}`] = colorGrades.value[colorCategory][level].hex();

        index = index + 1;
      })
    })

    return result as Record<'light' | 'dark', Record<string, string>>
  })



  // LOAD SAVED DATA =========================

  if (editedColorScheme) {
    if (editedColorScheme.PIVOT_COLORS) {
      pivotColors.value = editedColorScheme.PIVOT_COLORS;
    }
  
    if (editedColorScheme.COLOR_SELECTION) {
      colorSelection.value = editedColorScheme.COLOR_SELECTION;
    }
  }

  return {
    GRADE_LEVELS, 
    GRADE_ARR,
    COLOR_CATEGORIES,
    ROLE_TYPES,
    ROLE_MATCH,
    COLOR_ROLES,
    selectedHex,
    pivotColors,
    colorGrades,
    colorSelection,
    schemeStyles
  }
})
