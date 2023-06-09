import { Spinner } from "@/components/Loading/Spinner";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { DisplayTripPlanImages } from "@/components/Plans/DisplayTripPlanImages";
import { ImportantInfo } from "@/components/Plans/ImportantInfo";
import { GetPlanDocument, useGetPlanQuery } from "@/generated/graphql";
import { client, ssrCache } from "@/lib/urql";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiArrowLeft, FiBookmark } from "react-icons/fi";
import { TbMapPinFilled } from "react-icons/tb";

const DynamicMap = dynamic(
  () => import("../../components/Plans/Map/LocationMap"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

export default function PlanId() {
  const [goToLocation, setGoToLocation] = useState({});
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
        <div
          onClick={() => router.back()}
          className="cursor-pointer font-medium text-gray-700 bg-gray-200 w-fit p-2 rounded-lg mb-20 hover:bg-gray-250 transition-colors"
        >
          <FiArrowLeft size={20} />
        </div>
        {data && (
          <div>
            <div className="flex justify-between place-items-baseline">
              <div className="full">
                <h2 className="text-2xl truncate">
                  {data.plan?.location[0].country}, Trip Plan
                </h2>

                <div className="text-gray-900 font-semibold">
                  <span className="text-xs">
                    {Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(data.plan?.createdAt))}
                  </span>
                </div>
              </div>

              <div className="hidden ssm:flex items-center gap-4 text-gray-900 font-medium cursor-pointer">
                <div className="mt-2 flex items-center gap-1 font-medium text-gray-700">
                  <FiBookmark size={18} />
                  <span className="text-sm underline">Save</span>
                </div>
              </div>
            </div>

            <DisplayTripPlanImages images={data.plan?.images} />

            <div className="mt-6 flex ssm:hidden items-center gap-4 text-gray-900 font-medium cursor-pointer justify-between">
              <div className="flex items-center gap-1 font-medium text-gray-900">
                <FiBookmark size={18} />
              </div>
            </div>

            <div className="border-b pb-4 mt-8 flex items-center gap-2 font-medium">
              <Image
                width={50}
                height={50}
                loading="lazy"
                src={data.plan!.member!.image}
                alt={data.plan!.member!.name}
                className="rounded-full w-10"
              />
              <div>
                <span className="block">{data.plan!.member!.name}</span>
                <small className="block text-gray-700">Author</small>
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center gap-2 flex-wrap justify-start xs:justify-between">
                {data.plan?.location &&
                  data.plan!.location.map((loc: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => setGoToLocation({ ...loc })}
                      className="p-2 bg-white shadow-lg rounded-lg flex items-center gap-2 cursor-pointer w-fit max-w-full xs:max-w-[48%] md:max-w-[48%] lg:max-w-[48%]"
                      title={loc.formatted}
                    >
                      <div className="w-fit h-fit">
                        <TbMapPinFilled size={20} className="text-red-500" />
                      </div>
                      <span className="block truncate">{loc.formatted}</span>
                    </div>
                  ))}
              </div>
              <div className="mt-10">
                <DynamicMap
                  markers={data.plan!.location}
                  goToLocation={goToLocation}
                />
              </div>
            </div>

            <ImportantInfo plan={data.plan} />
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
