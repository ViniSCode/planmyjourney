import {
  GetPlanDocument,
  RemoveSavedTripPlanDocument,
  SaveTripPlanDocument,
} from "@/generated/graphql";
import { client } from "@/lib/urql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { session, planId } = req.body;
  const email = session.user.email;

  if (req.method === "POST") {
    if (!session) {
      res.status(400).json({ error: true, message: "You must be logged in" });
      return;
    }
    if (!planId) {
      res.status(400).json({ error: true, message: "Something went wrong" });
    }

    try {
      const { data } = await client
        .query(GetPlanDocument, {
          id: planId,
          email: email,
        })
        .toPromise();

      if (data.member.savedPlans && data.member.savedPlans.length > 0) {
        // await removeSaved(email!, planId);
        const response = await client
          .mutation(RemoveSavedTripPlanDocument, {
            planId: planId,
            email: email,
          })
          .toPromise();

        console.log(response.error);
        console.log("entrou no remover");
      } else if (data.member.savedPlans && data.member.savedPlans.length < 1) {
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

// // save
// async function savePlan(email: string, planId: string) {
//   try {
//     const data = await fetch(
//       `https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: `
//             mutation SavePlan {
//               updateMember(data: {savedPlans: {connect: {where: {id: "${planId}"}}}}, where: {email: "${email}"}) {
//                 id
//               }

//               publishMember(where: {email: "${email}"}) {
//                 id
//               }

//               publishPlan (where: {id: "${planId}"}) {
//                 id
//               }
//             }
//           `,
//         }),
//       }
//     );

//     const response = await data.json();
//     console.log(response);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }

// // remove saved
// async function removeSaved(email: string, planId: string) {
//   try {
//     const data = await fetch(
//       `https://api-sa-east-1.hygraph.com/v2/clh4y479g5mig01taa2s5djfl/master`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: `
//           mutation RemoveSaved {
//             updateMember(data: {savedPlans: {disconnect: {id: "${planId}"}}}, where: {email: "${email}"}) {
//               id
//             }
//             publishMember(where: {email: "${email}"}) {
//               id
//             }
//             publishPlan (where: {id: "${planId}"}) {
//               id
//             }
//           }
//           `,
//         }),
//       }
//     );

//     const response = await data.json();
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
