import { NextResponse, NextRequest } from "next/server";
import recipes from "../../data/recipes.json";
import ingredients from "../../data/ingredient.json";
import fs from "fs";
import path from "path";
import { Category, Recipe, Ingredient } from "../../interface/interface";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const ingredientNames = data.map((recipe: Ingredient) => recipe.ingredient);
  const filterIngredients = ingredients.filter(
    (ingredient) => !ingredientNames.includes(ingredient.ingredient)
  );

  return NextResponse.json({ data: filterIngredients });
}
