import inquirer from "inquirer";
import { mainMenu } from "../mainCli.js";
import { addWeeks, color } from "../services/formatUtils.js";
import { type Trip } from "../types/types.js";

// Country menu, show destinations an d price.
export const dateMenu = async (user: Trip): Promise<void> => {
	try {
		// Handle users options
		const travelDate = await inquirer.prompt<{ selectDate: string }>([
			{
				type: "select",
				name: "selectDate",
				message: `Select travel date:
 ******************************
 * One week form now     - ${addWeeks(1)}, 
 * Two weeks from now    - ${addWeeks(2)}, 
 * Three weeks from now  -  ${addWeeks(3)}
 *******************************`,

				choices: [`${addWeeks(1)}`, `${addWeeks(2)}`, `${addWeeks(3)}`],
			},
		]);

		// Store date to user object
		user.startDate = travelDate.selectDate;

		// Print out travel date in green
		console.log(
			color("green", `Your travel date: ${travelDate.selectDate}`),
		);
		// Back to main menu again
		mainMenu();
	} catch (error) {
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
	}
};
