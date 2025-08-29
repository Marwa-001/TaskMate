import SidebarItem from './SidebarItem';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeTab, onTabChange }) => {
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
          <Link to="/">
            <SidebarItem
              icon="🏠"
              text="Dashboard"
              onClick={() => onTabChange('Dashboard')}
              active={activeTab === 'Dashboard'}
            />
          </Link>
          <Link to="/vital-tasks">
            <SidebarItem
              icon="❗"
              text="Vital Task"
              onClick={() => onTabChange('Vital Task')}
              active={activeTab === 'Vital Task'}
            />
          </Link>
          <Link to="/my-tasks">
            <SidebarItem
              icon="✅"
              text="My Task"
              onClick={() => onTabChange('My Task')}
              active={activeTab === 'My Task'}
            />
          </Link>
          <SidebarItem
            icon="🏷️"
            text="Task Categories"
            onClick={() => onTabChange('Task Categories')}
            active={activeTab === 'Task Categories'}
          />
          <SidebarItem
            icon="⚙️"
            text="Settings"
            onClick={() => onTabChange('Settings')}
            active={activeTab === 'Settings'}
          />
          <SidebarItem
            icon="❓"
            text="Help"
            onClick={() => onTabChange('Help')}
            active={activeTab === 'Help'}
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