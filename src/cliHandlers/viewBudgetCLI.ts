import { mainMenu } from "../mainCli.js";
import { type Trip } from "../types/types.js";
import { color } from "../services/formatUtils.js";

export const viewBudgetMenu = async (user: Trip): Promise<number> => {
	try {
		console.log(color("blue", "*".repeat(30)));

		console.log(`View budget, ${color("yellow", "Trip + activities:")}`);
		console.log(`Trip to ${user.destination} cost: ${user.cost} kr`);
		const totalCost =
			user.cost +
			user.activities.reduce(
				(total, activity) => total + activity.activityCost,
				0,
			);
		user.activities.forEach((activity) => {
			if (activity.name !== "No activity set") {
				console.log(`${activity.name} - ${activity.activityCost} kr`);
			}
		});
		console.log(color("cyan", `Total cost: ${totalCost} kr`));

		console.log(color("blue", "*".repeat(30)));

		mainMenu();
		return totalCost;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
		throw error;
	}
};
