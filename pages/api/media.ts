import type { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../interfaces/media';
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
    case "POST":
      const video: Video = JSON.parse(req.body);

      const newVideo = new media({
        ...video
      })
    
      try {
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo.toJSON());
      } catch (e) {
        res.status(400);
      }
      break;
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