const ProgressCircle = ({ percentage, label, color }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const strokeColor = color === "green" ? "#22C55E" : color === "blue" ? "#3B82F6" : "#EF4444";

  return (
    <div className="relative w-32 h-32 flex flex-col items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
        />
        <circle
          className="transition-all duration-500 ease-in-out"
          strokeWidth="8"
          stroke={strokeColor}
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
          strokeLinecap="round"
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCircle;