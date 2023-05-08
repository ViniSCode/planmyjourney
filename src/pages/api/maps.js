export default function Handler(req, res) {
  const mapsApiKey = process.env.MAPS_API_KEY;
  res.status(200).json({ apiKey: mapsApiKey });
}
