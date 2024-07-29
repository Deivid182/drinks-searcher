import { defineStore } from 'pinia';
import { computed, onMounted, reactive, ref } from 'vue';
import DrinkService from '../services/DrinkService';
import { useModalStore } from './modal';

export const useDrinksStore = defineStore('drinks', () => {
  const categories = ref([]);

  const recipes = ref([]);
  const recipe = ref({})
  const modalStore = useModalStore()

  const search = reactive({
    category: '',
    name: ''
  })

  onMounted(() => {
    const getCategories = async () => {
      const response = await DrinkService.getCategories()
      categories.value = response.data.drinks
    }

    getCategories();
  })

  async function getRecipes() {
    const response = await DrinkService.getRecipes(search)
    recipes.value = response.data.drinks
  }

  async function getRecipe(id) {
    const { data: { drinks } } = await DrinkService.getRecipe(id)
    recipe.value = drinks[0]

    modalStore.toggleModal()
  }

  const noRecipes = computed(() => {
    return recipes.value.length === 0
  })

  return {
    categories,
    search,
    getRecipes,
    getRecipe,
    recipes,
    recipe,
    noRecipes
  }
})