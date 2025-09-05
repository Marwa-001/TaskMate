import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import VitalTasksPage from './pages/VitalTasksPage';
import MyTasksPage from './pages/MyTasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskCategoriesPage from './pages/TaskCategoriesPage';
import CategoryTasksPage from './pages/CategoryTasksPage';
import { useAuth, AuthProvider } from './store/AuthContext'; // ✅ import here

// =================================================================
// AUTHENTICATION CONTEXT (Now part of this file)
// =================================================================
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch user data
//   const fetchUser = async (authToken) => {
//     try {
//       if (!authToken) {
//         return null;
//       }
//       const res = await axios.get("http://localhost:3000/api/user/profile", {
//         headers: { Authorization: `Bearer ${authToken}` }
//       });
//       return res.data;
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       localStorage.removeItem('token');
//       setToken(null);
//       return null;
//     }
//   };

//   useEffect(() => {
//     // Initial fetch on component mount
//     const loadUser = async () => {
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         const userData = await fetchUser(storedToken);
//         if (userData) {
//           setToken(storedToken);
//           setUser(userData);
//         }
//       }
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   const login = async (authToken) => {
//     localStorage.setItem('token', authToken);
//     setToken(authToken);
//     const userData = await fetchUser(authToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// =================================================================
// PRIVATE ROUTE COMPONENT
// =================================================================
const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return token ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

// =================================================================
// LOGIN COMPONENT
// =================================================================
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        await login(data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to server.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#F5F8FF] font-inter">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Log In</button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

// =================================================================
// SIGNUP COMPONENT
// =================================================================
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post("http://localhost:3000/api/user/register", { name, email, password });
      await login(res.data.token);
      navigate('/dashboard');
    } catch (e) {
      setError('Failed to create an account. Please try again.');
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#F5F8FF] font-inter">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Sign Up</button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline cursor-pointer">Log In</span>
        </p>
      </div>
    </div>
  );
};

// =================================================================
// MAIN APP COMPONENT
// =================================================================
const App = () => {
  const { token, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataLoading, setDataLoading] = useState(true);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchTasks = async () => {
    if (!token) {
      setDataLoading(false);
      return;
    }
    try {
      const res = await axios.get("http://localhost:3000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setDataLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      await axios.post(
        "http://localhost:3000/api/todos/create",
        newTask, // 👈 Pass the new task data here
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks(); // ✅ Now, fetch tasks after a successful creation
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/todos/edit/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (err) {
      console.error(`Error updating task status to ${newStatus}:`, err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:3000/api/todos/delete/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
        console.error("Error deleting task:", err);
        alert("Failed to delete task. Please try again.");
    }
  };

  // ✅ New function to handle editing a task on the server
  const editTask = async (taskId, updatedTaskData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/todos/edit/${taskId}`,
        updatedTaskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) {
        setTasks(tasks.map(task => task._id === taskId ? res.data : task));
      }
    } catch (err) {
      console.error("Error editing task:", err);
      alert("Failed to edit task. Please try again.");
    }
  };

  const startTask = (id) => updateTaskStatus(id, "In Progress");
  const completeTask = (id) => updateTaskStatus(id, "Completed");

  useEffect(() => {
    fetchTasks();
  }, [token]);

  if (authLoading || dataLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col h-screen bg-[#F5F8FF] font-inter">
      {!hideLayout && <Header onSearchChange={setSearchQuery} toggleSidebar={toggleSidebar} />}
      <div className={`flex flex-1 ${!hideLayout ? "mt-24" : ""}`}>
        {!hideLayout && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <div className={`flex-1 flex flex-col md:pl-64 ${!hideLayout ? "pl-8 overflow-y-auto" : ""} md:pl-0`}>
          <Routes>
            <Route path="/" element={
            <PrivateRoute>
              <MainContent
                tasks={filteredTasks}
                onStartTask={startTask}
                onCompleteTask={completeTask}
                onAddTask={addTask}
                onEditTask={editTask}
                onDeleteTask={deleteTask}
                fetchTasks={fetchTasks} 
              />
            </PrivateRoute>
          } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <MainContent
                  tasks={filteredTasks}
                  onAddTask={addTask}
                  onStartTask={startTask}
                  onCompleteTask={completeTask}
                  onEditTask={editTask}
                  onDeleteTask={deleteTask}
                  fetchTasks={fetchTasks} 
                />
              </PrivateRoute>
            } />
            <Route path="/vital-tasks" element={
              <PrivateRoute>
                <VitalTasksPage tasks={tasks} onStartTask={startTask} onCompleteTask={completeTask} onEditTask={editTask} onDeleteTask={deleteTask} />
              </PrivateRoute>
            } />
            <Route path="/my-tasks" element={
              <PrivateRoute>
                <MyTasksPage tasks={tasks} onStartTask={startTask} onCompleteTask={completeTask} onEditTask={editTask} onDeleteTask={deleteTask} />
              </PrivateRoute>
            } />
            <Route path="/task-categories" element={
              <PrivateRoute>
                <TaskCategoriesPage tasks={tasks} />
              </PrivateRoute>
            } />
            <Route path="/:taskType/:taskId" element={
              <PrivateRoute>
                <TaskDetailPage tasks={tasks} onCompleteTask={completeTask} onStartTask={startTask} onEditTask={editTask} onDeleteTask={deleteTask} />
              </PrivateRoute>
            } />
            <Route path="/categories/:categoryName" element={
              <PrivateRoute>
                <CategoryTasksPage tasks={tasks} onCompleteTask={completeTask} onStartTask={startTask} onEditTask={editTask} onDeleteTask={deleteTask} />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// ROOT COMPONENT TO WRAP THE APP
// =================================================================
const RootApp = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);


export default RootApp;