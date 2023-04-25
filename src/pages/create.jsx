import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map/index"), { ssr:false, loading: () => <div>Loading Map...</div> })

export default function Create ({ apiKey }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <DynamicMap apiKey={apiKey} />
    </main>
  )
}

export async function getServerSideProps(context) {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/maps';

  try {
    const res = await fetch(url);
    const { apiKey } = await res.json();
    return {
      props: {
        apiKey,
      },
    };
  } catch (err) {
    console.error('Failed to fetch API key:', err);
    return {
      props: {
        apiKey: '',
      },
    };
  }
}
