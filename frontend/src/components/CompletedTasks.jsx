import TaskCard from "./TaskCard";

const CompletedTasks = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2 mb-4">
        <span>Completed Task</span>
      </h3>
      <div className="space-y-4">
        <TaskCard
          title="Walk the dog"
          description="Take the dog to the park and bring treats as well."
          priority="Low"
          status="Completed"
          image="https://placehold.co/120x80"
        />
        <TaskCard
          title="Conduct meeting"
          description="Meet with the client and finalize requirements."
          priority="High"
          status="Completed"
          image="https://placehold.co/120x80"
        />
      </div>
    </div>
  );
};

export default CompletedTasks;