import inquirer from "inquirer";
import type { Trip, Activity } from "../types/types.js";
import {
  calculateTotalCost,
  getHighCostActivities,
} from "../services/budgetManager.js";
import { mainMenu } from "../mainCli.js";


export const viewBudgetMenu = async (trip: Trip): Promise<void> => {
  const totalCost = calculateTotalCost(trip);
  console.log(`Total cost: ${totalCost} kr`);

  const { highlight } = await inquirer.prompt([
    {
      name: "highlight",
      type: "confirm",
      message: "Do you want to highlight expensive activities?",
    },
  ]);

  if (!highlight) {
	return await mainMenu()
  }

  const { threshold } = await inquirer.prompt([
    {
      name: "threshold",
      type: "number",
      message: "What's your threshold?",
    },
  ]);

  const expensive = getHighCostActivities(trip.activities, threshold);

  if (expensive.length === 0) {
    console.log("No activities exceed your threshold");
    return await mainMenu();
  }

  console.log("High-cost activities:");
  expensive.forEach((activity: Activity) => {
    console.log(`${activity.name} - ${activity.activityCost}`);
  });

  // run main menu again
	return await mainMenu();
};
