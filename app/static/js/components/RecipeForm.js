import React, { useState, useEffect } from 'react';

const RecipeForm = ({ recipeId, onSave }) => {
  const [recipe, setRecipe] = useState({ name: '', ingredients: '', steps: '' });

  useEffect(() => {
    if (recipeId) {
      fetch(`/recipes/${recipeId}`)
        .then(response => response.json())
        .then(data => setRecipe(data));
    }
  }, [recipeId]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = recipeId ? 'PUT' : 'POST';
    fetch(recipeId ? `/recipes/${recipeId}` : '/recipes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    })
      .then(response => response.json())
      .then(() => onSave());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={recipe.name}
        onChange={handleChange}
        placeholder="Naam"
      />
      <textarea
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        placeholder="Ingrediënten"
      />
      <textarea
        name="steps"
        value={recipe.steps}
        onChange={handleChange}
        placeholder="Stappen"
      />
      <button type="submit">Opslaan</button>
    </form>
  );
};

export default RecipeForm;
