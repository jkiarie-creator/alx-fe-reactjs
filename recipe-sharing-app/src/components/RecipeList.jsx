import { useRecipeStore } from './recipeStore';

  export default function RecipeList() {
    const recipes = useRecipeStore(state => state.recipes);

    return (
      <div>
        <h2>Recipes ({recipes.length})</h2>
        {recipes.length === 0 ? (
          <p>No recipes yet. Add one above!</p>
        ) : (
          recipes.map(recipe => (
            <div key={recipe.id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))
        )}
      </div>
    );
  }
  