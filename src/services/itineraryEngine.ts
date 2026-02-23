import type { Activity, Trip } from "../types/types.js";

export const addActivity = async (
	trip: Trip,
	activity: Activity,
): Promise<void> => {
	await new Promise((resolve) => setTimeout(resolve, 300));
	trip.activities.push(activity);
};

export const getActivitiesByDate = async (
	trip: Trip,
	date: string,
): Promise<Activity[]> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	return trip.activities
		.filter((activity) => activity.date === date)
		.sort((a, b) => a.startTime.localeCompare(b.startTime));
};

export const filterActivitiesByCategory = async (
	trip: Trip,
	category: Activity["category"],
): Promise<Activity[]> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	return trip.activities
		.filter((activity) => activity.category === category)
		.sort(
			(a, b) =>
				a.date.localeCompare(b.date) ||
				a.startTime.localeCompare(b.startTime),
		);
};

export const getSortedItinerary = async (
	trip: Trip,
): Promise<Activity[]> => {
	await new Promise((resolve) => setTimeout(resolve, 200));

	return [...trip.activities].sort(
		(a, b) =>
			a.date.localeCompare(b.date) ||
			a.startTime.localeCompare(b.startTime),
	);
};