<script setup lang=ts>
import { onMounted } from 'vue';

const links = [
  '/dev/colorscheme',
]

onMounted(() => {
  setTimeout(() => {
    document.body.classList.forEach((className) => {
      document.body.classList.remove(className);
    })
  }, 500);
})

</script>


<template>
  <header id="dev-nav">
    <nav>
      <ul class="dev-links">
        <li class="dev-link" v-for="link in links" :id="`devlink-${link}`">
          <RouterLink :to="link" :class="`typo-caption-16`">
            {{ link }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
#dev-nav {
  width: 100%;
  height: fit-content;
  nav {
    width: 100%;
    height: fit-content;
  }
  background-color: rgb(255, 255, 255);
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
}
#dev-page {
  padding: 24rem;
}
#dev-nav .dev-links {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 16rem;
  .dev-link {
    width: fit-content;
    height: fit-content;
    color: black;
    border: 2px solid rgb(21, 227, 21);
    padding: 6rem 10rem;
  }
  .dev-link:hover {
    background-color: rgb(21, 227, 21);
  }
}

#app #dev-container {

  #toaster {
    .toast {
      .plate .plane {
        background-color: rgb(0, 255, 0);
      }
    }
  }

}


</style>