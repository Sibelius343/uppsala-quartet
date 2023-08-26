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
      try {
        const updatedVideoData: Video = JSON.parse(req.body);
        const response = await media.findOneAndUpdate({ videoId: updatedVideoData.videoId }, updatedVideoData);
        
        if (response) {
          const updatedVideo = response.toJSON();
          res.status(200).json(updatedVideo);
        } else {
          res.status(404).json(`Can't update ${req.query.id} -- not found`);
        }
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    case "DELETE":
      const { videoId }: Video = JSON.parse(req.body);
      try {
        await media.findOneAndDelete({ videoId });
        res.status(200).json(req.body);
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    default:
      break;
  }
}