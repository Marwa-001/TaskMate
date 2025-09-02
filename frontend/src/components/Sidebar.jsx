import SidebarItem from './SidebarItem';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-xl rounded-r-[32px] p-6 md:p-8 flex flex-col transform transition-transform duration-300 z-30
        md:fixed md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Close button only on mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-600 focus:outline-none focus:text-gray-800 md:hidden"
      >
        <FaTimes size={20} className="md:size-24" />
      </button>

      {/* Profile Section (pinned at top) */}
      <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6 shrink-0">
        <img
          className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          src="https://placehold.co/64x64/E0E0E0/white?text=SG"
          alt="Profile"
        />
        <div className="flex flex-col">
          <h4 className="text-xs md:text-sm font-semibold text-gray-800">
            Sundar Gurung
          </h4>
          <p className="text-[9px] md:text-[10px] text-gray-500">
            sundargurung999@gmail.com
          </p>
        </div>
      </div>

      {/* Scrollable Nav Section */}
      <nav className="flex-1 overflow-y-auto w-full space-y-1">
        <Link to="/dashboard">
          <SidebarItem
            icon="🏠"
            text="Dashboard"
            active={location.pathname === '/dashboard'}
          />
        </Link>
        <Link to="/vital-tasks">
          <SidebarItem
            icon="❗"
            text="Vital Task"
            active={location.pathname.startsWith('/vital')}
          />
        </Link>
        <Link to="/my-tasks">
          <SidebarItem
            icon="✅"
            text="My Task"
            active={location.pathname.startsWith('/my')}
          />
        </Link>
        <Link to="/task-categories">
          <SidebarItem
            icon="🏷️"
            text="Task Categories"
            active={location.pathname === '/task-categories'}
          />
        </Link>
        <SidebarItem icon="⚙️" text="Settings" active={false} />
        <SidebarItem icon="❓" text="Help" active={false} />
      </nav>

      {/* Logout Section (pinned at bottom) */}
      <button className="bg-red-500 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors shrink-0 mt-4 text-sm md:text-base">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
