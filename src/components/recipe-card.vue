<script setup>

import { useDrinksStore } from '../stores/drinks';

const store = useDrinksStore()

defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg shadow"
  >
    <div
      class="overflow-hidden rounded-t-lg bg-gray-200"
    >
      <img 
        class="rounded-t-lg hover:scale-105 transition-transform duration-300 hover:rotate-2" 
        :src="recipe.strDrinkThumb" :alt="recipe.strDrink" />
    </div>
    <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight truncate text-gray-900">
          {{ recipe.strDrink }}
        </h5>
      <button
        type="button"
        @click="store.getRecipe(recipe.idDrink)"
        class="flex items-center justify-center px-3 py-2 text-lg font-medium text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 w-full"
      >
        View details
        <svg
          class="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
