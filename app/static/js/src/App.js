// src/App.js
import React, { useState } from "react";
import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleAddRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <RecipeForm onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
      <RecipeDetail recipe={selectedRecipe} />
    </div>
  );
}

export default App;

import "./App.css";
