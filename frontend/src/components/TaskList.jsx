import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ title, tasks, onStartTask, onCompleteTask, onEditTask, onDeleteTask }) => {
  return (
    <div className="task-list space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStartTask={onStartTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask} // ✅ Pass the new prop
            onDeleteTask={onDeleteTask} // ✅ Pass the new prop
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found in this list.</p>
      )}
    </div>
  );
};

export default TaskList;