const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const recipesFile = path.join(__dirname, 'static', 'data', 'recipes.json');

app.use(express.json());

// Load recipes from file
const loadRecipes = () => {
    const data = fs.readFileSync(recipesFile, 'utf-8');
    return JSON.parse(data);
};

// Save recipes to file
const saveRecipes = (recipes) => {
    fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
};

// GET /recipes - Retrieve all recipes
app.get('/recipes', (req, res) => {
    const recipes = loadRecipes();
    res.json(recipes);
});

// GET /recipes/:id - Retrieve a specific recipe by ID
app.get('/recipes/:id', (req, res) => {
    const recipes = loadRecipes();
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// POST /recipes - Add a new recipe
app.post('/recipes', (req, res) => {
    const recipes = loadRecipes();
    const newRecipe = { id: recipes.length + 1, ...req.body };
    recipes.push(newRecipe);
    saveRecipes(recipes);
    res.status(201).json(newRecipe);
});

// PUT /recipes/:id - Update a recipe by ID
app.put('/recipes/:id', (req, res) => {
    const recipes = loadRecipes();
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        recipes[index] = { id: parseInt(req.params.id), ...req.body };
        saveRecipes(recipes);
        res.json(recipes[index]);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// DELETE /recipes/:id - Delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
    let recipes = loadRecipes();
    const index = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        recipes = recipes.filter(r => r.id !== parseInt(req.params.id));
        saveRecipes(recipes);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
