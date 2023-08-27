import performer from "../models/performer";
import dbConnect from "../utils/dbConnect"

export const loadPerformers = async () => {
  await dbConnect();

  try {
    const response = await performer.find({});
    const performers = response.map(p => p.toJSON());
    return performers;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loadSinglePerformer = async (id: any) => {
  await dbConnect();

  if (id) {
    try {
      const response = await performer.findById(id);
      return response?.toJSON();
    } catch (e) {
      console.error(e)
      return null;
    }
  } else {
    return null;
  }
}