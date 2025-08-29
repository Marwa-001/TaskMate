import SidebarItem from './SidebarItem';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-75 h-[83vh] bg-white rounded-r-[32px] shadow-xl p-8 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-5">
          <img
            className="w-16 h-16 rounded-full"
            src="https://placehold.co/64x64/E0E0E0/white?text=SG"
            alt="Profile"
          />
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-800">
              Sundar Gurung
            </h4>
            <p className="text-[10px] text-gray-500">
              sundargurung999@gmail.com
            </p>
          </div>
        </div>
        <nav className="w-full">
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
          <SidebarItem
            icon="⚙️"
            text="Settings"
            active={false}
          />
          <SidebarItem
            icon="❓"
            text="Help"
            active={false}
          />
        </nav>
      </div>
      <button className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors mt-2">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;