import React, { useEffect, useReducer, useState, } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task, Action } from "./types";
import { Button, Typography, FormControl, InputLabel, MenuItem,Select, Box, LinearProgress } from "@mui/material";


const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
          return [
            ...state,
            { id: Date.now(), title: action.title, completed: false, dueDate: action.dueDate || "" },
          ];
    case "TOGGLE_TASK":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case "DELETE_TASK":
      return state.filter((t) => t.id !== action.id);
    case "LOAD_TASKS":
      return action.tasks;
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed)) {
          dispatch({ type: "LOAD_TASKS", tasks: parsed });
        }
      } catch (err) {
        console.error("Error loading saved tasks:", err);
      }
    }
  }, []);

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) dispatch({ type: "LOAD_TASKS", tasks: JSON.parse(saved) });

    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  // Save tasks & theme to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    
  }, [tasks, darkMode]);
  
  

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Sort logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "none") return 0; // no sorting
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1; // move tasks without date to bottom
    if (!b.dueDate) return -1;

    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  //Sort list menu
  const sortOptions = [
    { value: "none", label: "No sort" },
    { value: "asc", label: "Earliest due" },
    { value: "desc", label: "Latest due" },
  ];
  //Progress bar calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const duration = 400; // milliseconds
    const frameRate = 20; // frames per second
    const totalFrames = (duration / 1000) * frameRate;
    let frame = 0;

    const start = animatedProgress;
    const delta = progress - start;

    const interval = setInterval(() => {
      frame++;
      const easeInOut = 0.5 - Math.cos((frame / totalFrames) * Math.PI) / 2;
      setAnimatedProgress(start + delta * easeInOut);
      if (frame >= totalFrames) clearInterval(interval);
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [progress]);


  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-full">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Typography variant="h5" className="text-3xl font-bold text-amber-600 dark:text-amber-800">📝 </Typography>
            </div>
            <Typography variant="h5" className="text-xl text-amber-700 dark:text-amber-200">Task Tracker Dashboard</Typography>

            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md hover:opacity-80"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button> */}
          </div>

          {/* Task Form */}
          <TaskForm addTask={(title, dueDate) => dispatch({ type: "ADD_TASK", title, dueDate })}/>

          {/* Filter Buttons */}
          <div className="flex justify-end gap-3 mb-4">
                      
              {["all", "active", "completed"].map((f) => (
                <Button
                  key={f}
                  size="small"
                  variant={filter === f ? "contained" : "outlined"}
                  color={f === "active" ? "warning" : f === "completed" ? "success" : "primary"}
                  onClick={() => setFilter(f as "all" | "active" | "completed")}
                  sx={{ textTransform: "capitalize", px: 2 }}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </Button>
              ))}
              <FormControl size="small" >
                <InputLabel sx={{ fontSize: "0.875rem" }}>Sort</InputLabel>
                <Select
                  value={sortOrder}
                  label="Sort"
                  onChange={(e) => setSortOrder(e.target.value as "none" | "asc" | "desc")}
                  sx={{ minWidth: 140, fontSize: "0.775rem" }}
                >
                {sortOptions.map((option) => (
                   
                  <MenuItem key={option.value} value={option.value} sx={{fontSize:"0.775rem"}}>
                    {option.label}
                  </MenuItem> )
                )}
                
                </Select>
              </FormControl>
            
          </div>
          
          {/* Progress Bar */}
          <Box sx={{ width: "100%", mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}>
              <Typography variant="body2" color="text.secondary">
                {completedTasks} of {totalTasks} tasks completed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(animatedProgress)}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={animatedProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    animatedProgress < 40
                      ? "#ef4444" // red
                      : animatedProgress < 80
                      ? "#facc15" // yellow
                      : "#22c55e", // green
                  transition: "all 0.3s ease",
                },
              }}
            />
          </Box>
          {progress === 100 && (
            <Typography
              variant="body2"
              color="success.main"
              sx={{ mt: 1, textAlign: "center", fontWeight: 500 }}
            >
              🎉 All tasks completed!
            </Typography>
          )}

          {/* Task List */}
          <TaskList
            tasks={sortedTasks}
            toggleTask={(id) => dispatch({ type: "TOGGLE_TASK", id })}
            deleteTask={(id) => dispatch({ type: "DELETE_TASK", id })}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
