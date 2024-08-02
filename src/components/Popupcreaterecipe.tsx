import React, { useState } from "react";
import { Recipe, Ingredient } from "../app/interface/interface";


interface PopupProps {
  open: boolean;
  onClose: () => void;
  recipe: number[];
  ingredients: Ingredient[];
  totalCalories: number;
}

const Popupcreaterecipe: React.FC<PopupProps> = ({
  open,
  onClose,
  recipe,
  ingredients,
  totalCalories,
}) => {
  const [name, setName] = useState("");
  const recipeFill: Ingredient[] = [];

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {


    for (let i = 0; i < recipe.length; i++) {
      const namein = ingredients[i];
      if (recipe[i] > 0) {
        recipeFill.push({
          ingredient: namein.ingredient,
          category: namein.category,
          calories: namein.calories,
          quantity: recipe[i],
          image: namein.image,
        });
      }
    }

    const data = {
      recipe: recipeFill,
      name: name,
      totalCalories: totalCalories,
    };

    const res = await fetch("http://localhost:3000/api/saladmaker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("Recipe created successfully");
      window.location.href = '/saladmaker';
      
    } else {
      console.error("Failed to create recipe", res.status);
    }
  };

  return (
    <div
      id="overlay"
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded shadow-lg relative w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-1 right-3" onClick={onClose}>
          x
        </button>
        <div className="flex justify-center items-center mt-5 flex-col">
          <img src="/cooking.png" width={100} height={100} alt="cooking" />
          <span className="my-5">Recipe Name</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="mt-2 p-1 border border-gray-300 rounded w-full"
            placeholder="Input Your Recipe Name..."
            id="name"
            name="name"
            onChange={handleName}
            required
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="p-2 rounded w-1/2"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="bg-[#2FB62D] text-white p-2 rounded w-1/2"
              value="Create New Recipe"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popupcreaterecipe;
