import { NextResponse, NextRequest } from "next/server";
import ingredientData from "../../data/ingredient.json";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const filteredIngredients = ingredientData.filter(
    (ingredient) => ingredient.ingredient.toLowerCase().includes(data.toLowerCase())
  );
  console.log(filteredIngredients);

  return NextResponse.json({ data: filteredIngredients });
}
