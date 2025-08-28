const StatusLegend = ({ color, label }) => {
  const dotColor = color === "green" ? "bg-green-500" : color === "blue" ? "bg-blue-500" : "bg-red-500";
  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};


export default StatusLegend;