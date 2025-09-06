// src/components/TaskList.jsx
import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ title, tasks, onStartTask, onCompleteTask, onEditTask, onDeleteTask, onTaskUpdated }) => {
  return (
    <div className="task-list">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {tasks.length > 0 ? (
        // ✅ Changed this div to use flexbox for reliable spacing
        <div className="flex flex-col gap-4"> 
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onTaskUpdated={onTaskUpdated}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks found in this list.</p>
      )}
    </div>
  );
};

export default TaskList;