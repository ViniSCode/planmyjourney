import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicMap = dynamic(() => import("../components/Map/index"), {
  ssr: false,
  loading: () => <div>Loading Map...</div>,
});

export default function Home({ apiKey }) {
  return (
    <>
      <header>
        <h1 className="text-center text-2xl mt-24">create plan: </h1>
      </header>
      <main className="flex items-center justify-center mt-20">
        <Link href="/share">
          <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg">
            Create
          </button>
        </Link>
      </main>
    </>
  );
}
