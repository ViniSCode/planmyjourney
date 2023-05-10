import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  const mapsApiKey = process.env.MAPS_API_KEY;
  res.status(200).json({ apiKey: mapsApiKey });
}
