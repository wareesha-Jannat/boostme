"use client";
import React from "react";
import SearchUsers from "@/components/SearchUsers";
import Image from "next/image";

const HeroSection = ({ data }) => {
  return (
    <section className="text-white  py-16 flex flex-col items-center justify-center gap-6 pt-10">
      <div className="flex justify-center items-center gap-2">
        <h1 className="logo text-fluid-lg">
          Boost<span className="text-white">Me</span>
        </h1>
        <Image src="/rocket.png" alt="" height={24} width={24} />
      </div>
      <div className="text-center space-y-3 flex flex-col justify-center items-center">
        <h2 className="text-fluid-md font-bold text-white mb-4">
          Support your favourite creators
        </h2>
        <p className="text-gray-300 text-fluid-sm max-w-xl w-[80vw] mb-5">
          Find creators and boost their creations instantly.
        </p>
        <div className="mt-3 flex justify-center max-w-[90%] w-full">
          <SearchUsers users={data} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
