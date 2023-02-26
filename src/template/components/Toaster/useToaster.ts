import { defineStore } from 'pinia'
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';

import type { Ref } from 'vue';

const TOAST_TIMER = 3000; //(ms)

export const useToaster = defineStore('toaster', () => {

  const toastItems: Ref<Array<ToastData>> = ref([
  
    // {
    //   id: crypto.randomUUID(),
    //   type: 'alert',
    //   message: 'test - alert',
    //   timer: true
    // } satisfies ToastData,
    // {
    //   id: crypto.randomUUID(),
    //   type: 'message',
    //   message: 'test - message',
    //   timer: true
    // } satisfies ToastData,
    // {
    //   id: crypto.randomUUID(),
    //   type: 'error',
    //   message: 'test - error',
    //   timer: false
    // } satisfies ToastData,
    // {
    //   id: crypto.randomUUID(),
    //   type: 'warning',
    //   message: 'test - warning',
    //   timer: false
    // } satisfies ToastData,
    // {
    //   id: crypto.randomUUID(),
    //   type: 'positive',
    //   message: 'test - positive',
    //   timer: false
    // } satisfies ToastData,

  ]);


  function removeToast(id: string) {
    toastItems.value = toastItems.value.filter((data) => (
      data.id !== id
    ))
  }

  function setToastTimer(id: string) {
    setTimeout(() => {
      removeToast(id);
    }, TOAST_TIMER)
  }

  console.warn(crypto);
  
  function toast(message: string, type: ToastType = 'message', timer: boolean = true) {
    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      type: type,
      timer: timer
    } satisfies ToastData
    toastItems.value.push(newToast);
    if (timer) {
      setToastTimer(newToast.id);
    }
  }

  return {
    items: toastItems,
    toast,
    removeToast
  }
})