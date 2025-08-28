const SidebarItem = ({ icon, text, active }) => {
  const activeClass = active ? "bg-[#FF0049] text-white" : "text-gray-600 hover:bg-gray-100";
  return (
    <div className={`flex items-center space-x-4 p-3 rounded-lg mb-1 cursor-pointer transition-colors ${activeClass}`}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-sm">{text}</span>
    </div>
  ); 
};

export default SidebarItem;