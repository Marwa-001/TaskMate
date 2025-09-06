// src/components/CompletedTasks.jsx
import TaskCard from './TaskCard';

// ✅ Add onDeleteTask and other necessary props
const CompletedTasks = ({ tasks, onStartTask, onCompleteTask, onEditTask, onDeleteTask, onTaskUpdated }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
        <span>Completed Task</span>
      </h3>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStartTask={onStartTask}
              onCompleteTask={onCompleteTask}
              onEditTask={onEditTask}
              // ✅ Pass onDeleteTask and onTaskUpdated here
              onDeleteTask={onDeleteTask}
              onTaskUpdated={onTaskUpdated}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;