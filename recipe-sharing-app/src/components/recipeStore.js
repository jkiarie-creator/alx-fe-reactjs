import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
  // Initialize filteredRecipes with all recipes
  initializeFilteredRecipes: () => set(state => ({ 
    filteredRecipes: state.recipes 
  })),
  
  // Add recipe and update filtered list
  addRecipe: (newRecipe) => set(state => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return { 
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  // Delete recipe and update filtered list
  deleteRecipe: (id) => set(state => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    const updatedFavorites = state.favorites.filter(favId => favId !== id);
    return { 
      recipes: updatedRecipes,
      favorites: updatedFavorites,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  // Update recipe and update filtered list
  updateRecipe: (id, updatedRecipe) => set(state => {
    const updatedRecipes = state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return { 
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    };
  }),
  
  setRecipes: (recipes) => set({ 
    recipes,
    filteredRecipes: recipes
  }),
  
  // Set search term and filter recipes
  setSearchTerm: (term) => set(state => {
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    return { 
      searchTerm: term,
      filteredRecipes: filtered
    };
  }),
  
  // Manual filter function (if needed)
  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
  })),
  
  // Favorites functionality
  addToFavorites: (recipeId) => set(state => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  
  removeFromFavorites: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId);
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),
  
  isFavorite: (recipeId) => {
    const state = get();
    return state.favorites.includes(recipeId);
  },
  
  // Get favorite recipes - FIXED: Don't call this during render
  getFavoriteRecipes: () => {
    const state = get();
    return state.recipes.filter(recipe => state.favorites.includes(recipe.id));
  },
  
  // Generate recommendations based on favorites - FIXED
  generateRecommendations: () => set(state => {
    try {
      if (state.favorites.length === 0) {
        // If no favorites, recommend most recent recipes
        const recentRecipes = state.recipes
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);
        return { recommendations: recentRecipes };
      }
      
      // Get favorite recipes
      const favoriteRecipes = state.recipes.filter(recipe => 
        state.favorites.includes(recipe.id)
      );
      
      // Simple recommendation algorithm based on keywords in titles
      const favoriteKeywords = favoriteRecipes
        .flatMap(recipe => recipe.title.toLowerCase().split(' '))
        .filter(word => word.length > 3)
        .reduce((acc, word) => {
          acc[word] = (acc[word] || 0) + 1;
          return acc;
        }, {});
      
      // Find recipes that share keywords with favorites but aren't already favorites
      const recommendations = state.recipes
        .filter(recipe => !state.favorites.includes(recipe.id))
        .map(recipe => {
          const recipeKeywords = recipe.title.toLowerCase().split(' ');
          const score = recipeKeywords.reduce((score, word) => {
            return score + (favoriteKeywords[word] || 0);
          }, 0);
          return { ...recipe, score };
        })
        .filter(recipe => recipe.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(({ score, ...recipe }) => recipe);
      
      // If not enough recommendations, add some random recipes
      if (recommendations.length < 3) {
        const remainingRecipes = state.recipes
          .filter(recipe => 
            !state.favorites.includes(recipe.id) && 
            !recommendations.some(rec => rec.id === recipe.id)
          )
          .slice(0, 3 - recommendations.length);
        recommendations.push(...remainingRecipes);
      }
      
      return { recommendations };
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return { recommendations: [] };
    }
  }),
  
  // Initialize recommendations - FIXED
  initializeRecommendations: () => {
    try {
      const { generateRecommendations } = get();
      generateRecommendations();
    } catch (error) {
      console.error('Error initializing recommendations:', error);
    }
  }
}))

export { useRecipeStore };
