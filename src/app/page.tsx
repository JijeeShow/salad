"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {

  //     router.push("/saladmaker");

  // }, [router]);

  return (
    <div className="flex  justify-center text-[30px] w-10/12">
      <div className="flex flex-col h-full justify-center items-center">
        <p className="font-bold">Welcome to SALADMAKER.</p>
        <p className="font-bold">Please select menu.</p>
      </div>
    </div>
  );
}
