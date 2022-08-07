import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValues } from '../../components/AddEventForm';
import { writeFileSync, readFileSync } from 'fs';
import { eventsPath } from '../../constants/paths';
import { EventObject, PerformanceEvent, NewPerformanceEvent } from '../../models/events';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues>
) {
  const existingData: string | undefined = readFileSync(eventsPath, 'utf8');
  const { events: existingEvents }: EventObject = existingData ? JSON.parse(existingData) : {events: []};

  const newData: NewPerformanceEvent = JSON.parse(req.body);
  const newEvent: PerformanceEvent = {
    id: existingEvents.length,
    ...newData
  }  

  const allEvents: EventObject = { 
    events: [
      ...existingEvents, newEvent
    ]
  }

  const data = JSON.stringify(allEvents)

  writeFileSync(eventsPath, data);
  
  // await res.revalidate('/events')
  return res.status(200).json(req.body)
}