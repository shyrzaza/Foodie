// Converted from App.jsx to TypeScript
import { useState, useEffect } from 'react';
import './App.css';
import { loadRecipes } from './utils';
import Recipe from './Components/Recipe';
import ShoppingList from './Components/ShoppingList';
import Cooking from './Components/Cooking';

const API_URL = 'http://localhost:3001/api';

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
  const [cooking, setCooking] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load recipes and state from backend
  useEffect(() => {
    const init = async () => {
      try {
        const [recipesData, stateData] = await Promise.all([
          loadRecipes(),
          fetch(`${API_URL}/state`).then(res => res.json())
        ]);
        
        setRecipes(recipesData);
        setSelected(stateData.selected || []);
        setSkipped(stateData.skipped || []);
        setDone(stateData.done || false);
        setCooking(stateData.cooking || false);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fall back to just loading recipes if state fetch fails
        const recipesData = await loadRecipes();
        setRecipes(recipesData);
      } finally {
        setLoading(false);
      }
    };
    
    init();
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

  // Save state to backend whenever it changes
  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const saveState = async () => {
        try {
          await fetch(`${API_URL}/state`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              selected,
              skipped,
              done,
              cooking
            })
          });
        } catch (error) {
          console.error('Error saving state:', error);
        }
      };
      
      saveState();
    }
  }, [selected, skipped, done, cooking, loading, recipes.length]);

  const handleSkip = () => {
    setSkipped([...skipped, suggestedIdx!]);
  };

  const handleSelect = () => {
    setSelected([...selected, suggestedIdx!]);
  };

  const handleDone = () => {
    setDone(true);
  };

  const handleShoppingDone = () => {
    setCooking(true);
  };

  const handleReset = async () => {
    try {
      await fetch(`${API_URL}/state`, { method: 'DELETE' });
      setSelected([]);
      setSkipped([]);
      setDone(false);
      setCooking(false);
    } catch (error) {
      console.error('Error resetting state:', error);
    }
  };

  if (loading || recipes.length === 0) {
    return <div>Loading recipes...</div>;
  }

  if (cooking) {
    const selectedRecipes = selected.map(idx => recipes[idx]);
    return <Cooking recipes={selectedRecipes} onReset={handleReset} />;
  }

  if (done) {
    const selectedRecipes = selected.map(idx => recipes[idx]);
    return <ShoppingList recipes={selectedRecipes} onReset={handleReset} onShoppingDone={handleShoppingDone} />;
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
      <button onClick={handleDone}>Done</button>
    </div>
  );
}

export default App;
