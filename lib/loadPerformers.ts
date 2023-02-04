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