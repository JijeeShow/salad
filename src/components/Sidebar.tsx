"use client";

import React, { useState, useEffect } from "react";
import { BiBook } from "react-icons/bi";
import { PiBasket } from "react-icons/pi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const initialSidebarItems = [
  {
    name: "salad maker",
    href: "/saladmaker",
    icon: PiBasket,
    isactive: false,
  },
  {
    name: "recipe",
    href: "/recipe",
    icon: BiBook,
    isactive: false,
  },
];

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState(initialSidebarItems);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (index: number, href: string) => {
    setSidebarItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isactive: i === index,
      }))
    );
    router.push(href);
  };
  return (
    <div className="flex flex-col bg-white w-2/12 h-screen fixed">
      <div className="flex justify-center items-center text-black py-5  mt-4">
        <span className="font-bold  md:hidden">S</span>
        <span className="font-bold  md:hidden text-[#F8B602]">M</span>
        <span className="font-bold hidden md:block ">SALADMAKER</span>
        <span className="text-[#F8B602] font-bold  hidden md:block">.</span>
      </div>
      <ul>
        {sidebarItems.map(({ name, href, icon: Icon, isactive }, index) => {
          const isCurrent = pathname.startsWith(href);

          return (
            <li
              key={name}
              onClick={() => handleClick(index, href)}
              className={`list-none rounded-xl m-3 p-2 w-4/5 ${
                isCurrent ? "bg-[#F8B602]" : ""
              } `}
            >
              <Link href={href}>
                <div
                  className={`flex items-center  md:justify-start justify-center ${
                    isCurrent ? "text-white" : "text-[#A098AE]"
                  }`}
                >
                  <span>
                    <Icon />
                  </span>
                  <span className="ml-2 hidden md:block">{name}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Sidebar;
