import type { Trip, Activity } from "../models.js";

// Calculates the total cost of a trip by summing the cost of all activities
export const calculateTotalCost = (trip: Trip): number => {
    return trip.activities.reduce((sum, activity) => sum + activity.activityCost, 0);
}

// Returns all activities with a cost greater than or equal to the given threshold
export const getHighCostActivities = (activities: Activity[], threshold: number) => {
    return activities.filter(activity => activity.activityCost >= threshold);
}

// Test, remove when real array is created
const trip = {
    activities: [
        {
            name: "Flight",
            cost: 2000,
        },
        {
            name: "Museum",
            cost: 200,
        },
        {
            name: "Lunch",
            cost: 150
        },
    ],
};

//console.log(`Total: ${calculateTotalCost(trip)}`);
console.log(
  "High cost >= 500 should be Flight only:",
  getHighCostActivities(trip.activities, 500),
);
console.log(
  "High cost >= 100 should show all activities:",
  getHighCostActivities(trip.activities, 100),
);
