// src/pages/MyTasksPage.jsx
import React from 'react';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

const MyTasksPage = ({ tasks, onStartTask, onCompleteTask, onEditTask, onDeleteTask, onTaskUpdated }) => {
  // We no longer need to filter here, as MainContent handles fetching all tasks.
  // The TaskList component will now display all tasks passed to it.

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>
      <TaskList
        title="All My Tasks"
        tasks={tasks} // 👈 Pass all tasks here
        onStartTask={onStartTask}
        onCompleteTask={onCompleteTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onTaskUpdated={onTaskUpdated}
      />
    </div>
  );
};

export default MyTasksPage;