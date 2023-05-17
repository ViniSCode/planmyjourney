import { Header } from "@/components/Navbar/Header";
import { HeaderText } from "@/components/Navbar/Header/HeaderText";
import { MobileMenu } from "@/components/Navbar/MobileMenu";
import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { RiArrowDownSLine, RiCalendarLine, RiStarLine } from "react-icons/ri";

export default function Home({ session }: any) {
  async function handleLogout() {
    signOut();
  }

  return (
    <>
      <header className="h-[50vh] md:h-[80vh] w-full relative flex flex-col px-2">
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
        <div className="flex flex-col max-w-[270px] md:flex-row md:flex absolute left-1/2 right-1/2 -translate-x-1/2 bottom-[-200px] md:bottom-[-50px] w-[95%] md:max-w-[730px] mx-auto bg-white gap-4 md:gap-10 rounded-2xl px-4 py-6 md:px-4 md:py-4 shadow-lg items-center justify-center">
          <div className="gap-8 items-baseline flex-col justify-center flex md:items-center md:gap-10 md:flex-row">
            <div>
              <div className="flex items-center gap-2 md:gap-2 text-gray-900">
                <FiMapPin size={16} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Location</span>
                    <RiArrowDownSLine
                      size={18}
                      className="mt-1 text-gray-700"
                    />
                  </div>
                </div>
              </div>
              <span className="md:ml-6 text-xs font-medium text-gray-500">
                Enter your destination
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-900">
                <RiStarLine size={16} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Category</span>
                    <RiArrowDownSLine
                      size={18}
                      className="mt-1 text-gray-700"
                    />
                  </div>
                </div>
              </div>
              <span className="md:ml-6 text-xs font-medium text-gray-500">
                Choose a category
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-900">
                <RiStarLine size={16} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Category</span>
                    <RiArrowDownSLine
                      size={18}
                      className="mt-1 text-gray-700"
                    />
                  </div>
                </div>
              </div>
              <span className="md:ml-6 text-xs font-medium text-gray-500">
                Choose a category
              </span>
            </div>
          </div>

          <button className="w-full md:w-fit px-8 py-4 bg-pink-500 text-white rounded-2xl flex items-center justify-center flex-col hover:brightness-90 transition-[filter]">
            <RiCalendarLine size={22} />
            Find Plan
          </button>
        </div>
      </header>
      <main className="mt-[5rem] flex flex-col items-center justify-center gap-4">
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
