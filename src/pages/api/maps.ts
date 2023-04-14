import { NextApiRequest, NextApiResponse } from "next";

// pages/api/maps.ts
export default (req: NextApiRequest, res: NextApiResponse) => {
  const mapsApiKey = process.env.MAPS_API_KEY;
  res.status(200).json({ apiKey: mapsApiKey });
};
