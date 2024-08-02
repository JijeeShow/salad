import { NextResponse, NextRequest } from "next/server";
import recipes from "../../data/recipes.json";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const filter = recipes.filter((recipe) => recipe.id === data.id);
  let allRecipeFills = [];
  allRecipeFills = filter.flatMap((recipe) => recipe.recipe);
  console.log(allRecipeFills);

  return NextResponse.json({ data: allRecipeFills });
}
