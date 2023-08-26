// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PerformanceEvent } from '../../../interfaces/events';
import event from '../../../models/event';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceEvent | string>
) {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      try {
        const response = await event.findById(req.query.id);
        if (response) {
          const eventDetails = response.toJSON();
          res.status(200).json(eventDetails);
        } else {
          res.status(404).json(`${req.query.id} not found`)
        }
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    case 'PUT':
      try {
        const updatedEventData = JSON.parse(req.body);
        const response = await event.findByIdAndUpdate(req.query.id, updatedEventData);
        
        if (response) {
          const updatedEvent = response.toJSON();
          res.status(200).json(updatedEvent);
        } else {
          res.status(404).json(`Can't update ${req.query.id} -- not found`);
        }
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    case 'DELETE':
      try {
        await event.findByIdAndDelete(req.query.id);
        res.status(200).json(req.body);
      } catch (e: any) {
        res.status(400).json(e);
      }
      break;
    default: break;
  }
  
}