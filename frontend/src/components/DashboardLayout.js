import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import VitalTasksPage from '../pages/VitalTasksPage';
import MyTasksPage from '../pages/MyTasksPage';
import TaskDetailPage from '../pages/TaskDetailPage';
import TaskCategoriesPage from '../pages/TaskCategoriesPage';
import CategoryTasksPage from '../pages/CategoryTasksPage';

const DashboardLayout = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/todos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTasks();
  }, [token]);

  // CRUD Handlers
  const addTask = async (newTask) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/todos/create`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const startTask = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/edit/${id}`,
        { status: "In Progress" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error starting task:", err);
    }
  };

  const completeTask = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/edit/${id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/todos/delete/${id}`, {
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
  );
};

export default DashboardLayout;
