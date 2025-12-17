import React from "react";

type RecipeProps = {
  name: string;
  ingredients: string[];
  instructions: string[];
};

const Recipe: React.FC<RecipeProps> = ({ name, ingredients, instructions }) => {
  return (
    <div className="recipe">
      <h2>{name}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;
