import inquirer from "inquirer";
import { countryMenu } from "./cliHandlers/destinationCLI.js";
import { activityMenu } from "./cliHandlers/activityCLI.js";
import { viewBudgetMenu } from "./cliHandlers/viewBudgetCLI.js";
import { maxBudgetMenu } from "./cliHandlers/maxBudgetCLI.js";
import { color } from "./services/formatUtils.js";
import { type Trip } from "./types/types.js";

// Globals
let activityCounter = 0; // track the number of activities

/**
 * User object to store data
 * type Trip from ./models
 */
export const user: Trip = {
	cost: 0,
	destination: "No destination set",
	startDate: "No date set",
	activities: [
		{
			name: "No activity set",
			activityCost: 0,
			category: "no activity",
			startTime: "No date set",
		},
	],
};

// Function to add one more new activity
const addNewActivity = (user: Trip): void => {
	user.activities?.push({
		name: "No activity set",
		activityCost: 0,
		category: "no activity",
		startTime: "No date set",
	});
};

/**
 * Main menu show trips, activity, budget, options.
 *** Start of the program ***
 */
export const mainMenu = async (): Promise<void> => {
	try {
		// Handle users options
		const answers = await inquirer.prompt<{ action: string }>([
			{
				type: "select",
				name: "action",
				message: "What would you like to do?",
				choices: [
					"View Trips",
					"Add Activity",
					"View Budget",
					"Insert max budget",
					"Exit",
				],
			},
		]);

		console.clear(); // Clear the console afer each action

		if (answers.action === "Exit") {
			// Exit the program and print out user information
			// TODO:(Save user to database: db.json)
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
					console.log(
						`${activity.name} - ${activity.activityCost} kr`,
					);
					totalCost += activity.activityCost;
				}
			});

			console.log(
				color("green", `Total cost: ${totalCost} kr. === Goodbye! ===`),
			);
		} else if (answers.action === "View Trips") {
			countryMenu(user); // add user as an argument
		} else if (answers.action === "Add Activity") {
			activityMenu(user, activityCounter);
			activityCounter++;
			addNewActivity(user);
		} else if (answers.action === "View Budget") {
			viewBudgetMenu(user);
		} else if (answers.action === "Insert max budget") {
			maxBudgetMenu();
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
mainMenu();
