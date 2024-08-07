<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot, DialogTitle } from '@headlessui/vue'
import { useModalStore } from '../stores/modal'
import { useDrinksStore } from '../stores/drinks'
import { useFavorites } from '../stores/favorites';

const modal = useModalStore()
const drinks = useDrinksStore()
const favorites = useFavorites()

const formatIngredients = () => {
  const ingredientsDiv = document.createElement('div')

  for (let i = 1; i <= 15; i++) {
    if (drinks.recipe[`strIngredient${i}`]) {
      const ingredient = drinks.recipe[`strIngredient${i}`]
      const measure = drinks.recipe[`strMeasure${i}`]

      const ingredientQty = document.createElement('div')
      ingredientQty.classList.add('text-lg')
      ingredientQty.textContent = `${ingredient} - ${measure}`

      ingredientsDiv.appendChild(ingredientQty)
    }
  }
  return ingredientsDiv
}
</script>

<template>
  <TransitionRoot as="template" :show="modal.showModal">
    <Dialog as="div" class="relative z-10" @close="modal.toggleModal()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div>
                <div class="mt-3">
                  <DialogTitle as="h1" class="text-gray-900 text-4xl font-extrabold my-5">
                    {{ drinks.recipe.strDrink }}
                  </DialogTitle>
                  <img
                    :src="drinks.recipe.strDrinkThumb"
                    class="mx-auto size-80"
                    :alt="drinks.recipe.strDrink + 'image'"
                  />
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Ingredients and Measures
                  </DialogTitle>
                  <div v-html="formatIngredients().outerHTML"></div>
                  <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                    Instructions
                  </DialogTitle>
                  <p class="text-gray-500 text-lg">{{ drinks.recipe.strInstructions }}</p>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 flex justify-end gap-4">
                <button
                  @click="favorites.handleClickFavorite"
                  type="button"
                  class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 flex gap-2 items-center"
                >
                  <img v-if="modal.isInFavorites" src="/img/remove.svg" alt="Remove from favorites" width="24" height="24" />
                  <img v-else src="/img/save.svg" alt="Save to favorites" width="24" height="24" />
                  <span>{{ modal.textBtn }}</span>
                </button>
                <button
                  @click="modal.toggleModal"  
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
