import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFavorites } from './favorites';
import { useDrinksStore } from './drinks';

export const useModalStore = defineStore('modal', () => {
  
  const favorites = useFavorites()
  const drinks = useDrinksStore()

  const showModal = ref(false)

  function toggleModal() {
    showModal.value = !showModal.value
  }

  const textBtn = computed(() => {
    return favorites.existFavorite(drinks.recipe.idDrink) ? 'Remove' : 'Save'
  })

  const isInFavorites = computed(() => {
    return favorites.existFavorite(drinks.recipe.idDrink)
  })

  return {
    showModal,
    toggleModal,
    textBtn,
    isInFavorites
  }
})