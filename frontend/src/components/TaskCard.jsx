// src/components/TaskCard.jsx
import React, { useState } from 'react';
import { useAuth } from '../store/AuthContext';
import { priorityColors } from '../utils/priorityColors';
import { Link, useLocation } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AddCollaboratorModal from './AddCollaboratorModal';
import axios from 'axios';

const TaskCard = ({ task, onStartTask, onCompleteTask, onEditTask, onDeleteTask, onTaskUpdated }) => {
  const { user, token } = useAuth();
  const {
    _id,
    title,
    content,
    priority,
    status = 'Pending',
    category,
    duedate,
    user: owner,
    collaborators = []
  } = task;

  const location = useLocation();
  const colors = priorityColors[priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  const isTaskCompleted = status === 'Completed';
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = user && owner && user._id === owner._id;
  const isCollaborator = !isOwner && collaborators.some(c => c._id === user._id);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };
  
  const handleRemoveCollaborator = async (collaboratorId) => {
    if (!window.confirm("Are you sure you want to remove this collaborator?")) {
       return;
     }

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/todos/${_id}/collaborators/${collaboratorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to remove collaborator:', error.response ? error.response.data.message : error.message);
      const errorMessage = error.response?.data?.message || 'Failed to remove collaborator. Please try again.';
      alert(errorMessage);
    }
  };

  const contentBlock = (
    <div className={`rounded-xl shadow-sm p-4 flex space-x-4 ${isTaskCompleted ? 'bg-gray-100' : colors.bg} ${isTaskCompleted ? 'text-gray-500' : ''}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold ${isTaskCompleted ? 'line-through text-gray-500' : colors.text}`}>{title}</h4>
          <div className="flex items-center space-x-2">
            {status === 'Pending' && onStartTask && (
              <button
                onClick={(e) => { e.stopPropagation(); onStartTask(_id); }}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Start
              </button>
            )}
            {status === 'In Progress' && onCompleteTask && (
              <button
                onClick={(e) => { e.stopPropagation(); onCompleteTask(_id); }}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Complete
              </button>
            )}
            {isOwner && onEditTask && !isTaskCompleted && (
              <PencilSquareIcon
                className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                onClick={(e) => { e.stopPropagation(); onEditTask(_id); }}
              />
            )}
            {/* ✅ Add condition: Hide the icon if the task is completed */}
            {isOwner && !isTaskCompleted && (
              <UserPlusIcon
                className="h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
              />
            )}
            {isOwner && onDeleteTask && (
              <TrashIcon
                className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                onClick={(e) => { e.stopPropagation(); onDeleteTask(_id); }}
              />
            )}
          </div>
        </div>
        <p className={`text-xs text-gray-600 mb-2 ${isTaskCompleted ? 'line-through' : ''}`}>{content}</p>
        
        {isOwner && collaborators.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-gray-700 mr-2">Shared with:</span>
            {collaborators.map((c) => (
              <div key={c._id} className="relative group flex items-center">
                {c.profilePhoto && c.profilePhoto !== '/uploads/default-avatar.png' ? (
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src={`${process.env.REACT_APP_BACKEND_URL}${c.profilePhoto}`}
                    alt={c.name}
                  />
                ) : (
                  <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white bg-gray-400 text-white font-bold text-xs">
                    {getInitials(c.name)}
                  </div>
                )}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {c.name}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemoveCollaborator(c._id); }}
                    className="ml-2 text-red-400 hover:text-red-500 transition-colors"
                    title="Remove collaborator"
                  >
                    <XMarkIcon className="h-3 w-3 inline-block" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
        {isCollaborator && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-700">
            Shared Task
          </span>
        )}

        <div className="flex flex-wrap gap-2 items-center text-[10px] text-gray-500 mt-2">
          <span>Priority: <span className="font-medium text-black">{priority}</span></span>
          <span>Status: <span className="font-medium text-black">{status}</span></span>
          {category && (<span>Category: <span className="font-medium text-black">{category}</span></span>)}
          {duedate && (<span>Due: <span className="font-medium text-black">{duedate}</span></span>)}
        </div>
      </div>
      {/* ✅ Add condition: Only render the modal if the task is not completed */}
      {!isTaskCompleted && (
        <AddCollaboratorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          taskId={_id}
          onCollaboratorAdded={onTaskUpdated}
        />
      )}
    </div>
  );

  const isLink = location.pathname.includes('vital-tasks') || location.pathname.includes('my-tasks');
  const pathPrefix = location.pathname.startsWith('/vital') ? 'vital-tasks' : 'my-tasks';

  return isLink ? (
    <Link to={`/${pathPrefix}/${_id}`} onClick={(e) => e.stopPropagation()}>{contentBlock}</Link>
  ) : (
    contentBlock
  );
};

export default TaskCard;