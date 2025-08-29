import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskList from '../components/TaskList';

const CategoryTasksPage = ({ tasks, onToggleTaskCompletion }) => {
  const { categoryName } = useParams();

  // Helper function to format the category name for display
  const formatCategoryName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  };

  const formattedName = formatCategoryName(categoryName);
  const categoryTasks = tasks.filter(task => 
    task.category && task.category.toLowerCase().replace(/\s/g, '-') === categoryName
  );

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <Link to="/task-categories" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Categories
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {formattedName} Tasks
      </h2>
      {categoryTasks.length > 0 ? (
        <TaskList
          tasks={categoryTasks}
          onToggleTaskCompletion={onToggleTaskCompletion}
          allowNavigation={true}
        />
      ) : (
        <p className="text-gray-500">No tasks found for this category.</p>
      )}
    </div>
  );
};

export default CategoryTasksPage;