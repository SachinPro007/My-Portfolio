import React, { memo } from "react";
import { useSelector } from "react-redux";

function EducationCard({ item }) {
  const { themeColors } = useSelector((state) => state.themeReducer);
  return (
    <div className="flex relative pl-14">
      <div
        className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center text-xl z-10"
        style={{
          backgroundColor: themeColors.bg,
          border: `3px solid ${themeColors.primaryColor}`,
          boxShadow: `0 0 0 4px ${themeColors.bg}`,
          color: themeColors.primaryColor,
        }}
      >
        {item.icon}
      </div>

      <div className="w-full">
        <div
          className="p-5 rounded-lg"
          style={{
            backgroundColor: themeColors.bg,
            border: `1px solid ${themeColors.border}`,
          }}
        >
          <h4
            className="text-xl font-semibold mb-2"
            style={{ color: themeColors.text }}
          >
            {item.title}
          </h4>
          <p
            className="text-sm mb-2 flex items-center"
            style={{ color: themeColors.summeryText }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: themeColors.primaryColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            {item.location}
          </p>

          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              backgroundColor: `${themeColors.primaryColor}15`,
              color: themeColors.primaryColor,
              border: `1px solid ${themeColors.primaryColor}30`,
            }}
          >
            {item.duration}
          </span>

          {item.description && (
            <ol
              className="text-sm mt-2 "
              style={{ color: themeColors.summeryText }}
            >
              {item.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}              
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EducationCard);
