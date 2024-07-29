<script setup>
import Heading from '../components/heading.vue'
import RecipeCard from '../components/recipe-card.vue'
import { useDrinksStore } from '../stores/drinks'

const drinks = useDrinksStore()
console.log(drinks.noRecipes)
</script>

<template>
  <div class="space-y-6 mt-4">
    <Heading> Drinks </Heading>
    <p v-if="drinks.noRecipes" class="text-center text-4xl text-neutral-400 font-bold">No recipes to show, fill up the form</p>
    <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 pb-6">
      <RecipeCard v-for="drink in drinks.recipes" :key="drink.idDrink" :recipe="drink" />
    </div>
  </div>
</template>
