import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore('notifications', () => {
  const text = ref('')
  const error = ref(false)
  const show = ref(false)

  watch(show, () => {
    if(show.value) {
      setTimeout(() => {
        show.value = false
        error.value = false
        text.value = ''
      }, 3000)
    }
  })

  return {
    text,
    error,
    show
  }
})