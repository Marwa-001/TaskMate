import { priorityColors } from '../utils/priorityColors';
import { Link, useLocation } from 'react-router-dom';

const TaskCard = ({ task, onToggleCompletion }) => {
  const { id, title, description, priority, status, image, isCompleted } = task;
  const location = useLocation();
  const colors = priorityColors[priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };

  const content = (
    <div className={`rounded-xl shadow-sm p-4 flex space-x-4 ${colors.bg}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold ${colors.text}`}>{title}</h4>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => {
              e.stopPropagation();
              onToggleCompletion(id);
            }}
            className="form-checkbox h-4 w-4 text-blue-600 rounded"
          />
        </div>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        <div className="flex space-x-2 items-center text-[10px] text-gray-500">
          <span>
            Priority:{' '}
            <span className="font-medium text-black">{priority}</span>
          </span>
          <span>
            Status:{' '}
            <span className="font-medium text-black">{status}</span>
          </span>
        </div>
      </div>
      <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img className="object-cover w-full h-full" src={image} alt="Task" />
      </div>
    </div>
  );

  const isLink = location.pathname.includes('vital-tasks') || location.pathname.includes('my-tasks');
  const pathPrefix = location.pathname.startsWith('/vital') ? 'vital-tasks' : 'my-tasks';

  return isLink ? (
    <Link to={`/${pathPrefix}/${id}`} className="block">
      {content}
    </Link>
  ) : (
    content
  );
};

export default TaskCard;