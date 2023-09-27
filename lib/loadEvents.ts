import event from "../models/event";
import dbConnect from "../utils/dbConnect";
import { FilterQuery } from "mongoose";
import { PerformanceEvent } from "../interfaces/events";

export const loadEvents = async () => {
  await dbConnect();

  try {
    const response = await event.find({});
    const events = response.map(e => e.toJSON());
    return events;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loadSingleEvent = async (selectedEventId: any) => {
  await dbConnect();

  if (selectedEventId) {
    try {
      const response = await Promise.all([
        event.findOne({ _id: { $lt: selectedEventId }}, {}, { sort: { _id: -1 } }),
        event.findOne({ _id: selectedEventId }),
        event.findOne({ _id: { $gt: selectedEventId }}, {}, { sort: { _id: 1 } })
      ]);
      return response.map(e => e?.toJSON() || null);
    } catch (e) {
      console.error(e)
      return null;
    }
  } else {
    return null;
  }
}