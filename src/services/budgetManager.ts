import type { Trip, Activity } from "../types/types.js";
import { Cost } from "../types/types.js";

// Calculates the total cost of a trip by summing the cost the trip + cost of all activities
export const calculateTotalCost = (trip: Trip): number => {
    const baseCost = Cost[trip.destination as keyof typeof Cost];
	const activitiesTotal = trip.activities.reduce((sum, activity) => sum + activity.activityCost, 0);
    return baseCost + activitiesTotal;
};

// Returns all activities with a cost greater than or equal to the given threshold
export const getHighCostActivities = (
	activities: Activity[],
	threshold: number,
) => {
	return activities.filter((activity) => activity.activityCost >= threshold);
};

