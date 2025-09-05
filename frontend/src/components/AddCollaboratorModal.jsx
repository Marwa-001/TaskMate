// src/components/AddCollaboratorModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';

const AddCollaboratorModal = ({ isOpen, onClose, taskId, onCollaboratorAdded }) => {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    if (!email) {
      setError("Please enter a collaborator's email.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/todos/share/${taskId}`,
        { collaboratorEmail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
      setEmail('');
      // Notify parent component
      onCollaboratorAdded(response.data.todo);
    } catch (err) {
      console.error('Error adding collaborator:', err);
      setError(
        err.response?.data?.message || 'Failed to add collaborator. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        <button
          onClick={() => {
            onClose();
            setEmail('');
            setError(null);
            setSuccess(false);
          }}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add Collaborator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter collaborator's email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Collaborator added successfully!</p>}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Collaborator'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollaboratorModal;