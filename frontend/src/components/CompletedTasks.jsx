import TaskCard from './TaskCard';

const CompletedTasks = ({ tasks, onStartTask, onCompleteTask }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
        <span>Completed Task</span>
      </h3>
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id} // Use _id as the key
              task={task}
              onStartTask={onStartTask} // ✅ Prop name changed
              onCompleteTask={onCompleteTask} // ✅ Prop name changed
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