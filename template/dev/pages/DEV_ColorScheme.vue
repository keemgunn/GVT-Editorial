<script setup lang="ts">
import { ref } from 'vue';
import { useDevColorSchemeStore } from '../colorSchemeEditor/store';
import { useToaster } from '#/components/Toaster/useToaster';
import { copyText } from '#/helpers/userActions';
import DEV_ColorGrade from '../colorSchemeEditor/DEV_ColorGrade.vue';
import DEV_ColorChip from '../colorSchemeEditor/DEV_ColorChip.vue';
import { arrayFromNum } from '#/helpers/array';

const schemes: Array<'light' | 'dark'> = ['light', 'dark'];
const store = useDevColorSchemeStore();
const toaster = useToaster();

function copyStylesheet() {
  const styleObject =
    JSON.stringify(store.schemeStyles, null, 1)
      .replace(/\"/gi, '')
      .replace(/,/gi, ';')
      .replace(/};/gi, '}')
      .replace(/\n }/gi, ';\n }')
      .replace(/{\n light/gi, 'light')
      .replace(/ }\n /gi, '}\n')
      .replace(/ }\n}/gi, '}')
      .replace(/: {/gi, ' {')
      .replace(/light/gi, '__light__')
      .replace(/dark/gi, '__dark__')
      .replace(/light/gi, '.theme--default-light')
      .replace(/dark/gi, '.theme--default-dark')
    ;
  copyText(styleObject);
  toaster.toast(`STYLESHEET COPIED`);
}

function copyColorInfo() {
  const colorInfoObject = {
    PIVOT_COLORS: { ...store.pivotColors },
    COLOR_GRADES: { ...store.colorGrades },
    COLOR_SELECTION: {...store.colorSelection}
  }
  copyText(JSON.stringify(colorInfoObject, null, 2));
  toaster.toast(`SAVE COPIED JSON STRING TO : @/styles/editedColorScheme.json`);
}


</script>


<template>
  <main id="dev-page" class="colorscheme">
    <header class="actions">
      <h1 id="page-title" class="typo-header-32"> 
        Color Grade Editor
      </h1>

      <Button class="action facebook"
        toolTip="Copy Stylesheet"
        icon="file_copy"
        text="Copy Stylesheet"
        :size="14"
        accentColor="rgb(21, 227, 21)"
        textColor="black"
        :roundness="1"
        :onMouseClickHook="copyStylesheet"
      />

      <Button class="action facebook"
        toolTip="SAVE COPIED JSON STRING TO : @/styles/editedColorScheme.json"
        icon="storage"
        text="Copy Color Information"
        :size="14"
        accentColor="#ff2a00"
        textColor="white"
        :roundness="1"
        :onMouseClickHook="copyColorInfo"
      />
    </header>

    <section id="color-grades">
      <div class="colorgrade-item"
      v-for="category in store.COLOR_CATEGORIES" 
      :id="`colorCategory-${category}`">
        <DEV_ColorGrade :categoryName="category"/>
      </div>
    </section>

    <section id="color-roles">

      <div class="schemes"
      v-for="scheme in schemes" 
      :id="`scheme-${scheme}`"
      :style="store.schemeStyles[scheme]">
        <ul class="list-roletypes">
          <li class="roletype"
          v-for="roleType in store.ROLE_TYPES"
          :id="`item-roletype-${roleType}`">
            <ol class="list-roles">
              <li class="role"
              v-for="index in arrayFromNum(store.COLOR_ROLES[roleType].length)" :id="`item-role-${roleType}-${index}`"
              >
                <DEV_ColorChip
                  :scheme="scheme"
                  :roleType="roleType"
                  :roleIndex="index"
                />
              </li>
            </ol>
          </li>
        </ul>
      </div>


    </section>
    
  </main>
</template>


<style lang="scss">
#page-title { margin-bottom: 20rem; }

#dev-page.colorscheme {
  display: flex;
  flex-direction: column;
  gap: 20rem;
  background-color: #cecece;

  header.actions {
    display: flex;
    flex-direction: row;
    gap: 16rem;
  }
}

#color-grades {
  display: flex;
  flex-direction: column;
  gap: 8rem;

  .colorgrade-item {
    .category-title {
      margin-bottom: 4rem;
    }
  }
}

#color-roles {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 20rem;

  .schemes {
    width: 840rem;
    height: 1000rem;
    
    .list-roletypes {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;

      .roletype {
        flex-grow: 1;

        .list-roles {
          height: 100%;
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          
        }
      }

    }
  }
}


</style>