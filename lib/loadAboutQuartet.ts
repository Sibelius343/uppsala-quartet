import detail from "../models/detail";
import dbConnect from "../utils/dbConnect";

export const loadAboutQuartet = async () => {
  await dbConnect();

  try {
    const response = await detail.findOne({ detailType: 'about' });
    
    const aboutQuartet = response?.toJSON();
    return aboutQuartet;
  } catch (e) {
    console.error(e);
    return [];
  }
}