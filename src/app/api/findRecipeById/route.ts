import { NextResponse, NextRequest } from "next/server";
import recipesJson from "../../data/recipes.json"; // นำเข้า recipesJson
import { Recipe } from "../../interface/interface"; 

const recipes: Recipe[] = recipesJson as Recipe[];

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (data.name) {
    return NextResponse.json({ message: "Recipe ID is required" }, { status: 400 });
  }

  const filter = recipes.filter((recipe) => recipe.id === data.id);
  
  if (filter.length === 0) {
    return NextResponse.json({ message: "No recipe found with this ID" }, { status: 404 });
  }

  const allRecipeFills = filter.flatMap((recipe) => recipe.recipe);
  return NextResponse.json({ data: allRecipeFills },{status : 200});
}
