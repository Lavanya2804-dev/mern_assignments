// app.js
// Import task functions
import {
  addTask,
  getAllTasks,
  completeTask
} from "./task.js";

// 1. Add some tasks
console.log(addTask("Learn JavaScript", "high", "2026-01-30"));
console.log(addTask("Practice coding", "medium", "2026-02-05"));
console.log(addTask("Go to gym", "low", "2026-02-01"));

// 2. Display all tasks
console.log("All Tasks:");
console.log(getAllTasks());

// 3. Complete a task
console.log(completeTask(2));

// 4. Display all tasks again
console.log("Tasks after completion:");
console.log(getAllTasks());
