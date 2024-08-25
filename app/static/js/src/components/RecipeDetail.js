// src/components/RecipeDetail.js
import React from 'react';

const RecipeDetail = ({ recipe }) => {
  if (!recipe) {
    return <div>Select a recipe to see the details</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;
