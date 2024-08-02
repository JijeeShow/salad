import { NextResponse, NextRequest } from "next/server";
import recipes from "../../data/recipes.json";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const filter = recipes.filter((recipe) => recipe.id !== data.id);
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "data",
    "recipes.json"
  );
  fs.writeFileSync(filePath, JSON.stringify(filter, null, 2));

  return NextResponse.json({ data: "" });
}
