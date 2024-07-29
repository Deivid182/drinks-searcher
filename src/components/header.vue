<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDrinksStore } from '../stores/drinks';
import { useNotificationsStore } from '../stores/notifications';
import Container from './container.vue';

const route = useRoute()
const store = useDrinksStore()
const notifications = useNotificationsStore()


const handleSubmit = async () => {
  if(Object.values(store.search).includes('')) {
    notifications.$patch({
      text: 'Please fill in all fields',
      show: true,
      error: true
    })
    return
  }
  // TODO: Add validations
  await store.getRecipes()
}

const isHome = computed(() => {
  return route.name === 'home'
})
</script>

<template>
  <header :class="{ header: isHome }" class="bg-slate-800">
    <Container>
      <div class="space-y-8 px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <RouterLink :to="{ name: 'home' }">
              <img src="/img/logo.svg" alt="logo" class="w-32" />
            </RouterLink>
          </div>
          <nav class="flex max-sm:flex-col items-center gap-4">
            <RouterLink
              class="text-white font-bold hover:text-orange-400"
              active-class="text-orange-400"
              :to="{ name: 'home' }"
            >
              Home
            </RouterLink>
            <RouterLink
              class="text-white font-bold hover:text-orange-400"
              active-class="text-orange-400"
              :to="{ name: 'favorites' }"
            >
              Favorites
            </RouterLink>
          </nav>
        </div>
        <form
          @submit.prevent="handleSubmit"
          v-if="isHome"
          class="space-y-6 shadow-md rounded-lg p-8 bg-orange-500 md:w-1/2 2xl:w-1/3"
        >
          <div class="space-y-4">
            <label class="block text-sm font-medium text-white" for="ingredient"
              >Name or ingredient</label
            >
            <input
              class="p-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
              type="text"
              id="ingredient"
              placeholder="e.g. vodka, tequila, gin"
              v-model="store.search.name"
            />
          </div>
          <div class="space-y-4">
            <label class="block text-sm font-medium text-white" for="category">Category</label>
            <select
              class="p-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:outline-none"
              id="category"
              placeholder="e.g. vodka, tequila, gin"
              v-model="store.search.category"
            >
              <option value="">Select Category</option>
              <option
                v-for="category in store.categories"
                :key="category.strCategory"
                :value="category.strCategory"
              >
                {{ category.strCategory }}
              </option>
            </select>
          </div>
          <button
            class="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Search
          </button>
        </form>
      </div>
    </Container>
  </header>
</template>

<style>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
