import { NextResponse, NextRequest } from "next/server";
import recipes from "../../data/recipes.json";
import fs from "fs";
import path from "path";
import { Recipe, Ingredient } from "../../interface/interface";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // console.log(data);

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "data",
    "recipes.json"
  );
  const fileContents = fs.readFileSync(filePath, "utf8");
  const recipes = JSON.parse(fileContents);

  // const updatedRecipes = recipes.map((recipe: Recipe) =>
  //   recipe.id === data.id ? { ...recipe, ...data.recipe} : recipe
  // );
  const updatedRecipes = recipes.map((recipe: Recipe) =>
    recipe.id === data.id
      ? {
          ...recipe,
          recipe: data.recipe,
          totalCalories: data.totalCalories,
        }
      : recipe
  );
  console.log("aaaaaaaaaaaaaaaaaa");
  console.log(updatedRecipes);

  fs.writeFileSync(filePath, JSON.stringify(updatedRecipes, null, 2));

  return NextResponse.json({ message: "Recipe updated successfully" });
}
