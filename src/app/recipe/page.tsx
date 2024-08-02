"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Popupdeleterecipe from "../../components/Popupdeleterecipe";
import { Recipe, Ingredient } from '../interface/interface';
import { BiEdit } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";


export default function AllRecipe() {
  const router = useRouter();
  const [recipelist, setRecipelist] = useState<Recipe[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [idclick, setIdClick] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/allRecipe");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      const recipeArray = jsonData.data;
      setRecipelist(recipeArray);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToEditRecipe = async (id: number) => {
    router.push(`/recipe/editrecipe?id=${id}`);
    // const queryString = new URLSearchParams({
    //   id: JSON.stringify(id),
    // }).toString();
    // router.push(`/recipe/editrecipe?${queryString}`);
  };

  return (
    <div className="flex flex-col flex-1 ml-10/12 p-5">
      <span className="text-[25px] font-[600]">Recipe</span>
      <div className="flex justify-center">
        <div className="flex flex-col bg-white w-full rounded-xl  justify-center p-5 mt-5">
          <span className="text-[20px] font-[600] my-3">Your Recipe</span>
          <div className="flex w-full  mb-5  flex-wrap ">
            {recipelist.map(({ recipe, name, totalCalories, id }, index) => (
              <div key={index}>
                <div className="flex flex-col w-[250px] bg-[url('/bg-card.jpg')] rounded-xl items-center mr-5 p-3 mt-5 ">
                  <div className="flex w-full h-[100px] bg-white flex-col rounded-xl justify-center p-2 truncate ... ">
                    <span className="truncate ...">Recipe name {name} </span>
                    <div>
                      <span className="text-2xl"> {totalCalories} </span>
                      <span className="text-2xl text-[#F8B602]"> Cal </span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-20">
                    <button
                      className="flex w-3/6 justify-center bg-white rounded-3xl mr-2 text-[#ff0000] items-center"
                      onClick={() => {
                        setOpen(true);
                        setIdClick(id);
                      }}
                    >
                      <BiTrash/>
                      Delete
                    </button>
                    <button
                      className="flex w-3/6 justify-center bg-white rounded-3xl items-center"
                      onClick={() => handleToEditRecipe(id)}
                    >
                      <BiEdit/>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Popupdeleterecipe
        open={open}
        onClose={() => setOpen(false)}
        id={idclick}
      />
    </div>
    
  );
}
