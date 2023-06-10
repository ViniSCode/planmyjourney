import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Process the incoming webhook payload
    console.log("Received webhook:", req.body);

    // Add your custom webhook processing logic here

    // Send a response to the webhook request
    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
