"use client";
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Creations from "./Creations";

const Tabs = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Creations"];
  return (
    <>
      <div className="w-full max-w-7xl pt-20 flex  flex-col items-center justify-center gap-5 ">
        <div className=" relative flex gap-5 w-[80%] mx-auto  items-center justify-center ">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={` px-4 py-2 text-xl transition-colors duration-300  ${
                activeTab === tab
                  ? "  text-purple-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}

          <span
            className="absolute bottom-0 h-[2px] bg-purple-600 transition-all duration-300 ease-in-out"
            style={{
              // position underline based on active tab index
              width: activeTab === "Dashboard" ? "101px" : "92px",
              left:
                activeTab === "Dashboard"
                  ? "calc(50% - 119px)"
                  : "calc(50% + 31px)",
            }}
          />
        </div>

        {activeTab === "Dashboard" ? <Dashboard user={user} /> : <Creations />}
      </div>
    </>
  );
};

export default Tabs;
