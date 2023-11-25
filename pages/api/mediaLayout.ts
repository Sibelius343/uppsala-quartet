import type { NextApiRequest, NextApiResponse } from 'next';
import { NewLayoutItem } from '../../interfaces/media';
import mediaLayout from '../../models/mediaLayout';
import dbConnect from '../../utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  switch (req.method) {
    case "PUT":
      try {
        const updatedLayoutData: NewLayoutItem[] = JSON.parse(req.body);
        
        const response = await mediaLayout.findOneAndUpdate({}, { layout: updatedLayoutData });
        
        if (response) {
          const updatedLayout = response.toJSON();
          res.status(200).json(updatedLayout);
        } else {
          res.status(404).json(`Can't update layout data`);
        }
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    default:
      break;
  }
}