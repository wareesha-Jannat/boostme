"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchUsers = ({ users }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${query}`);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      setFiltered(
        users.filter((u) =>
          u.username.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFiltered([]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        id="searchInput"
        type="text"
        placeholder="Search Creator..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filtered.length > 0 && (
        <ul className="absolute w-full mt-2 bg-transparent text-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto   z-10">
          {filtered.map((u) => (
            <li
              key={u._id}
              onClick={() => {
                setQuery(u.username);
                setFiltered([]);
                router.push(`/${u.username}`);
              }}
              className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700"
            >
              <Image
                src={u.profilepic}
                alt="profilepic"
                className=" rounded-full"
                height={40}
                width={40}
              />
              <div className="flex flex-col justify-start items-start">
                <span className="text-[16px]">{u.name}</span>
                <span className="text-[12px]">@{u.username}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 font-bold text-white px-3 py-1 rounded-md text-sm"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchUsers;
