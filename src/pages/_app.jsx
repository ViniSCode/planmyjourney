import { MapContextProvider } from '@/context/MapContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <MapContextProvider apiKey={pageProps.apiKey}>
      <Component {...pageProps} />
    </MapContextProvider>
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
