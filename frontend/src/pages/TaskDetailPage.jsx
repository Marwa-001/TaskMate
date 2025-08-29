import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { priorityColors } from '../utils/priorityColors';

const TaskDetailPage = ({ tasks, onToggleTaskCompletion }) => {
  const { taskId, taskType } = useParams();
  const task = tasks.find((t) => t.id === parseInt(taskId));

  const backLinkPath = taskType === 'vital-tasks' ? '/vital-tasks' : '/my-tasks';
  const backLinkText = `Back to ${taskType === 'vital-tasks' ? 'Vital Tasks' : 'My Tasks'}`;

  if (!task) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-gray-800">Task not found</h2>
        <p className="text-gray-500 mt-2">
          The task you are looking for does not exist.
        </p>
        <Link to={backLinkPath} className="mt-4 text-blue-500 hover:underline">
          {backLinkText}
        </Link>
      </div>
    );
  }

  const { title, description, priority, status, image, dueDate, assignedTo, isCompleted } = task;
  const colors = priorityColors[priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  return (
    <div className="flex-1 flex flex-col p-6 bg-white rounded-3xl shadow-lg">
      <Link to={backLinkPath} className="text-blue-500 hover:underline mb-4">
        &larr; {backLinkText}
      </Link>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <div className="flex items-center space-x-4 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
          {priority}
        </span>
        <span className="text-sm text-gray-500">Status: <span className="font-semibold text-gray-800">{status}</span></span>
        <span className="text-sm text-gray-500">Due Date: <span className="font-semibold text-gray-800">{dueDate}</span></span>
      </div>
      <div className="flex items-center space-x-2 mb-6">
        <img className="w-8 h-8 rounded-full" src={assignedTo.avatar} alt={assignedTo.name} />
        <span className="text-sm text-gray-500">Assigned To: <span className="font-semibold text-gray-800">{assignedTo.name}</span></span>
      </div>
      <div className="w-full h-80 rounded-lg overflow-hidden mb-6">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onToggleTaskCompletion(task.id)}
        className={`mt-6 py-2 px-4 rounded-lg text-white font-semibold transition-colors ${isCompleted ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
    </div>
  );
};

export default TaskDetailPage;