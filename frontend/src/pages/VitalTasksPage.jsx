import React from 'react';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

// ✅ Receive the new props here
const VitalTasksPage = ({ tasks, onStartTask, onCompleteTask, onEditTask, onDeleteTask }) => {
  const vitalTasks = tasks.filter(task => task.priority === 'Ultimate');

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Tasks</h2>
      <TaskList
        title="Urgent & Important"
        tasks={vitalTasks}
        onStartTask={onStartTask}
        onCompleteTask={onCompleteTask}
        // ✅ Pass the props to TaskList
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

export default VitalTasksPage;