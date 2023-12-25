<script setup>
  import Heading from '../components/heading.vue';
import RecipeCard from '../components/recipe-card.vue';
import { useDrinksStore } from '../stores/drinks';

const store = useDrinksStore();

</script>

<template>
  <div class="space-y-6 mt-4">
    <Heading>
      Drinks
    </Heading>
    <div 
      v-if="store.recipes.length !== 0"
      class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 pb-6">
      <RecipeCard
        v-for="drink in store.recipes"
        :key="drink.idDrink"
        :recipe="drink"
      />
    </div>
  </div>
</template>

