import { Header } from "@/components/Navbar/Header";
import { HeaderText } from "@/components/Navbar/Header/HeaderText";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { TripPlanSelect } from "@/components/TripPlanSelect";
import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ session }: any) {
  async function handleLogout() {
    signOut();
  }

  return (
    <>
      <header className="h-[80vh] md:h-[80vh] w-full relative flex flex-col px-2">
        <Image
          src="/assets/header.png"
          fill
          alt="Mountain Image"
          className="object-cover absolute z-[-10] brightness-90"
          quality={100}
        />
        <Header session={session} />
        <MobileMenu />
        <HeaderText />
        <TripPlanSelect />
      </header>
      <main className="mt-[45rem] flex flex-col items-center justify-center gap-4">
        <Link href="/login">
          <button className="px-10 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
            Create
          </button>
        </Link>
        {session && (
          <button
            className="px-10 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleLogout}
          >
            Logout test
          </button>
        )}
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
