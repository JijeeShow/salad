export interface Recipe {
  recipe: Ingredient[];
  name: string;
  totalCalories: number;
  id: number;
}
export interface Ingredient {
  ingredient: string;
  category: string;
  calories: number;
  quantity: number;
  image: string;
}
export interface Category {
  name: string;
  status: boolean;
  image: string;
}
