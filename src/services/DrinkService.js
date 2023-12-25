import api from '../lib/api';

export default {
  getCategories: async () => {
    return api('/list.php?c=list')
  },
  getRecipes: async ({ category, name }) => {
    return api(`/filter.php?c=${category}&i=${name}`)
  },
  getRecipe: async (id) => {
    return api(`/lookup.php?i=${id}`)
  }
}