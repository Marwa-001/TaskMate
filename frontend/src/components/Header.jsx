import { useState } from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search your task here..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">🔔</button>
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