import { Benefits } from "@/components/Benefits";
import { Header } from "@/components/Navbar/Header";
import { HeaderText } from "@/components/Navbar/Header/HeaderText";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { OurServices } from "@/components/OurServices";
import { PopularPlansSlide } from "@/components/PopularPlansSlider";
import { TripPlanSelect } from "@/components/TripPlanSelect";
import {
  GetPlansDocument,
  PlanOrderByInput,
  useGetPlansQuery,
} from "@/generated/graphql";
import { client, ssrCache } from "@/lib/urql";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home({ session }: any) {
  const productsPerPage = 8;
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState(() => PlanOrderByInput.CreatedAtDesc);

  const [{ data }] = useGetPlansQuery({
    variables: {
      limit: productsPerPage,
      offset: offset,
      search: search,
      orderBy: orderBy,
    },
  });

  return (
    <div className="pb-20">
      <header className="h-[100vh] md:h-[90vh] w-full relative flex flex-col px-2">
        <Image
          src="/assets/header-image-1.png"
          fill
          alt="Mountain Image"
          className="object-cover absolute z-[-10] brightness-75"
          quality={100}
          loading="lazy"
        />
        <Header session={session} />
        <MobileMenu />
        <HeaderText />
        <TripPlanSelect />
      </header>
      <main className="px-6 mt-80 max-w-[1120px] mx-auto md:mt-48 flex flex-col items-center justify-center gap-20">
        {data && <PopularPlansSlide data={data} />}
        <OurServices />
        <Benefits />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

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
      session,
      urqlState: ssrCache.extractData(),
    },
  };
};
