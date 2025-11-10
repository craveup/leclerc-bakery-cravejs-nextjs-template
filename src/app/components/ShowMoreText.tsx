"use client";

import { useState } from "react";

type ShowMoreTextProps = {
  text: string;
  maxLength?: number;
  className?: string;
};

function ShowMoreText({ text, maxLength = 120, className }: ShowMoreTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p
        className={`text-sm sm:text-base ${
          className ?? "text-gray-800 dark:text-gray-200"
        }`}
      >
        {isExpanded
          ? text
          : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")}
      </p>
      {text.length > maxLength && (
        <button
          onClick={handleToggle}
          className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline sm:text-base"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default ShowMoreText;
