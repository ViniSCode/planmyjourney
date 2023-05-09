import { Loading } from "@/components/Loading";
import { MapContextProvider } from "@/context/MapContext";
import { SharePlanContextProvider } from "@/context/SharePlanContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps, router, session }) {
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routerChangeStart", (url) => {
      setIsPageLoading(true);
    });

    router.events.on("routerChangeComplete", (url) => {
      setIsPageLoading(false);
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <MapContextProvider apiKey={pageProps.apiKey}>
        {isPageLoading && <Loading />}
        <SharePlanContextProvider>
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
        </SharePlanContextProvider>
      </MapContextProvider>
    </SessionProvider>
  );
}

export async function getServerSideProps(context) {
  const url =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/maps";
  try {
    const res = await fetch(url);
    const { apiKey } = await res.json();

    return {
      props: {
        apiKey,
      },
    };
  } catch (err) {
    console.error("Failed to fetch API key:", err);
    return {
      props: {
        apiKey: "",
      },
    };
  }
}
