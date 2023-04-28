import { MapContextProvider } from '@/context/MapContext';
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <MapContextProvider apiKey={pageProps.apiKey}>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
