import React, { useState } from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const Popupupdatesuccess: React.FC<PopupProps> = ({ open, onClose}) => {
 
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
        <div className="flex justify-center items-center mt-5 flex-col">
          <IoIosCheckmarkCircle className="text-green-500" size={80}/>
          <span className="my-5 text-green-500 text-[25px]">Success!</span>
        </div>
       
        <div className="flex justify-between mt-4"></div>
      </div>
    </div>
  );
};

export default Popupupdatesuccess;
