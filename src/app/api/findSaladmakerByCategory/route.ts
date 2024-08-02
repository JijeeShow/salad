import { NextResponse, NextRequest } from "next/server";
import ingredientData from "../../data/ingredient.json";
import fs from "fs";
import path from "path";


export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  // const categorefill: string[] = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].status) {
  //     categorefill.push(data[i].name.toLowerCase());
  //   }
  // }
  console.log(data);
  const filteredIngredients = ingredientData.filter((ingredient) =>
    data.includes(ingredient.category)
  );
  console.log(filteredIngredients);

  return NextResponse.json({ data: filteredIngredients });
}
