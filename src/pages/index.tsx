import type { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home({ session }: any) {
  async function handleLogout() {
    signOut();
  }

  return (
    <>
      <header>
        <h1 className="text-center text-3xl mt-24">create plan: </h1>
        <h3 className="mt-20 text-center text-xl">
          {session && session.user.name}
        </h3>
      </header>
      <main className="flex flex-col items-center justify-center mt-10 gap-4">
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
            Logout
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
