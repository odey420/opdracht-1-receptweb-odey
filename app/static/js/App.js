import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RecipeList />} />
      <Route path="/recipe/new" element={<RecipeForm onSave={() => window.location.href = '/'} />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/recipe/:id/edit" element={<RecipeForm onSave={() => window.location.href = '/'} />} />
    </Routes>
  </Router>
);

export default App;
