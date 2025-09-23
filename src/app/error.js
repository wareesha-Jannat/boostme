"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-red-800">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-300 mb-4">
        {error.message || "Please try again later."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-white text-red-700 px-4 py-2 rounded"
      >
        Try again
      </button>
    </div>
  );
}
