// src/components/RecipeForm.js
import React, { useState } from 'react';

const RecipeForm = ({ onAddRecipe }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      description,
      ingredients: ingredients.split(','),
    };

    onAddRecipe(newRecipe);
    setName('');
    setDescription('');
    setIngredients('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Recipe</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Ingredients (comma-separated)</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
