import { useState } from 'react';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';

const TasksList = ({ title, tasks, onToggleTaskCompletion, onAddTask }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handleFormSubmit = (newTask) => {
    onAddTask(newTask);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <span>{title}</span>
          <span className="text-sm text-gray-500">· Today</span>
        </h3>
        {onAddTask && (
          <button
            className="text-blue-500 font-semibold flex items-center space-x-1 hover:text-blue-700 transition-colors cursor-pointer"
            onClick={handleAddButtonClick}
          >
            <span className="text-2xl">+</span>
            <span>Add task</span>
          </button>
        )}
      </div>
      <div className="space-y-4">
        {isAdding && onAddTask && (
          <AddTaskForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
        )}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleCompletion={onToggleTaskCompletion}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks to display.</p>
        )}
      </div>
    </div>
  );
};

export default TasksList;