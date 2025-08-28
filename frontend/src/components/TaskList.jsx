import TaskCard from "./TaskCard";

const TasksList = ({ title }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <span>{title}</span>
          <span className="text-sm text-gray-500">· Today</span>
        </h3>
        <button className="text-blue-500 font-semibold flex items-center space-x-1 hover:text-blue-700 transition-colors">
          <span className="text-2xl">+</span>
          <span>Add task</span>
        </button>
      </div>
      <div className="space-y-4">
        <TaskCard
          title="Attend Nischal's Birthday Party"
          description="Buy gifts on the way and pick up cake from the bakery."
          priority="Ultimate"
          status="In Progress"
          image="https://placehold.co/120x80"
        />
        <TaskCard
          title="Landing Page Design"
          description="Get the work done by EOD and discuss with client before leaving."
          priority="High"
          status="In Progress"
          image="https://placehold.co/120x80"
        />
        <TaskCard
          title="Presentation on Final Product"
          description="Make sure everything is functioning and all the necessary files are properly met."
          priority="Medium"
          status="In Progress"
          image="https://placehold.co/120x80"
        />
      </div>
    </div>
  );
};

export default TasksList;