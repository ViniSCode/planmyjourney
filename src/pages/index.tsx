import { Header } from "@/components/Navbar/Header";
import { HeaderText } from "@/components/Navbar/Header/HeaderText";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import { PopularPlansSlide } from "@/components/PopularPlansSlider";
import { TripPlanSelect } from "@/components/TripPlanSelect";
import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home({ session }: any) {
  async function handleLogout() {
    signOut();
  }

  return (
    <div className="pb-20">
      <header className="h-[80vh] md:h-[90vh] w-full relative flex flex-col px-2">
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
      <main className="px-10 mt-80 max-w-[1120px] mx-auto md:mt-48 flex flex-col items-center justify-center gap-4">
        <PopularPlansSlide />
        {session && (
          <button
            className="px-10 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleLogout}
          >
            Logout test
          </button>
        )}
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
