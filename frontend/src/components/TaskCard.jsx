const TaskCard = ({ title, description, priority, status, image }) => {
  return (
    <div className="bg-[#E4F2FF] rounded-xl shadow-sm p-4 flex space-x-4">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        <div className="flex space-x-2 items-center text-[10px] text-gray-500">
          <span>Priority: <span className="font-medium text-black">{priority}</span></span>
          <span>Status: <span className="font-medium text-black">{status}</span></span>
        </div>
      </div>
      <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img className="object-cover w-full h-full" src={image} alt="Task" />
      </div>
    </div>
  );
};

export default TaskCard;