export interface Task {
  id: number;
  task: string;
  completed: boolean;
  date?: string; //
}

export type Action =
  | { type: "ADD_TASK"; title: string; dueDate?: string | null }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "DELETE_TASK"; id: number }
  | { type: "LOAD_TASKS"; tasks: Task[] };