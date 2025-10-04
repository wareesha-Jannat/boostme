"use client";
import React from "react";
import ReadMore from "./ReadMore";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const Creation = ({ creation, onEdit, onDelete, showActions }) => {
  return (
    <div className="bg-gray-900 rounded-2xl w-[320px]   overflow-hidden  scroll-stable shadow-md hover:shadow-lg flex flex-col relative hover:scale-105 transform transition-transform duration-500 ">
      {showActions && (
        <div className="absolute top-2 right-2 flex gap-2 z-20">
          <button
            onClick={() => onEdit(creation)}
            className="bg-gray-800 hover:bg-gray-900 text-white text-xs px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(creation._id)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}

      {/* Cover Image */}
      {creation.coverImage && (
        <div className="relative w-full h-40">
          <Image
            src={creation.coverImage}
            alt={creation.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 flex flex-col justify-center gap-3 flex-grow">
        {/* Title + Status */}
        <div className="flex items-center justify-between">
          <h3 className="logo text-[18px] truncate">{creation.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full capitalize ${
              creation.status === "completed"
                ? "bg-green-600 text-white"
                : creation.status === "active"
                ? "bg-blue-600 text-white"
                : "bg-yellow-500 text-black"
            }`}
          >
            {creation.status}
          </span>
        </div>

        {/* Description */}
        <div className="text-gray-300">
          <ReadMore text={creation.description} />
        </div>

        {/* Link */}
        {creation.link && (
          <a
            href={creation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            View Project <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
        )}

        {/* Dates */}
        <div className="text-xs text-gray-400 mt-auto flex items-center justify-between">
          <p>Created: {new Date(creation.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(creation.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Creation;
