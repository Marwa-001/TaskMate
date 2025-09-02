import WelcomeSection from './WelcomeSection';
import TasksList from './TaskList';
import TaskStatus from './TaskStatus';
import CompletedTasks from './CompletedTasks';
import AddTaskForm from './AddTaskForm';
import { useState } from 'react';

const MainContent = ({ tasks, onStartTask, onCompleteTask, onAddTask, onEditTask, onDeleteTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // ✅ New state to track the task being edited

  // ✅ New handler for editing a task
  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      setTaskToEdit(task); // Set the task to be edited
      setShowForm(true);    // Show the form
    }
  };

  const handleUpdateTask = (updatedTask) => {
    onEditTask(updatedTask._id, updatedTask);
    setTaskToEdit(null); // Clear the edit state
    setShowForm(false);  // Hide the form
  };

  const toggleForm = () => {
    if (showForm) {
      setTaskToEdit(null); // Clear the edit state if the form is closed
    }
    setShowForm(!showForm);
  };

  const handleTaskAdded = (newTask) => {
    onAddTask(newTask);
    setShowForm(false);
  };

  // Filter tasks based on the 'status' property
  const pendingTasks = tasks.filter((task) => task.status !== 'Completed');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={toggleForm}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <AddTaskForm
            onCancel={toggleForm}
            onTaskAdded={handleTaskAdded}
            onUpdateTask={handleUpdateTask} // ✅ Pass the new prop
            taskToEdit={taskToEdit}         // ✅ Pass the task data for editing
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
              onEditTask={handleEditTask}      // ✅ Use the new handler
              onDeleteTask={onDeleteTask}
            />
          </div>
          <div className="space-y-8">
            <TaskStatus tasks={tasks} />
            <CompletedTasks
              tasks={completedTasks}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={handleEditTask}      // ✅ Use the new handler
              onDeleteTask={onDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;