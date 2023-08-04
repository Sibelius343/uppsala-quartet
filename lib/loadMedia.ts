import media from "../models/media";
import dbConnect from "../utils/dbConnect"

export const loadMedia = async () => {
  await dbConnect();

  try {
    const response = await media.findOne();
    const data = response?.toJSON();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}