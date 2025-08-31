import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { priorityColors } from '../utils/priorityColors';

const TaskDetailPage = ({ tasks, onCompleteTask }) => {
  const { taskId, taskType } = useParams();
  const task = tasks.find((t) => t._id === taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  const { title, content, priority, status, duedate, category } = task;

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
      <p>Category: {category}</p>
      <p>Due Date: {duedate}</p>

      {/* Conditionally render the button based on status */}
      {status !== 'Completed' && (
        <button
          onClick={() => onCompleteTask(task._id)}
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default TaskDetailPage;