import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map/index"), { ssr:false, loading: () => <div>Loading Map...</div> })

export default function Home({ apiKey }) {
  return (
    <>
      <header>
        
      </header>
      <main className="">
        
      </main>
    </>
  )
}
