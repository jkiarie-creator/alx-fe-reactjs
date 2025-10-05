import { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients
        .split('\n')
        .filter(ingredient => ingredient.trim() !== '');
      
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients';
      }
    }
    
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newRecipe = {
        id: Date.now(),
        title: formData.title.trim(),
        ingredients: formData.ingredients
          .split('\n')
          .filter(ingredient => ingredient.trim() !== '')
          .map(ingredient => ({
            id: Math.random().toString(36).substr(2, 9),
            name: ingredient.trim()
          })),
        steps: formData.steps
          .split('\n')
          .filter(step => step.trim() !== '')
          .map((step, index) => ({
            id: index + 1,
            instruction: step.trim()
          })),
        createdAt: new Date().toISOString()
      };
      
      onAddRecipe(newRecipe);
      // Reset form
      setFormData({
        title: '',
        ingredients: '',
        steps: ''
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Add New Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-emerald-700 mb-1">
            Recipe Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Ingredients Field */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-emerald-700 mb-1">
            Ingredients <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2">(one per line)</span>
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.ingredients ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter ingredients, one per line"
          />
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps Field */}
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-emerald-700 mb-1">
            Preparation Steps <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2">(one step per line)</span>
          </label>
          <textarea
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            rows={7}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.steps ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter preparation steps, one per line"
          />
          {errors.steps && (
            <p className="mt-1 text-sm text-red-600">{errors.steps}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
