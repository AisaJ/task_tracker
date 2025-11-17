import React from "react";
import type { Task } from "../types";

import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, deleteTask }) => {
  if (tasks.length === 0) {
    return (
    <div className="flex justify-center items-center h-24 bg-gray-100 dark:bg-gray-800 rounded-md border border-dashed border-gray-300 dark:border-gray-600">   
        <p className="text-gray-300 p-2">No tasks yet. Add one above!</p>
    </div>)
  }

  return (
    <div className="max-h-90 overflow-y-auto">
      {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
      ))}
    </div>
  );
};

export default TaskList;
