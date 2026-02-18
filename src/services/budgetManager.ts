expost const calculateTotalCost = (trip: Trip): number => {
    
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
