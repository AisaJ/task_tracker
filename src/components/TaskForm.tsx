import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { addTask } from "../firebase/taskQueries";

interface TaskFormProps {
  
}

const TaskForm: React.FC<TaskFormProps> = () => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
    const [dateError, setDateError] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {        
        e.preventDefault();
        if (!title.trim()){
            alert("Title is required");
            return ;
        }
        if (!dueDate){ 
            setDateError(true);
            return;
        } 
        const newTask = {
            task: title.trim(),
            date: dueDate.format("YYYY-MM-DD"),
            completed: false,
            deleted: false,
        };
        addTask(newTask)

        console.log("Adding task:", newTask);    
        setTitle("");
        setDueDate(null);
        
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full items-stretch gap-2 mb-4 ">
            <input
                name="title"
                type="text"
                value={title}
                required={true}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new task..."
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-3 py-2 text-sm h-10 focus:ring-2 focus:ring-blue-500"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Due date"
                    value={dueDate}                  
                    onChange={(dueDate: Dayjs | null) => {
                        setDueDate(dueDate) 
                        setDateError(false);}
                    }
                    slotProps={{
                        textField: {
                            required: true,
                            error: dateError,
                            helperText: dateError ? "Due date is required" : "",
                            FormHelperTextProps: {
                            sx: { color: "error.main" }, // forces the helper text to be red ✔
                            },
                            variant: "outlined",
                            size: "small",
                            sx: { width: 150, "& .MuiInputBase-root": { height: 40 } },
                        },
                    }}
                />
            </LocalizationProvider>

            <button
                type="submit"               
                
                className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer h-10" >
                Add
            </button>
        </form>
  );
};

export default TaskForm;


