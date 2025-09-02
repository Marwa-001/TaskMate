import { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Hamburger icon

const Header = ({ onSearchChange, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full top-0 left-0 z-10">
      <div className="flex items-center space-x-4">
        {/* Hamburger menu visible only on small screens */}
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none focus:text-gray-800 md:hidden"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">TaskMate</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search your task here..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:block">
            🔍
          </span>
        </div>
        <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors hidden sm:block">
          🔔
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-800 font-semibold">Tuesday</p>
          <p className="text-xs text-gray-500">20/06/2023</p>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
          JD
        </div>
      </div>
    </header>
  );
};

export default Header;