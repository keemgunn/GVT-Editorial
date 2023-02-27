import { onMounted, onBeforeUnmount, ref } from "vue";


export function useScrollPosition() {

  const scrollPosition = ref(0);

  const updateScrollPosition = () => {
    scrollPosition.value = window.scrollY
    // console.warn(scrollPosition.value);
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScrollPosition)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollPosition)
  })

  return {
    scrollPosition
  }
}