import inquirer from "inquirer";
import { getDestinationtInfo } from "../services/destinationService.js";
import { dateMenu } from "./dateCLI.js";
import { color } from "../services/formatUtils.js";
import { type Trip } from "../types/types.js";
import { Cost } from "../types/types.js";
import { printCountryInfo } from "../services/printCountryInfo.js";

// Country menu, show destinations an d price.
export const countryMenu = async (user: Trip): Promise<void> => {
	try {
		// Handle users options
		const countrys = await inquirer.prompt<{ selectCountry: string }>([
			{
				type: "select",
				name: "selectCountry",
				message: `Select a country: <Country> - <Ticket price>
 ******************************
 * Greece   - ${Cost.Greece} kr, 
 * Pakistan - ${Cost.Pakistan} kr, 
 * Norway   -  ${Cost.Norway} kr
 *******************************`,

				choices: ["Greece ", "Pakistan", "Norway"],
			},
		]);
		// Selected country
		const countryInfo = await getDestinationtInfo(countrys.selectCountry);

		/**
		 * Add data to user object
		 */
		if (Array.isArray(countryInfo) && countryInfo[0]) {
			// Store date to user object
			user.destination = countryInfo[0].name.common;
			user.cost = Cost[user.destination as keyof typeof Cost];

			// Print out selected country information in green
			printCountryInfo(countryInfo[0]);
			console.log(
				color(
					// add color to string
					"green",
					`Trip to ${countryInfo[0].name.common} is going to cost ${user.cost} kr`,
				),
			);
			// test
			// console.log(color("red", "user information so far: "), user);

			// run date-menu to set travel date
			dateMenu(user);
		} else {
			console.log("Country information not found");
		}
		// Handle errors
	} catch (error) {
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
	}
};
