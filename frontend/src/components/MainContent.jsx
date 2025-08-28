import WelcomeSection from "./WelcomeSection";
import TasksList from "./TaskList";
import TaskStatus from "./TaskStatus";
import CompletedTasks from "./CompletedTasks";

const MainContent = () => {
  return (
    <div className="flex-1 flex flex-col space-y-8">
      <WelcomeSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TasksList title="To-Do" />
        </div>
        <div className="space-y-8">
          <TaskStatus />
          <CompletedTasks />
        </div>
      </div>
    </div>
  );
};

export default MainContent;