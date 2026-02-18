import type { Trip } from "../models.js";

export const calculateTotalCost = (trip: Trip): number => {
    return trip.activities.reduce((sum, activity) => sum + activity.cost, 0);
}


// test 

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

console.log(`Total: ${calculateTotalCost(trip)}`);
