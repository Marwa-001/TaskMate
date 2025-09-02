import ProgressCircle from './ProgressCircle';
import StatusLegend from './StatusLegend';

const TaskStatus = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'In Progress').length;
  const notStartedTasks = totalTasks - completedTasks - inProgressTasks;

  const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const notStartedPercentage = totalTasks > 0 ? Math.round((notStartedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Task Status</h3>
      <div className="flex justify-around items-center">
        <ProgressCircle
          percentage={completedPercentage}
          label="Completed"
          color="green"
        />
        <ProgressCircle
          percentage={inProgressPercentage}
          label="In Progress"
          color="blue"
        />
        <ProgressCircle
          percentage={notStartedPercentage}
          label="Not Started"
          color="red"
        />
      </div>
      <div className="flex justify-between mt-4">
        <StatusLegend color="green" label="Completed" />
        <StatusLegend color="blue" label="In Progress" />
        <StatusLegend color="red" label="Not Started" />
      </div>
    </div>
  );
};

export default TaskStatus;