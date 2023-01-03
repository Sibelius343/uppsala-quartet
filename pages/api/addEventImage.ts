import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValues } from '../../components/AddEventForm';
import { writeFileSync, readFileSync } from 'fs';
import { EVENTS_PATH } from '../../constants/paths';
import { EventObject, PerformanceEvent, NewPerformanceEvent } from '../../interfaces/events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues>
) {
  
  
  // await res.revalidate('/events')
  return res.status(200).json(req.body)
}