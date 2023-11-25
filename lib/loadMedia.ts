import { MediaLayout } from "../interfaces/media";
import media from "../models/media";
import mediaLayout from "../models/mediaLayout";
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

export const loadMediaLayout = async (): Promise<MediaLayout> => {
  await dbConnect();

  try {
    const response = await mediaLayout.findOne({});
    const data = response?.toJSON();
    
    return data ? data : { layout: [] };
  } catch (e) {
    console.error(e);
    return { layout: [] };
  }
}