import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import axios from 'axios';

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
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, { name, email, password });
      login(res.data.token);
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
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline cursor-pointer">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
