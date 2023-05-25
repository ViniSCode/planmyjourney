import { UserAlreadyExistsDocument } from "@/generated/graphql";
import { client } from "@/lib/urql";
import { TripPlanDataProps } from "@/pages/share/location";
import { validateTripPlanBeforeSharing } from "@/utils/validateTripPlanBeforeSharing";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { session, tripPlanData } = req.body;
  const email = session.user.email;
  const uniqueId = uuidv4();

  if (req.method === "POST") {
    if (!tripPlanData) {
      res
        .status(400)
        .json({ error: true, message: "Plan trip data is not defined" });
      return;
    }

    const { error, message } = validateTripPlanBeforeSharing(
      session,
      tripPlanData
    );

    if (error) {
      // invalid trip plan data
      res.status(400).json({ error: true, message });
    } else {
      try {
        // continue with share
        // 1 check if author already exists
        const {
          data: { members },
        } = await client
          .query(UserAlreadyExistsDocument, { email })
          .toPromise();

        if (members.length === 0) {
          // customer doesn't exists
          await createMember(email!);
          await sharePlan(email!, tripPlanData, uniqueId);
        } else {
          // if member exists
          // create planId
          await sharePlan(email!, tripPlanData, uniqueId);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: true,
          message: "An error occurred while sharing the plan",
        });
      }
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

// remove author keep only members
async function sharePlan(
  email: string,
  planData: TripPlanDataProps,
  planId: string
) {
  let days = planData.days;
  let expenses = planData.expenses;
  let transportation = planData.transportation;
  let images = planData.images;

  const locationArray = planData.location.map(
    (obj) =>
      `{ lat: ${obj.lat}, lng: ${obj.lng}, formatted: "${obj.formatted}" }`
  );
  const locationString = `[${locationArray.join(", ")}]`;

  const urls = images;

  const jsonFormat = urls.map((url, index) => {
    return { [`url${index + 1}`]: url };
  });

  try {
    const data = await fetch(
      `https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateAndPublishPlan {
              createPlan(data: {
                days: ${days},
                planId: "${planId}",
                expenses: {min: ${expenses.min}, max: ${expenses.max}},
                transportation: {car: ${transportation.car}, bus: ${
            transportation.bus
          }, subway: ${transportation.subway}, walking: ${
            transportation.walking
          }},
                location: ${locationString}
                images: ${JSON.stringify(images)}
                member: {connect: {email: "${email}"}},
              }) {
              id
              }
              
              publishPlan(where: {planId: "${planId}"}) {
                id
              }
              
              publishMember(where: {email: "${email}"}) {
                id
              }
            }
          `,
        }),
      }
    );

    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createMember(email: string) {
  try {
    const data = await fetch(
      `https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          mutation CrateMember {
            createMember(data: {email: "${email}"}) { id },
            publishMember (where: {email: "${email}"}) { id }
          }`,
        }),
      }
    );

    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}
