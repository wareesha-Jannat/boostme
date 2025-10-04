"use client";
import React, { useState } from "react";

const ReadMore = ({ text, maxLength = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if ((text?.length ?? 0) <= maxLength) {
    return (
      <p className="text-slate-300 text-center text-sm leading-relaxed">
        {text}
      </p>
    );
  }

  return (
    <p className="text-slate-300 text-center text-sm leading-relaxed max-h-[13vh] overflow-y-auto scroll-stable">
      {expanded ? text : text.slice(0, maxLength) + "..."}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-cyan-400 underline ml-1"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </p>
  );
};

export default ReadMore;
