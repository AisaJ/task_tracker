export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string; //
}

export type Action =
  | { type: "ADD_TASK"; title: string; dueDate?: string | null }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "DELETE_TASK"; id: number }
  | { type: "LOAD_TASKS"; tasks: Task[] };