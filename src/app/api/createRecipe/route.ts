import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { Recipe } from "../../interface/interface";

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
    return NextResponse.json({ message: "create success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
