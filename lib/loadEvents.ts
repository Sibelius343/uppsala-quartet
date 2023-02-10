import event from "../models/event";
import dbConnect from "../utils/dbConnect"

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

export const loadSingleEvent = async (id: any) => {
  await dbConnect();

  if (id) {
    try {
      const response = await event.findById(id);
      return response?.toJSON();
    } catch (e) {
      console.error(e)
      return null;
    }
  } else {
    return null;
  }
}