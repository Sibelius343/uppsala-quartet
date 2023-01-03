// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { EVENTS_PATH } from '../../../constants/paths';
import { EventObject } from '../../../interfaces/events';
import dbConnect from '../../../utils/dbConnect';
import event from '../../../models/event';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventObject>
) {
  
  await dbConnect();

  try {
    const events = await event.find({}) /* find all the data in our database */
    res.status(200).json({ events })
  } catch (error) {
    res.status(400).json({ events: [] })
  }
}