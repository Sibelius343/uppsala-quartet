import media from "../models/media";
import dbConnect from "../utils/dbConnect"

export const loadMedia = async () => {
  await dbConnect();

  try {
    const response = await media.find({});
    const data = response.map(e => e.toJSON());
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}