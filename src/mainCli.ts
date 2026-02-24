import inquirer from "inquirer";
import { countryMenu } from "./cliHandlers/destinationCLI.js";
import { activityMenu } from "./cliHandlers/activityCLI.js";
import { viewBudgetMenu } from "./cliHandlers/viewBudgetCLI.js";
import { color } from "./services/formatUtils.js";
import { type Trip } from "./types/types.js";

//User object to store data when program is running
export const user: Trip = {
	cost: 0,
	destination: "No destination set",
	startDate: "No date set",
	activities: [],
};

/**
 * Main menu show trips, activity, budget, options.
 * *** Start of the program ***
 */
export const mainMenu = async (): Promise<void> => {
	try {
		// Handle users options
		const answers = await inquirer.prompt<{ action: string }>([
			{
				type: "select",
				name: "action",
				message: "What would you like to do?",
				choices: ["View Trips", "Add Activity", "View Budget", "Exit"],
			},
		]);

		console.clear(); // Clear the console afer each action

		if (answers.action === "Exit") {
			// Exit the program and print out user information
			exitMessage();
		} else if (answers.action === "View Trips") {
			await countryMenu(user);
		} else if (answers.action === "Add Activity") {
			activityMenu(user);
		} else if (answers.action === "View Budget") {
			viewBudgetMenu(user);
		}
	} catch (error) {
		// Handle errors
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
	}
};

// Exit message with colorful info on the trip, cost, activities and date.
function exitMessage() {
	let totalCost: number = user.cost;
	console.log(
		color(
			"green",
			`Have a nice trip to ${user.destination} - ${user.startDate}.`,
		),
	);
	console.log(`${user.destination} - ${user.cost} kr`);
	user.activities.forEach((activity) => {
		if (activity.name !== "No activity set") {
			console.log(`${activity.name} - ${activity.activityCost} kr`);
			totalCost += activity.activityCost;
		}
	});
	console.log(
		color("green", `Total cost: ${totalCost} kr. === Goodbye! ===`),
	);
}

// start the program
mainMenu();
