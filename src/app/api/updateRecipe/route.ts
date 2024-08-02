import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { Recipe, Ingredient } from "../../interface/interface";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "recipes.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const recipes = JSON.parse(fileContents);
    const updatedRecipes = recipes.map((recipe: Recipe) =>
      recipe.id === data.id
        ? {
            ...recipe,
            recipe: data.recipe,
            totalCalories: data.totalCalories,
          }
        : recipe
    );

    fs.writeFileSync(filePath, JSON.stringify(updatedRecipes, null, 2));

    return NextResponse.json(
      { message: "Recipe updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}
