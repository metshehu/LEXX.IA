import React from "react";
import { Search } from "lucide-react"; // Optional: install `lucide-react` for icons
import { useEffect, useState } from "react";

interface SearchPopUpsProps {
  suggestions: string[];
}

export const SearchPopUps: React.FC<SearchPopUpsProps> = ({ suggestions }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="w-full flex justify-center">
      <ul className="bg-white border mt-1 w-[600px] max-w-full z-10 rounded-lg shadow-lg">
        {suggestions.map((item, idx) => (
          <li 
            key={idx} 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
          >
            <span>{item}</span>
            <button
              className="bg-[#7700ff] hover:bg-[#5c00cc] text-white font-medium px-3 py-1 rounded-full transition-all text-xs"
            >
              Select ✨
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
