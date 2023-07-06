import { Benefits } from "@/components/Benefits";
import { Header } from "@/components/Navbar/Header";
import { HeaderText } from "@/components/Navbar/Header/HeaderText";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { OurServices } from "@/components/OurServices";
import { PopularPlansSlide } from "@/components/PopularPlansSlider";
import { PlanOrderByInput, useGetPlansQuery } from "@/generated/graphql";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home({ session }: any) {
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const { ref: section1Ref, inView: section1View } = useInView({
    triggerOnce: true,
  });
  const { ref: section2Ref, inView: section2View } = useInView({
    triggerOnce: true,
  });
  const { ref: section3Ref, inView: section3View } = useInView({
    triggerOnce: true,
  });
  const { ref: section4Ref, inView: section4View } = useInView({
    triggerOnce: true,
  });

  return (
    <div className={`pb-20`}>
      <header
        className="h-[700px] md:h-[100vh] w-full relative flex flex-col px-2"
        ref={section1Ref}
      >
        <Header session={session} />
        <MobileMenu />
        <HeaderText section1View={section1View} />
      </header>
      <main className="px-6 mt-[45rem] md:mt-80 lg:mt-20 max-w-[1120px] mx-auto flex flex-col items-center justify-center gap-20">
        {data && (
          <PopularPlansSlide
            data={data}
            section2Ref={section2Ref}
            section2View={section2View}
          />
        )}
        <OurServices section3Ref={section3Ref} section3View={section3View} />
        <Benefits section4Ref={section4Ref} section4View={section4View} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
