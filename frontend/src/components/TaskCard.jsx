import { priorityColors } from '../utils/priorityColors';
import { Link, useLocation } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // ✅ Import icons

const TaskCard = ({ task, onStartTask, onCompleteTask, onEditTask, onDeleteTask }) => { // ✅ Add new props
  const {
    _id,
    title,
    content,
    priority,
    status = "Pending",
    category,
    duedate,
  } = task;

  const location = useLocation();
  const colors = priorityColors[priority] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  const isTaskCompleted = status === 'Completed';

  const contentBlock = (
    <div className={`rounded-xl shadow-sm p-4 flex space-x-4 ${isTaskCompleted ? 'bg-gray-100' : colors.bg} ${isTaskCompleted ? 'text-gray-500' : ''}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold ${isTaskCompleted ? 'line-through text-gray-500' : colors.text}`}>{title}</h4>
          <div className="flex items-center space-x-2"> {/* ✅ New container for buttons */}
            {status === 'Pending' && onStartTask && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartTask(_id);
                }}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                Start Task
              </button>
            )}
            {status === 'In Progress' && onCompleteTask && (
              <input
                type="checkbox"
                checked={isTaskCompleted}
                onChange={(e) => {
                  e.stopPropagation();
                  onCompleteTask(_id);
                }}
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
            )}
            {status === 'Completed' && (
              <input
                type="checkbox"
                checked={true}
                disabled
                className="form-checkbox h-4 w-4 text-gray-400 rounded"
              />
            )}
            {/* ✅ Add edit and delete icons */}
            {onEditTask && (
                <PencilIcon
                    className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditTask(_id); // Placeholder for edit functionality
                    }}
                />
            )}
            {onDeleteTask && (
                <TrashIcon
                    className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(_id);
                    }}
                />
            )}
          </div>
        </div>
        <p className={`text-xs text-gray-600 mb-2 ${isTaskCompleted ? 'line-through' : ''}`}>{content}</p>
        <div className="flex flex-wrap gap-2 items-center text-[10px] text-gray-500">
          <span>
            Priority: <span className="font-medium text-black">{priority}</span>
          </span>
          <span>
            Status: <span className="font-medium text-black">{status}</span>
          </span>
          {category && (
            <span>
              Category: <span className="font-medium text-black">{category}</span>
            </span>
          )}
          {duedate && (
            <span>
              Due: <span className="font-medium text-black">{duedate}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const isLink =
    location.pathname.includes('vital-tasks') ||
    location.pathname.includes('my-tasks');
  const pathPrefix = location.pathname.startsWith('/vital')
    ? 'vital-tasks'
    : 'my-tasks';

  return isLink ? (
    <Link to={`/${pathPrefix}/${_id}`} className="block">
      {contentBlock}
    </Link>
  ) : (
    contentBlock
  );
};

export default TaskCard;