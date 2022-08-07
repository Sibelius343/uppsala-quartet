// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FormValues } from '../../components/ContactForm';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues>
) {
  res.status(200).json(req.body)
}
