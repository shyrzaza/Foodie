import React, { useState } from "react";
import Recipe from "./Recipe";

interface CookingProps {
  recipes: { name: string; ingredients: string[]; instructions: string[] }[];
  onReset?: () => void;
}

const Cooking: React.FC<CookingProps> = ({ recipes, onReset }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (recipes.length === 0) {
    return <div>No recipes selected.</div>;
  }

  const recipe = recipes[currentIndex];

  return (
    <div>
      <h1>Cooking Mode</h1>
      <p>Recipe {currentIndex + 1} of {recipes.length}</p>
      <Recipe
        name={recipe.name}
        ingredients={recipe.ingredients}
        instructions={recipe.instructions}
      />
      <div>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === recipes.length - 1}>
          Next
        </button>
      </div>
      {onReset && (
        <button onClick={onReset}>Start Over</button>
      )}
    </div>
  );
};

export default Cooking;
