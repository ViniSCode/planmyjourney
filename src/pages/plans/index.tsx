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
import { useState } from "react";

export default function Plans() {
  const productsPerPage = 8;
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState(() => PlanOrderByInput.LikesCountDesc);

  const [{ data }] = useGetPlansQuery({
    variables: {
      limit: productsPerPage,
      offset: offset,
      search: search,
      orderBy: orderBy,
    },
  });

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
          {data ? (
            <ListPlans data={data} />
          ) : (
            <div className="flex justify-center mt-24">
              <Spinner />
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await client
    .query(GetPlansDocument, { limit: 8, offset: 0, search: "" })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
