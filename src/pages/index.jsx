import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home({ apiKey }) {
  async function handleLogin() {
    await signIn("google");
  }

  return (
    <>
      <header>
        <h1 className="text-center text-2xl mt-24">create plan: </h1>
      </header>
      <main className="flex items-center justify-center mt-20 gap-4">
        <Link href="/share">
          <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg">
            Create
          </button>
        </Link>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </main>
    </>
  );
}
