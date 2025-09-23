"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CTAButtons = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };
  const scrollAndFocus = () => {
    const input = document.querySelector("#searchInput"); // your input id
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => input.focus(), 600);
    }
  };
  return (
    <div className="flex gap-4">
      <button
        className="px-3 sm:px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
        onClick={scrollAndFocus}
      >
        <a></a>Explore Creators
      </button>
      <button
        className=" px-3 sm:px-6 py-3 rounded-lg bg-white text-purple-600 font-medium hover:bg-gray-100"
        onClick={goToLogin}
      >
        Become a Creator
      </button>
    </div>
  );
};

export default CTAButtons;
