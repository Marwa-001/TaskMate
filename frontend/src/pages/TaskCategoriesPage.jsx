import React from 'react';
import { Link } from 'react-router-dom';

const categoriesData = [
  {
    name: 'Work',
    icon: '💼',
    description: 'Tasks related to your professional life and projects.',
  },
  {
    name: 'Personal',
    icon: '🏡',
    description: 'Tasks for personal growth and home management.',
  },
  {
    name: 'Health & Fitness',
    icon: '💪',
    description: 'Track your workouts, meals, and health goals.',
  },
  {
    name: 'Shopping',
    icon: '🛒',
    description: 'Keep track of your shopping lists and errands.',
  },
  {
    name: 'Finance',
    icon: '💰',
    description: 'Manage your budget, bills, and financial goals.',
  },
  {
    name: 'Learning',
    icon: '📚',
    description: 'Tasks for new skills, courses, or reading.',
  },
  {
    name: 'Social',
    icon: '🎉',
    description: 'Remember birthdays and other social events.',
  },
  {
    name: 'Creative',
    icon: '🎨',
    description: 'Tasks for hobbies, art projects, and creative ideas.',
  },
];

const TaskCategoriesPage = ({ tasks }) => {
  const getTaskCount = (categoryName) => {
    return tasks.filter(task => task.category === categoryName).length;
  };

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((category) => (
          <div
            key={category.name}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start transition-transform transform hover:scale-105"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 flex-grow mb-4">
              {category.description}
            </p>
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-medium text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                {getTaskCount(category.name)} Tasks
              </span>
              <Link
                to={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                className="text-blue-500 font-semibold text-sm hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCategoriesPage;