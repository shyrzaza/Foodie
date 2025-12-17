// Converted from App.jsx to TypeScript
import { useState, useEffect } from 'react';
import './App.css';
import { loadRecipes } from './utils';
import Recipe from './Components/Recipe';
import ShoppingList from './Components/ShoppingList';

function getRandomIndex(arr: any[], exclude: number[] = []): number | null {
  const available = arr.map((_, i) => i).filter(i => !exclude.includes(i));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function App() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [suggestedIdx, setSuggestedIdx] = useState<number | null>(null);
  const [skipped, setSkipped] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadRecipes().then(setRecipes);
  }, []);

  useEffect(() => {
    // If there are recipes loaded and not all have been selected or skipped,
    // pick a new random recipe index that hasn't been selected or skipped yet.
    if (recipes.length > 0 && selected.length + skipped.length < recipes.length) {
      const idx = getRandomIndex(recipes, [...selected, ...skipped]);
      setSuggestedIdx(idx);
    }
    else if (recipes.length > 0) {
      setDone(true);
    }
  }, [recipes, selected, skipped]);

  const handleSkip = () => {
    setSkipped([...skipped, suggestedIdx!]);
  };

  const handleSelect = () => {
    setSelected([...selected, suggestedIdx!]);
  };

  if (recipes.length === 0) {
    return <div>Loading recipes...</div>;
  }

  if (done) {
    const selectedRecipes = selected.map(idx => recipes[idx]);
    return <ShoppingList recipes={selectedRecipes} />;
  }

  if (suggestedIdx === null) {
    return <div>No more recipes to suggest.</div>;
  }

  const recipe = recipes[suggestedIdx];

  return (
    <div>
      <h1>Recipe Suggester</h1>
      <Recipe
        name={recipe.name}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
      <button onClick={handleSelect}>Add to Shopping List</button>
      <button onClick={handleSkip}>Skip</button>
    </div>
  );
}

export default App;
