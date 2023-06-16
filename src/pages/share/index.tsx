import { ValidateShareButtons } from "@/components/SharePlan/ValidateShareButtons";
import { useSharePlan } from "@/hooks/useSharePlan";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { SharePageActions } from "../../components/SharePlan/SharePageActions";

export default function Share({ session }: any) {
  const { name, setName } = useSharePlan();

  return (
    <div className="grid lg:grid-cols-share-plan select-none">
      <div className="h-[50vh] lg:h-screen w-full overflow-hidden">
        <Image
          src="/assets/share-page-image.png"
          alt="girl image"
          width={800}
          height={800}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="px-4 md:px-0 mt-20 mb-20 lg:mb-0 lg:mt-0 lg:h-screen w-full flex items-center lg:justify-center flex-col">
        <div className="w-full max-w-[360px] mx-auto">
          <h2 className="text-3xl font-medium text-center text-gray-900">
            Share your Plan
          </h2>
          <h3 className="mt-24 font-medium text-2xl text-gray-900">Name</h3>
          <span className="mt-2 block text-gray-700 text-sm">
            Inform the name of your trip plan:
          </span>
          <div className="flex items-center mt-6">
            <input
              type="text"
              className="pl-0 pb-2 text-xl font-medium bg-transparent border-0 border-b border-b-gray-700 w-full h-full text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-none"
              placeholder="Name your trip plan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {name.trim() === "" ? (
            <SharePageActions href={"/share/details"} />
          ) : (
            <ValidateShareButtons alert="Please provide a trip plan name" />
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
