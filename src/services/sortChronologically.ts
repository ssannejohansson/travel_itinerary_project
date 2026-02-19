// MOVE TO ITINERARY ENGINE LATER!

// Return a NEW array sorted by startTime (chronological).

import type { Activity } from "../types/types.js";

export const sortActivitiesChronologically = (
  activities: Activity[],
): Activity[] => {
  return [...activities].sort((a, b) => {
    const timeA = new Date(a.startTime).getTime();
    const timeB = new Date(b.startTime).getTime();

    return timeA - timeB;
  });
};


