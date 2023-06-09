import { Spinner } from "@/components/Loading/Spinner";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { ListPlans } from "@/components/Plans/ListPlans";
import { PlanFilter } from "@/components/Plans/PlanFilter";
import { SearchBar } from "@/components/Plans/SearchBar";
import {
  GetPlansDocument,
  PlanOrderByInput,
  useGetPlansQuery,
} from "@/generated/graphql";
import { client, ssrCache } from "@/lib/urql";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export interface Plan {
  __typename?: "Plan";
  days: number;
  expenses: any;
  transportation: any;
  location?: any | null;
  likes?: any | null;
  likesCount?: number | null;
  images?: any | null;
  id: string;
}

export default function Plans() {
  const plansPerPage = 9;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [orderBy, setOrderBy] = useState(() => PlanOrderByInput.CreatedAtDesc);
  const { ref: endRef, inView: endView } = useInView();

  const [{ data: getPlansData, fetching, error }] = useGetPlansQuery({
    variables: {
      limit: plansPerPage,
      offset: offset,
      search: search,
      orderBy: orderBy,
    },
  });

  useEffect(() => {
    if (!plans.length || plans.length === 0) {
      if (getPlansData) {
        //set plans
        setPlans(getPlansData.plans);
      }
    }

    //create the infinite scroll logic
    if (endView) {
      if (getPlansData?.plansConnection.pageInfo.hasNextPage) {
        setIsLoading(true);
        const newOffset = offset + plansPerPage;
        setOffset(newOffset);
      }
    }
  }, [endRef, endView, getPlansData, plans]);

  useEffect(() => {
    if (offset > 0 && !fetching) {
      if (getPlansData) {
        const newPlans = getPlansData?.plans || [];
        setPlans((prevPlans) => [...prevPlans, ...newPlans]);
        setIsLoading(false);
      }
    }
  }, [offset, getPlansData, fetching]);

  return (
    <>
      <header>
        <PlansHeader />
        <MobileMenu />
      </header>
      <main className="px-6 mt-32 max-w-[1120px] md:mt-16 mx-auto pb-20">
        <SearchBar />
        <PlanFilter />
        <motion.div>
          {plans.length > 0 && !isLoading ? (
            <ListPlans plans={plans} />
          ) : (
            <div className="flex justify-center mt-24">
              <Spinner />
            </div>
          )}
        </motion.div>
        <div className="mt-24" ref={endRef}></div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await client
    .query(GetPlansDocument, {
      limit: 8,
      offset: 0,
      search: "",
      orderBy: PlanOrderByInput.CreatedAtDesc,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 60,
  };
};
