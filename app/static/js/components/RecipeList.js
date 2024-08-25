import React, { useState, useEffect } from 'react';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div>
      <h1>Recepten</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
