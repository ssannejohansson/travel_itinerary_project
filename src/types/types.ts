// Types for Activities
export type Activity = {
	name?: string; // optional
	activityCost: number;
	category: "food" | "transport" | "sightseeing" | "no activity";
	startTime: string;
};

// Types for Trips
export type Trip = {
	cost: number;
	destination: string;
	startDate: string;
	activities: Activity[];
};

// Cost for trips
export enum Cost {
	Greece = 1400,
	Pakistan = 6000,
	Norway = 800,
}

// Cost for each activity
export const ActivityCost = {
	food: 100,
	transport: 200,
	sightseeing: 150,
} as const;

export type ActivityType = keyof typeof ActivityCost;

// Country interface to match data from API
export interface Country {
	flag: string;
	region: string; // Continent
	population: number;
	currencies: {
		[key: string]: {
			name: string;
			symbol: string;
		};
	};
	capital: string;
	name: {
		// Country name
		common: string;
		official: string;
	};
}
