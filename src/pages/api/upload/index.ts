import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { images } = req.body;

  if (req.method === "POST") {
    if (images.length < 1) {
      res.status(400).json({ error: true, message: "images is not defined" });
      return;
    }

    try {
      //upload images and get id
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "An error occurred while sharing the plan",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Plan shared successfully" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
    return res;
  }
};
