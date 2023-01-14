import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValues } from '../../components/AddEventForm';
import { NewPerformanceEvent } from '../../interfaces/events';
import event from '../../models/event';
import dbConnect from '../../utils/dbConnect';
// import nextConnect from 'next-connect';
// import multer from 'multer';

// const upload = multer({ dest: 'event-images/' });

// const uploadMiddleware = upload.single('eventImage');

// const apiRoute = nextConnect({
//   // Handle any other HTTP method
//   onNoMatch(
//     req: NextApiRequest,
//     res: NextApiResponse<{ error: string }>
//   ) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

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