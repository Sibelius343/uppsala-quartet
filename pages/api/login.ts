import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginBody {
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body) as LoginBody;
  
  if (body.password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ admin: true })
  } else {
    res.status(401).json({ error: 'Invalid password' })
  }
}