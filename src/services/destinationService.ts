import { type Country } from "../types/types.js";
const countryAPI: string = "https://restcountries.com/v3.1/name/";

/** *************************************
 * Get information on a specific country
 * @param countryName - The name of the country
 * @returns - Country data
 */
export const getDestinationtInfo = async (
	countryName: string,
): Promise<Country> => {
	try {
		const response = await fetch(countryAPI + countryName);
		const data: Country = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Menu error:", error.message);
		} else {
			console.error("Unknown error:", String(error));
		}
		throw error;
	}
};
