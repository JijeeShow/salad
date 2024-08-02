import { NextResponse, NextRequest } from "next/server";
import ingredients from "../../data/ingredient.json";
import { Category, Recipe, Ingredient } from "../../interface/interface";

export async function POST(req: NextRequest) {
  try {
     const data = await req.json();
  const ingredientNames = data.map((recipe: Ingredient) => recipe.ingredient);
  const filterIngredients = ingredients.filter(
    (ingredient) => !ingredientNames.includes(ingredient.ingredient)
  );

  return NextResponse.json({ data: filterIngredients },{status : 200});
  } catch (error) {
    return NextResponse.json({ message: error },{status : 500});
  }
 
}
