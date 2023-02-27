import { defineStore } from 'pinia'
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import type { Ref } from 'vue';

const SCROLL_SENSOR_TIMER = 1200; //(ms)

export const useInteractionStore = defineStore('interaction', () => {

  const windowScroll = ref(0);

  /**
   * - When user scrolls DOWN : +1
   * - When user scrolls UP : -1
   * - Scroll stops (after 1000ms) : 0
   */
  const scrollSensor = ref(0);
  const sensorTimer : Ref<NodeJS.Timeout| null> = ref(null);
  
  const lastScrollDirection = ref(-1);

  const updateScrollPosition = () => {
    windowScroll.value = window.scrollY;

    // If timer is on, reset it.
    if (sensorTimer.value) {
      clearTimeout(sensorTimer.value);
    }
    // Set new timer when scroll ends.
    sensorTimer.value = setTimeout(function () {
      scrollSensor.value = 0;
    }, SCROLL_SENSOR_TIMER);
  }
  

  watch(windowScroll, (newVal, oldVal) => {
    const diff = newVal - oldVal;
    if (diff > 0) {
      scrollSensor.value = 1;
      lastScrollDirection.value = 1;
    }
    else {
      scrollSensor.value = -1;
      lastScrollDirection.value = -1;
    }
  })


  onMounted(() => {
    window.addEventListener('scroll', updateScrollPosition)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollPosition)
  })

  return {
    windowScroll, 
    scrollSensor,
    lastScrollDirection
  }
})