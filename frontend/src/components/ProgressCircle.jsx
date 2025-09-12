// src/components/ProgressCircle.jsx

import React from 'react';

const ProgressCircle = ({ percentage, color, label }) => {
  const radius = 40; // Inner radius for the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Define responsive sizes for the SVG and circle
  // Default (mobile) will be smaller, md: will make it larger
  const svgClass = "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"; // Smaller on mobile, larger on medium/small screens
  const circleStrokeWidth = "8"; // Default stroke width

  return (
    <div className="relative flex items-center justify-center">
      <svg className={svgClass} viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={circleStrokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className="transition-all duration-500 ease-in-out"
          strokeWidth={circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)" // Start from the top
        />
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800" // Responsive text size
          fill={color}
        >
          {`${Math.round(percentage)}%`}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;