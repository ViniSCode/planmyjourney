import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map/index"), { ssr:false })


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicMap />      
      teste
    </main>
  )
}
