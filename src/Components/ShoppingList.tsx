import React from "react";

interface ShoppingListProps {
  recipes: { name: string; ingredients: string[] }[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ recipes }) => {
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
    </div>
  );
};

export default ShoppingList;
