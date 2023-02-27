import { onMounted, ref } from "vue";

export function useOverflowDetector(direction: 'X' | 'Y', elementId: string) {
  
  const overflowState = ref(false);
  
  function detectOverflow(direction: 'X' | 'Y', element: Element) {
    if (direction === 'X') {
      overflowState.value = element.scrollWidth > element.clientWidth;
    }
    else {
      overflowState.value = element.scrollHeight > element.clientHeight;
    }
  }

  onMounted(() => {
    const element = document.getElementById(elementId);

    if (element !== null) {
      detectOverflow(direction, element);
      window.addEventListener("resize", () => {
        detectOverflow(direction, element)
      });
    }
    else {
      console.warn(`useOverflowDetector - NO ELEMENT FOUND NAMED #${elementId}`);
    }
  })

  return overflowState
}