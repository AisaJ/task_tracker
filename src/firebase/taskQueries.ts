// src/firebase/taskQueries.ts
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

import { db } from "./firebaseConfig";

const tasksCollection = collection(db, "tasks");

// ----------------------
// Add New Task
// ----------------------
export const addTask = async (task: {
  task: string;
  completed: boolean;
  date: string;
}) => {
  return await addDoc(tasksCollection, task);
};

// ----------------------
// Fetch All Tasks
// ----------------------
export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ----------------------
// Update a Task
// ----------------------
export const updateTask = async (id: string, data: any) => {
  const taskRef = doc(db, "tasks", id);
  return await updateDoc(taskRef, data);
};

// ----------------------
// Delete a Task
// ----------------------
export const deleteTask = async (id: string) => {
  const taskRef = doc(db, "tasks", id);
  return await deleteDoc(taskRef);
};
