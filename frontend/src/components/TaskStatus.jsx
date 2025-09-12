// src/components/TaskStatus.jsx

import React from 'react';
import ProgressCircle from './ProgressCircle'; // Assuming ProgressCircle is in the same directory

const TaskStatus = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const notStartedTasks = totalTasks - completedTasks - inProgressTasks;

  const completedPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const inProgressPercentage = totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0;
  const notStartedPercentage = totalTasks > 0 ? (notStartedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Task Status</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"> {/* Use sm:grid-cols-3 for responsiveness */}
        {/* Completed Tasks */}
        <div className="flex flex-col items-center">
          <ProgressCircle
            percentage={completedPercentage}
            color="#10B981" // Green
            label="Completed"
            // ✅ Pass smaller size for mobile (optional, ProgressCircle itself can be responsive)
            // For now, let's just use the default large size, and make ProgressCircle itself responsive.
          />
          <span className="mt-3 text-lg font-medium text-gray-700">Completed</span>
          <span className="text-sm text-gray-500">{completedTasks} tasks</span>
        </div>

        {/* In Progress Tasks */}
        <div className="flex flex-col items-center">
          <ProgressCircle
            percentage={inProgressPercentage}
            color="#F59E0B" // Amber
            label="In Progress"
          />
          <span className="mt-3 text-lg font-medium text-gray-700">In Progress</span>
          <span className="text-sm text-gray-500">{inProgressTasks} tasks</span>
        </div>

        {/* Not Started Tasks */}
        <div className="flex flex-col items-center">
          <ProgressCircle
            percentage={notStartedPercentage}
            color="#EF4444" // Red
            label="Not Started"
          />
          <span className="mt-3 text-lg font-medium text-gray-700">Not Started</span>
          <span className="text-sm text-gray-500">{notStartedTasks} tasks</span>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;