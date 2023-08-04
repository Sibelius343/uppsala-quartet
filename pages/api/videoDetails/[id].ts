// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const YOUTUBE_DATA_API_KEY = process.env.YOUTUBE_DATA_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${req.query.id}&key=${YOUTUBE_DATA_API_KEY}`);
    const videoDetails = await response.json()
    
    res.status(200).json({ videoDetails })
  } catch (error) {
    res.status(400).json({ videoDetails: undefined })
  }
}