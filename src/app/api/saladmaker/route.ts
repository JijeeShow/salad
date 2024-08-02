import { NextResponse, NextRequest } from "next/server";
import ingredientData from "../../data/ingredient.json";
import fs from "fs";
import path from "path";
import { Recipe } from "../../interface/interface";

export async function GET() {
  return NextResponse.json({ data: ingredientData });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "recipes.json"
    );
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }

    let recipes: Recipe[] = [];
    const rawData = fs.readFileSync(filePath, "utf-8");

    if (rawData.trim()) {
      recipes = JSON.parse(rawData);
    }
    const maxId =
      recipes.length > 0 ? Math.max(...recipes.map((recipe) => recipe.id)) : -1;

    const newRecipe: Recipe = { id: maxId + 1, ...data };
    recipes.push(newRecipe);

    fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

    return new Response(
      JSON.stringify({ message: "Recipe saved successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Failed to save recipe." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
