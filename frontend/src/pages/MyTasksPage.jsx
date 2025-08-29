import React from 'react';
import TaskList from '../components/TaskList';
import TaskCard from '../components/TaskCard';

const MyTasksPage = ({ tasks, onToggleTaskCompletion }) => {
  // Filter for tasks that are not yet completed
  const myTasks = tasks.filter(task => !task.isCompleted);

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>
      <TaskList
        title="All My Tasks"
        tasks={myTasks}
        onToggleTaskCompletion={onToggleTaskCompletion}
        allowNavigation={true}
      />
    </div>
  );
};

export default MyTasksPage;