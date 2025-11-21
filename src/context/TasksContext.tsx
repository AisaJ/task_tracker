import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

type Task = {
  id: string;
  [key: string]: any;
};

type TasksContextValue = {
  tasks: Task[];
};

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try{
      const tasksCollection = collection(db, "tasks");
      const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];

        setTasks(tasksData); // updates UI instantly
      },
        (err) => {
          console.error("Snapshot error:", err);
          setError("Failed to load tasks in real time.");
        }
      );

      return () => unsubscribe();
    }catch (err){
      setError("Error fetching tasks in real-time: ");  
    }
    
  }, []);

  return (
    <TasksContext.Provider value={{ tasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used inside TasksProvider");
  }
  return context;
};

export default TasksContext;


