import inquirer from "inquirer";
import type { Trip, Activity } from "../types/types.js";
import { mainMenu } from "../mainCli.js";
import { ActivityCost } from "../types/types.js";
import {
  addActivity,
  getActivitiesByDate,
  filterActivitiesByCategory,
  getSortedItinerary,
} from "../services/itineraryEngine.js";
import { color } from "../services/formatUtils.js";

// Activity Menu 
export const activityMenu = async (trip: Trip): Promise<void> => {
  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt<{ action: string }>({
      type: "rawlist",
      name: "action",
        message: `Select one:`,
      choices: [
        "Add Activity",
        "View Activities by Date",
        "Filter by Category",
        "View Full Itinerary",
        "Back",
      ],
    });

    switch (action) {
        case "Add Activity":
    
            console.log(color("green", "*** Add New Activity ***"));
            await handleAddActivity(trip);
            break;

        case "View Activities by Date":
            console.log(color("green", "*** View Activity for Specific Day ***"));
            await handleViewByDate(trip);
            break;

        case "Filter by Category":
            console.log(color("green", "*** Filter Activity By Category ***"));
            await handleFilterByCategory(trip);
            break;

        case "View Full Itinerary":
            console.log(color("green", "Show Full Itinerary ***"));
            await handleFullItinerary(trip);
            break;

      case "Back":
        exit = true;
        break;
    }
    }
    await mainMenu();
};

// Add New activity
 
const handleAddActivity = async (trip: Trip): Promise<void> => {
  const answers = await inquirer.prompt<{
    name?: string;
    activityCost: string;
    category: Activity["category"];
    date: string;
    startTime: string;
  }>([
    { type: "input", name: "name", message: "Activity name:" },
  // { type: "input", name: "activityCost", message: "Cost (kr):" },
    {
      type: "rawlist",
      name: "category",
        message:`Select Category:`,
      choices: ["food", "transport", "sightseeing", "no activity"],
    },
    { type: "input", name: "date", message: "Date (YYYY-MM-DD):" },
    { type: "input", name: "startTime", message: "Time (HH:mm):" },
  ]);

    // ?? Get cost from enum-like object
    const cost =
        answers.category !== "no activity" ? ActivityCost[answers.category] : 0;

  const activity: Activity = {
    name: answers.name || "Unnamed Activity",
    activityCost: cost,
    category: answers.category,
    date: answers.date,
    startTime: answers.startTime,
  };

  await addActivity(trip, activity);

  console.log(color("green", "Activity added successfully!"));
};

//View activities for specific date

const handleViewByDate = async (trip: Trip): Promise<void> => {
  const { date } = await inquirer.prompt<{ date: string }>([
    { type: "input", name: "date", message: "Enter date (YYYY-MM-DD):" },
  ]);

  const activities = await getActivitiesByDate(trip, date);

  if (activities.length === 0) {
    console.log(color("red", "No activities found for this date."));
    return;
  }

  console.log(color("blue", `Activities for ${date}:`));
  activities.forEach((a) => {
    console.log(
      `${a.startTime} - ${a.name} (${a.category}) - ${a.activityCost} kr`
    );
  });
};

//Filter activities by category
 
const handleFilterByCategory = async (trip: Trip): Promise<void> => {
  const { category } = await inquirer.prompt<{ category: Activity["category"] }>([
    {
      type: "list",
      name: "category",
      message:`Select Category:`  ,
      choices: ["food", "transport", "sightseeing"],
    },
  ]);

  const activities = await filterActivitiesByCategory(trip, category);

  if (activities.length === 0) {
    console.log(color("red", `No activities found in category "${category}".`));
    return;
  }

  console.log(color("blue", `Activities in category: ${category}`));
  activities.forEach((a) => {
    console.log(`${a.date} ${a.startTime} - ${a.name} - ${a.activityCost} kr`);
  });
};


//View full itinerary sorted by date and time
const handleFullItinerary = async (trip: Trip): Promise<void> => {
  const activities = await getSortedItinerary(trip);

  if (activities.length === 0) {
    console.log(color("red", "No activities added yet."));
    return;
  }

  console.log(color("blue", "Full Trip Itinerary:"));
  activities.forEach((a) => {
    console.log(
      `${a.date} ${a.startTime} - ${a.name} (${a.category}) - ${a.activityCost} kr`
    );
  });
};