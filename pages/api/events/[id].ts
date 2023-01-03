// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync, writeFileSync } from 'fs';
import { EVENTS_PATH } from '../../../constants/paths';
import { EventObject, PerformanceEvent } from '../../../interfaces/events';
import event from '../../../models/event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceEvent | string>
) {
  switch (req.method) {
    case 'GET':
      const response = await event.findById(req.query.id);

      if (response) {
        const eventDetails = response.toJSON();
        res.status(200).json(eventDetails);
      } else {
        res.status(404).json(`${req.query.id} not found`)
      }
      break;
    case 'PUT':
      break;
    case 'DELETE':
      try {
        await event.findByIdAndDelete(req.query.id);
        res.status(200).json(req.body);
      } catch (e) {
        res.status(400);
      }
      break;
    default: break;
  }
  
}