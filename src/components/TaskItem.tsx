import React from "react";
import type { Task } from "../types";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";


interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, deleteTask }) => {
    const isOverdue = task.dueDate && !task.completed && dayjs(task.dueDate).isBefore(dayjs(), "day");
  return (
    <div className="flex justify-between items-center bg-white p-2 mb-2 rounded-md shadow-sm border border-gray-200 dark:bg-gray-400 dark:border-gray-200">
        <div className="flex items-center gap-2">
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-4 h-4 accent-blue-600"
            />
            <span
            className={`${
                task.completed ? "line-through text-gray-400" : ""
            } text-sm sm:text-base`}
            >
            {task.title}
            </span>
        </div>
        
        {task.dueDate && (
          <span
            className={`text-xs ${
              isOverdue ? "text-red-500 dark:text-red-300 font-bold" : "text-gray-500 dark:text-gray-300 ml-6"
            }`}>
            Due: {dayjs(task.dueDate).format("MMM D, YYYY")}
          </span>
        )}

        <button
            onClick={() => deleteTask(task.id)}
            className="text-red-300 hover:text-red-700 font-small">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default TaskItem;
