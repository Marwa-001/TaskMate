import WelcomeSection from './WelcomeSection';
import TasksList from './TaskList';
import TaskStatus from './TaskStatus';
import CompletedTasks from './CompletedTasks';

const MainContent = ({ tasks, onToggleTaskCompletion, onAddTask }) => {
  // Separate tasks into To-Do and Completed
  const toDoTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="flex-1 flex flex-col space-y-8">
      <WelcomeSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TasksList
            title="To-Do"
            tasks={toDoTasks}
            onToggleTaskCompletion={onToggleTaskCompletion}
            onAddTask={onAddTask}
          />
        </div>
        <div className="space-y-8">
          <TaskStatus tasks={tasks} />
          <CompletedTasks
            tasks={completedTasks}
            onToggleTaskCompletion={onToggleTaskCompletion}
          />
        </div>
      </div>
    </div>
  );
};

export default MainContent;