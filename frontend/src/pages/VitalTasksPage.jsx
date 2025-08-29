import React from 'react';
import TaskList from '../components/TaskList';
import { useParams } from 'react-router-dom';

const VitalTasksPage = ({ tasks, onStartTask, onCompleteTask }) => {
  const vitalTasks = tasks.filter(task => task.priority === 'Ultimate');

  return (
    <div className="flex-1 flex flex-col pl-8 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vital Tasks</h2>
      <TaskList
        title="Urgent & Important"
        tasks={vitalTasks}
        onStartTask={onStartTask}
        onCompleteTask={onCompleteTask}
        allowNavigation={true}
      />
    </div>
  );
};

export default VitalTasksPage;