import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { ListPlans } from "@/components/Plans/ListPlans";
import { PlanFilter } from "@/components/Plans/PlanFilter";
import { SearchBar } from "@/components/Plans/SearchBar";
import { PlanOrderByInput, useGetPlansQuery } from "@/generated/graphql";
import { motion } from "framer-motion";
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
  name?: string | null;
}

export default function Plans() {
  const plansPerPage = 9;
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [orderBy, setOrderBy] = useState(() => PlanOrderByInput.CreatedAtDesc);
  const { ref: endRef, inView: endView } = useInView();

  const [{ data, fetching, error }] = useGetPlansQuery({
    variables: {
      limit: plansPerPage,
      offset: offset,
      search: querySearch,
      orderBy: orderBy,
    },
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (search) {
      const typingTimeout = setTimeout(() => {
        setQuerySearch(search);
      }, 1000);

      return () => {
        clearTimeout(typingTimeout);
      };
    } else {
      setQuerySearch("");
    }
  }, [search]);

  useEffect(() => {
    if (data) {
      setPlans(data.plans);
    }
  }, [data]);

  return (
    <>
      <header>
        <PlansHeader />
        <MobileMenu />
      </header>
      <main className="px-6 mt-32 max-w-[1120px] md:mt-16 mx-auto pb-20">
        <SearchBar search={search} setSearch={setSearch} />
        <PlanFilter />
        <motion.div>
          {plans.length > 0 ? (
            <ListPlans plans={plans} />
          ) : (
            <div className="flex justify-center mt-24">
              <p>{search ? "No matching plans found" : "No plans available"}</p>
            </div>
          )}
        </motion.div>
        <div className="mt-24" ref={endRef}></div>
      </main>
    </>
  );
}
