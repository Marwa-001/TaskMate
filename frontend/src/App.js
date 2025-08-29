import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import VitalTasksPage from './pages/VitalTasksPage';
import MyTasksPage from './pages/MyTasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskCategoriesPage from './pages/TaskCategoriesPage';
import CategoryTasksPage from './pages/CategoryTasksPage';
import initialTasks from './data/tasks.json';

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to toggle task completion status
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              status: task.isCompleted ? 'In Progress' : 'Completed',
            }
          : task
      )
    );
  };

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        ...newTask,
      },
    ]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#F5F8FF] p-8 font-inter">
        <Header onSearchChange={setSearchQuery} />
        <div className="flex flex-1 mt-8">
          <Sidebar />
          <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <MainContent
                    tasks={filteredTasks}
                    onToggleTaskCompletion={toggleTaskCompletion}
                    onAddTask={addTask}
                  />
                }
              />
              <Route
                path="/vital-tasks"
                element={
                  <VitalTasksPage
                    tasks={tasks}
                    onToggleTaskCompletion={toggleTaskCompletion}
                  />
                }
              />
              <Route
                path="/my-tasks"
                element={
                  <MyTasksPage
                    tasks={tasks}
                    onToggleTaskCompletion={toggleTaskCompletion}
                  />
                }
              />
              <Route
                path="/task-categories"
                element={<TaskCategoriesPage tasks={tasks} />}
              />
              <Route
                path="/:taskType/:taskId"
                element={<TaskDetailPage tasks={tasks} onToggleTaskCompletion={toggleTaskCompletion} />}
              />
              <Route
                path="/categories/:categoryName"
                element={<CategoryTasksPage tasks={tasks} onToggleTaskCompletion={toggleTaskCompletion} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;