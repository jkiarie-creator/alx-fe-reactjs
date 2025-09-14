import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: "Sample Recipe", description: "This is a sample recipe to test the app" }
  ],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (id, updatedRecipe) => set(state => ({ recipes: state.recipes.map(recipe => recipe.id === id ? updatedRecipe : recipe) })),
  setRecipes: (recipes) => set({ recipes })
}));

export { useRecipeStore };