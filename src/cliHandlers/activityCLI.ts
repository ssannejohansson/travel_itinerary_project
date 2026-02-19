import inquirer from "inquirer";
import { mainMenu } from "../mainCli.js";
import { color } from "../services/formatUtils.js";
import { type Trip } from "../types/types.js";
import { ActivityCost } from "../types/types.js";
import { type ActivityType } from "../types/types.js";

/**
 * Handle activity options for user
 * @param user - from mainMenu - instead of global user
 * @param counter - how many activities do user have
 */
export const activityMenu = async (
	user: Trip,
	counter: number,
): Promise<void> => {
	try {
		// Handle users options
		const activity = await inquirer.prompt<{ selectActivity: string }>([
			{
				type: "select",
				name: "selectActivity",
				message: `Select an activity:
 ******************************
 * Food		- ${ActivityCost.food} kr, 
 * Transport 	- ${ActivityCost.transport} kr, 
 * Sightseeing 	- ${ActivityCost.sightseeing} kr
 * No activity 	- 0 kr
 * ******************************`,

				choices: [`food`, `transport`, `sightseeing`, `no activity`],
			},
		]);

		/**
		 * Add data to user object
		 */

		// Check if ActivityCost has valid type, returns true or false
		const isValidActivity = (value: string): value is ActivityType => {
			return value in ActivityCost;
		};

		// Store activity to user object
		if (
			// check if activity is not "no activity" or undefined
			activity.selectActivity !== "no activity" &&
			user.activities[counter] !== undefined &&
			typeof activity.selectActivity === "string" &&
			isValidActivity(activity.selectActivity)
		) {
			// add activity, startTime and activityCost
			user.activities[counter].name = activity.selectActivity;
			user.activities[counter].startTime = user.startDate;
			user.activities[counter].activityCost =
				ActivityCost[activity.selectActivity];
		}

		// Print out selected activity in green
		console.log(
			color("green", `Your activity is ${activity.selectActivity}`),
		);

		// User data so far TEST
		// console.log(color("red", "User data so far: "), user);

		// Back to main-menu again
		mainMenu();

		// Handle errors
	} catch (error) {
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
	}
};
