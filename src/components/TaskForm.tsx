import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface TaskFormProps {
  addTask: (title: string, dueDate?: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
    // const [newDueDate, setNewDueDate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
    
        e.preventDefault();
        if (!title.trim()) return;
        console.log(dueDate)
        addTask(title, dueDate ? dueDate.format("YYYY-MM-DD") : undefined);
        setTitle("");
        setDueDate(null);
        
    };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-stretch gap-2 mb-4">
        <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
            className="flex-1 min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm h-10 focus:ring-2 focus:ring-blue-500"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Due date"
                value={dueDate}
                onChange={(dueDate: Dayjs | null) =>setDueDate(dueDate)}
                slotProps={{
                    textField: {
                        size: "small",
                        sx: { width: 150, "& .MuiInputBase-root": { height: 40 } },
                    },
                }}
            />
        </LocalizationProvider>

        <button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                const titleVal = title || "";
                if (!titleVal.trim()) return;
                const due = dueDate ? dueDate.format("YYYY-MM-DD") : undefined;
                addTask(titleVal, due);
                setTitle("");
                setDueDate(null);
            }}
            className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer h-10"
        >
            Add
        </button>
    </form>
  );
};

export default TaskForm;
