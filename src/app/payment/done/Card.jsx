"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Link from "next/link";
import { useWindowSize } from "react-use";

const Card = ({ data, username }) => {
  const [mounted, setMounted] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className=" min-h-[100dvh] flex items-center justify-center bg-aurora  text-white">
      {!data.error && mounted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={400}
        />
      )}

      {!data.error ? (
        <>
          <div
            className="bg-aurora
  p-6 sm:p-8 rounded-2xl text-center 
  w-[70vw] sm:w-[50vw] 
  shadow-xl shadow-green-800/40  relative z-10"
          >
            <h1 className="text-3xl font-bold mb-4">
              🎉 Woohoo, Thank you {data.user}!
            </h1>
            <p className="text-lg mb-4 text-slate-300">
              Your support helps me keep creating magic ✨
            </p>
            <p className="text-md text-slate-400 mb-6">
              You just made my day brighter 🌟
            </p>
            <Link
              href={`/${username}`}
              className="text-white border-2 w-fit border-white p-1 px-4 rounded-lg bg-blue-950"
            >
              Back
            </Link>
          </div>
        </>
      ) : (
        <>
          <div
            className="bg-aurora
  p-6 sm:p-8 rounded-2xl text-center 
  w-[70vw] sm:w-[50vw] 
  shadow-xl shadow-red-800/40  relative z-10"
          >
            <h1 className="text-3xl font-bold mb-4">💖 Thank you Friend!</h1>
            <p className="text-lg mb-4 text-slate-300">
              Even though the payment didn’t go through, your effort means the
              world 🌍
            </p>
            <p className="text-md text-slate-400 mb-6">
              Would you like to give it another shot? 🚀
            </p>
            <Link
              href={`/${username}`}
              className="text-white border-2 w-fit border-white p-1 px-4 rounded-lg bg-blue-950"
            >
              Back
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
