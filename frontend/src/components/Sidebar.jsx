import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="w-80 bg-white rounded-r-[32px] shadow-xl p-8 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-8">
          <img className="w-16 h-16 rounded-full" src="https://placehold.co/64x64/E0E0E0/white?text=SG" alt="Profile" />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-800">Sundar Gurung</h4>
            <p className="text-[10px] text-gray-500">sundargurung999@gmail.com</p>
          </div>
        </div>
        <nav className="w-full">
          <SidebarItem icon="🏠" text="Dashboard" active />
          <SidebarItem icon="❗" text="Vital Task" />
          <SidebarItem icon="✅" text="My Task" />
          <SidebarItem icon="🏷️" text="Task Categories" />
          <SidebarItem icon="⚙️" text="Settings" />
          <SidebarItem icon="❓" text="Help" />
        </nav>
      </div>
      <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;