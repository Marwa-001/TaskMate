import ProgressCircle from "./ProgressCircle";
import StatusLegend from "./StatusLegend";

const TaskStatus = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Status</h3>
      <div className="flex justify-around items-center">
        <ProgressCircle percentage={84} label="Completed" color="green" />
        <ProgressCircle percentage={46} label="In Progress" color="blue" />
        <ProgressCircle percentage={13} label="Not Started" color="red" />
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <StatusLegend color="green" label="Completed" />
        <StatusLegend color="blue" label="In Progress" />
        <StatusLegend color="red" label="Not Started" />
      </div>
    </div>
  );
};

export default TaskStatus;