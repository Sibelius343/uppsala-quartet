import type { NextApiRequest, NextApiResponse } from 'next';
import detail from '../../models/detail';
import dbConnect from '../../utils/dbConnect';

interface EditAboutQuartetBody {
  id: string;
  text: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id, text } = JSON.parse(req.body) as EditAboutQuartetBody;
  
  try {
    const updatedAboutText = await detail.findByIdAndUpdate(id, { value: text });
    res.status(200).json({ updatedAboutText })
  } catch (error) {
    res.status(400).json({ error })
  }
}