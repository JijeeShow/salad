import React, { useState } from "react";
import Image from "next/image";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

const Popupdeleterecipe: React.FC<PopupProps> = ({ open, onClose, id }) => {
  const handleSubmit = async () => {
    const data = {
      id: id,
    };

    try {
      const response = await fetch("/api/deleteRecipeById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      if (response.status !== 200) {
        console.log("no 200", jsonData.message);
        throw new Error("Network response was not ok", jsonData.message);
      } else if (response.status === 200) {
        console.log(" 200", jsonData.message);
        window.location.href = "/recipe";
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };
  return (
    <div
      id="overlay"
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-1 right-3" onClick={onClose}>
          x
        </button>
        <div className="flex justify-center items-center mt-5 flex-col ">
          <img
            src="/exclamation.png"
            width={100}
            height={100}
            alt="exclamation"
          />
          <span className="my-5">Delete Recipe</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="p-2 rounded w-1/2 mr-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="bg-[#FF3F56] text-white p-2 rounded w-1/2 mr-1"
              value="Delete"
            />
          </div>
        </form>
        <div className="flex justify-between mt-4"></div>
      </div>
    </div>
  );
};

export default Popupdeleterecipe;
