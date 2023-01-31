import { customRef } from "vue";

export default function (key:string, defaultValue:string) {
  return customRef((track, trigger) => ({
      get: () => {
          track()
          const value = localStorage.getItem(key)
          return value ? value : defaultValue
      },
      set: value => {
          localStorage.setItem(key, JSON.stringify(value))
          trigger()
      },
  }))
}

// YourComponent.vue
// import useLocalStorage from './useLocalStorage'
// const publicKey = useLocalStorage('app-public-key', 'default value')

