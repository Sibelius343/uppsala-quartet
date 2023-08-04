import type { NextApiRequest, NextApiResponse } from 'next';
import media from '../../models/media';
import dbConnect from '../../utils/dbConnect';

interface EditVideosBody {
  videoIds: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  switch (req.method) {
    case "PUT":
      const { videoIds } = JSON.parse(req.body) as EditVideosBody;
      
      try {
        const updatedVideos = await media.findOneAndUpdate({}, { videoIds: videoIds });
        
        res.status(200).json({ updatedVideos })
      } catch (error) {
        res.status(400).json({ error })
      }
      break;
    default:
      break;
  }
}