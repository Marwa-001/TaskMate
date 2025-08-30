import { useState, useEffect } from 'react';
import axios from 'axios'; 
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

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Example: if you’re storing JWT in localStorage
  const token = localStorage.getItem("token");

  // Fetch tasks from backend
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false); // ✅ important
    }
  };

  fetchTasks();
}, []);



  // Add Task
  const addTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:3000/todos/create", newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Start Task (status → In Progress)
  const startTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/edit/${id}`,
        { status: "In Progress" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error starting task:", err);
    }
  };

  // Complete Task (status → Completed)
  const completeTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/edit/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#F5F8FF] p-8 font-inter">
        <Header onSearchChange={setSearchQuery} />
        <div className="flex flex-1 mt-8">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <MainContent
                    tasks={filteredTasks}
                    onStartTask={startTask}
                    onCompleteTask={completeTask}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                  />
                }
              />
              <Route
                path="/vital-tasks"
                element={
                  <VitalTasksPage
                    tasks={tasks}
                    onStartTask={startTask}
                    onCompleteTask={completeTask}
                  />
                }
              />
              <Route
                path="/my-tasks"
                element={
                  <MyTasksPage
                    tasks={tasks}
                    onStartTask={startTask}
                    onCompleteTask={completeTask}
                  />
                }
              />
              <Route
                path="/task-categories"
                element={<TaskCategoriesPage tasks={tasks} />}
              />
              <Route
                path="/:taskType/:taskId"
                element={<TaskDetailPage tasks={tasks} onCompleteTask={completeTask} />}
              />
              <Route
                path="/categories/:categoryName"
                element={<CategoryTasksPage tasks={tasks} onCompleteTask={completeTask} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
