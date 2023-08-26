import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValues } from '../../components/EventForm';
import { NewPerformanceEvent } from '../../interfaces/events';
import event from '../../models/event';
import dbConnect from '../../utils/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues>
) {
  await dbConnect();
  const newData: NewPerformanceEvent = JSON.parse(req.body);

  const newEvent = new event({
    ...newData
  })

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent.toJSON());
  } catch (e) {
    res.status(400);
  }
}