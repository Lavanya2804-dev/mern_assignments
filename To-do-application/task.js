//ii. task.js - Task operations
    // TODO: Import validator functions
    // import { ... } from './validator.js';
    // task.js

// Import validation functions
import {
  validateTitle,
  validatePriority,
  validateDueDate
} from "./validator.js";

// Task list (in-memory)
const tasks = [];
let taskIdCounter = 1;

// 1. Add new task
export function addTask(title, priority, dueDate) {
  // Validate title
  let titleResult = validateTitle(title);
  if (titleResult !== true) {
    return titleResult;
  }

  // Validate priority
  let priorityResult = validatePriority(priority);
  if (priorityResult !== true) {
    return priorityResult;
  }

  // Validate due date
  let dateResult = validateDueDate(dueDate);
  if (dateResult !== true) {
    return dateResult;
  }

  // If all validations pass, create task
  let newTask = {
    id: taskIdCounter++,
    title: title,
    priority: priority,
    dueDate: dueDate,
    completed: false
  };

  tasks.push(newTask);
  return "Task added successfully";
}

// 2. Get all tasks
export function getAllTasks() {
  return tasks;
}

// 3. Mark task as complete
export function completeTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].completed = true;
      return "Task marked as completed";
    }
  }

  return "Task not found";
}
