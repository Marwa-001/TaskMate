import TaskCard from './TaskCard';

const CompletedTasks = ({ tasks, onToggleTaskCompletion }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
        <span>Completed Task</span>
      </h3>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleCompletion={onToggleTaskCompletion}
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