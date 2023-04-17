// import Map from '../components/Map';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('./components/Map/index'), {ssr: false});

interface Props {
  apiKey: string;
}

export default function Home({apiKey}: any) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 w-[900px] h-[900px] mx-auto rounded-lg">
      <Map apiKey={apiKey}/>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
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