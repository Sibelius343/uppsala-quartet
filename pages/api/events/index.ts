// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { eventsPath } from '../../../constants/paths';
import { EventObject } from '../../../models/events';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventObject>
) {
  
  const data: string | undefined = readFileSync(eventsPath, 'utf8');

  const jsonData = data ? JSON.parse(data) : {events: []};
  
  res.status(200).json(jsonData)
}