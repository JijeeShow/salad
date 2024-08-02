"use client";

import React, { useState, useEffect } from "react";
import Popupcreaterecipe from "../../components/Popupcreaterecipe";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { Category, Recipe, Ingredient } from "../interface/interface";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";

const Categoriesarray = [
  {
    name: "vegetable",
    status: false,
    image: "/vegetable.png",
  },
  {
    name: "fruit",
    status: false,
    image: "/fruit.png",
  },
  {
    name: "Toppings",
    status: false,
    image: "/salad.png",
  },
  {
    name: "protein",
    status: false,
    image: "/meat.png",
  },
  {
    name: "Dressing",
    status: false,
    image: "/sauces.png",
  },
];

export default function Salad() {
  const [initiaIingredients, setInitiaIingredients] = useState<Ingredient[]>(
    []
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>(Categoriesarray);
  const [createRecipe, setCreateRecipe] = useState<number[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [totalingredients, setTotalingredients] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/allSaladmaker");
      const jsonData = await response.json();
      if (response.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      } else {
        console.log("200");
        const ingredientArray = jsonData.data;
        setIngredients(ingredientArray);
        setInitiaIingredients(ingredientArray);
        setCreateRecipe(new Array(ingredientArray.length).fill(0));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("sdfsdfsdf", err.message);
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  const fetchDataCategory = async (updatedCategories: Category[]) => {
    const categorefill: string[] = [];
    let check = 0;

    for (let i = 0; i < Categoriesarray.length; i++) {
      if (updatedCategories[i].status) {
        categorefill.push(updatedCategories[i].name.toLowerCase());
      } else {
        check += 1;
      }
    }
    if (check == updatedCategories.length) {
      try {
        const response = await fetch("/api/allSaladmaker");
        const jsonData = await response.json();
        if (response.status !== 200) {
          throw new Error("Network response was not ok", jsonData.message);
        }

        const ingredientArray = jsonData.data;
        setIngredients(ingredientArray);
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    } else {
      try {
        const res = await fetch(
          "http://localhost:3000/api/findIngredientsByCategory",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categorefill),
          }
        );
        const jsonData = await res.json();
        if (res.status !== 200) {
          throw new Error("Network response was not ok", jsonData.message);
        }
        const ingredientArray = jsonData.data;
        setIngredients(ingredientArray);
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred");
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function updatestatus(index: number) {
    setCategories((prevCategories) => {
      const updatedCategories: Category[] = prevCategories.map(
        (category, idx) =>
          idx === index ? { ...category, status: !category.status } : category
      );
      fetchDataCategory(updatedCategories);
      return updatedCategories;
    });
  }
  function sumCalories(Recipe: number[]) {
    let sum = 0;
    for (let i = 0; i < Recipe.length; i++) {
      sum += initiaIingredients[i].calories * Recipe[i];
    }
    setTotalCalories(sum);
  }
  function sumIngreedient(Recipe: number[]) {
    let sum = 0;
    for (let i = 0; i < Recipe.length; i++) {
      sum += Recipe[i];
    }
    setTotalingredients(sum);
  }

  function addIngredient(index: number) {
    setCreateRecipe((old) => {
      const newRecipe = [...old];
      newRecipe[index] += 1;
      sumCalories(newRecipe);
      sumIngreedient(newRecipe);
      return newRecipe;
    });
  }

  function removeIngredient(index: number) {
    setCreateRecipe((old) => {
      const newRecipe = [...old];
      newRecipe[index] -= 1;
      sumCalories(newRecipe);
      sumIngreedient(newRecipe);
      return newRecipe;
    });
  }
  const findIngredientByName = async (formData: FormData) => {
    try {
      const name = formData.get("name");
      const res = await fetch(
        "http://localhost:3000/api/findIngredientByName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(name),
        }
      );
      const jsonData = await res.json();
      if (res.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      }

      const data = jsonData.data;
      setIngredients(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const findRealTime = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      const res = await fetch(
        "http://localhost:3000/api/findIngredientByName",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        }
      );
      const jsonData = await res.json();
      if (res.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      }
      const data = jsonData.data;
      setIngredients(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-10/12 ">
      <div className="w-full pl-10 pr-5">
        <div className="flex bg-[#f5f5f5] w-full my-[20px] items-center justify-between">
          <span className="text-[#000] content-center mr-5 font-bold text-[20px] ">
            Les&#39;t Create...your own salad!!!
          </span>
          <form
            className="content-center w-3/12 relative"
            action={findIngredientByName}
          >
            <input
              type="text"
              name="name"
              className="text-[#000] pl-8 pr-4 py-[8px] w-full  border rounded-lg text-xs"
              placeholder="Search ingredients to make a salad..."
              onChange={findRealTime}
            />
            <BsSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F8B602]"
              size={12}
            />
          </form>
        </div>
        <div className="w-full h-[150px] relative rounded-xl mb-5">
          <Image
            src="/web4.png"
            alt="A delicious salad"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 1200px) 100vw, (min-width: 1200px) 100vw"
            priority
          />
        </div>

        <span className="font-[600]  ">Select Category</span>
        <div className="flex flex-wrap ">
          {categories.map(({ name, status, image }, index: number) => (
            <div
              key={name}
              onClick={() => updatestatus(index)}
              className={`rounded-lg h-[150px] w-[150px] bg-white  relative flex flex-col items-center cursor-pointer my-5 mr-5 ${
                status ? "bg-[#00cc66] shadow-2xl" : ""
              }`}
            >
              {status ? (
                <IoIosCheckmarkCircle
                  color="green"
                  size="20px"
                  className="absolute top-2 right-2 cursor-pointer"
                />
              ) : null}

              <div className="flex flex-col items-center select-none justify-center h-full">
                <Image
                  src={image}
                  className="w-[80px] mb-2"
                  alt={name}
                  width={80}
                  height={80}
                />
                <span className="text-center">{name}</span>
              </div>
            </div>
          ))}
        </div>

        <span className="font-[600]">
          Choose your ingredients to make a salad
        </span>
        <div className="flex flex-row flex-wrap">
          {ingredients.length > 0 ? (
            ingredients.map(
              ({ ingredient, category, image, calories }, index: number) => {
                const ingredientIndex = initiaIingredients.findIndex(
                  (recipe) => recipe.ingredient === ingredient
                );

                return (
                  <div
                    key={ingredient}
                    className="flex flex-col relative bg-[#fff] w-[250px] rounded-lg my-5 mr-5 p-[20px]"
                  >
                    <div className="w-full h-[150px] ">
                      <img
                        src={image}
                        alt={ingredient}
                        className="object-cover rounded w-full h-[150px]"
                      />
                    </div>

                    <span className="mt-2">{ingredient}</span>
                    <div className="flex items-center">
                      <span className="font-[600] text-[20px]">{calories}</span>
                      <span className="text-[#F8B602] ml-1  text-[20px]">
                        Cal
                      </span>
                    </div>
                    <div className="flex justify-end content-end">
                      {createRecipe[ingredientIndex] !== 0 &&
                      ingredientIndex !== -1 ? (
                        <div className="flex">
                          <IoIosRemoveCircle
                            color="#F8B602"
                            size="40px"
                            onClick={() => removeIngredient(ingredientIndex)}
                            className="flex cursor-pointer"
                          />
                          <div className="flex justify-center w-[30px]">
                            <p className="content-center select-none">
                              {createRecipe[ingredientIndex]}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      <IoIosAddCircle
                        color="#F8B602"
                        size="40px"
                        onClick={() => addIngredient(ingredientIndex)}
                        className="flex cursor-pointer"
                      />
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="flex w-full h-[300px] items-center justify-center">
              <span className="text-xl">Ingredients Comeing Soon...</span>
            </div>
          )}
        </div>
        <div className="h-[100px]"></div>
      </div>

      <div
        className={`flex  fixed bottom-0 w-10/12 flex-col transition-all duration-700 transform  ${
          totalingredients != 0 ? " opacity-100" : "opacity-0"
        } `}
      >
        <div className="flex mr-[12px] bg-[#fff] p-2">
          <div className="flex w-9/12 bg-[#F8B602] rounded-xl mr-3 flex items-center justify-between p-2 ">
            <div className="flex">
              <div className="rounded-xl  bg-[#fff] text-[#F8B602] p-2 ">
                <span className="mx-2">{totalingredients}</span>
              </div>
              <span className="content-center ml-2 text-[#fff] ">
                Your Ingredients
              </span>
            </div>

            <div className="content-center mx-4">
              <span className="content-center text-[#fff]">
                {totalCalories} Cal
              </span>
            </div>
          </div>

          <div
            className="w-3/12 bg-[#2FB62D] rounded-xl flex items-center justify-center cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="my-3 text-[#fff]">Create Recipe</div>
          </div>
        </div>
      </div>

      <Popupcreaterecipe
        open={open}
        onClose={() => setOpen(false)}
        recipe={createRecipe}
        ingredients={ingredients}
        totalCalories={totalCalories}
      />
    </div>
  );
}
