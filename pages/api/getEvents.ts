// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { EventObject } from '../../interfaces/events';
import { readFileSync } from 'fs';
import { EVENTS_PATH } from '../../constants/paths';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventObject>
) {
  
  const data: string | undefined = readFileSync(EVENTS_PATH, 'utf8');

  const jsonData = data ? JSON.parse(data) : {events: []};
  
  res.status(200).json(jsonData)
}