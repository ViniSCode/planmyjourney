import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PlansHeader } from "@/components/Navbar/PlansHeader";
import { Plan } from "@/components/Plans/Plan";
import { SearchBar } from "@/components/Plans/SearchBar";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Plans({ session }: any) {
  return (
    <>
      <header>
        <PlansHeader />
        <MobileMenu />
      </header>
      <main className="px-6 mt-32 max-w-[1120px] md:mt-16 mx-auto pb-20">
        <SearchBar />
        <Plan />
      </main>
    </>
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
