import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { DisplayTripPlanImages } from "@/components/Plans/DisplayTripPlanImages";
import { GetPlanDocument, useGetPlanQuery } from "@/generated/graphql";
import { client, ssrCache } from "@/lib/urql";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BsFillHeartFill } from "react-icons/bs";
import { FiBookmark, FiHeart } from "react-icons/fi";

export default function PlanId() {
  const router = useRouter();
  const planId: any = router.query.planId;

  const [{ data }] = useGetPlanQuery({
    variables: {
      id: planId,
    },
  });

  return (
    <>
      <header>
        <PlansHeader />
        <MobileMenu />
      </header>
      <main className="px-6 mt-32 max-w-[1120px] md:mt-16 mx-auto pb-20">
        {data && (
          <div>
            <div className="flex justify-between place-items-baseline">
              <div className="full">
                <h2 className="text-2xl truncate">
                  {data.plan?.location[0].country}, Trip Plan
                </h2>

                <div className="mt-2 flex items-center gap-1 text-gray-900 font-medium">
                  <BsFillHeartFill size={12} />
                  <span className="text-xs">
                    {data.plan?.likesCount ? data.plan?.likesCount : 0} likes
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 text-gray-900 font-medium cursor-pointer">
                <div className="mt-2 flex items-center gap-1 font-medium text-gray-700">
                  <FiBookmark size={18} />
                  <span className="text-sm underline">Save</span>
                </div>
                <div className="mt-2 flex items-center gap-1 font-medium text-gray-700">
                  <FiHeart size={18} />
                  <span className="text-sm underline">Like</span>
                </div>
                {/* <span>Save</span> */}
              </div>
            </div>

            <DisplayTripPlanImages images={data.plan?.images} />
          </div>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.planId;

  await client.query(GetPlanDocument, { id: id || "" }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
