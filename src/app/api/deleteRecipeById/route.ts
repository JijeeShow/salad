import { NextResponse, NextRequest } from "next/server";
import recipesJson from "../../data/recipes.json";
import fs from "fs";
import path from "path";
import { Recipe } from "../../interface/interface";

const recipes: Recipe[] = recipesJson as Recipe[];

export async function POST(req: NextRequest) {
  try {
    console.log("in");
    const data = await req.json();
    console.log("data");
    console.log(data.id);
    if (recipes.length > 0) {
      const filter = recipes.filter((recipe) => recipe.id !== data.id);
      const filePath = path.join(
        process.cwd(),
        "src",
        "app",
        "data",
        "recipes.json"
      );
      console.log("recipes");
      fs.writeFileSync(filePath, JSON.stringify(filter, null, 2));
    }
    console.log("ff");

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
