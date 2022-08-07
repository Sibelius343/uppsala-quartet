// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { eventsPath } from '../../../constants/paths';
import { EventObject, PerformanceEvent } from '../../../models/events';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerformanceEvent | string>
) {
  const data: string | undefined = readFileSync(eventsPath, 'utf8');

  const jsonData: EventObject = data ? JSON.parse(data) : {events: []};

  const eventDetails = jsonData.events.find((e) => e.id.toString() === req.query.id)
  
  if (eventDetails) {
    res.status(200).json(eventDetails)
  } else {
    res.status(404).json(`${req.query.id} not found`)
  }
}