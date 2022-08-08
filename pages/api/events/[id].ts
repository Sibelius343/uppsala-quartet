// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync, writeFileSync } from 'fs';
import { eventsPath } from '../../../constants/paths';
import { EventObject, PerformanceEvent } from '../../../models/events';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceEvent | string>
) {
  const data: string | undefined = readFileSync(eventsPath, 'utf8');
  const jsonData: EventObject = data ? JSON.parse(data) : {events: []};  

  switch (req.method) {
    case 'GET':    
      const eventDetails = jsonData.events.find((e) => e.id.toString() === req.query.id)
      
      if (eventDetails) {
        res.status(200).json(eventDetails)
      } else {
        res.status(404).json(`${req.query.id} not found`)
      }
      break;
    case 'PUT':
      break;
    case 'DELETE':
      const filteredData = jsonData.events.filter((e) => e.id.toString() !== req.query.id);
      const newData = JSON.stringify({ events: filteredData });

      writeFileSync(eventsPath, newData);
      res.status(200).json(req.body)
      break;
    default: break;
  }
  
}