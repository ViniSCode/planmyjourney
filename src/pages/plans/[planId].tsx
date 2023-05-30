import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { GetPlanDocument, useGetPlanQuery } from "@/generated/graphql";
import { client, ssrCache } from "@/lib/urql";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

export default function planId() {
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
            <h3>days: {data.plan?.days}</h3>
            <h3>
              expenses: {data.plan?.expenses.min} to {data.plan?.expenses.max}
            </h3>
            <Image
              src={data?.plan?.images[0]}
              alt="trip image"
              width={300}
              height={300}
              className="max-w-[300px] max-h-[300px]"
            />
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
