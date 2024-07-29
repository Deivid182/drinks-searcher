<script setup>
import { useFavorites } from '../stores/favorites'
import RecipeCard from '../components/recipe-card.vue'
const favorites = useFavorites()
</script>

<template>
  <h1 class="text-6xl font-extrabold">Recipes</h1>

  <p v-if="favorites.noFavorites" class="text-neutral-400 font-bold">No favorites yet</p>
  <div class="masonry" v-else>
    <RecipeCard v-for="recipe in favorites.favorites" :key="recipe.idDrink" :recipe="recipe" />
  </div>
</template>

<style scoped>
/* masonry layout */
.masonry {
  display: grid;
  gap: 10px;
  margin-top: 2rem;
  padding: 5px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  grid-column-gap: 2rem;
  grid-row-gap: 5rem;
}
</style>
