// src/components/MainContent.jsx
import WelcomeSection from './WelcomeSection';
import TasksList from './TaskList';
import TaskStatus from './TaskStatus';
import CompletedTasks from './CompletedTasks';
import AddTaskForm from './AddTaskForm';
import { useState } from 'react';

const MainContent = ({ tasks, onStartTask, onCompleteTask, onAddTask, onEditTask, onDeleteTask, fetchTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      setTaskToEdit(task);
      setShowForm(true);
    }
  };

  const handleUpdateTask = (updatedTask) => {
    onEditTask(updatedTask._id, updatedTask);
    setTaskToEdit(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    if (showForm) {
      setTaskToEdit(null);
    }
    setShowForm(!showForm);
  };

  const handleTaskAdded = (newTask) => {
    onAddTask(newTask);
    setShowForm(false);
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="flex flex-col p-8 md:p-12 h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={toggleForm}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg text-sm"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <AddTaskForm
            onCancel={toggleForm}
            onTaskAdded={handleTaskAdded}
            onUpdateTask={handleUpdateTask}
            taskToEdit={taskToEdit}
          />
        </div>
      )}

      <div className="flex-1 space-y-8">
        <WelcomeSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TasksList
              title="To-Do"
              tasks={pendingTasks}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={handleEditTask}
              onDeleteTask={onDeleteTask}
              onTaskUpdated={handleTaskUpdated}
            />
            <TasksList
              title="In Progress"
              tasks={inProgressTasks}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={handleEditTask}
              onDeleteTask={onDeleteTask}
              onTaskUpdated={handleTaskUpdated}
            />
          </div>
          <div className="space-y-8">
            <TaskStatus tasks={tasks} />
            <CompletedTasks
              tasks={completedTasks}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={handleEditTask}
              // ✅ Add onDeleteTask and onTaskUpdated
              onDeleteTask={onDeleteTask}
              onTaskUpdated={handleTaskUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;