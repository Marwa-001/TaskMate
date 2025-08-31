import WelcomeSection from './WelcomeSection';
import TasksList from './TaskList';
import TaskStatus from './TaskStatus';
import CompletedTasks from './CompletedTasks';
import AddTaskForm from './AddTaskForm';
import { useState } from 'react';

const MainContent = ({ tasks, onStartTask, onCompleteTask, onAddTask }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTaskAdded = (newTask) => {
    onAddTask(newTask);
    setShowForm(false);
  };

  // ✅ Filter tasks based on the 'status' property
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
          <AddTaskForm onCancel={toggleForm} onTaskAdded={handleTaskAdded} />
        </div>
      )}

      <div className="flex-1 space-y-8">
        <WelcomeSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TasksList
              title="To-Do"
              tasks={pendingTasks} // Pass the filtered pending tasks
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
            />
          </div>
          <div className="space-y-8">
            <TaskStatus tasks={tasks} />
            <CompletedTasks
              tasks={completedTasks} // Pass the filtered completed tasks
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;