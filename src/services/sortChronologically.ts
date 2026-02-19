// MOVE TO ITINERARY ENGINE LATER!

/**
 * Returns a new array of activities sorted chronologically by startTime.
 *
 * Since startTime is stored as a string, we convert it into a Date object
 * temporarily in order to compare their timestamps using getTime().
 *
 * The spread operator ([...activities]) is used to avoid mutating
 * the original array.
 */
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


