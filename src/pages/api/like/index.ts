import {
  GetPlanDocument,
  LikeAlreadyExistsDocument,
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
      const {
        data: { plan },
      } = await client
        .query(LikeAlreadyExistsDocument, {
          planId: planId,
          email: session.user.email,
        })
        .toPromise();

      if (plan.likes!.length === 0) {
        const { data } = await likePlan(email!, planId);
        const id = data.updatePlan.likes[0].id;
        await publishLike(id);
      } else {
        const id = plan.likes[0].id;
        await removeLike(id);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Like updated successfully" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
    return res;
  }
};

// like
async function likePlan(email: string, planId: string) {
  const {
    data: { plan },
  } = await client.query(GetPlanDocument, { id: planId }).toPromise();

  console.log(plan);

  if (plan) {
    console.log(plan.likesCount);
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
              mutation LikePlan {
                updatePlan(
                  where: {id: "${planId}"}
                  data: {likes: {create: {member: {connect: {email: "${email}"}}}}, likesCount: ${
              plan.likesCount ? Number(plan.likesCount) + 1 : 1
            }}
                ) {
                  id
                  likes (where: {member: {email: "${email}"}}) {
                    id
                  }
                }
                publishPlan(where: {id: "${planId}"}) {
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
}

// update like
async function publishLike(likeId: string) {
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
            mutation PublishLikeById {
              publishLike(where: {id: "${likeId}"}) {
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

// update like
async function removeLike(id: string) {
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
            mutation RemoveLike {
              deleteLike(where: {id: "${id}"}) {
                id
              }
            }     
          `,
        }),
      }
    );

    const response = await data.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
