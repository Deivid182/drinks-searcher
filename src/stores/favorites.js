import { defineStore } from "pinia";
import { useDrinksStore } from "./drinks";
import { useModalStore } from "./modal";
import { useNotificationsStore } from "./notifications";
import { ref, watch, onMounted, computed } from "vue";

export const useFavorites = defineStore('favorites', () => {

  const drinks = useDrinksStore();
  const modal = useModalStore();
  const notifications = useNotificationsStore();
  const favorites = ref([]);

  onMounted(() => {
    favorites.value = getFavoritesLS();
  })

  watch(favorites, () => {
    syncLS()
  }, {
    deep: true
  })

  function getFavoritesLS() {
    return JSON.parse(localStorage.getItem('favorites')) ?? []
  }

  function syncLS () {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  
  function existFavorite() {
    const favoritesLS = getFavoritesLS();
    return favoritesLS.some(favorite => favorite.idDrink === drinks.recipe.idDrink);
  }

  function removeFavorite () {
    favorites.value = favorites.value.filter(favorite => favorite.idDrink!== drinks.recipe.idDrink);
    notifications.show = true
    notifications.text = 'Removed from favorites'
  }

  function addFavorite() {
    favorites.value.push(drinks.recipe)
    notifications.show = true
    notifications.text = 'Saved to favorites'
  }

  
  function handleClickFavorite () {
    if(existFavorite()) {
      removeFavorite()
    } else {
      addFavorite();
    }
    modal.showModal = false
  }

  const noFavorites = computed(() => {
    return favorites.value.length === 0
  })

  return {
    handleClickFavorite,
    favorites,
    existFavorite,
    noFavorites
  }
})