import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todos");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add newly created task without full reload
  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="task-list space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Tasks</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showForm ? "Close" : "Add Task"}
        </button>
      </div>

      {showForm && (
        <AddTaskForm
          onCancel={() => setShowForm(false)}
          onTaskAdded={handleTaskAdded}
        />
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found</p>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
