const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const recipesFile = path.join(__dirname, 'static', 'data', 'recipes.json');

app.use(express.json());

let recipes = [
    {
        "id": "recept1",
        "name": "Easter Leftover Sandwich",
        "ingredients": [
            { "amount": "12", "unit": "whole", "name": "Hard Boiled Eggs" },
            { "amount": "1/2", "unit": "cup", "name": "Mayonnaise" },
            { "amount": "3", "unit": "Tablespoons", "name": "Grainy Dijon Mustard" },
            { "name": "Salt And Pepper, to taste" },
            { "name": "Several Dashes Worcestershire Sauce" },
            { "name": "Leftover Baked Ham, Sliced" },
            { "name": "Kaiser Rolls Or Other Bread" },
            { "name": "Extra Mayonnaise And Dijon, For Spreading" },
            { "name": "Swiss Cheese Or Other Cheese Slices" },
            { "name": "Thinly Sliced Red Onion" },
            { "name": "Avocado Slices" },
            { "name": "Sliced Tomatoes" },
            { "name": "Lettuce, Spinach, Or Arugula" }
        ],
        "url": "http://thepioneerwoman.com/cooking/2013/04/easter-leftover-sandwich/",
        "image": "http://static.thepioneerwoman.com/cooking/files/2013/03/leftoversandwich.jpg",
        "cookTime": "",
        "recipeYield": "8",
        "datePublished": "2013-04-01",
        "prepTime": "15 minutes",
        "description": "Got leftover Easter eggs? Got leftover Easter ham? Got a hearty appetite? Good! You've come to the right place!",
    },
    {
        "id": "recept2",
        "name": "Pasta with Pesto Cream Sauce",
        "ingredients": [
            { "amount": "3/4", "unit": "cups", "name": "Fresh Basil Leaves" },
            { "amount": "1/2", "unit": "cup", "name": "Grated Parmesan Cheese" },
            { "amount": "3", "unit": "Tablespoons", "name": "Pine Nuts" },
            { "amount": "2", "unit": "cloves", "name": "Garlic, Peeled" },
            { "name": "Salt And Pepper, to taste" },
            { "amount": "1/3", "unit": "cup", "name": "Extra Virgin Olive Oil" },
            { "amount": "1/2", "unit": "cup", "name": "Heavy Cream" },
            { "amount": "2", "unit": "Tablespoons", "name": "Butter" },
            { "amount": "1/4", "unit": "cup", "name": "Grated Parmesan (additional)" },
            { "amount": "12", "unit": "ounces,", "name": "weight Pasta (cavitappi, Fusili, Etc.)" },
            { "amount": "2", "unit": "whole", "name": "Tomatoes, Diced" }
        ],
        "url": "http://thepioneerwoman.com/cooking/2011/06/pasta-with-pesto-cream-sauce/",
        "image": "http://static.thepioneerwoman.com/cooking/files/2011/06/pesto.jpg",
        "cookTime": "10 minutes",
        "recipeYield": "8",
        "datePublished": "2011-06-06",
        "prepTime": "6 minutes",
        "description": "I finally have basil in my garden. Basil I can use. This is a huge development.",
    },
    {
        "id": "recept3",
        "name": "Herb Roasted Pork Tenderloin with Preserves",
        "ingredients": [
            { "amount": "2", "unit": "whole", "name": "Pork Tenderloins" },
            { "name": "Salt And Pepper, to taste" },
            { "amount": "8", "unit": "Tablespoons", "name": "Herbs De Provence (more If Needed)" },
            { "amount": "1", "unit": "cup", "name": "Preserves (fig, Peach, Plum)" },
            { "amount": "1", "unit": "cup", "name": "Water" },
            { "amount": "1", "unit": "Tablespoon", "name": "Vinegar" }
        ],
        "url": "http://thepioneerwoman.com/cooking/2011/09/herb-roasted-pork-tenderloin-with-preserves/",
        "image": "http://static.thepioneerwoman.com/cooking/files/2011/09/porkloin.jpg",
        "cookTime": "15 minutes",
        "recipeYield": "12",
        "datePublished": "2011-09-15",
        "prepTime": "5 minutes",
        "description": "This was yummy. And easy. And pretty! And it took basically no time to make.",
    },
    {
        "id": "recept4",
        "name": "Chicken Florentine Pasta",
        "ingredients": [
            { "amount": "1", "unit": "pound", "name": "Penne" },
            { "amount": "4", "unit": "whole", "name": "Boneless, Skinless Chicken Breasts" },
            { "name": "Salt And Pepper, to taste" },
            { "amount": "2", "unit": "Tablespoons", "name": "Butter" },
            { "amount": "2", "unit": "Tablespoons", "name": "Olive Oil" },
            { "amount": "4", "unit": "cloves", "name": "Garlic, Minced" },
            { "amount": "3/4", "unit": "cups", "name": "Dry White Wine" },
            { "amount": "3/4", "unit": "cups", "name": "Low-sodium Broth, More If Needed" },
            { "amount": "1", "unit": "bag", "name": "Baby Spinach" },
            { "amount": "2", "unit": "cups", "name": "Grape Tomatoes, Halved Lengthwise" },
            { "amount": "4", "unit": "ounces,", "name": "weight Parmesan Cheese, Shaved With Vegetable Peeler" }
        ],
        "url": "http://thepioneerwoman.com/cooking/2012/04/chicken-florentine-pasta/",
        "image": "http://static.thepioneerwoman.com/cooking/files/2012/04/florentine.jpg",
        "cookTime": "20 minutes",
        "recipeYield": "10",
        "datePublished": "2012-04-23",
        "prepTime": "10 minutes",
        "description": "I made this for a late lunch Saturday, and it absolutely completed me.",
    },
    {
        "id": "recept5",
        "name": "Perfect Iced Coffee",
        "ingredients": [
            { "amount": "1", "unit": "pound", "name": "Ground Coffee (good, Rich Roast)" },
            { "amount": "8", "unit": "quarts", "name": "Cold Water" },
            { "name": "Half-and-half (healthy Splash Per Serving)" },
            { "name": "Sweetened Condensed Milk (2-3 Tablespoons Per Serving)" },
            { "name": "Note: Can Use Skim Milk, 2% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!" }
        ],
        "url": "http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
        "image": "http://static.thepioneerwoman.com/cooking/files/2011/06/icedcoffee.jpg",
        "cookTime": "",
        "recipeYield": "24",
        "datePublished": "2011-06-13",
        "prepTime": "8 hours",
        "description": "Iced coffee is my life. When I wake up, often around the time party animals on the west coast are just heading home, I start.",
    },


    {
      "id": "recept6",
      "name": "Easy Green Chile Enchiladas",
      "ingredients": [
        { "amount": "1", "unit": "whole", "name": "Onion, Diced" },
        { "amount": "2", "unit": "Tablespoons", "name": "Butter" },
        { "amount": "1", "unit": "can", "name": "(15 Ounce) Green Enchilada Sauce" },
        { "amount": "2", "unit": "cans", "name": "(4 Ounce) Chopped Green Chilies" },
        { "amount": "12", "unit": "whole", "name": "Corn Tortillas" },
        { "amount": "2", "unit": "cups", "name": "Freshly Grated Cheddar (or Cheddar-jack) Cheese (or Any Cheese You'd Like)" },
        { "name": "Sour Cream" },
        { "name": "Salsa" },
        { "name": "Pico De Gallo (optional)" },
        { "name": "Guacamole (optional)" },
        { "name": "Cilantro Leaves, Optional" }
      ],
      "url": "http://thepioneerwoman.com/cooking/2012/05/easy-green-chile-enchiladas/",
      "image": "http://static.thepioneerwoman.com/cooking/files/2012/05/enchilada.jpg",
      "cookTime": "10 minutes",
      "recipeYield": "4",
      "datePublished": "2012-05-31",
      "prepTime": "5 minutes",
      "description": "When I was in Albuquerque with Marlboro Man and the boys a month ago, I had a really fun book signing. Such incredibly nice a..."
    },
    {
      "id": "recept7",
      "name": "Krispy Easter Eggs",
      "ingredients": [
        { "amount": "4", "unit": "Tablespoons", "name": "Butter" },
        { "amount": "1", "unit": "package", "name": "(10 Ounces) Mini Marshmallows" },
        { "amount": "6", "unit": "cups", "name": "Rice Krispies" },
        { "name": "Assorted Sprinkles" },
        { "name": "Small Chocolate Easter Eggs" },
        { "name": "Plastic Easter Eggs" }
      ],
      "url": "http://thepioneerwoman.com/cooking/2013/03/krispy-easter-eggs/",
      "image": "http://static.thepioneerwoman.com/cooking/files/2013/03/DSC_9637.jpg",
      "cookTime": "5 minutes",
      "recipeYield": "12",
      "datePublished": "2013-03-25",
      "prepTime": "20 minutes",
      "description": "Imagine the Easter Bunny laying an egg.     Wait. That’s not anatomically possible.     And anyway, the Easter Bunny is a b..."
    },
    {
      "id": "recept8",
      "name": "Patty Melts",
      "ingredients": [
        { "amount": "1", "unit": "stick", "name": "Butter" },
        { "amount": "1", "unit": "whole", "name": "Large Onion, Halved And Sliced" },
        { "amount": "1-1/2", "unit": "pound", "name": "Ground Beef" },
        { "name": "Salt And Pepper, to taste" },
        { "amount": "5", "unit": "dashes", "name": "Worcestershire Sauce" },
        { "amount": "8", "unit": "slices", "name": "Swiss Cheese" },
        { "amount": "8", "unit": "slices", "name": "Rye Bread" }
      ],
      "url": "http://thepioneerwoman.com/cooking/2012/08/patty-melts/",
      "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/pattymelt.jpg",
      "cookTime": "25 minutes",
      "recipeYield": "4",
      "datePublished": "2012-08-06",
      "prepTime": "10 minutes",
      "description": "Who doesn't love a patty melt?     Well, besides vegetarians, people who don't like rye bread, people who don't eat onions, o..."
    },
    {
      "id": "recept9",
      "name": "Yum. Doughnuts!",
      "ingredients": [
        { "name": "Doughnuts" },
        { "amount": "1-1/8", "unit": "cup", "name": "Whole Milk, Warm" },
        { "amount": "1/4", "unit": "cup", "name": "Sugar" },
        { "amount": "2-1/4", "unit": "teaspoons", "name": "(one Package) Instant Or Active Dry Yeast" },
        { "amount": "2", "unit": "whole", "name": "Large Eggs, Beaten" },
        { "amount": "1-1/4", "unit": "stick", "name": "Unsalted Butter, melted" },
        { "amount": "4", "unit": "cups", "name": "All-purpose Flour" },
        { "amount": "1/4", "unit": "teaspoon", "name": "Salt" },
        { "name": "Shortening" },
        { "name": "GLAZE" },
        { "amount": "3", "unit": "cups", "name": "Powdered Sugar" },
        { "amount": "1/2", "unit": "teaspoon", "name": "Salt" },
        { "amount": "1/2", "unit": "teaspoon", "name": "Vanilla" },
        { "amount": "1/2", "unit": "cup", "name": "Cold Water Or Milk" }
      ],
      "url": "http://thepioneerwoman.com/cooking/2012/08/yum-doughnuts/",
      "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/doughnut.jpg",
      "cookTime": "2 minutes",
      "recipeYield": "18",
      "datePublished": "2012-08-10",
      "prepTime": "25 minutes",
      "description": "Note from PW: On tomorrow's Food Network episode, I make homemade glazed doughnuts for Marlboro Man, the kids, Josh, and Pete..."
    },
    {
      "id": "recept10",
      "name": "Buttery Lemon Parsley Noodles",
      "ingredients": [
        { "amount": "1", "unit": "pound", "name": "Pasta (fettuccine, Linguine, Angel Hair)" },
        { "amount": "4", "unit": "Tablespoons", "name": "Butter" },
        { "amount": "1/4", "unit": "cup", "name": "Finely Minced Parsley" },
        { "amount": "1", "unit": "whole", "name": "Lemon" },
        { "name": "Salt And Pepper, to taste" }
      ],
      "url": "http://thepioneerwoman.com/cooking/2012/08/buttery-lemon-parsley-noodles/",
      "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/noodles.jpg",
      "cookTime": "15 minutes",
      "recipeYield": "8",
      "datePublished": "2012-08-01",
      "prepTime": "5 minutes",
      "description": "This is just a quick, easy side dish that is clean and fresh and knocks my ballet flats off. These noodles were actually part..."
    },
    {
        "recept11": {
            "id": "recept11",
            "name": "Roast Chicken",
            "ingredients": [
                { "amount": "1", "unit": "whole", "name": "Chicken, Rinsed And Patted Dry" },
                { "amount": "3/4", "unit": "cups", "name": "Butter, Softened" },
                { "amount": "3", "unit": "whole", "name": "Lemons" },
                { "amount": "4", "unit": "sprigs", "name": "Rosemary" },
                { "name": "Salt And Pepper, to taste" }
            ],
            "url": "http://thepioneerwoman.com/cooking/2012/08/roast-chicken/",
            "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/roastchicken2.jpg",
            "cookTime": "1 hour 15 minutes",
            "recipeYield": "4",
            "datePublished": "2012-08-13",
            "prepTime": "10 minutes",
            "description": "There's nothing simpler than roast chicken. And there are few things more delicious. You can use this basic recipe an..."
        },
    
        "recept12": {
            "id": "recept12",
            "name": "Baked French Toast",
            "ingredients": [
                { "name": "FRENCH TOAST" },
                { "name": "Butter, For Greasing" },
                { "amount": "1", "unit": "loaf", "name": "Crusty Sourdough Or French Bread" },
                { "amount": "8", "unit": "whole", "name": "Eggs" },
                { "amount": "2", "unit": "cups", "name": "Whole Milk" },
                { "amount": "1/2", "unit": "cup", "name": "Heavy Cream" },
                { "amount": "1/2", "unit": "cup", "name": "Sugar" },
                { "amount": "1/2", "unit": "cup", "name": "Brown Sugar" },
                { "amount": "2", "unit": "Tablespoons", "name": "Vanilla Extract" },
                { "name": "Topping" },
                { "amount": "1/2", "unit": "cup", "name": "Flour" },
                { "amount": "1/2", "unit": "cup", "name": "Firmly Packed Brown Sugar" },
                { "amount": "1", "unit": "teaspoon", "name": "Cinnamon" },
                { "amount": "1/4", "unit": "teaspoon", "name": "Salt" },
                { "name": "Freshly Grated Nutmeg, Optional" },
                { "amount": "1", "unit": "stick", "name": "Cold Butter, Cut Into Pieces" },
                { "name": "Warm Syrup, For Serving" },
                { "name": "Butter, For Serving" },
                { "amount": "1", "unit": "cup", "name": "Fresh Blueberries, For Serving" }
            ],
            "url": "http://thepioneerwoman.com/cooking/2012/08/baked-french-toast/",
            "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/bakedfrenchtoast.jpg",
            "cookTime": "1 hour",
            "recipeYield": "8",
            "datePublished": "2012-08-18",
            "prepTime": "15 minutes",
            "description": "On this morning's Food Network episode, I make (among other things) this beautiful, simple, glorious, easy, delectable, scrum..."
        },
    
        "recept13": {
            "id": "recept13",
            "name": "Yummy Slice-and-Bake Cookies",
            "ingredients": [
                { "amount": "2-1/2", "unit": "cups", "name": "All-purpose Flour" },
                { "amount": "1", "unit": "teaspoon", "name": "Instant Coffee Granules" },
                { "amount": "1", "unit": "teaspoon", "name": "Baking Soda" },
                { "amount": "1", "unit": "teaspoon", "name": "Salt" },
                { "amount": "1", "unit": "cup", "name": "(2 Sticks) Salted Butter, Softened" },
                { "amount": "1-1/4", "unit": "cup", "name": "Packed Brown Sugar" },
                { "amount": "1/4", "unit": "cup", "name": "Granulated Sugar" },
                { "amount": "2", "unit": "whole", "name": "Eggs" },
                { "amount": "1", "unit": "Tablespoon", "name": "Vanilla" },
                { "amount": "2", "unit": "Tablespoons", "name": "Creamy Peanut Butter" },
                { "amount": "2", "unit": "Tablespoons", "name": "Nutella" },
                { "amount": "1/2", "unit": "cup", "name": "Very Finely Chopped Pecans" },
                { "amount": "3/4", "unit": "cups", "name": "M&M's, Roughly Chopped" }
            ],
            "url": "http://thepioneerwoman.com/cooking/2012/08/yummy-slice-and-bake-cookies/",
            "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/slicebake.jpg",
            "cookTime": "10 minutes",
            "recipeYield": "30",
            "datePublished": "2012-08-15",
            "prepTime": "15 minutes",
            "description": "I love slice-and-bake cookie dough because it reminds me of the times during my freshman year in college that my dorm friends..."
        },
    
        "recept14": {
            "id": "recept14",
            "name": "Yummy Grilled Zucchini",
            "ingredients": [
                { "amount": "6", "unit": "whole", "name": "Zucchini (medium Sized)" },
                { "amount": "1/4", "unit": "cup", "name": "Olive Oil" },
                { "amount": "1", "unit": "teaspoon", "name": "Kosher Salt" },
                { "amount": "1", "unit": "teaspoon", "name": "Black Pepper" },
                { "amount": "3", "unit": "whole", "name": "Lemons, Zested" },
                { "amount": "1", "unit": "teaspoon", "name": "Kosher Salt (additional)" },
                { "name": "Extra Olive Oil If Needed For Brushing" }
            ],
            "url": "http://thepioneerwoman.com/cooking/2012/08/grilled-zucchini-with-yummy-lemon-salt/",
            "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/zucc.jpg",
            "cookTime": "20 minutes",
            "recipeYield": "8",
            "datePublished": "2012-08-20",
            "prepTime": "30 minutes",
            "description": "I love grilled vegetables more than anything on earth. Well, except my children. And my husband. And chocolate whipped cream ..."
        },
    
        "recept15": {
            "id": "recept15",
            "name": "Chocolate Covered S’mores",
            "ingredients": [
                { "amount": "16", "unit": "whole", "name": "Graham Cracker Squares (two Single Rectangular Pieces Still Stuck Together)" },
                { "amount": "1", "unit": "container", "name": "(7 Ounce) Marshmallow Creme" },
                { "amount": "1", "unit": "whole", "name": "Package Chocolate Almond Barn Or Other Melting Chocolate" },
                { "name": "Chopped Nuts, Sprinkles, Etc." }
            ],
            "url": "http://thepioneerwoman.com/cooking/2012/08/chocolate-covered-smores/",
            "image": "http://static.thepioneerwoman.com/cooking/files/2012/08/smores.jpg",
            "cookTime": "10 minutes",
            "recipeYield": "8",
            "datePublished": "2012-08-29",
            "prepTime": "20 minutes",
            "description": "When we went to Vail, Colorado to ski last spring, a few things happened: 1. I had the best time of my life. 2. I didn't ..."
        }
    },

];

// Load recipes from file
const loadRecipes = () => {
    return recipes;
};

// Save recipes to file
const saveRecipes = (recipes) => {
};

// GET /recipes - Retrieve all recipes
app.get('/recipes', (req, res) => {
    const recipes = loadRecipes();
    res.json(recipes);
});

// GET /recipes/:id - Retrieve a specific recipe by ID
app.get('/recipes/:id', (req, res) => {
    const recipes = loadRecipes();
    const recipe = recipes.find(r => r.id === req.params.id);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// POST /recipes - Add a new recipe
app.post('/recipes', (req, res) => {
    const recipes = loadRecipes();
    const newRecipe = { id: `recept${recipes.length + 1}`, ...req.body };
    recipes.push(newRecipe);
    saveRecipes(recipes); 
    res.status(201).json(newRecipe);
});

// PUT /recipes/:id - Update a recipe by ID
app.put('/recipes/:id', (req, res) => {
    const recipes = loadRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);
    if (index !== -1) {
        recipes[index] = { id: req.params.id, ...req.body };
        saveRecipes(recipes); 
        res.json(recipes[index]);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

// DELETE /recipes/:id - Delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
    let recipes = loadRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);
    if (index !== -1) {
        recipes = recipes.filter(r => r.id !== req.params.id);
        saveRecipes(recipes); 
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});