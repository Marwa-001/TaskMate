import { useState } from 'react';

const AddTaskForm = ({ onCancel, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !dueDate || !category) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/todos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // include auth header if your backend requires JWT
          // 'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          content, // 👈 changed from "description" to match backend schema
          priority,
          category,
          duedate: dueDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to add task');
      const savedTask = await response.json();

      onTaskAdded(savedTask); // 👈 notify parent so UI updates
      setTitle('');
      setContent('');
      setPriority('Low');
      setCategory('Work');
      setDueDate('');
    } catch (err) {
      console.error('Error adding task:', err);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Add a New Task</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ultimate">Ultimate</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Shopping">Shopping</option>
              <option value="Finance">Finance</option>
              <option value="Learning">Learning</option>
              <option value="Social">Social</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
