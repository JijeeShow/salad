import { NextResponse, NextRequest } from "next/server";
import ingredientData from "../../data/ingredient.json";


export async function GET() {
  return NextResponse.json({ data: ingredientData }, { status: 200 });
}

