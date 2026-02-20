import type { Trip, Activity } from "../types/types.js";

import Readline from "readline";

//addActivitiesToTrip();with details like name, cost, category, and time

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Add a new activity
const addActivity = (): void => {
    rl.question("Enter task: ", (text: string) => {
        if (text.trim() === "") {
            console.log("Task cannot be empty!\n");
        } else {
            const newTodo: Todo = {
                id: Date.now(),
                text: text.trim(),
            };

            todos.push(newTodo);
            console.log("? Task added successfully!\n");
        }
        showMenu();
    });
};

//viewAllActivitiesForDay();
//view all activities for a specific day to see my daily schedule.
//filterActivitiesByCategory();