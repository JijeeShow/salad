import { NextResponse, NextRequest } from "next/server";
import ingredientData from "../../data/ingredient.json";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const filteredIngredients = ingredientData.filter((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(data.toLowerCase())
    );

    return NextResponse.json({ data: filteredIngredients }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
