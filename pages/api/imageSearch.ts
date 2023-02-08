import type { NextApiRequest, NextApiResponse } from 'next';

interface ImageSearchBody {
  query: string;
  page: number;
  perPage: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, page, perPage } = JSON.parse(req.body) as ImageSearchBody;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&client_id=${process.env.UNSPLASH_API_ACCESS_KEY}`
    );

    const searchResult = await response.json();

    res.status(200).json(searchResult);
  } catch (e) {
    res.status(500).json({ error: e })
  }
}