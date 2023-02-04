import type { NextApiRequest, NextApiResponse } from 'next';
import performer from '../../models/performer';
import dbConnect from '../../utils/dbConnect';

interface EditBioBody {
  id: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id, text } = JSON.parse(req.body) as EditBioBody;
  
  try {
    const updatedPerformer = await performer.findByIdAndUpdate(id, { bio: text });
    res.status(200).json({ updatedPerformer })
  } catch (error) {
    res.status(400).json({ error })
  }
}