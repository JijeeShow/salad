"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe, Ingredient } from "../../interface/interface";
import { BsChevronLeft } from "react-icons/bs";
import Popupupdatesuccess from "../../../components/Popupupdatesuccess";

const EditRecipe = () => {
  const [detail, setDetail] = useState<Ingredient[]>([]);
  const [countcalories, setCountcalories] = useState<number>(0);
  const [id, setId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [option, setOption] = useState<Ingredient[]>([]);
  const [opentpopup, setOpentpopup] = useState<boolean>(false);

  const fetchdata = async (id: number) => {
    const data = {
      id,
    };
    try {
      const response = await fetch("http://localhost:3000/api/findRecipeById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      if (response.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      }

      const detailrecipe = jsonData.data;
      setDetail(detailrecipe);
      sumCalories(detailrecipe);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const manageIngredient = (index: number, type: string) => {
    if (detail[index].quantity > 0) {
      const newrecipe = [...detail];
      if (type === "add") {
        newrecipe[index].quantity += 1;
      } else if (type === "delete") {
        newrecipe[index].quantity -= 1;
        if (newrecipe[index].quantity === 0) {
          newrecipe.splice(index, 1);
        }
      }
      setDetail(newrecipe);
      sumCalories(newrecipe);
    }
  };

  useEffect(() => {
    const data = searchParams.get("id");
    if (data) {
      const receivedData = parseInt(data);
      setId(receivedData);
      fetchdata(receivedData);
    }
  }, [searchParams]);

  const updateRecipe = async () => {
    const data = {
      recipe: detail,
      id: id,
      totalCalories: countcalories,
    };
    try {
      const response = await fetch("http://localhost:3000/api/updateRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      if (response.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      } else if (response.status === 200) {
        setOpentpopup(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const sumCalories = (ingredients: Ingredient[]) => {
    const sum = ingredients.reduce(
      (acc, ingredient) => acc + ingredient.calories * ingredient.quantity,
      0
    );
    setCountcalories(sum);
  };

  const toggleDropdown = async (detail: Ingredient[]) => {
    setIsOpen(!isOpen);

    try {
      const response = await fetch(
        "http://localhost:3000/api/findIngredientNotName",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detail),
        }
      );
      const jsonData = await response.json();
      if (response.status !== 200) {
        throw new Error("Network response was not ok", jsonData.message);
      }

      const data = jsonData.data;
      setOption(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    const addingredient = option[index];
    addingredient.quantity = 1;
    const recipe = [...detail];
    recipe.push(addingredient);
    setDetail(recipe);
    setIsOpen(false);
    sumCalories(recipe);
  };

  return (
    <div className="flex flex-col flex-1  p-5 ">
      <span className="mb-5 text-[25px] font-[600]">Edit Recipe</span>

      <div className="flex justify-center">
        <div className="flex flex-col bg-white w-full rounded-xl  justify-center p-7">
          <button
            className="mb-10 w-fit"
            onClick={() =>
              (window.location.href = "http://localhost:3000/recipe")
            }
          >
            <BsChevronLeft />
          </button>

          <span className="mb-10 text-[17px] font-[600]">
            Your ingredients to make a salad recipe
          </span>
          <div className="flex flex-col ">
            <div>
              {detail.length > 0 ? (
                detail.map((ingredient, idx) => (
                  <div key={idx} className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex items-center relative w-[50px] h-[50px]">
                        <img
                          src={ingredient.image}
                          alt={ingredient.ingredient}
                          className="rounded-sm w-[50px] h-[50px] object-cover"
                        />
                      </div>

                      <div className="flex flex-col ml-4">
                        <span>{ingredient.ingredient}</span>
                        <div className="flex">
                          <span>x{ingredient.quantity}</span>
                          <button
                            className="text-green-500 cursor-pointer ml-2"
                            onClick={() => manageIngredient(idx, "add")}
                          >
                            Add
                          </button>
                          <button
                            className="text-red-500 cursor-pointer ml-2"
                            onClick={() => manageIngredient(idx, "delete")}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <span>+ {ingredient.calories} </span>
                      <span className="text-[#F8B602] ml-1">Cal</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No ingredients available.</p>
              )}
              <div className="flex items-center my-5 relative ">
                <div className="relative w-full ">
                  <div
                    className="border rounded-lg p-2 flex items-center justify-between cursor-pointer w-full"
                    onClick={() => toggleDropdown(detail)}
                  >
                    <span>{"Add New Ingredient"}</span>
                  </div>
                  {isOpen && (
                    <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full ">
                      {option.map((option, index) => (
                        <li
                          key={option.ingredient}
                          className="flex items-center p-2 hover:bg-gray-200 cursor-pointer justify-between"
                          onClick={() => handleOptionClick(index)}
                        >
                          <div className="flex items-center">
                            <div className="flex items-center relative w-[50px] h-[50px]">
                              <img
                                src={option.image}
                                alt={option.image}
                                className=" object-cover rounded-sm w-[50px] h-[50px]"
                              />
                            </div>
                            <span className="ml-4">{option.ingredient}</span>
                          </div>

                          <div>
                            <span>+ {option.calories}</span>
                            <span className="text-[#F8B602] ml-1"> Cal</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="border-b border-[#F8B602] border-2 my-3"></div>
              <div className="flex justify-between my-10">
                <span>Total calorie</span>
                <div>
                  <span className=" text-[20px]  ">{countcalories}</span>
                  <span className="text-[#F8B602] ml-1 font-[800] text-[20px]">
                    Cal
                  </span>
                </div>
              </div>
              <button
                className="bg-[#F8B602] w-full p-3 rounded-xl text-white"
                onClick={updateRecipe}
              >
                Update Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popupupdatesuccess
        open={opentpopup}
        onClose={() => setOpentpopup(false)}
      />
    </div>
  );
};

const EditRecipeWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditRecipe />
  </Suspense>
);

export default EditRecipeWithSuspense;
