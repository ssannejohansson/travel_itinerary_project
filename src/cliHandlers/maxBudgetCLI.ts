import { mainMenu } from "../mainCli.js";
import inquirer from "inquirer";
import { Cost } from "../types/types.js";
import { color } from "../services/formatUtils.js";

// Menu for user to insert max budget
export const maxBudgetMenu = async (): Promise<void> => {
	const answers = await inquirer.prompt<{ maxBudget: number }>([
		{
			type: "number",
			name: "maxBudget",
			message: "Insert max budget to spend on your trip:",
			validate: (input: number) => {
				return !isNaN(input) && input > 0
					? true
					: "Please enter a valid number.";
			},
		},
	]);

	// Compare max budget and show possible destinations
	if (answers.maxBudget >= Cost.Pakistan) {
		console.log(color("yellow", "*".repeat(30)));
		console.log(
			`With your max budget at ${answers.maxBudget} kr you can travel to`,
		);
		console.log(`Pakistan: ${Cost.Pakistan} kr. Or
Greece: ${Cost.Greece} kr. Or
Norway: ${Cost.Norway} kr.`);
		console.log(color("yellow", "*".repeat(30)));
	} else if (answers.maxBudget >= Cost.Greece) {
		console.log(color("yellow", "*".repeat(30)));
		console.log(
			`With your max budget at ${answers.maxBudget} kr you can travel to`,
		);
		console.log(`Greece: ${Cost.Greece} kr. Or
Norway: ${Cost.Norway} kr.`);
		console.log(color("yellow", "*".repeat(30)));
	} else if (answers.maxBudget >= Cost.Norway) {
		console.log(color("yellow", "*".repeat(30)));
		console.log(
			`With your max budget at ${answers.maxBudget} kr you can travel to`,
		);
		console.log(`Norway: ${Cost.Norway} kr.`);
		console.log(color("yellow", "*".repeat(30)));
	} else if (answers.maxBudget < Cost.Norway) {
		console.log(color("orange", "*".repeat(30)));
		console.log(
			`With your max budget at ${answers.maxBudget} kr you can't travel!`,
		);
		console.log(color("orange", "*".repeat(30)));
	}
	mainMenu();
};
