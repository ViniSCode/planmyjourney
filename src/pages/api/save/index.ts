import {
  RemoveSavedTripPlanDocument,
  SaveTripPlanDocument,
} from "@/generated/graphql";
import { client } from "@/lib/urql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { session, planId, data } = req.body;
  const email = session.user.email;

  if (req.method === "POST") {
    if (!session) {
      res.status(400).json({ error: true, message: "You must be logged in" });
      return;
    }
    if (!planId) {
      res.status(400).json({ error: true, message: "Something went wrong" });
    }

    if (!data) {
      res.status(400).json({ error: true, message: "Something went wrong" });
    }

    try {
      console.log(data?.member?.savedPlans);
      if (
        data.member &&
        data.member.savedPlans &&
        data.member.savedPlans.length > 0
      ) {
        // await removeSaved(email!, planId);
        const response = await client
          .mutation(RemoveSavedTripPlanDocument, {
            planId: planId,
            email: email,
          })
          .toPromise();

        console.log(response.error);
        console.log("entrou no remover");
      } else {
        // await savePlan(email!, planId);
        const response = await client
          .mutation(SaveTripPlanDocument, {
            planId: planId,
            email: email,
          })
          .toPromise();

        console.log(response.error);
        console.log("entrou no salvar");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }

    return res.status(200).json({ success: true, message: "Success" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
    return res;
  }
};
