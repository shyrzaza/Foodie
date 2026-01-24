import React from "react";

interface ShoppingListProps {
  recipes: { name: string; ingredients: string[] }[];
  onReset?: () => void;
  onShoppingDone?: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ recipes, onReset, onShoppingDone }) => {
  // Flatten all ingredients and allow duplicates
  const allIngredients = recipes.flatMap(r => r.ingredients);

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {allIngredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <h2>Selected Recipes</h2>
      <ul>
        {recipes.map((recipe, idx) => (
          <li key={idx}>{recipe.name}</li>
        ))}
      </ul>
      <div>
        {onShoppingDone && (
          <button onClick={onShoppingDone}>Shopping Done</button>
        )}
        {onReset && (
          <button onClick={onReset}>Start Over</button>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
