import React, { useState, useEffect } from 'react';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setRecipes([]);
      return;
    }
    fetch(`https://api.example.com/recipes?search=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => setRecipes(data.recipes))
      .catch(console.error);
  }, [debouncedQuery]);

  return (
    <>
      <input
        type="search"
        placeholder="Search recipes by ingredient"
        aria-label="Search recipes"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
}

export default RecipeSearch;
